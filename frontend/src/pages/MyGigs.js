import React, { useState } from 'react';
import './MyGigs.css';

const MyGigs = () => {
  const [activeTab, setActiveTab] = useState('allocated');

  const allocatedGigs = [
    { id: 1, title: 'Web Development', description: 'Ongoing project for building a corporate website' },
    { id: 2, title: 'Mobile App Design', description: 'Designing UI for a new mobile application' },
  ];

  const completedGigs = [
    { id: 3, title: 'Graphic Design', description: 'Completed branding materials for a startup' },
    { id: 4, title: 'SEO Optimization', description: 'Improved search rankings for a client website' },
  ];

  const appliedGigs = [
    { id: 5, title: 'Content Writing', description: 'Applied for writing articles for a tech blog' },
    { id: 6, title: 'Data Analysis', description: 'Applied for analyzing sales data for a retail company' },
  ];

  const renderGigs = (gigs) => (
    gigs.map(gig => (
      <div key={gig.id} className="mygigs-gig-card">
        <h3 className="mygigs-gig-title">{gig.title}</h3>
        <p className="mygigs-gig-description">{gig.description}</p>
      </div>
    ))
  );

  return (
    <div className="mygigs-container">
      <h2>My Gigs</h2>
      <div className="mygigs-tabs">
        <button
          className={activeTab === 'allocated' ? 'mygigs-active' : ''}
          onClick={() => setActiveTab('allocated')}
        >
          Allocated Gigs
        </button>
        <button
          className={activeTab === 'completed' ? 'mygigs-active' : ''}
          onClick={() => setActiveTab('completed')}
        >
          Completed Gigs
        </button>
        <button
          className={activeTab === 'applied' ? 'mygigs-active' : ''}
          onClick={() => setActiveTab('applied')}
        >
          Applied Gigs
        </button>
      </div>
      <div className="mygigs-gigs-content">
        {activeTab === 'allocated' && renderGigs(allocatedGigs)}
        {activeTab === 'completed' && renderGigs(completedGigs)}
        {activeTab === 'applied' && renderGigs(appliedGigs)}
      </div>
    </div>
  );
};

export default MyGigs;
