export interface Room {
  _id: number;
  amenities: string[];
  category: string;
  price: number;
  desc: string;
  images: {
    bathroom: string;
    bedroom: string;
    living_room: string;
  };
  total_rooms: number;
  occupancy: number;
  area_sq_ft: string;
}

export interface Hall {
  _id: number;
  category: string;
  price: number;
  max_guests: number;
  desc: string;
  images: string[];
  total_halls: number;
  amenities: string[];
}

// export interface Addon {
//   Breakfast: number;
//   Brunch: number;
//   Extra_bed: number;
//   Swimming_pool: number;
//   bar: number;
//   dinner: number;
//   gym: number;
//   lunch: number;
//   spa: number;
// }

export interface Addon {
  _id: string;
  name: string;
  price: number;
}

export interface Review {
  name: string;
  email: string;
  review: string;
  rating: number;
}

export interface BookingRoom {
  _id: string;
  name: string;
  email: string;
  date: string;
  check_in_date: string;
  check_out_date: string;
  add_ons: Addon[];
  coupon: any;
  num_of_rooms: number;
  price: string;
  category: string;
  special_request: string;
  total: string;
}

export interface BookingHall {
  _id: string;
  name: string;
  email: string;
  date: string;
  check_in_date: string;
  check_out_date: string;
  category: string;
  add_ons: Addon[];
  coupon: any;
  num_of_rooms: number;
  price: string;
  special_request: string;
  total: string;
}

export interface User {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  phone?: string;
}
