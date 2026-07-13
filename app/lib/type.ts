export interface OfferType {
  id: number;
  title: string;
  status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;
}

export type Blog = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  created_at: string;
  slug: string;
};

export interface ProductOption {
  id: number;
  name: string;
  values: string[];
  position: number;
  product_id: number;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;
}

export interface FoodType {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  category: CategoryType;
  options : ProductOption[]
}

export interface BannerType {
  id: number;
  title: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export interface RolePivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  email_verified_at: string | null;
  phone: string;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: Permission[];
}

export interface UserProfileType {
  ok: boolean;
  message: string;
  data: User;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FoodStatus = "available" | "unavailable" | "out_of_stock";
export type PlanType = "regular" | "weekly" | "monthly";

export interface FoodDetails {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: string; // Keep as string since backend passes decimal format "99.90"
  stock: number;
  image: string;
  status: FoodStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  food_id: number;
  plan_type: PlanType;
  total_days: number;
  quantity: number;
  unit_price: string; // Decimal string format
  subtotal: string; // Decimal string format
  created_at: string;
  updated_at: string;
  food: FoodDetails;
}

export interface Order {
  full_name : string;
  email : string;
  phone : string;
  address : string;
  id: number;
  user_id: number;
  order_number: string;
  total_amount: string; // Decimal string format
  status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
  total_deliveries: number;
  completed_deliveries: number;
  items: OrderItem[];
}

// API Response meta type helper if needed for your pagination structure
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Order[];
}

// @/app/lib/type.ts

export type FoodCategory = {
  _id?: string | number;
  name: string;
  slug?: string;
};

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

// Strongly types the wrapper response often returned by standard REST APIs or Axios/RTK queries
export type FoodApiResponse = {
  success: boolean;
  message?: string;
  data: FoodType;
};

export interface Category {
  id: number;
  name: string;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CheckoutFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  payment_method: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface FoodType {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  category: CategoryType;
}

export interface NotificationInnerData {
  order_id: number;
  order_number: string;
  amount?: string;
  message: string;
  type: "new_order" | "cancelled" | string;
}

export interface NotificationItem {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationInnerData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface CollectionItem {
    id: number;
    name: string;
    status: 'active' | 'inactive' | string; // Highly recommended to literal-type your statuses
    created_at: string; // ISO 8601 Date String
    updated_at: string; // ISO 8601 Date String
}

export interface CollectionFoodItem {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  status: "available" | "unavailable";
  created_at: string;
  updated_at: string;
  pivot: {
    collection_id: number;
    food_id: number;
  };
}