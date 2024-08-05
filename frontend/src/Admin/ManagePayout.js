import React, { useEffect } from "react";
import "./ManagePayout.css";
import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers } from "../Services/Actions/userAction"; // Adjust the path based on your project structure
import Loader from "../components/Loading"; // A loader component if you have one
import axios from "axios"; // You need to install axios if you haven't

const ManagePayout = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin); // Assuming adminReducer is used for state management

  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  // Function to handle gift card approval
  const handleApproveGiftCard = async (userId, gigId) => {
    try {
      await axios.put(
        `/admin/gift-card/approve/${userId}/${gigId}`,
        {},
        {
          headers: {
            // Include any required headers, such as Authorization
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example, adjust as needed
          },
        }
      );
      alert("Gift card approved successfully!");
      // Optionally, dispatch an action to reload users or update the state
      dispatch(loadAllUsers());
    } catch (error) {
      console.error("Error approving gift card:", error);
      alert("Failed to approve gift card.");
    }
  };

  return (
    <div className="manage-user-payout">
      {loading && <Loader />}
      <h1>Manage Payout</h1>
      {users && users.length > 0 ? (
        <table className="user-payout-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Study Title</th>
              <th>Budget</th>
              <th>Study Status</th>
              <th>Payment Status</th>
              <th>Gift Card Option</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.flatMap((user) =>
              user.gigs.map((gig, index) => (
                <tr key={`${user._id}-${gig._id}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={user.gigs.length}>{user.name}</td>
                      <td rowSpan={user.gigs.length}>{user.email}</td>
                    </>
                  )}
                  <td>{gig.title}</td>

                  <td>${gig.budget}</td>
                  <td>{gig.status}</td>
                  <td
                    className={
                      gig.paymentStatus === "requested"
                        ? "status-requested"
                        : gig.paymentStatus === "approved"
                        ? "status-approved"
                        : "status-not-requested"
                    }
                  >
                    {gig.paymentStatus}
                  </td>

                  <td>
                    <select className="payment-select">
                      <option value="">None</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">MasterCard</option>
                    </select>
                  </td>
                  <td>
                    {gig.paymentStatus !== "approved" && (
                      <button className="btn btn-info" onClick={() => handleApproveGiftCard(user._id, gig._id)}>
                        Approve ${gig.budget}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ManagePayout;
