import React, { useEffect, useState } from "react";
import "./ManageUser.css"
import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers, deleteUser } from "../Services/Actions/userAction"; // Adjust the path based on your project structure
import Loader from "../components/Loading"; // A loader component if you have one
// import Message from '../components/Message'; // A message component for error/success messages

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin); // Assuming adminReducer is used for state management

  const [selectedUser, setSelectedUser] = useState(null);
  

  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return <div className="manage-user">
  {loading && <Loader />}
 <h1>Manage Users</h1>
 {users && users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.createdAt}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        {/* <Message variant="info">No users found.</Message> */}
      )}


      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>ID:</strong> {selectedUser._id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          {/* Add more user details if needed */}
          <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
            Close
          </button>
        </div>
      )}
  </div>;
};

export default ManageUser;
