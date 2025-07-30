export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About MindMate</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          MindMate is a comprehensive mental health tracking application designed to help you monitor and understand your emotional well-being over time.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We believe that mental health is just as important as physical health. Our mission is to provide you with the tools and insights you need to track your mood patterns, identify triggers, and make informed decisions about your mental well-being.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Daily mood tracking with intuitive emoji-based interface</li>
          <li>Detailed mood history and trends visualization</li>
          <li>Secure and private data storage</li>
          <li>Personalized insights and patterns</li>
          <li>Easy-to-use dashboard</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy & Security</h2>
        <p className="text-gray-600 mb-6">
          Your privacy is our top priority. All your data is encrypted and stored securely. We never share your personal information with third parties, and you have complete control over your data.
        </p>
      </div>
    </div>
  )
} 