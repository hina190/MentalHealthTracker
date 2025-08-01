'use client';

import React, { useState } from 'react';

const PersonalizedTips: React.FC = () => {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    const res = await fetch('/api/tips', { method: 'POST' });
    const data = await res.json();
    setTip(data.tip);
    setLoading(false);
  };

  return (
    <div>
      <h2>Personalized Tips</h2>
      <button onClick={getTip} disabled={loading}>
        {loading ? 'Loading...' : 'Get a Tip'}
      </button>
      {tip && <p style={{ marginTop: 12 }}>{tip}</p>}
    </div>
  );
};

export default PersonalizedTips;