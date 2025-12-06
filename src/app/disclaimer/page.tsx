import { Metadata } from 'next';
import { AlertTriangle, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | LawBridge',
  description:
    'Important legal disclaimer about the use of LawBridge AI legal assistant. This service provides information only, not legal advice.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-full bg-[#0a0a0f]">
      {/* Hero */}
      <section className="hero-dark grid-pattern py-16 relative overflow-hidden">
        <div className="orb orb-amber w-[300px] h-[300px] -top-20 -right-20 opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Legal Disclaimer
          </h1>
          <p className="text-xl text-[#a0a0b8]">
            Please read this important information before using LawBridge.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Disclaimer Box */}
          <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-4">
              LawBridge Is Not a Law Firm
            </h2>
            <div className="space-y-4 text-amber-200/90">
              <p className="text-lg font-medium">
                LawBridge provides general legal information for educational purposes only.
                This service does NOT constitute legal advice and should NOT be relied upon
                as such.
              </p>
              <p>
                Using LawBridge does NOT create an attorney-client relationship between you
                and LawBridge, its operators, or any third party.
              </p>
            </div>
          </div>

          <DisclaimerSection title="What LawBridge Is">
            <p>
              LawBridge is an AI-powered information service that helps users understand general
              legal concepts and find relevant legal resources. We use artificial intelligence
              to search legal databases and provide plain-language explanations of legal topics.
            </p>
          </DisclaimerSection>

          <DisclaimerSection title="What LawBridge Is NOT">
            <ul className="space-y-2 text-[#a0a0b8]">
              <li><strong className="text-white">• Not a law firm</strong> - We do not practice law</li>
              <li><strong className="text-white">• Not a lawyer</strong> - We cannot represent you in legal matters</li>
              <li><strong className="text-white">• Not legal advice</strong> - Our information is general in nature</li>
              <li><strong className="text-white">• Not a substitute for professional counsel</strong> - Always consult an attorney</li>
            </ul>
          </DisclaimerSection>

          <DisclaimerSection title="Limitations of AI-Generated Content">
            <ul className="space-y-1 text-[#a0a0b8]">
              <li>• AI can make mistakes and provide incorrect or incomplete information</li>
              <li>• Laws change frequently, and information may be outdated</li>
              <li>• Laws vary significantly by jurisdiction (state, county, city)</li>
              <li>• General information cannot account for your specific circumstances</li>
              <li>• Complex legal matters require professional analysis</li>
            </ul>
          </DisclaimerSection>

          <DisclaimerSection title="When to Consult a Lawyer">
            <p className="mb-2">You should consult with a licensed attorney when:</p>
            <ul className="space-y-1 text-[#a0a0b8]">
              <li>• You are involved in or considering litigation</li>
              <li>• You need to draft or review legal documents</li>
              <li>• You are facing criminal charges</li>
              <li>• You have a dispute involving significant money or property</li>
              <li>• Time limits (statutes of limitations) may apply</li>
            </ul>
          </DisclaimerSection>

          <DisclaimerSection title="Finding Legal Help">
            <p className="mb-2">If you need legal assistance but cannot afford a private attorney:</p>
            <ul className="space-y-1 text-[#a0a0b8]">
              <li><strong className="text-white">• Legal Aid:</strong> Free help for qualifying individuals</li>
              <li><strong className="text-white">• Law School Clinics:</strong> Free legal clinics at law schools</li>
              <li><strong className="text-white">• Bar Association Referrals:</strong> Attorney referral services</li>
              <li><strong className="text-white">• Pro Bono Services:</strong> Volunteer attorney services</li>
              <li><strong className="text-white">• Court Self-Help Centers:</strong> Resources for self-representation</li>
            </ul>
          </DisclaimerSection>

          {/* Emergency Box */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-red-300">Emergency Situations</h3>
            </div>
            <p className="text-red-200/80 mb-3">
              If you are experiencing a legal emergency (arrest, eviction, domestic violence, etc.):
            </p>
            <ul className="space-y-1 text-red-200/80">
              <li>• Emergency services: <strong className="text-red-300">911</strong></li>
              <li>• A licensed attorney in your area</li>
              <li>• Your local legal aid organization</li>
              <li>• The court clerk&apos;s office for urgent procedural questions</li>
            </ul>
          </div>

          <DisclaimerSection title="Contact">
            <p>
              If you have questions about this disclaimer, please contact us at:
              <br />
              <a href="mailto:legal@lawbridge.app" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                legal@lawbridge.app
              </a>
            </p>
          </DisclaimerSection>
        </div>
      </section>
    </div>
  );
}

function DisclaimerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card-dark rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="text-[#a0a0b8] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
