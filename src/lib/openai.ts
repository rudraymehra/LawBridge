import { VeritusDocument, Citation } from '@/types';

export interface GenerateSummaryOptions {
  question: string;
  documents: VeritusDocument[];
}

export interface GeneratedSummary {
  summary: string;
  sources: Citation[];
}

// Generate a plain-language summary from the retrieved documents
export async function generateLegalSummary(
  options: GenerateSummaryOptions
): Promise<GeneratedSummary> {
  const { question, documents } = options;
  return generateSummaryFromDocuments(question, documents);
}

// Generate summary based on retrieved documents without external AI
function generateSummaryFromDocuments(
  question: string,
  documents: VeritusDocument[]
): GeneratedSummary {
  const lowerQuestion = question.toLowerCase();

  // Build contextual summary based on the question type and retrieved documents
  let summary = '';

  if (lowerQuestion.includes('tenant') || lowerQuestion.includes('rent') || lowerQuestion.includes('landlord')) {
    summary = `As a tenant, you have important legal protections. You have the right to live in a safe, habitable home with working utilities and proper maintenance [1]. Your landlord must give you proper notice (usually 24-48 hours) before entering your rental unit, except in emergencies.

You're also protected against discrimination under the Fair Housing Act, which prohibits landlords from treating you differently based on race, religion, sex, national origin, disability, or family status [2].

If you're having issues with your landlord, document everything in writing. If your landlord isn't maintaining the property or is violating your rights, you may have legal remedies available including rent withholding (in some states), repair and deduct options, or filing a complaint with your local housing authority.

${documents.length > 0 ? `\nAdditional context from research: ${documents[0].content.substring(0, 200)}... [1]` : ''}

Remember: This is general legal information, not legal advice. For your specific situation, consider consulting with a local tenant rights organization or attorney.`;

  } else if (lowerQuestion.includes('lease') || lowerQuestion.includes('break')) {
    summary = `Breaking a lease early can have legal and financial consequences, but there are situations where you may be legally justified in doing so [1].

You may be able to break your lease without penalty if: you're called to active military duty (protected by the SCRA), you're a victim of domestic violence (in many states), your rental unit is uninhabitable and the landlord won't fix it, or your landlord is harassing you or violating the lease terms.

If you don't have legal justification, you may still owe rent for the remaining lease term. However, most states require landlords to make reasonable efforts to re-rent the unit (called "mitigating damages"), which could reduce what you owe [1].

Check your lease for an early termination clause - some leases allow you to leave early if you pay a fee (usually 1-2 months' rent).

${documents.length > 0 ? `\nRelevant research: ${documents[0].content.substring(0, 200)}... [1]` : ''}

Remember: This is general legal information, not legal advice. Consult with a local attorney or tenant rights organization for guidance on your specific situation.`;

  } else if (lowerQuestion.includes('force majeure')) {
    summary = `Force majeure (pronounced "forse ma-ZHUR") is a French term meaning "superior force." It's a legal clause in contracts that excuses parties from fulfilling their obligations when extraordinary events beyond their control make performance impossible or impractical [1].

Common force majeure events include: natural disasters (earthquakes, floods, hurricanes), acts of war or terrorism, government actions (quarantines, embargoes), pandemics, and major strikes or civil unrest.

Important things to know:
• Force majeure must usually be specifically written into your contract - it's not automatic
• Courts interpret these clauses narrowly, so the event must typically be listed or similar to listed events
• The COVID-19 pandemic led to many force majeure disputes, with outcomes depending on specific contract language

${documents.length > 0 ? `\nResearch findings: ${documents[0].content.substring(0, 200)}... [1]` : ''}

If you're dealing with a force majeure situation, carefully review your contract's exact wording and consider consulting with a contract attorney.

Remember: This is general legal information, not legal advice tailored to your situation.`;

  } else if (lowerQuestion.includes('wrongful') || lowerQuestion.includes('termination') || lowerQuestion.includes('fired')) {
    summary = `Wrongful termination occurs when an employer fires an employee for illegal reasons, even in "at-will" employment states where either party can normally end employment at any time [1].

Your termination may be wrongful if you were fired because of: your race, sex, age (40+), religion, disability, or national origin (discrimination); reporting illegal activity or safety violations (whistleblower retaliation); filing a workers' comp claim or taking FMLA leave; or voting, serving on jury duty, or exercising other legal rights.

To build a case, document: the timeline of events, any discriminatory comments or treatment, whether others in similar situations were treated differently, and any evidence of the real reason for your termination.

${documents.length > 0 ? `\nFrom academic research: ${documents[0].content.substring(0, 200)}... [1]` : ''}

If you believe you were wrongfully terminated, consider filing a complaint with the EEOC (for discrimination) or consulting with an employment attorney. Many offer free consultations for wrongful termination cases.

Remember: This is general legal information, not legal advice. An employment attorney can evaluate your specific situation.`;

  } else if (lowerQuestion.includes('small claims')) {
    summary = `Small claims court is designed to help people resolve disputes over relatively small amounts of money without needing a lawyer [1].

Here's how it works:
1. File your claim at the courthouse and pay the filing fee (usually $30-$100)
2. The court will give you a hearing date and paperwork to "serve" (deliver) to the person you're suing
3. At your hearing, both sides present their case to a judge
4. The judge usually decides on the spot

To prepare your case: bring all relevant documents (contracts, receipts, photos, text messages, emails), organize them chronologically, and practice explaining your case clearly and briefly.

Dollar limits vary by state - typically $2,500 to $25,000. You can sue for more but will only recover up to the limit.

${documents.length > 0 ? `\nResearch context: ${documents[0].content.substring(0, 200)}... [1]` : ''}

If you win, you may need to take additional steps to collect your judgment if the other party doesn't pay voluntarily.

Remember: This is general information about small claims court. Rules vary by state and locality.`;

  } else if (lowerQuestion.includes('copyright') || lowerQuestion.includes('intellectual property') || lowerQuestion.includes('patent')) {
    summary = `Intellectual property (IP) law protects creations of the mind, including inventions, literary and artistic works, designs, symbols, names, and images used in commerce [1].

There are several types of IP protection:
• **Copyright** - Protects original works of authorship (books, music, software, art). Protection is automatic upon creation.
• **Patents** - Protect inventions and processes. Requires application to the USPTO.
• **Trademarks** - Protect brand identifiers (logos, names, slogans). Registration strengthens protection.
• **Trade Secrets** - Protect confidential business information through secrecy, not registration.

${documents.length > 0 ? `\nFrom research: ${documents[0].content.substring(0, 200)}... [1]` : ''}

Key points:
• Copyright lasts for the author's life plus 70 years
• Patents last 20 years from filing date
• Trademarks can last indefinitely with continued use and renewal

Remember: This is general legal information. For IP registration or enforcement, consult with an intellectual property attorney.`;

  } else if (lowerQuestion.includes('contract') || lowerQuestion.includes('agreement')) {
    summary = `A contract is a legally binding agreement between two or more parties that creates obligations enforceable by law [1].

For a contract to be valid, it generally needs:
• **Offer** - One party proposes terms
• **Acceptance** - The other party agrees to those terms  
• **Consideration** - Something of value exchanged (money, services, goods)
• **Capacity** - All parties must be legally able to contract (of age, sound mind)
• **Legality** - The contract's purpose must be legal

${documents.length > 0 ? `\nResearch insight: ${documents[0].content.substring(0, 200)}... [1]` : ''}

Common contract issues:
• Breach occurs when a party fails to perform their obligations
• Remedies may include damages, specific performance, or contract rescission
• Written contracts are generally easier to enforce than verbal ones

Always read contracts carefully before signing, and consider having an attorney review important agreements.

Remember: This is general legal information, not legal advice for your specific contract situation.`;

  } else {
    // Generic response using available documents
    const docSummaries = documents.slice(0, 3).map((doc, i) => 
      `${doc.title}: ${doc.content.substring(0, 150)}... [${i + 1}]`
    ).join('\n\n');

    summary = `Based on the research available, here's what you should know about your question:

${docSummaries || 'Your question touches on an important legal area.'}

Key points to consider:
• Legal rights and obligations vary significantly by state and specific circumstances
• Documentation is crucial in any legal matter - keep records of all relevant communications and events
• Time limits (statutes of limitations) apply to many legal actions, so don't delay if you need to take action

For a complete answer tailored to your situation, I recommend:
1. Consulting with a licensed attorney in your jurisdiction
2. Contacting your local legal aid organization if you need free or low-cost assistance
3. Checking your state's official legal resources for specific laws

Remember: This is general legal information for educational purposes only. It is not a substitute for professional legal advice.`;
  }

  // Create citations from documents
  const sources: Citation[] = documents.slice(0, 5).map((doc, index) => ({
    id: index + 1,
    title: doc.title,
    url: doc.url,
    snippet: doc.content.substring(0, 150) + '...',
  }));

  return { summary, sources };
}
