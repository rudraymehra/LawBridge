import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | LawBridge',
  description:
    'Learn about how LawBridge collects, uses, and protects your personal information when you use our AI legal assistant service.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-[#0a0a0f]">
      {/* Hero */}
      <section className="hero-dark grid-pattern py-16 relative overflow-hidden">
        <div className="orb orb-emerald w-[300px] h-[300px] -top-20 -right-20 opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#a0a0b8]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <PolicySection title="Introduction">
            <p>
              LawBridge (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              use our AI-powered legal information service.
            </p>
          </PolicySection>

          <PolicySection title="Information We Collect">
            <h4 className="text-white font-medium mb-2 mt-4">Information You Provide</h4>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0b8]">
              <li><strong className="text-white">Search Queries:</strong> The legal questions you submit to our service</li>
              <li><strong className="text-white">Account Information:</strong> If you create an account, we collect your email address and authentication details</li>
              <li><strong className="text-white">Feedback:</strong> Any feedback or communications you send us</li>
            </ul>

            <h4 className="text-white font-medium mb-2 mt-4">Automatically Collected Information</h4>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0b8]">
              <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our service</li>
              <li><strong className="text-white">Device Information:</strong> Browser type, operating system, and device identifiers</li>
              <li><strong className="text-white">Log Data:</strong> IP address, access times, and referring URLs</li>
              <li><strong className="text-white">Cookies:</strong> Small data files stored on your device to improve your experience</li>
            </ul>
          </PolicySection>

          <PolicySection title="How We Use Your Information">
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0b8]">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and respond to your legal questions</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Send service-related communications</li>
              <li>Protect against unauthorized access and legal liability</li>
              <li>Comply with legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection title="Information Sharing">
            <p className="mb-2">We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0b8]">
              <li><strong className="text-white">Service Providers:</strong> Third parties that help us operate our service</li>
              <li><strong className="text-white">AI Processing:</strong> Your questions are processed through AI services to generate responses</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental request</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </PolicySection>

          <PolicySection title="Data Security">
            <p>
              We implement appropriate technical and organizational measures to protect your information.
              However, no electronic transmission or storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </PolicySection>

          <PolicySection title="Your Rights">
            <p className="mb-2">Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0b8]">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </PolicySection>

          <PolicySection title="Cookies and Tracking">
            <p className="mb-4">
              We use cookies and similar technologies to analyze trends, track user movements, and
              gather demographic information. You can control cookies through your browser settings.
            </p>
            <p>
              We use Google Analytics to understand how users interact with our service. Google
              Analytics collects information anonymously and reports website trends.
            </p>
          </PolicySection>

          <PolicySection title="Children&apos;s Privacy">
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13.
            </p>
          </PolicySection>

          <PolicySection title="Contact Us">
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@lawbridge.app" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                privacy@lawbridge.app
              </a>
            </p>
          </PolicySection>
        </div>
      </section>
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card-dark rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="text-[#a0a0b8] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
