import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  styled,
} from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

interface Image {
  id: number;
  image: string;
  thumbnail: string;
  user: number;
}

interface Ad {
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

interface AdsListProps {
  ads: {
    page: number;
    pageSize: number;
    results: Ad[];
    total: number;
  };
}

const AdsList: React.FC<AdsListProps> = ({ ads }) => {
  return (
    <Container>
      {ads?.results.map((ad) => (
        <CardStyled
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {ad?.images.slice(0, 1).map((image) => (
            <CardMedia
              component="img"
              height="140"
              image={image.thumbnail}
              alt={`Thumbnail of ${ad.title}`}
              key={image.id}
            />
          ))}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {ad.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: ad.description }}
            />
            <Typography variant="body2" color="text.primary">
              Price: {ad.price.toLocaleString()} THB
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {ad.city_name}, {ad.district_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Views: {ad.views}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardStyled>
      ))}
    </Container>
  );
};

export default AdsList;

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
`;

const CardStyled = styled(Card)`
  min-width: 400px;
  max-width: 400px;
  min-height: 470px;
`;
