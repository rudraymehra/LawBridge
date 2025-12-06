import { VeritusDocument } from '@/types';

// Veritus API Configuration
// Correct base URL from docs: https://discover.veritus.ai/api
const VERITUS_BASE_URL = 'https://discover.veritus.ai/api';
const VERITUS_API_KEY = process.env.VERITUS_API_KEY;

export interface VeritusSearchOptions {
  query: string;
  category?: string;
  limit?: number;
}

// Veritus API Paper Response Type
interface VeritusPaper {
  id: string;
  title: string;
  abstract?: string | null;
  authors?: string;
  link?: string;
  pdfLink?: string;
  doi?: string | null;
  journalName?: string | null;
  publishedAt?: string | null;
  year?: number | null;
  score?: number | null;
  tldr?: string | null;
  fieldsOfStudy?: string[];
  impactFactor?: {
    citationCount?: number;
    influentialCitationCount?: number;
    referenceCount?: number;
  };
}

export async function searchVeritus(options: VeritusSearchOptions): Promise<VeritusDocument[]> {
  const { query, category, limit = 5 } = options;

  if (!VERITUS_API_KEY) {
    console.warn('VERITUS_API_KEY not configured, using fallback search');
    return getFallbackResults(query, category);
  }

  try {
    // Build search query - add "law" or category context for legal searches
    const searchQuery = category 
      ? `${category} law ${query}` 
      : `legal ${query}`;

    // Use the correct Veritus API endpoint: GET /v1/papers/search
    const url = new URL(`${VERITUS_BASE_URL}/v1/papers/search`);
    url.searchParams.append('title', searchQuery);

    console.log(`Searching Veritus API: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${VERITUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Veritus API error:', response.status, response.statusText, errorText);
      return getFallbackResults(query, category);
    }

    const papers: VeritusPaper[] = await response.json();
    
    if (!papers || papers.length === 0) {
      console.log('No results from Veritus API, using fallback');
      return getFallbackResults(query, category);
    }

    console.log(`Veritus API returned ${papers.length} papers`);

    // Map Veritus papers to our document format
    const documents: VeritusDocument[] = papers.slice(0, limit).map((paper) => ({
      title: paper.title || 'Untitled Paper',
      content: paper.abstract || paper.tldr || `Academic paper: ${paper.title}. ${paper.authors ? `Authors: ${paper.authors}.` : ''} ${paper.journalName ? `Published in: ${paper.journalName}.` : ''} ${paper.year ? `Year: ${paper.year}.` : ''}`,
      url: paper.link || paper.pdfLink || (paper.doi ? `https://doi.org/${paper.doi}` : 'https://scholar.google.com'),
      score: paper.score || 0.8,
    }));

    return documents;
  } catch (error) {
    console.error('Veritus search failed:', error);
    return getFallbackResults(query, category);
  }
}

