import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
