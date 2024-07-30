import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Earnings.css';

const Earnings = () => {
  const [selectedGigs, setSelectedGigs] = useState(new Set());
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const gigs = useSelector((state) => state.user.user.gigs);
  const completedGigs = gigs.filter((gig) => gig.status === 'completed');

  const toggleGigSelection = (gigId, budget) => {
    const updatedSelectedGigs = new Set(selectedGigs);
    if (updatedSelectedGigs.has(gigId)) {
      updatedSelectedGigs.delete(gigId);
    } else {
      updatedSelectedGigs.add(gigId);
    }

    setSelectedGigs(updatedSelectedGigs);
    updateTotalAmount(updatedSelectedGigs);
  };

  const updateTotalAmount = (selectedGigs) => {
    const totalAmount = Array.from(selectedGigs).reduce((total, gigId) => {
      const gig = completedGigs.find((gig) => gig._id === gigId);
      return total + (gig ? parseFloat(gig.budget) : 0);
    }, 0);

    setAmount(totalAmount);
  };

  const handleRequestPayment = async () => {
    if (selectedGigs.size === 0 || amount <= 0) {
      setMessage('Please select at least one gig and enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post('/aak/l1/user/request-payment', {
        gigIds: Array.from(selectedGigs),
        amount,
      });
      setMessage('Payment request submitted successfully!');
    } catch (error) {
      console.error('Error submitting payment request', error);
      setMessage('Error submitting payment request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="earnings-page">
      <h1>Request Earnings</h1>
      <div className="completed-gigs">
        <h2>Your Completed Gigs</h2>
        <ul>
          {completedGigs.length > 0 ? (
            completedGigs.map((gig) => (
              <li key={gig._id}>
                {gig.title} - ${gig.budget}
                <button
                  onClick={() => toggleGigSelection(gig._id, gig.budget)}
                  className={`select-button ${selectedGigs.has(gig._id) ? 'selected' : ''}`}
                >
                  {selectedGigs.has(gig._id) ? 'Selected' : 'Select'}
                </button>
              </li>
            ))
          ) : (
            <p>No completed gigs available</p>
          )}
        </ul>
      </div>
      <div className="payment-request-form">
        <h2>Request Payment</h2>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            placeholder="Enter amount"
          />
        </label>
        <button
          onClick={handleRequestPayment}
          disabled={loading || selectedGigs.size === 0 || amount <= 0}
        >
          {loading ? 'Submitting...' : 'Request Payment'}
        </button>
        {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Earnings;
