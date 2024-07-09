import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome to Credential Manager</h2>
      <Link to="/add-credential">
        <button>Add Credential</button>
      </Link>
      <Link to="/view-credentials">
        <button>View Credentials</button>
      </Link>
    </div>
  );
};

export default HomePage;
