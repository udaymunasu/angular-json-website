export interface signUp {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob?: Date;
  address?: string;
  mobile?: string;
  profilepic?: string;
  pancard?: string;
  createdat?: Date;
}

export interface login {
  email: String;
  password: String;
}

export interface product {
  name: string;
  price: number;
  category: {
    name: string
  };
  color: string;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}
export interface cart {
  name: string;
  price: number;
  category?: {
    name: string
  };
  color: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  productId: number;
  userId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}
