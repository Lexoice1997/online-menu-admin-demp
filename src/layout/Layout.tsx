import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.header}>
        <Header />
      </div> */}
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      {/* <div className={styles.footer}>
        <Footer />
      </div> */}
    </div>
  );
}

export default Layout;
