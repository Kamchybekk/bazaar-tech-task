import React from 'react';
import {
  Box,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AdCardProps } from './typesCard';

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const truncateDescription = (description: string | undefined) => {
    const maxLength = 50;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };
  return (
    <StyledCard>
      {ad?.images.slice(0, 1).map((image) => (
        <Image
          key={image.id}
          image={image.thumbnail}
          alt={`Thumbnail of ${ad.title}`}
        />
      ))}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {ad.title}
          </Typography>

          {ad.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: truncateDescription(ad.description),
              }}
            />
          ) : null}
        </Box>
        <ExtraInfo>
          <div className="price-location-block">
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LocationOnIcon sx={{ mr: 0.5 }} />
              {ad.city_name}, {ad.district_name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <VisibilityIcon sx={{ mr: 0.5 }} />
              {ad.views}
            </Typography>
          </div>
          <div className="price">
            <strong className="price">{ad.price.toLocaleString()} THB</strong>
            <ArrowForwardIcon sx={{ mr: 0.5 }} />
          </div>
        </ExtraInfo>
      </CardContent>
    </StyledCard>
  );
};

export default AdCard;

const StyledCard = styled('div')`
  width: 300px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  box-shadow: 0px 4px 8px -4px rgba(66, 68, 90, 1);
`;

const Image = styled('div')<{ image: string; alt?: string }>(
  ({ theme, image }) => ({
    width: '100%',
    height: 160,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${image})`,
    borderTopRightRadius: '15px',
    borderTopLeftRadius: '15px',
  })
);

const ExtraInfo = styled('div')`
  .price-location-block {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    strong {
      padding-left: 5px;
      font-size: 1.1rem;
    }
  }
`;
