'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';
import AdsList from './components/AdsList';

const Index = () => {
  return (
    <div className={styles.container}>
      <ToastContainer />
      <AdsList />
    </div>
  );
};

export default Index;
