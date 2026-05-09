import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.main}>
        {children}
      </main>
      <footer style={styles.footer}>
        <p>© 2024 回忆录 - 用藤蔓记录美好时光</p>
      </footer>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    backgroundColor: '#F5F5F5',
    borderTop: '1px solid #E0E0E0',
    padding: '16px 24px',
    textAlign: 'center',
    color: '#666',
    fontSize: '14px'
  }
};

export default Layout;