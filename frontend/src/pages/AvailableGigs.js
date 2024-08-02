import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, applyGig } from "../Services/Actions/gigsActions.js"; // Adjust the import path as necessary
import Popup from "./Popup"; // Import the Popup component
import "./AvailableGigs.css";
import { loadUser } from "../Services/Actions/userAction.js";

const AvailableGigs = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const { gigs, successMessage } = useSelector((state) => ({
    gigs: state.gig.gigs, // Adjust state path as necessary
    successMessage: state.gig.successMessage, // Assuming this is where the success message is stored
  }));

  const userGigs = useSelector((state) => state.user.user.gigs);

  // Filter out gigs that the user has applied to, allocated, or completed
  const filteredGigs = gigs.filter((gig) => !userGigs.some((userGig) => userGig.gigId === gig._id));

  const handleApply = (gigId) => {
    dispatch(applyGig(gigId))
      .then(() => {
        setMessage("Application submitted successfully! Go to 'My Studies' page and refresh the page.");
        setShowPopup(true);
      })
      .catch((error) => {
        setMessage("Error applying for the gig. Please try again.");
        setShowPopup(true);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    dispatch(loadUser());
  };

  return (
    <div className="available-gigs">
      <h2>Available Studies</h2>
      <div className="gig-list">
        {filteredGigs && filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <h3 className="gig-title">{gig.title}</h3>
              <p className="gig-description">{gig.description}</p>
              <div className="gig-details">
                <span className="gig-location">Gift Card ${gig.budget}</span>
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
      {showPopup && <Popup message={message} onClose={handleClosePopup} />}
    </div>
  );
};

export default AvailableGigs;
