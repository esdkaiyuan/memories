import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🌿</span>
          <span style={styles.logoText}>回忆录</span>
        </Link>
        <nav style={styles.nav}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              ...(location.pathname === '/' ? styles.navLinkActive : {})
            }}
          >
            3D 视图
          </Link>
          <Link
            to="/manage"
            style={{
              ...styles.navLink,
              ...(location.pathname === '/manage' ? styles.navLinkActive : {})
            }}
          >
            管理回忆
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E0E0E0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#333'
  },
  logoIcon: {
    fontSize: '24px',
    marginRight: '8px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#4CAF50'
  },
  nav: {
    display: 'flex',
    gap: '24px'
  },
  navLink: {
    textDecoration: 'none',
    color: '#666',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  },
  navLinkActive: {
    color: '#4CAF50',
    backgroundColor: '#E8F5E9'
  }
};

export default Header;