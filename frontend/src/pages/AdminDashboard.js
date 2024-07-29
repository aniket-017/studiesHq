import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/aak/l1/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [token]);

  const approveGig = async (userId, gigId) => {
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
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                gigs: user.gigs.map((gig) =>
                  gig._id === gigId ? { ...gig, status: "allocated" } : gig
                ),
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error approving gig", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <div className="gig-list">
              {user.gigs.map((gig) => (
                <div key={gig._id} className="gig-card">
                  <h3>{gig.title}</h3>
                  <p>Status: {gig.status}</p>
                  {gig.status === "applied" && (
                    <button
                      onClick={() => approveGig(user._id, gig._id)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
