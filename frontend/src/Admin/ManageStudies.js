import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Modal from "react-modal";
import "./ManageStudies.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ManageStudies = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", budget: "", deadline: "" });
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
        setLoading(false);
      } catch (error) {
        setError("Error fetching gigs");
        setLoading(false);
      }
    };

    fetchGigs();
  }, [token]);

  const generatePieData = (applicants) => {
    const statusCounts = {
      applied: 0,
      allocated: 0,
      completed: 0,
    };

    applicants.forEach((applicant) => {
      applicant.gigs.forEach((gigDetail) => {
        const status = gigDetail.status ? gigDetail.status.toLowerCase() : null;
        if (status && statusCounts[status] !== undefined) {
          statusCounts[status]++;
        }
      });
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCounts[status],
    }));
  };

  const handleEdit = (study) => {
    setSelectedStudy(study);
    setFormData({ title: study.title, description: study.description, budget: study.budget, deadline: study.deadline });
  };

  const handleDelete = async (studyId) => {
    if (window.confirm("Are you sure you want to delete this study?")) {
      try {
        await axios.delete(`/aak/l1/admin/gig/${studyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGigs(gigs.filter((gig) => gig._id !== studyId));
      } catch (error) {
        setError("Error deleting study");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      console.log(selectedStudy._id);

      const response = await axios.put(`/aak/l1/admin/gig/${selectedStudy._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs(gigs.map((gig) => (gig._id === selectedStudy._id ? response.data.gig : gig)));
      setSelectedStudy(null);

      window.location.reload();
    
    } catch (error) {
      setError("Error updating study");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setSelectedStudy(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="manage-studies">
      <h1>Manage Studies</h1>
      <Modal isOpen={!!selectedStudy} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
        <h2>Edit Study</h2>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Gift Card" />
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <div className="studies-list">
        {gigs.length === 0 ? (
          <p>No studies available</p>
        ) : (
          gigs.map((study) => (
            <div key={study._id} className="study-card">
              <h2>{study.title}</h2>
              <p>Description: {study.description}</p>
              <p>Gift Card: ${study.budget}</p>
              <p>Deadline: {study.deadline}</p>
              <div className="pie-chart-container">
                <PieChart width={400} height={400}>
                  <Pie
                    data={generatePieData(study.applicantsDetails)}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {generatePieData(study.applicantsDetails).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
              <div className="study-actions">
                <button onClick={() => handleEdit(study)}>Edit</button>
                <button onClick={() => handleDelete(study._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageStudies;
