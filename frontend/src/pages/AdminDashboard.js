import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get("/aak/l1/admin/gigs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGigs(response.data.gigs || []);
        console.log(response.data.gigs);
        setLoading(false);
      } catch (error) {
        setError("Error fetching gigs");
        setLoading(false);
      }
    };

    fetchGigs();
  }, [token]);

  const approveGig = async (userId, gigId) => {
    console.log(userId, gigId);
    try {
      await axios.put(
        `/aak/l1/admin/gig/approve/${userId}/${gigId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update UI after approval
      // setGigs((prevGigs) =>
      //   prevGigs.map((gig) =>
      //     gig._id === gigId
      //       ? {
      //           ...gig,
      //           applicants: gig.applicants.map((applicant) =>
      //             applicant._id === userId
      //               ? {
      //                   ...applicant,
      //                   gigs: applicant.gigs.map((gigDetail) =>
      //                     gigDetail.gigId === gigId ? { ...gigDetail, status: "allocated" } : gigDetail
      //                   ),
      //                 }
      //               : applicant
      //           ),
      //         }
      //       : gig
      //   )
      // );
    } catch (error) {
      console.error("Error approving gig", error);
    }
  };

  const getStatus = (applicantGigs, gigId) => {
    const gigDetail = applicantGigs.find((gigDetail) => gigDetail.gigId === gigId);
    return gigDetail ? gigDetail.status : "Not Applied";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="gig-list">
        {gigs.length === 0 ? (
          <p>No gigs available</p>
        ) : (
          gigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <h2>{gig.title}</h2>
              <p>Description: {gig.description}</p>
              <p>Deadline: {gig.deadline}</p>
              <p>Budget: {gig.budget}</p>
              <div className="applicant-list">
                {gig.applicantsDetails && gig.applicantsDetails.length > 0 ? (
                  gig.applicantsDetails.map((applicant) => (
                    <div key={applicant._id} className="applicant-card">
                      <h3>{applicant.name}</h3>
                      <p>Email: {applicant.email}</p>
                      <p>Status: {getStatus(applicant.gigs, gig._id)}</p>
                      {getStatus(applicant.gigs, gig._id) === "applied" && (
                        <button onClick={() => approveGig(applicant._id, gig._id)}>Approve</button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No applicants</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
