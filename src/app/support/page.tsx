export default function SupportPage() {
  return (
    <div className="max-w-4xl my-20 mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-12 text-center tracking-tight">
        Support Center
      </h1>

      <div className="space-y-14">
        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6 border-b-4 border-indigo-400 pb-2 tracking-wide">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "How do I track my mood?",
                answer:
                  "Navigate to the Log Mood page and select an emoji that best represents your current mood. You can also add a note to provide more context about your feelings.",
              },
              {
                question: "How can I view my mood history?",
                answer:
                  "Visit the Dashboard to see a visual chart of your mood over time. This helps you identify patterns and trends in your emotional well-being.",
              },
              {
                question: "Is my data secure?",
                answer:
                  "Yes, your data is encrypted and stored securely. We never share your personal information with third parties, and you have complete control over your data.",
              },
              {
                question: "Can I export my data?",
                answer:
                  "Currently, data export functionality is not available, but we are working on adding this feature. You can always access your data through the dashboard.",
              },
            ].map(({ question, answer }, idx) => (
              <div
                key={idx}
                className="rounded-lg p-6 border border-indigo-200 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-indigo-900 mb-3 text-lg">
                  {question}
                </h3>
                <p className="text-indigo-700 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6 border-b-4 border-indigo-400 pb-2 tracking-wide">
            Getting Started
          </h2>

          <div className="border border-indigo-300 rounded-lg p-8 shadow-sm">
            <h3 className="font-semibold text-indigo-900 mb-5 text-xl tracking-wide">
              Quick Start Guide
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-indigo-800 leading-relaxed">
              <li>Create an account or log in to your existing account</li>
              <li>Navigate to the Log Mood page</li>
              <li>Select an emoji that represents your current mood</li>
              <li>Add an optional note about your feelings</li>
              <li>Submit your mood entry</li>
              <li>Visit the Dashboard to view your mood history and trends</li>
            </ol>
          </div>
        </section>

        {/* Need More Help */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6 border-b-4 border-indigo-400 pb-2 tracking-wide">
            Need More Help?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Email Support",
                desc: "Get help via email",
                href: "/contact",
                linkText: "Contact Us →",
              },
              {
                title: "Documentation",
                desc: "Read our detailed guides",
                href: "/about",
                linkText: "Learn More →",
              },
            ].map(({ title, desc, href, linkText }, idx) => (
              <div
                key={idx}
                className="rounded-lg p-6 border border-indigo-200 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-indigo-900 mb-3 text-lg">
                  {title}
                </h3>
                <p className="text-indigo-700 mb-4 leading-relaxed">{desc}</p>
                <a
                  href={href}
                  className="inline-block text-indigo-600 font-semibold hover:text-indigo-900 transition duration-200"
                >
                  {linkText}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
