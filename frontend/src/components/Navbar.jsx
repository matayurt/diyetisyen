import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/Navbar.css';


const Navbar = ({user, setUser}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
    setIsOpen(false)
  }
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="navbar">
      <nav className="container">
        <div className="branding">
          <Link to="/" className="nav-branding">
            <img src="/img/dietteiz_logo.png" alt="logo" id="nav-img" />
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>ANASAYFA</Link>
          </li>
          <li className="nav-item">
            <Link to="/hakkimda" className="nav-link" onClick={closeMenu}>HAKKIMDA</Link>
          </li>
          <li className="nav-item">
            <Link to="/paketler" className="nav-link" onClick={closeMenu}>PAKETLER</Link>
          </li>
          <li className="nav-item">
            <Link to="/iletisim" className="nav-link" onClick={closeMenu}>İLETİŞİM</Link>
          </li>
          <li className="nav-item">
            <Link to="/sepet" className="nav-link" onClick={closeMenu}>SEPET</Link>
          </li>
          <li className="nav-item">
          {user && (
          <>
            {user.isAdmin && (
              <Link to="/admin" onClick={closeMenu} className='nav-link'>Admin Panel</Link>
            )}
          </>
        )}
        </li>

          {user ? (
        <>
        <li className='nav-item'>
          <span className='user-name'>{user.name}</span>
          <button onClick={logout} className='logout-btn'>Çıkış Yap</button>
        </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link to="/register" className="nav-link" onClick={closeMenu}>KAYIT OL</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={closeMenu}>GİRİŞ YAP</Link>
          </li>
        </>
      )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
