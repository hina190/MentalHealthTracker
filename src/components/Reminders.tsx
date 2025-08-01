import React from "react";

const resources = [
  {
    title: "Coping with Stress",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/",
  },
  {
    title: "Breathing Exercises",
    url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
  },
  {
    title: "Guided Meditation",
    url: "https://www.headspace.com/meditation/guided-meditation",
  },
  {
    title: "Mental Health Helplines",
    url: "https://www.mentalhealth.org.uk/explore-mental-health/get-help",
  },
];

const ResourceLibrary: React.FC = () => (
  <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg font-sans">
    <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
      📚 Resource Library
    </h2>
    <ul className="space-y-4">
      {resources.map((res, idx) => (
        <li key={idx}>
          <a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full px-5 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-between"
          >
            {res.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 3h7m0 0v7m0-7L10 14"
              />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default ResourceLibrary;
