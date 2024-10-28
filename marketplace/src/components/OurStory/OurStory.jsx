import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurStory.css';
import Navbar from '../Navbar'; // Adjust the path as necessary
import Footer from '../Footer'; // Adjust the path as necessary

function OurStory() {
  return (
    <div className="our-story-container">
      <Navbar /> {/* Include the Navbar component */}

      <header className="text-center py-5 bg-light">
        <h1>Our Story</h1>
        <p className="lead">Learn more about who we are and what drives us.</p>
      </header>
      
      <section className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img src="mission.jpg" alt="Our Mission" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide top-quality products and services that make a positive impact on people’s lives. 
              We believe in innovation, integrity, and commitment to our customers.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img src="vision.jpg" alt="Our Vision" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 order-md-1">
            <h2>Our Vision</h2>
            <p>
              We envision a world where technology and human connection work hand-in-hand to create meaningful 
              experiences. Our vision guides every decision, pushing us to innovate and inspire.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="team.jpg" alt="Our Team" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h2>Meet the Team</h2>
            <p>
              Behind every great idea, there's a team of passionate individuals. Our team is dedicated, talented, and ready 
              to make a difference. Together, we bring our mission and vision to life.
            </p>
          </div>
        </div>
      </section>

      <Footer /> {/* Include the Footer component */}
    </div>
  );
}

export default OurStory;
