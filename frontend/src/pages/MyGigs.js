import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./MyGigs.css";

const MyGigs = () => {
  const gigs = useSelector((state) => state.user.user.gigs);
  const [activeTab, setActiveTab] = useState("allocated");

  const allocatedGigs = gigs.filter(gig => gig.status === "allocated");
  const completedGigs = gigs.filter(gig => gig.status === "completed");
  const appliedGigs = gigs.filter(gig => gig.status === "applied");

  const renderGigs = (gigs) =>
    gigs.map((gig) => (
      <div key={gig._id} className="mygigs-gig-card">
        <h3 className="mygigs-gig-title">{gig.title}</h3>
        <p className="mygigs-gig-description">{gig.description}</p>
      </div>
    ));

  return (
    <div className="mygigs-container">
      <h2>My Gigs</h2>
      <div className="mygigs-tabs">
        <button className={activeTab === "allocated" ? "mygigs-active" : ""} onClick={() => setActiveTab("allocated")}>
          Allocated Gigs
        </button>
        <button className={activeTab === "completed" ? "mygigs-active" : ""} onClick={() => setActiveTab("completed")}>
          Completed Gigs
        </button>
        <button className={activeTab === "applied" ? "mygigs-active" : ""} onClick={() => setActiveTab("applied")}>
          Applied Gigs
        </button>
      </div>
      <div className="mygigs-gigs-content">
        {activeTab === "allocated" && renderGigs(allocatedGigs)}
        {activeTab === "completed" && renderGigs(completedGigs)}
        {activeTab === "applied" && renderGigs(appliedGigs)}
      </div>
    </div>
  );
};

export default MyGigs;
