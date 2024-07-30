import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, applyGig } from "../Services/Actions/gigsActions.js"; // Adjust the import path as necessary
import "./AvailableGigs.css";

const AvailableGigs = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const { gigs, successMessage } = useSelector((state) => ({
    gigs: state.gig.gigs, // Adjust state path as necessary
    successMessage: state.gig.successMessage // Assuming this is where the success message is stored
  }));

  const handleApply = (gigId) => {
    dispatch(applyGig(gigId))
      .then(() => {
        setMessage("Application submitted successfully!");
      })
      .catch((error) => {
        setMessage("Error applying for the gig. Please try again.");
      });
  };

  return (
    <div className="available-gigs">
      <h2>Available Studies</h2>
      <div className="gig-list">
        {gigs && gigs.length > 0 ? (
          gigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <h3 className="gig-title">{gig.title}</h3>
              <p className="gig-description">{gig.description}</p>
              <div className="gig-details">
                <span className="gig-location">Budget: {gig.budget}</span>
                <span className="gig-date">Deadline: {gig.deadline}</span>
              </div>
              <button className="apply-button" onClick={() => handleApply(gig._id)}>
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <div>No gigs available</div>
        )}
      </div>
      {message && <div className="status-message">{message}</div>}
    </div>
  );
};

export default AvailableGigs;
