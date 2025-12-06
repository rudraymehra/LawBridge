import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | LawBridge',
  description:
    'Find answers to common questions about LawBridge, how our AI legal assistant works, and what you can expect from our service.',
};

const faqs = [
  {
    question: 'Is LawBridge free to use?',
    answer:
      'Yes, LawBridge is completely free to use. Our mission is to make legal information accessible to everyone, regardless of their financial situation. We believe that understanding your legal rights should not be a luxury.',
  },
  {
    question: 'Is LawBridge a law firm? Can it give me legal advice?',
    answer:
      'No, LawBridge is not a law firm and does not provide legal advice. We provide general legal information for educational purposes only. Our responses do not create an attorney-client relationship. For specific legal matters, you should always consult with a licensed attorney in your jurisdiction who can evaluate your individual circumstances.',
  },
  {
    question: 'How accurate are the answers?',
    answer:
      'LawBridge uses Retrieval-Augmented Generation (RAG) to ground all answers in authoritative legal sources. This significantly reduces AI "hallucinations" and ensures our responses are based on real legal documents. However, the law is complex and varies by jurisdiction, so our answers are meant as a starting point for understanding, not as definitive legal guidance.',
  },
  {
    question: 'What sources does LawBridge use?',
    answer:
      'We search through authoritative legal databases including government resources (HUD, DOL, EEOC, etc.), established legal information providers, court records, and academic legal resources. Every answer includes citations so you can verify the information and explore further.',
  },
  {
    question: 'Can I use LawBridge answers in court?',
    answer:
      'No. LawBridge provides general information to help you understand legal concepts, but it should not be used as evidence or legal authority in court proceedings. If you have a legal matter requiring court action, you should work with a licensed attorney who can properly represent your interests.',
  },
  {
    question: 'Does LawBridge cover all areas of law?',
    answer:
      'We cover many common legal areas including tenant rights, employment law, consumer protection, family law, small claims, traffic law, immigration basics, and business law. However, some specialized areas (like patent law or complex litigation) may be outside our scope. If your question falls outside our coverage, we\'ll let you know.',
  },
  {
    question: 'Is my question and data private?',
    answer:
      'We take privacy seriously. Questions are processed to generate answers but we do not sell your data to third parties. We may use anonymized, aggregated data to improve our service. For complete details, please see our Privacy Policy.',
  },
  {
    question: 'Does LawBridge work for laws outside the United States?',
    answer:
      'LawBridge is primarily focused on U.S. law. While some general legal concepts may apply internationally, specific laws, procedures, and rights vary significantly by country. If you have questions about law in another country, we recommend seeking resources specific to that jurisdiction.',
  },
  {
    question: 'How do I know which source to trust?',
    answer:
      'We prioritize official government sources (like .gov websites) and established legal authorities. Each citation includes a link so you can visit the original source. Government and educational (.edu) sources are generally most reliable. When in doubt, consult with a licensed attorney.',
  },
  {
    question: 'What should I do if I have a legal emergency?',
    answer:
      'If you\'re facing a legal emergency (impending eviction, arrest, restraining order, etc.), please contact a licensed attorney immediately. Many areas have legal aid organizations that provide free or low-cost help. You can also contact your local bar association for attorney referrals. For immediate danger, call 911.',
  },
  {
    question: 'Can I ask follow-up questions?',
    answer:
      'Currently, each search is independent - we don\'t maintain conversation history between questions. For best results, include all relevant details in each question. We\'re working on features that may allow for follow-up questions in the future.',
  },
  {
    question: 'How can I report an issue or provide feedback?',
    answer:
      'We appreciate your feedback! If you encounter any issues or have suggestions for improvement, please reach out through our contact form. Your input helps us make LawBridge better for everyone.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-full bg-[#0a0a0f]">
      {/* Hero */}
      <section className="hero-dark grid-pattern py-20 relative overflow-hidden">
        <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-20 opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-6">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[#a0a0b8] max-w-2xl mx-auto">
            Everything you need to know about using LawBridge.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[#a0a0b8] mb-8">
            Can&apos;t find what you&apos;re looking for? Ask LawBridge directly!
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl text-lg"
          >
            <Sparkles className="w-5 h-5" />
            Ask a Question
          </Link>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group glass-card-dark rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer p-6 list-none hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus:bg-[rgba(16,185,129,0.05)] transition-colors">
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#6a6a80] flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-6 pb-6 pt-0">
        <p className="text-[#a0a0b8] leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}
