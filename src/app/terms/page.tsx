export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using MindMate, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of MindMate for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-xl font-semibold mb-4">3. Privacy</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of MindMate.
            </p>

            <h2 className="text-xl font-semibold mb-4">4. User Account</h2>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Health Disclaimer</h2>
            <p className="mb-4">
              MindMate is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
            </p>

            <h2 className="text-xl font-semibold mb-4">6. Data Storage</h2>
            <p className="mb-4">
              Your mood tracking data is stored securely and is only accessible to you. We use industry-standard security measures to protect your information.
            </p>

            <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes.
            </p>

            <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact us through the support page.
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 