// Fallback results for when Veritus API is not available
// Provides curated legal information for common questions
function getFallbackResults(query: string, category?: string): VeritusDocument[] {
  const lowerQuery = query.toLowerCase();

  // Comprehensive fallback database for common legal questions
  const legalDatabase: VeritusDocument[] = [
    // Tenant Rights
    {
      title: 'Tenant Rights and Responsibilities',
      content: `Tenants have fundamental rights including: the right to a habitable dwelling (working plumbing, heating, electricity), the right to privacy (landlords must give notice before entering, typically 24-48 hours), protection against retaliation for exercising legal rights, the right to have security deposits returned within state-mandated timeframes (usually 14-30 days), and the right to proper notice before eviction (varies by state but typically 30-60 days for month-to-month tenancies). Landlords cannot discriminate based on race, color, religion, sex, national origin, familial status, or disability under the Fair Housing Act.`,
      url: 'https://www.hud.gov/topics/rental_assistance/tenantrights',
      score: 0.95,
    },
    {
      title: 'Fair Housing Act Overview',
      content: `The Fair Housing Act prohibits discrimination in housing based on race, color, national origin, religion, sex (including gender identity and sexual orientation), familial status, and disability. This applies to most housing transactions including rentals, sales, and mortgage lending. Violations can result in civil penalties and damages. Tenants who believe they have been discriminated against can file complaints with HUD within one year of the alleged violation.`,
      url: 'https://www.justice.gov/crt/fair-housing-act-1',
      score: 0.88,
    },
    // Breaking Lease
    {
      title: 'Early Lease Termination Laws',
      content: `Breaking a lease early may be legally justified in certain situations: military deployment (SCRA protection), domestic violence (many states allow early termination), uninhabitable conditions (constructive eviction), landlord harassment, illegal lease clauses, or landlord's failure to maintain the property. Without legal justification, tenants may owe remaining rent, though landlords have a duty to mitigate damages by trying to re-rent. Some leases include early termination clauses allowing exit with payment of 1-2 months rent.`,
      url: 'https://www.nolo.com/legal-encyclopedia/tenants-right-break-rental-lease.html',
      score: 0.92,
    },
    // Force Majeure
    {
      title: 'Force Majeure Clauses Explained',
      content: `Force majeure (French for "superior force") is a contract clause that excuses parties from performance when extraordinary events beyond their control occur. These typically include: natural disasters (earthquakes, floods, hurricanes), war or armed conflict, terrorism, government actions (embargoes, quarantines), pandemics, and strikes. The clause must typically be explicitly included in the contract, and courts interpret them narrowly. COVID-19 litigation has expanded the understanding of force majeure, but outcomes depend on specific contract language.`,
      url: 'https://www.law.cornell.edu/wex/force_majeure',
      score: 0.94,
    },
    // Employment Law
    {
      title: 'Employee Rights in the Workplace',
      content: `Federal and state laws protect employees from: discrimination based on protected characteristics (Title VII, ADA, ADEA), unsafe working conditions (OSHA), wage theft and minimum wage violations (FLSA), retaliation for whistleblowing or exercising legal rights, and wrongful termination (in some cases). At-will employment means either party can end employment at any time, but this doesn't permit firing for illegal reasons. Employees have rights to overtime pay if non-exempt, family and medical leave (FMLA for eligible employees), and workers' compensation for job injuries.`,
      url: 'https://www.dol.gov/general/aboutdol/majorlaws',
      score: 0.90,
    },
    {
      title: 'Wrongful Termination Overview',
      content: `Wrongful termination occurs when an employer fires an employee for illegal reasons, including: discrimination based on race, sex, age, disability, religion, or national origin; retaliation for whistleblowing or filing complaints; violation of employment contracts or implied promises; firing someone for taking FMLA leave; termination for exercising legal rights (voting, jury duty, filing workers' comp claims). To prove wrongful termination, employees typically need evidence of the illegal motive, which can include timing, statements, disparate treatment, or pattern evidence.`,
      url: 'https://www.eeoc.gov/wrongful-termination',
      score: 0.89,
    },
    // Small Claims Court
    {
      title: 'Small Claims Court Guide',
      content: `Small claims court handles civil disputes involving limited amounts of money (typically $2,500-$25,000 depending on state). The process is designed to be accessible without lawyers: file a claim with the court clerk, pay a filing fee ($30-$100 typically), serve the defendant with notice, and present your case at a hearing. Bring all documentation (contracts, receipts, photos, correspondence). Judgments are usually issued the same day. If you win, you may need to take additional steps to collect if the defendant doesn't pay voluntarily.`,
      url: 'https://www.nolo.com/legal-encyclopedia/small-claims-court',
      score: 0.91,
    },
    // Traffic Tickets
    {
      title: 'Handling Traffic Tickets',
      content: `For most traffic tickets, you can handle them without a lawyer. Options include: paying the fine (admits guilt), attending traffic school (may keep points off your record), or contesting the ticket in court. Consider fighting the ticket if: the officer made errors, you have a valid defense, or points would significantly impact your insurance. For more serious violations (DUI, reckless driving, hit-and-run), consulting an attorney is recommended as these carry potential criminal penalties, license suspension, and jail time.`,
      url: 'https://www.nolo.com/legal-encyclopedia/free-books/beat-ticket-book',
      score: 0.87,
    },
    // Consumer Rights
    {
      title: 'Consumer Protection Laws',
      content: `Federal consumer protection laws include: Fair Debt Collection Practices Act (limits collector harassment), Truth in Lending Act (requires disclosure of credit terms), Fair Credit Reporting Act (gives rights regarding credit reports), Consumer Product Safety Act (regulates product safety), and Magnuson-Moss Warranty Act (regulates warranties). The FTC enforces many of these laws. Consumers can dispute billing errors, request validation of debts, freeze credit reports, and sue for violations. Many states have additional consumer protection statutes.`,
      url: 'https://www.ftc.gov/about-ftc/mission/enforcement-authority',
      score: 0.88,
    },
    // Family Law
    {
      title: 'Divorce and Family Law Basics',
      content: `Divorce laws vary by state but generally involve: grounds for divorce (no-fault divorce available in all states), division of marital property (equitable distribution or community property depending on state), spousal support/alimony, child custody and visitation (courts prioritize best interests of the child), and child support (calculated using state guidelines based on income). Uncontested divorces where parties agree are faster and cheaper. Mediation is often available to resolve disputes without litigation.`,
      url: 'https://family.findlaw.com/divorce.html',
      score: 0.86,
    },
    // Criminal Law
    {
      title: 'Criminal Defense Rights',
      content: `Constitutional rights in criminal proceedings include: right to remain silent (5th Amendment), right to an attorney (6th Amendment - if you can't afford one, one will be appointed), right to a speedy and public trial, right to confront witnesses, right against unreasonable searches and seizures (4th Amendment), right against double jeopardy, and right to due process. If arrested, invoke your right to remain silent and request an attorney before answering questions. Anything you say can be used against you.`,
      url: 'https://www.aclu.org/know-your-rights',
      score: 0.90,
    },
    // Immigration
    {
      title: 'Immigration Law Overview',
      content: `U.S. immigration pathways include: family-based immigration (sponsorship by U.S. citizen or green card holder relatives), employment-based visas (H-1B for specialty occupations, L-1 for intracompany transfers), diversity visa lottery, refugee and asylum status, and naturalization for citizenship. Undocumented individuals may have options including DACA (for childhood arrivals), cancellation of removal, or visa applications if eligible. Immigration law is federal, so state laws cannot override federal immigration enforcement.`,
      url: 'https://www.uscis.gov/citizenship-resource-center',
      score: 0.85,
    },
    // Business Law
    {
      title: 'Starting a Business Legal Requirements',
      content: `Legal steps for starting a business include: choosing a business structure (sole proprietorship, LLC, corporation - each has different liability and tax implications), registering with state authorities, obtaining an EIN from the IRS, getting necessary licenses and permits (varies by industry and location), setting up business banking, understanding employment laws if hiring, and protecting intellectual property (trademarks, copyrights, patents). LLCs are popular because they offer liability protection with simpler administration than corporations.`,
      url: 'https://www.sba.gov/business-guide/launch-your-business',
      score: 0.87,
    },
    // Contract Law
    {
      title: 'Contract Law Essentials',
      content: `A valid contract requires: offer, acceptance, consideration (something of value exchanged), capacity (parties must be of legal age and sound mind), and legality (contract cannot be for illegal purposes). Contracts can be written or oral, but some must be in writing (Statute of Frauds) including real estate transactions, contracts lasting over a year, and sales of goods over $500. Breach of contract remedies include damages, specific performance, and rescission. Always read contracts carefully before signing.`,
      url: 'https://www.law.cornell.edu/wex/contract',
      score: 0.89,
    },
    // Personal Injury
    {
      title: 'Personal Injury Claims Explained',
      content: `Personal injury claims arise when someone is harmed due to another's negligence. To prove negligence: the defendant owed a duty of care, breached that duty, the breach caused the injury, and damages resulted. Common cases include car accidents, slip and falls, medical malpractice, and product liability. Damages can include medical expenses, lost wages, pain and suffering, and punitive damages in egregious cases. Most states have statutes of limitations (2-6 years) to file claims. Many personal injury attorneys work on contingency (no fee unless you win).`,
      url: 'https://www.nolo.com/legal-encyclopedia/personal-injury',
      score: 0.88,
    },
  ];

  // Filter based on query relevance
  const results = legalDatabase.filter((doc) => {
    const searchTerms = lowerQuery.split(' ').filter(term => term.length > 2);
    const docText = (doc.title + ' ' + doc.content).toLowerCase();

    // Check if any search terms appear in the document
    return searchTerms.some(term => docText.includes(term));
  });

  // If category filter is applied
  if (category) {
    const categoryFiltered = results.filter((doc) => {
      const docText = (doc.title + ' ' + doc.content).toLowerCase();
      return docText.includes(category.toLowerCase());
    });
    if (categoryFiltered.length > 0) {
      return categoryFiltered.slice(0, 5);
    }
  }

  // Return top results or fallback to first few if no matches
  return results.length > 0 ? results.slice(0, 5) : legalDatabase.slice(0, 3);
}
