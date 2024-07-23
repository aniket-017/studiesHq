import React from 'react';
import "./MyGigs.css";

const MyGigs = () => {
  const gigsAllocated = [
    { id: 1, title: "Web Development", description: "Build a responsive website." },
    { id: 2, title: "Data Analysis", description: "Analyze sales data for Q1." },
  ];

  const gigsApplied = [
    { id: 1, title: "Graphic Design", description: "Create a logo for a startup." },
    { id: 2, title: "SEO Optimization", description: "Improve search rankings for a blog." },
  ];

  const gigsCompleted = [
    { id: 1, title: "Content Writing", description: "Write articles for a tech blog." },
    { id: 2, title: "App Development", description: "Develop a mobile app for e-commerce." },
  ];

  return (
    <div className='my-gigs'>
      <h1>My Gigs</h1>
      <div className='gigs-section'>
        <h2>Gigs Allocated</h2>
        <ul>
          {gigsAllocated.map(gig => (
            <li key={gig.id}>
              <h3>{gig.title}</h3>
              <p>{gig.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='gigs-section'>
        <h2>Gigs Applied</h2>
        <ul>
          {gigsApplied.map(gig => (
            <li key={gig.id}>
              <h3>{gig.title}</h3>
              <p>{gig.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='gigs-section'>
        <h2>Gigs Completed</h2>
        <ul>
          {gigsCompleted.map(gig => (
            <li key={gig.id}>
              <h3>{gig.title}</h3>
              <p>{gig.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyGigs;
