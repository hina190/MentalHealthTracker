export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto my-20 px-6 py-12 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-10 text-center">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left info panel */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b-2 border-indigo-300 pb-2">
            Get in Touch
          </h2>
          <p className="text-indigo-700 mb-8 leading-relaxed">
            Have questions, feedback, or need support? We&apos;d love to hear
            from you. Reach out to us through any of the channels below.
          </p>

          <div className="space-y-6 text-indigo-700">
            <div>
              <h3 className="font-semibold text-lg mb-1">📧 Email</h3>
              <p className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                support@mindmate.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">⏱ Response Time</h3>
              <p>We typically respond within 24 hours</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">🕒 Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>

        {/* Right contact form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-6 border-b-2 border-indigo-300 pb-2">
            Contact Form
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                placeholder="Tell us more..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
