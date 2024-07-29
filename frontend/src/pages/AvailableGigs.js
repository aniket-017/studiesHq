import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, applyGig } from "../Services/Actions/gigsActions.js"; // Adjust the import path as necessary
import "./AvailableGigs.css";

const AvailableGigs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const gigs = useSelector((state) => state.gig.gigs); // Adjust state path as necessary

  const handleApply = (gigId) => {
    dispatch(applyGig(gigId));
  };

  return (
    <div className="available-gigs">
      <h2>Available Gigs</h2>
      <div className="gig-list">
      {gigs && gigs.length > 0 ? (gigs.map((gig) => (
          <div key={gig._id} className="gig-card">
            <h3 className="gig-title">{gig.title}</h3>
            <p className="gig-description">{gig.description}</p>
       <div className="gig-details">
              {/* <span className="gig-company">{gig.companyName}</span> */}
              <span className="gig-location">budget: {gig.budget}</span>
              <span className="gig-date">deadline: {gig.deadline}</span>
          </div>
        {/* <div className="gig-skills">
              {gig.skills.map((skill, index) => (
                <span key={index} className="gig-skill">{skill}</span>
              ))}
            </div>  */}
        <button className="apply-button" onClick={() => handleApply(gig._id)}>Apply Now</button>
          </div>
        ))): (
        <div>No gigs available</div>
      )}
      </div>
    </div>
  );
};

export default AvailableGigs;
