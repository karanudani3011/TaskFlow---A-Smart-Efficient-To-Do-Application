import React from 'react';

export const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.text}>
        Welcome to the TODO Application! Our goal is to help you manage tasks efficiently and stay organized. 
        Whether you're a student, a professional, or just someone who likes to keep things in order, this app is for you!
      </p>
      <p style={styles.text}>
        Built with React, this app offers a seamless experience for adding, updating, and tracking your daily tasks. 
        Stay productive and never miss a deadline!
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2a5298',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.6',
  },
};

export default AboutUs;
