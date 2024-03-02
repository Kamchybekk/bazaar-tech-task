'use client';

import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Button, Box } from '@mui/material';
import styles from './index.module.scss';
import AdsList from './components/AdsList';

const Index = () => {
  const [ads, setAds] = useState();

  const fetchAds = useCallback(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/ads?minPrice=1000000');
      setAds(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Box alignContent="center">
        <h1>And here it starts...</h1>
        <Button onClick={fetchAds} variant="outlined">
          Send an API request
        </Button>
      </Box>
      <AdsList ads={ads} />
    </div>
  );
};

export default Index;
