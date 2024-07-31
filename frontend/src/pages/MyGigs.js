import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../Services/Actions/userAction";
import axios from "axios";
import "./MyGigs.css";

const MyGigs = () => {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.user.user.gigs);
  const token = useSelector((state) => state.user.token);
  const [activeTab, setActiveTab] = useState("applied");

  const allocatedGigs = gigs.filter((gig) => gig.status === "allocated");
  const completedGigs = gigs.filter((gig) => gig.status === "completed");
  const appliedGigs = gigs.filter((gig) => gig.status === "applied");

  console.log(appliedGigs);

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  const markAsCompleted = async (gigId) => {
    try {
      const response = await axios.put(
        `/aak/l1/gig/complete/${gigId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update UI after marking as completed
      dispatch({
        type: "UPDATE_GIG_STATUS",
        payload: {
          gigId,
          status: "completed",
        },
      });
    } catch (error) {
      console.error("Error marking gig as completed", error);
    }
  };

  const renderGigs = (gigs, isAllocated = false) =>
    gigs.map((gig) => (
      <div key={gig._id} className="mygigs-gig-card">
        <h3 className="mygigs-gig-title">{gig.title}</h3>
        <p className="mygigs-gig-description">{gig.description}</p>
        {isAllocated && (
          <button className="mygigs-complete-btn" onClick={() => markAsCompleted(gig.gigId)}>
            Mark as Completed
          </button>
        )}
      </div>
    ));

  return (
    <div className="mygigs-container">
      <h2>My Studies</h2>
      <div className="mygigs-tabs">
      <button className={activeTab === "applied" ? "mygigs-active" : ""} onClick={() => setActiveTab("applied")}>
          Applied Studies
        </button>
        <button className={activeTab === "allocated" ? "mygigs-active" : ""} onClick={() => setActiveTab("allocated")}>
          Allocated Studies
        </button>
        <button className={activeTab === "completed" ? "mygigs-active" : ""} onClick={() => setActiveTab("completed")}>
          Completed Studies
        </button>
       
      </div>
      <div className="mygigs-gigs-content">
        {activeTab === "allocated" && renderGigs(allocatedGigs, true)}
        {activeTab === "completed" && renderGigs(completedGigs)}
        {activeTab === "applied" && renderGigs(appliedGigs)}
      </div>
    </div>
  );
};

export default MyGigs;
