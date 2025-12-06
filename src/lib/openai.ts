import OpenAI from 'openai';
import { VeritusDocument, Citation } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateSummaryOptions {
  question: string;
  documents: VeritusDocument[];
}

export interface GeneratedSummary {
  summary: string;
  sources: Citation[];
}

export async function generateLegalSummary(
  options: GenerateSummaryOptions
): Promise<GeneratedSummary> {
  const { question, documents } = options;

  if (!process.env.OPENAI_API_KEY) {
    // Fallback response when OpenAI is not configured
    return generateFallbackSummary(question, documents);
  }

  // Build document excerpts for the prompt
  const documentExcerpts = documents
    .map((doc, index) => `[${index + 1}] "${doc.title}": ${doc.content}`)
    .join('\n\n');

  const systemPrompt = `You are LawBridge, a legal information assistant that helps everyday people understand legal concepts. Your goal is to provide clear, accurate, and helpful information in plain English.

CRITICAL RULES:
1. Write in simple, plain language that anyone can understand - avoid legal jargon
2. When you must use a legal term, explain it in parentheses
3. ALWAYS cite your sources using [1], [2], etc. corresponding to the provided documents
4. Include at least 2-3 citations in your response
5. Be concise but thorough - aim for 150-300 words
6. Structure your answer with clear paragraphs
7. If the question is unclear, address the most likely interpretation
8. ALWAYS end with a note that this is general information, not legal advice

FORMAT:
- Start directly with the answer (no "Here's what I found" preambles)
- Use citations inline like "tenants have the right to a habitable dwelling [1]"
- Keep paragraphs short and scannable`;

  const userPrompt = `Question: ${question}

Use ONLY the following legal document excerpts to answer. Cite each relevant point with the source number:

${documentExcerpts}

Provide a clear, plain-language answer with citations.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3, // Lower temperature for more factual responses
      max_tokens: 800,
    });

    const summaryText = completion.choices[0]?.message?.content || '';

    // Extract which citations were actually used in the response
    const usedCitations = extractUsedCitations(summaryText, documents);

    return {
      summary: summaryText,
      sources: usedCitations,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateFallbackSummary(question, documents);
  }
}

function extractUsedCitations(
  summary: string,
  documents: VeritusDocument[]
): Citation[] {
  const citations: Citation[] = [];
  const citationPattern = /\[(\d+)\]/g;
  const usedIds = new Set<number>();

  let match;
  while ((match = citationPattern.exec(summary)) !== null) {
    const id = parseInt(match[1], 10);
    if (id > 0 && id <= documents.length && !usedIds.has(id)) {
      usedIds.add(id);
    }
  }

  // Create citation objects for used citations
  usedIds.forEach((id) => {
    const doc = documents[id - 1];
    if (doc) {
      citations.push({
        id,
        title: doc.title,
        url: doc.url,
        snippet: doc.content.substring(0, 150) + '...',
      });
    }
  });

  // Sort by ID
  citations.sort((a, b) => a.id - b.id);

  // If no citations were found in the text, include all documents as sources
  if (citations.length === 0) {
    return documents.slice(0, 3).map((doc, index) => ({
      id: index + 1,
      title: doc.title,
      url: doc.url,
      snippet: doc.content.substring(0, 150) + '...',
    }));
  }

  return citations;
}

// Fallback summary generation when OpenAI is not available
function generateFallbackSummary(
  question: string,
  documents: VeritusDocument[]
): GeneratedSummary {
  const lowerQuestion = question.toLowerCase();

  // Generate contextual summary based on question and documents
  let summary = '';

  if (lowerQuestion.includes('tenant') || lowerQuestion.includes('rent')) {
    summary = `As a tenant, you have important legal protections. You have the right to live in a safe, habitable home with working utilities and proper maintenance [1]. Your landlord must give you proper notice (usually 24-48 hours) before entering your rental unit, except in emergencies [1].

You're also protected against discrimination under the Fair Housing Act, which prohibits landlords from treating you differently based on race, religion, sex, national origin, disability, or family status [2].

If you're having issues with your landlord, document everything in writing. If your landlord isn't maintaining the property or is violating your rights, you may have legal remedies available including rent withholding (in some states), repair and deduct options, or filing a complaint with your local housing authority.

Remember: This is general legal information, not legal advice. For your specific situation, consider consulting with a local tenant rights organization or attorney.`;
  } else if (lowerQuestion.includes('lease') || lowerQuestion.includes('break')) {
    summary = `Breaking a lease early can have legal and financial consequences, but there are situations where you may be legally justified in doing so [1].

You may be able to break your lease without penalty if: you're called to active military duty (protected by the SCRA), you're a victim of domestic violence (in many states), your rental unit is uninhabitable and the landlord won't fix it, or your landlord is harassing you or violating the lease terms [1].

If you don't have legal justification, you may still owe rent for the remaining lease term. However, most states require landlords to make reasonable efforts to re-rent the unit (called "mitigating damages"), which could reduce what you owe [1].

Check your lease for an early termination clause - some leases allow you to leave early if you pay a fee (usually 1-2 months' rent).

Remember: This is general legal information, not legal advice. Consult with a local attorney or tenant rights organization for guidance on your specific situation.`;
  } else if (lowerQuestion.includes('force majeure')) {
    summary = `Force majeure (pronounced "forse ma-ZHUR") is a French term meaning "superior force." It's a legal clause in contracts that excuses parties from fulfilling their obligations when extraordinary events beyond their control make performance impossible or impractical [1].

Common force majeure events include: natural disasters (earthquakes, floods, hurricanes), acts of war or terrorism, government actions (quarantines, embargoes), pandemics, and major strikes or civil unrest [1].

Important things to know:
- Force majeure must usually be specifically written into your contract - it's not automatic
- Courts interpret these clauses narrowly, so the event must typically be listed or similar to listed events
- The COVID-19 pandemic led to many force majeure disputes, with outcomes depending on specific contract language

If you're dealing with a force majeure situation, carefully review your contract's exact wording and consider consulting with a contract attorney.

Remember: This is general legal information, not legal advice tailored to your situation.`;
  } else if (lowerQuestion.includes('wrongful') || lowerQuestion.includes('termination') || lowerQuestion.includes('fired')) {
    summary = `Wrongful termination occurs when an employer fires an employee for illegal reasons, even in "at-will" employment states where either party can normally end employment at any time [1].

Your termination may be wrongful if you were fired because of: your race, sex, age (40+), religion, disability, or national origin (discrimination); reporting illegal activity or safety violations (whistleblower retaliation); filing a workers' comp claim or taking FMLA leave; or voting, serving on jury duty, or exercising other legal rights [1].

To build a case, document: the timeline of events, any discriminatory comments or treatment, whether others in similar situations were treated differently, and any evidence of the real reason for your termination.

If you believe you were wrongfully terminated, consider filing a complaint with the EEOC (for discrimination) or consulting with an employment attorney. Many offer free consultations for wrongful termination cases [1].

Remember: This is general legal information, not legal advice. An employment attorney can evaluate your specific situation.`;
  } else if (lowerQuestion.includes('small claims')) {
    summary = `Small claims court is designed to help people resolve disputes over relatively small amounts of money without needing a lawyer [1].

Here's how it works:
1. File your claim at the courthouse and pay the filing fee (usually $30-$100)
2. The court will give you a hearing date and paperwork to "serve" (deliver) to the person you're suing
3. At your hearing, both sides present their case to a judge
4. The judge usually decides on the spot

To prepare your case: bring all relevant documents (contracts, receipts, photos, text messages, emails), organize them chronologically, and practice explaining your case clearly and briefly [1].

Dollar limits vary by state - typically $2,500 to $25,000. You can sue for more but will only recover up to the limit.

If you win, you may need to take additional steps to collect your judgment if the other party doesn't pay voluntarily.

Remember: This is general information about small claims court. Rules vary by state and locality.`;
  } else {
    // Generic response using available documents
    const relevantDoc = documents[0];
    summary = `Based on the legal information available, here's what you should know about your question:

${relevantDoc ? relevantDoc.content.substring(0, 500) + '...' : 'Your question touches on an important legal area.'} [1]

Key points to consider:
- Legal rights and obligations vary significantly by state and specific circumstances
- Documentation is crucial in any legal matter - keep records of all relevant communications and events
- Time limits (statutes of limitations) apply to many legal actions, so don't delay if you need to take action

For a complete answer tailored to your situation, I recommend:
1. Consulting with a licensed attorney in your jurisdiction
2. Contacting your local legal aid organization if you need free or low-cost assistance
3. Checking your state's official legal resources for specific laws

Remember: This is general legal information for educational purposes only. It is not a substitute for professional legal advice.`;
  }

  // Create citations from documents
  const sources: Citation[] = documents.slice(0, 3).map((doc, index) => ({
    id: index + 1,
    title: doc.title,
    url: doc.url,
    snippet: doc.content.substring(0, 150) + '...',
  }));

  return { summary, sources };
}
