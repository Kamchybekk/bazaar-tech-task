import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default LoadingSpinner;

const LoadingContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
`;
