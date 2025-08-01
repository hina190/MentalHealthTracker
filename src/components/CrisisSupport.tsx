import React from 'react';

const CrisisSupport: React.FC = () => (
  <div style={{ background: '#ffe5e5', padding: 16, borderRadius: 8, margin: '24px 0' }}>
    <h3>Need Help Now?</h3>
    <p>
      If you are in crisis or need immediate support, please contact:
      <br />
      <b>National Helpline:</b> <a href="tel:1-800-662-HELP">1-800-662-HELP</a>
      <br />
      <b>Text:</b> <a href="sms:741741">741741</a> (Text HOME to 741741)
      <br />
      <b>Emergency:</b> Call 911 or your local emergency number.
    </p>
  </div>
);

export default CrisisSupport;