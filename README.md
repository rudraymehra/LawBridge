# LawBridge - AI Legal Assistant

An AI-powered legal Q&A assistant designed for everyday people with no law background. Get plain-language answers to legal questions backed by authoritative sources.

## Features

- **Natural Language Search**: Ask legal questions in plain English
- **Plain-Language Answers**: Complex legal concepts explained simply
- **Cited Sources**: Every answer backed by authoritative legal documents
- **Category Filtering**: Filter by legal area (Employment, Housing, Consumer Rights, etc.)
- **Mobile-First Design**: Fully responsive UI that works on any device
- **RAG Architecture**: Retrieval-Augmented Generation for accurate, grounded responses

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI/ML**: OpenAI GPT-4 for summarization
- **Legal Search**: Veritus.ai API for document retrieval
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- (Optional) Veritus.ai API key
- (Optional) Google Analytics Measurement ID

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lawbridge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your API keys:
```env
# Required
OPENAI_API_KEY=sk-your-openai-api-key

# Optional (fallback data available)
VERITUS_API_KEY=your-veritus-api-key

# Optional (for analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lawbridge/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/search/         # Search API endpoint
│   │   ├── about/              # About page
│   │   ├── faq/                # FAQ page
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   ├── disclaimer/         # Legal disclaimer
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── ResultCard.tsx      # Answer display
│   │   ├── CitationList.tsx    # Source citations
│   │   ├── CategorySelector.tsx # Topic filter
│   │   ├── LoadingState.tsx    # Loading animation
│   │   ├── Header.tsx          # Site header
│   │   ├── Footer.tsx          # Site footer
│   │   └── GoogleAnalytics.tsx # GA4 integration
│   ├── lib/                    # Backend utilities
│   │   ├── veritus.ts          # Veritus API client
│   │   └── openai.ts           # OpenAI integration
│   └── types/                  # TypeScript types
│       └── index.ts
├── .env.example                # Environment template
├── vercel.json                 # Vercel configuration
└── package.json
```

## API Reference

### POST /api/search

Search for legal information and get AI-generated summaries.

**Request Body:**
```json
{
  "question": "What are my rights as a tenant?",
  "category": "housing"  // optional
}
```

**Response:**
```json
{
  "summary": "As a tenant, you have important legal protections...",
  "sources": [
    {
      "id": 1,
      "title": "Tenant Rights and Responsibilities",
      "url": "https://...",
      "snippet": "..."
    }
  ]
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `VERITUS_API_KEY` (optional)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)
4. Deploy!

The app is configured with `vercel.json` for optimal settings.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes* | OpenAI API key for GPT-4 |
| `VERITUS_API_KEY` | No | Veritus.ai API key for legal search |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 ID |
| `NEXTAUTH_SECRET` | No | For authentication features |

*The app works without it using fallback responses, but full functionality requires the key.

## Legal Disclaimer

LawBridge provides general legal information for educational purposes only. It is not a law firm, does not provide legal advice, and does not create an attorney-client relationship. Always consult with a licensed attorney for specific legal matters.

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

Built for the hackathon to make legal information accessible to everyone.
