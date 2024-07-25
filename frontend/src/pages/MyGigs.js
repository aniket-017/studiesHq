import React, { useState } from 'react';
import './MyGigs.css';

const MyGigs = () => {
  const [activeSection, setActiveSection] = useState('allocated');

  const gigsAllocated = [
    { date: '2024-07-20', topic: 'Web Development', description: 'Building a responsive website.' },
    { date: '2024-07-21', topic: 'Data Analysis', description: 'Analyzing sales data.' },
  ];

  const gigsApplied = [
    { date: '2024-07-18', topic: 'Graphic Design', description: 'Creating marketing materials.' },
    { date: '2024-07-19', topic: 'SEO Optimization', description: 'Improving website SEO.' },
  ];

  const gigsCompleted = [
    { date: '2024-07-15', topic: 'Content Writing', description: 'Writing blog posts.' },
    { date: '2024-07-16', topic: 'App Development', description: 'Developing a mobile app.' },
  ];

  const renderTable = (data) => (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Topic</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((gig, index) => (
          <tr key={index}>
            <td>{gig.date}</td>
            <td>{gig.topic}</td>
            <td>{gig.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="my-gigs">
      <h1>My Gigs</h1>
      <div className="tabs">
        <button onClick={() => setActiveSection('allocated')} className={activeSection === 'allocated' ? 'active' : ''}>
          Gigs Allocated
        </button>
        <button onClick={() => setActiveSection('applied')} className={activeSection === 'applied' ? 'active' : ''}>
          Gigs Applied
        </button>
        <button onClick={() => setActiveSection('completed')} className={activeSection === 'completed' ? 'active' : ''}>
          Gigs Completed
        </button>
      </div>
      <div className="table-container">
        {activeSection === 'allocated' && renderTable(gigsAllocated)}
        {activeSection === 'applied' && renderTable(gigsApplied)}
        {activeSection === 'completed' && renderTable(gigsCompleted)}
      </div>
    </div>
  );
};

export default MyGigs;
