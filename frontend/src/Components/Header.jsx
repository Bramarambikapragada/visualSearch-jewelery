import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const visibleRoutes = ['/', '/profile', '/cart'];

  if (!visibleRoutes.includes(location.pathname)) return null;

  return (
    <header className="lux-header">
      <div className="lux-logo">✨ Elegance</div>
      <nav className="lux-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
