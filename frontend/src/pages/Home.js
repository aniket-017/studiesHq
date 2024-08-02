import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, applyGig } from "../Services/Actions/gigsActions.js";
import { FaRegSmile, FaRegLightbulb, FaGift } from "react-icons/fa";
import "./Home.css";
import v1 from "../Assets/videos/1.mp4";
import browse from "../Assets/photos/web-browser.png"
import apply from "../Assets/photos/apply.png"
import complete from "../Assets/photos/complete.png"
import giftcard from "../Assets/photos/giftcard.png"
import easyaccess from "../Assets/photos/easyaccess.png"
import studies from "../Assets/photos/studies.png"
import participation from "../Assets/photos/participation.png"
import rewards from "../Assets/photos/rewards.png"

const Home = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const { gigs, successMessage } = useSelector((state) => ({
    gigs: state.gig.gigs, // Adjust state path as necessary
    successMessage: state.gig.successMessage, // Assuming this is where the success message is stored
  }));

  const handleApply = (gigId) => {
    dispatch(applyGig(gigId))
      .then(() => {
        setMessage("Application submitted successfully!");
      })
      .catch((error) => {
        setMessage("Error applying for the gig. Please try again.");
      });
  };

  return (
    <div className="home">
      <section className="hero">
        <video autoPlay loop muted className="background-video">
          {/* <source src="https://cdn.pixabay.com/video/2016/05/12/3179-166339018_tiny.mp4" type="video/mp4" /> */}
          <source src={v1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Welcome to StudiesHq</h1>
          <p>Apply for studies and earn gift cards</p>
          <button>Get Started</button>
        </div>
      </section>

      <section className="popular-gigs">

        <div className="available-gigs">
          <h2>Popular Studies</h2>
          <div className="gig-list">
            {gigs && gigs.length > 0 ? (
              gigs.map((gig) => (
                <div key={gig._id} className="gig-card">
                  <h3 className="gig-title">{gig.title}</h3>
                  <p className="gig-description">{gig.description}</p>
                  <div className="gig-details">
                    <span className="gig-location">Budget: {gig.budget}</span>
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
          {message && <div className="status-message">{message}</div>}
        </div>

        {/* Add cards for popular gigs here */}
      </section>

      <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <img src={browse} alt="Browse Studies" className="step-icon" />
          <h3>1. Browse Studies</h3>
          <p>Find studies that interest you</p>
        </div>
        <div className="step">
          <img src={apply} alt="Apply" className="step-icon" />
          <h3>2. Apply</h3>
          <p>Submit your application</p>
        </div>
        <div className="step">
          <img src={complete} alt="Complete" className="step-icon" />
          <h3>3. Complete the Studies</h3>
          <p>Finish the assigned tasks</p>
        </div>
        <div className="step">
          <img src={giftcard} alt="Earn" className="step-icon" />
          <h3>4. Earn</h3>
          <p>Receive gift cards for completed studies</p>
        </div>
      </div>
    </section>

    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonial-list">
        <div className="testimonial-card">
          <p className="testimonial-text">
            "StudiesHQ has completely transformed the way I participate in studies. The process is seamless, and I love earning gift cards!"
          </p>
          <p className="testimonial-author">- John Doe</p>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">
            "The variety of studies available is fantastic. I appreciate the ease of use and the rewards for my efforts."
          </p>
          <p className="testimonial-author">- Jane Smith</p>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">
            "Applying for studies and earning rewards has never been easier. StudiesHQ is a game-changer!"
          </p>
          <p className="testimonial-author">- Sarah Lee</p>
        </div>
      </div>
    </section>

    <section className="benefits">
      <h2>Benefits</h2>
      <ul>
        <li>
          <img src={easyaccess} alt="Easy to access" className="step-icon"/>
          <p>Easy to access</p>
        </li>
        <li>
          <img src={studies} alt="Variety of studies" className="step-icon"/>
          <p>Variety of studies</p>
        </li>
        <li>
          <img src={rewards} alt="Earn rewards" className="step-icon"/>
          <p>Earn rewards</p>
        </li>
        <li>
          <img src={participation} alt="Expert guidance" className="step-icon" />
          <p>Expert guidance</p>
        </li>
      </ul>
    </section>

      <section className="recent-gigs">
        <h2>Recent Studies</h2>
        {/* Add cards for recent gigs here */}
      </section>
    </div>
  );
};

export default Home;
