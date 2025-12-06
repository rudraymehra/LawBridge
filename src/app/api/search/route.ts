import { NextRequest, NextResponse } from 'next/server';
import { searchVeritus } from '@/lib/veritus';
import { generateLegalSummary } from '@/lib/openai';
import { SearchRequest, SearchResponse } from '@/types';

// Rate limiting - simple in-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: SearchRequest = await request.json();
    const { question, category } = body;

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid question.' },
        { status: 400 }
      );
    }

    // Sanitize and validate question length
    const sanitizedQuestion = question.trim();
    if (sanitizedQuestion.length < 5) {
      return NextResponse.json(
        { error: 'Question is too short. Please provide more detail.' },
        { status: 400 }
      );
    }

    if (sanitizedQuestion.length > 1000) {
      return NextResponse.json(
        { error: 'Question is too long. Please keep it under 1000 characters.' },
        { status: 400 }
      );
    }

    // Step 1: Search for relevant legal documents using Veritus
    console.log(`Searching for: "${sanitizedQuestion}" (category: ${category || 'all'})`);

    const documents = await searchVeritus({
      query: sanitizedQuestion,
      category,
      limit: 5,
    });

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        {
          error: 'No relevant legal information found for your question. Please try rephrasing or asking a different question.',
        },
        { status: 404 }
      );
    }

    // Step 2: Generate plain-language summary using OpenAI with RAG
    console.log(`Found ${documents.length} relevant documents, generating summary...`);

    const result = await generateLegalSummary({
      question: sanitizedQuestion,
      documents,
    });

    // Validate result
    if (!result.summary) {
      return NextResponse.json(
        { error: 'Failed to generate a response. Please try again.' },
        { status: 500 }
      );
    }

    // Return successful response
    const response: SearchResponse = {
      summary: result.summary,
      sources: result.sources,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to search.' },
    { status: 405 }
  );
}
