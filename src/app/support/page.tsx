export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Center</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">How do I track my mood?</h3>
              <p className="text-gray-600">
                Navigate to the "Log Mood" page and select an emoji that best represents your current mood. You can also add a note to provide more context about your feelings.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">How can I view my mood history?</h3>
              <p className="text-gray-600">
                Visit the Dashboard to see a visual chart of your mood over time. This helps you identify patterns and trends in your emotional well-being.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, your data is encrypted and stored securely. We never share your personal information with third parties, and you have complete control over your data.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Can I export my data?</h3>
              <p className="text-gray-600">
                Currently, data export functionality is not available, but we're working on adding this feature. You can always access your data through the dashboard.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Quick Start Guide</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Create an account or log in to your existing account</li>
              <li>Navigate to the "Log Mood" page</li>
              <li>Select an emoji that represents your current mood</li>
              <li>Add an optional note about your feelings</li>
              <li>Submit your mood entry</li>
              <li>Visit the Dashboard to view your mood history and trends</li>
            </ol>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need More Help?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-3">Get help via email</p>
              <a href="/contact" className="text-blue-600 hover:text-blue-500">
                Contact Us →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Documentation</h3>
              <p className="text-gray-600 mb-3">Read our detailed guides</p>
              <a href="/about" className="text-blue-600 hover:text-blue-500">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 