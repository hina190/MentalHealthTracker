"use client";
import React, { useState } from "react";

interface Resource {
  title: string;
  url: string;
  category: string;
}

const resources: Resource[] = [
  {
    title: "Coping with Stress",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/",
    category: "Stress",
  },
  {
    title: "Breathing Exercises",
    url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
    category: "Relaxation",
  },
  {
    title: "Guided Meditation",
    url: "https://www.headspace.com/meditation/guided-meditation",
    category: "Meditation",
  },
  {
    title: "Mental Health Helplines",
    url: "https://www.mentalhealth.org.uk/explore-mental-health/get-help",
    category: "Support",
  },
];

const categories = Array.from(new Set(resources.map((r) => r.category))).sort();

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? res.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg font-sans bg-white text-gray-900">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-indigo-600">
          📚 Resource Library
        </h2>
      </div>

      <input
        type="search"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Search resources"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`py-1 px-3 rounded-md font-semibold ${
            !selectedCategory
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-1 px-3 rounded-md font-semibold ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredResources.length === 0 ? (
        <p className="text-center text-gray-500">No resources found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredResources.map((res, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-4 rounded-lg shadow-md bg-indigo-50"
            >
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline-offset-2 hover:underline flex-1"
                aria-label={`Open resource: ${res.title}`}
              >
                {res.title}
              </a>
              <button
                onClick={() => copyToClipboard(res.url)}
                className="ml-4 py-1 px-3 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600"
                aria-label={`Copy link for ${res.title}`}
              >
                Copy Link
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceLibrary;
