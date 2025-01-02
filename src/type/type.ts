export interface HomeWallpaperType {
  id: string;
  pc: string;
  mobile: string;
}

export interface CategoryType {
  id: string;
  category: string[];
}

export interface Stock {
  size: string;
  qty: number;
}

export interface Cart {
  productId: string;
  stock: Stock;
  createdAt: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  zipcode: string;
  cart: Cart[];
  isAdmin: boolean;
  createdAt: string;
  orders: OrderType[];
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  stock: Stock[];
  category: string;
  img: string[];
  description: string;
  isNew: boolean;
  createdAt: string;
}

export interface CartProductType extends ProductType {
  cartStock: Cart;
}

export interface TmpOrderType {
  id: string;
  userId: string;
  orderId: string;
  shipping: number;
  subtotal: number;
  amount: number;
  orderName: string;
  email: string;
  name: string;
  phone: string;
  address1: string;
  address2: string;
  zipcode: string;
  cart: CartProductType[];
  orderStatus:
    | "주문 확인 중"
    | "발송 준비 중"
    | "발송 완료"
    | "반품 진행 중"
    | "반품 완료";
  trackingNumber: string;
  createdAt: string;
}
export interface OrderType {
  id: string;
  paymentKey: string;
  userId: string;
  orderId: string;
  method: string;
  shipping: number;
  subtotal: number;
  amount: number;
  orderName: string;
  email: string;
  name: string;
  phone: string;
  address1: string;
  address2: string;
  zipcode: string;
  cart: CartProductType[];
  orderStatus:
    | "주문 확인 중"
    | "발송 준비 중"
    | "발송 완료"
    | "반품 진행 중"
    | "반품 완료";
  trackingNumber: string;
  createdAt: string;
  succeedAt: string;
}
