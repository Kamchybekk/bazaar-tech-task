'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, styled } from '@mui/material';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDate } from '../helpers/general';

interface Image {
  id: number;
  image: string;
  thumbnail: string;
  user: number;
}

interface AdDetails {
  id: number;
  images: Image[];
  city_name: string;
  district_name: string;
  title: string;
  description: string;
  price: number;
  created_at: string;
  views: number;
  user: number;
}

const AdDetailPage = () => {
  const { idAD } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adDetails, setAdDetailData] = useState<AdDetails | null>();

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<AdDetails>(`/api/ads/${idAD}`);
      setAdDetailData(data);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [idAD]);

  return (
    <Container>
      {isLoading && !adDetails?.title ? (
        <LoadingSpinner />
      ) : (
        <MainData>
          <ImageList sx={{ width: 500, height: 350 }} cols={3} rowHeight={164}>
            {adDetails?.images?.map((image) => (
              <ImageListItem key={image.id}>
                <img
                  srcSet={`${image.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt=""
                  src={`${image.image}?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                />
              </ImageListItem>
            )) || []}
          </ImageList>
          {adDetails?.views ? (
            <span>
              <VisibilityIcon sx={{ mr: 0.5 }} />
              {adDetails?.views}
            </span>
          ) : null}
          <h1>{adDetails?.title}</h1>
          {adDetails?.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: adDetails?.description,
              }}
            />
          ) : null}

          <ul>
            <li>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <LocationOnIcon sx={{ mr: 0.5 }} />
                {adDetails?.city_name}, {adDetails?.district_name}
              </Typography>
            </li>
            <li>
              {adDetails?.price ? <strong>Цена:</strong> : null}
              {adDetails?.price}
            </li>
            <li>
              {adDetails?.created_at ? <strong>Добавлено : </strong> : null}
              {adDetails?.created_at && formatDate(adDetails.created_at)}
            </li>
          </ul>
        </MainData>
      )}
    </Container>
  );
};

export default AdDetailPage;

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  ul {
    padding: 0;
    list-style: none;
  }
`;

const MainData = styled('div')`
  padding: 40px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 20px -11px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 20px -11px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 20px -11px rgba(66, 68, 90, 1);
`;
