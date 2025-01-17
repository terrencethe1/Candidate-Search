import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-container" style={{ marginTop: '20px' }}> {/* Adjust the value as needed */}
          <Link to="/">Home </Link>
          <span className="spacer"></span>
          <Link to="/SavedCandidates">Potential Candidates</Link>
    </nav>
  );
};

export default Nav;
