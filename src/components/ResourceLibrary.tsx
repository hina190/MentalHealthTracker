import React from 'react';

const resources = [
  { title: 'Coping with Stress', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/' },
  { title: 'Breathing Exercises', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/' },
  { title: 'Guided Meditation', url: 'https://www.headspace.com/meditation/guided-meditation' },
  { title: 'Mental Health Helplines', url: 'https://www.mentalhealth.org.uk/explore-mental-health/get-help' },
];

const ResourceLibrary: React.FC = () => (
  <div>
    <h2>Resource Library</h2>
    <ul>
      {resources.map((res, idx) => (
        <li key={idx}>
          <a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default ResourceLibrary;