export interface Citation {
  id: number;
  title: string;
  url: string;
  snippet?: string;
}

export interface SearchResponse {
  summary: string;
  sources: Citation[];
}

export interface SearchRequest {
  question: string;
  category?: string;
}

export interface VeritusDocument {
  title: string;
  content: string;
  url: string;
  score?: number;
}

export interface VeritusSearchResponse {
  results: VeritusDocument[];
}

export type LegalCategory =
  | 'all'
  | 'employment'
  | 'housing'
  | 'consumer'
  | 'family'
  | 'criminal'
  | 'immigration'
  | 'business';

export const LEGAL_CATEGORIES: { value: LegalCategory; label: string; icon: string }[] = [
  { value: 'all', label: 'All Topics', icon: '📚' },
  { value: 'employment', label: 'Employment Law', icon: '💼' },
  { value: 'housing', label: 'Housing & Tenant', icon: '🏠' },
  { value: 'consumer', label: 'Consumer Rights', icon: '🛒' },
  { value: 'family', label: 'Family Law', icon: '👨‍👩‍👧' },
  { value: 'criminal', label: 'Criminal Law', icon: '⚖️' },
  { value: 'immigration', label: 'Immigration', icon: '🌍' },
  { value: 'business', label: 'Business Law', icon: '🏢' },
];
