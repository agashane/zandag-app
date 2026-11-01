import type { HttpTypes } from "@mercurjs/types";
import { useOutletContext } from "react-router";
import type { ProductCategoryWithImage } from "~/features/category/types";

export interface StoreContextType {
  user?: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart;
  categories: Array<ProductCategoryWithImage>;
  region: HttpTypes.StoreRegion;
}

export const useStoreContext = () => useOutletContext<StoreContextType>();
