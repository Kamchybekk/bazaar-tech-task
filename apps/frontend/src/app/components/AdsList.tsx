'use client';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  Grid,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdCard from './UI/Card';
import { Ad } from './UI/typesCard';

interface AdResponse {
  page: number;
  pageSize: number;
  results: Ad[];
  total: number;
}

interface Filters {
  minPrice: string;
  maxPrice: string;
  search: string;
  city: string;
  district: string;
}

const Index = () => {
  const [ads, setAds] = useState<AdResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    minPrice: '',
    maxPrice: '',
    search: '',
    city: '',
    district: '',
  });

  const handleFilterChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const name = event.target.name as keyof Filters;
    const value = event.target.value as string;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<AdResponse>(`/api/ads`);
      setAds(data);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
      toast.error('Failed to fetch ads. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div>
      <ToastContainer />
      <BlockFieldsForFilter>
        <TextField
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          label="Min price"
          type="number"
          size="small"
        />
        <TextField
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          label="Max price"
          type="number"
          size="small"
        />
        <FormControl fullWidth>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            name="city"
            value={filters.city}
            label="City"
            onChange={handleFilterChange}
            size="small"
          >
            <MenuItem value="City1">City1</MenuItem>
            <MenuItem value="City2">City2</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          label="District"
          size="small"
        />
        <TextField
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          label="Search"
          size="small"
        />
        <Button onClick={fetchAds}>Apply Filters</Button>
      </BlockFieldsForFilter>

      <Box alignContent="center">
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <Container>
            {ads?.results?.map((ad: Ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <AdCard ad={ad} />
              </Grid>
            ))}
          </Container>
        )}
      </Box>
    </div>
  );
};

export default Index;

const Container = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 50px 0;
  gap: 35px;
`;
const LoadingContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
  padding: 50px;
`;

const BlockFieldsForFilter = styled('div')`
  display: flex;
  flex-direction: column;
`;
