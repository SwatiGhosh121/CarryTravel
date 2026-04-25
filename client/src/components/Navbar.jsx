import { Link, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <FiBriefcase className="brand-icon" />
          CarryTravel
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/planner">Planner</Link></li>
          
          {userInfo ? (
            <>
              <li className="nav-user">Hi, {userInfo.name.split(' ')[0]}</li>
              <li>
                <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link-subtle">Login</Link></li>
              <li><Link to="/signup" className="btn btn-primary">Get Started</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
