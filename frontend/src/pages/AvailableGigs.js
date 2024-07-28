import React from 'react';
import './AvailableGigs.css';

const AvailableGigs = () => {
  const gigs = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Build websites using React and Node.js',
      postedDate: '2023-07-01',
      location: 'Remote',
      companyName: 'Tech Corp',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
    {
      id: 2,
      title: 'Graphic Design',
      description: 'Create logos and branding materials',
      postedDate: '2023-07-02',
      location: 'New York, NY',
      companyName: 'Design Studio',
      skills: ['Photoshop', 'Illustrator', 'Creativity'],
    },
    {
      id: 3,
      title: 'Content Writing',
      description: 'Write articles and blog posts',
      postedDate: '2023-07-03',
      location: 'Remote',
      companyName: 'Content Creators Inc.',
      skills: ['Writing', 'SEO', 'Creativity'],
    },
    // Add more gigs as needed
  ];

  return (
    <div className="available-gigs">
      <h2>Available Gigs</h2>
      <div className="gig-list">
        {gigs.map(gig => (
          <div key={gig.id} className="gig-card">
            <h3 className="gig-title">{gig.title}</h3>
            <p className="gig-description">{gig.description}</p>
            <div className="gig-details">
              <span className="gig-company">{gig.companyName}</span>
              <span className="gig-location">{gig.location}</span>
              <span className="gig-date">Posted on: {gig.postedDate}</span>
            </div>
            <div className="gig-skills">
              {gig.skills.map((skill, index) => (
                <span key={index} className="gig-skill">{skill}</span>
              ))}
            </div>
            <button className="apply-button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableGigs;
