import React from 'react';
import "../App.css"

const Loading = () => {
  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true"></div>
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default Loading;
