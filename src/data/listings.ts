export type Listing = {
  id: string;
  title: string;
  city: string;
  price: number;
  rooms: number;
  area: number;
  image: string;
};

export const listings: Listing[] = [
  {
    id: "1",
    title: "Modern villa i Göteborg",
    city: "Göteborg",
    price: 4250000,
    rooms: 5,
    area: 145,
    image: "https://placehold.co/600x400",
  },
  {
    id: "2",
    title: "Lägenhet i Stockholm",
    city: "Stockholm",
    price: 3195000,
    rooms: 3,
    area: 78,
    image: "https://placehold.co/600x400",
  },
  {
    id: "3",
    title: "Villa i Västervik",
    city: "Västervik",
    price: 2495000,
    rooms: 4,
    area: 120,
    image: "https://placehold.co/600x400",
  },
];
