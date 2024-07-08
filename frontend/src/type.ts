
export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
    createdBy: string;
    createdAt: Date;
  }
  
  export interface CartItem {
    product: Product;
    number: number;
  }
  
  export interface User {
    _id: string;
    role: string;
    email: string;
  }
  
  export interface Cart {
    products: CartItem[];
  }
  
  export interface AppState {
    user: User | null;
    cart: Cart | null;
    products: Product[];
  }

//   export interface ErrorResponse {
//     response?: {
//       data: {
//         message: string;
//       };
//       status: number;
//     };
//   }