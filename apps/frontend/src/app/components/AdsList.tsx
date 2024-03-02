'use client';
import axios from 'axios';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  debounce,
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
  minPrice: string | null;
  maxPrice: string | null;
  search: string | null;
  city: string | null;
  district: string | null;
}

const cities = [
  {
    label: 'Krabi',
    value: 'Krabi',
  },
  {
    label: 'Pangan',
    value: 'Pangan',
  },
  {
    label: 'Pattaya',
    value: 'Pattaya',
  },
  {
    label: 'Phuket',
    value: 'Phuket',
  },
  {
    label: 'Samui',
    value: 'Samui',
  },
];

const Index = () => {
  const [ads, setAds] = useState<AdResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    minPrice: null,
    maxPrice: null,
    search: null,
    city: null,
    district: null,
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

  const fetchAds = async (filters: Filters) => {
    console.log('DONE FETCH ADS');
    setIsLoading(true);
    try {
      const { data } = await axios.get<AdResponse>(`/api/ads`, {
        params: {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          city: filters.city === 'All' ? null : filters.city,
          district: filters.district,
        },
      });
      setAds(data);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
      toast.error(`Failed: ${error} `);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchAds = useCallback(debounce(fetchAds, 500), []);

  useEffect(() => {
    debouncedFetchAds(filters);
  }, [filters, debouncedFetchAds]);

  return (
    <Container>
      <ToastContainer />
      <BlockFieldsForFilter>
        <div className="price-city-district-block">
          <TextField
            fullWidth
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            label="Search"
            size="small"
          />

          <div className="city-district-block">
            <FormControl fullWidth>
              <InputLabel size="small" id="city-label">
                City
              </InputLabel>
              <Select
                labelId="city-label"
                name="city"
                value={filters.city}
                label="City"
                onChange={handleFilterChange}
                size="small"
              >
                <MenuItem value="All">All</MenuItem>
                {cities.map((city) => {
                  return <MenuItem value={city.value}>{city.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              label="District"
              size="small"
            />
          </div>

          <div className="price-block">
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
          </div>
        </div>
      </BlockFieldsForFilter>

      <Box alignContent="center">
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <ContainerAds adsCount={ads?.results.length || 0}>
            {ads?.results?.map((ad: Ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <AdCard ad={ad} />
              </Grid>
            ))}
          </ContainerAds>
        )}
        {!isLoading && ads?.results.length === 0 ? (
          <LoadingContainer>
            <strong className="not-found-text">Nothing was found</strong>
          </LoadingContainer>
        ) : null}
      </Box>
    </Container>
  );
};

export default Index;

const Container = styled('div')`
  padding: 30px 80px;
`;

const ContainerAds = styled('div')<{ adsCount: number }>`
  display: flex;
  justify-content: ${({ adsCount }) => (adsCount < 3 ? 'start' : 'center')};
  padding-left: ${({ adsCount }) => (adsCount < 3 ? '25px' : '')};
  flex-wrap: wrap;
  gap: 35px;
`;

const LoadingContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
`;

const BlockFieldsForFilter = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  .price-city-district-block {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .price-block {
    display: flex;
    gap: 7px;
    width: 60vw;
  }
  .city-district-block {
    display: flex;
    width: 110vw;
    gap: 10px;
  }
`;
