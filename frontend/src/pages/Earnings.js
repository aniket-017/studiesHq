import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Earnings.css';

const Earnings = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const gigs = useSelector((state) => state.user.user.gigs);
  const completedGigs = gigs.filter((gig) => gig.status === 'completed');

  const handleRequestGiftCard = async (gigId) => {
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`/aak/l1/gig/${gigId}/request-gift-card`);
      setMessage('Gift card request submitted successfully!');
    } catch (error) {
      console.error('Error submitting gift card request', error);
      setMessage('Error submitting gift card request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="earnings-page">
      <h2>Request Gift Card</h2>
      <div className="completed-gigs">
        <h3>Your Completed Gigs</h3>
        <div className='request-giftcards'>
          {completedGigs.length > 0 ? (
            completedGigs.map((gig) => (
              <div className="completedgiftcard" key={gig._id}>
                <h3>{gig.title}</h3>
                <div>Allocated date: {formatDate(gig.allocatedAt)}</div>  
                <div>Completed date: {formatDate(gig.completedAt)}</div>  
                
                <button
                  onClick={() => handleRequestGiftCard(gig._id)}
                  className="request-button"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : `Request Gift Card of $${gig.budget}`}
                </button>
              </div>
            ))
          ) : (
            <p>No completed gigs available</p>
          )}
        </div>
        {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Earnings;
