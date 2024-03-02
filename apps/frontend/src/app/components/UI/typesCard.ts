export interface Image {
  id: number;
  image: string;
  thumbnail: string;
  user: number;
}

export interface Ad {
  id: number;
  images: Image[];
  city_name: string;
  district_name?: string;
  title: string;
  description?: string;
  price?: number;
  created_at: string;
  views?: number;
}

export interface AdCardProps {
  ad: Ad;
}
