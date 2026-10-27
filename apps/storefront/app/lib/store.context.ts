import type { HttpTypes } from "@mercurjs/types";
import { useOutletContext } from "react-router";

export interface StoreContextType {
  user?: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart;
  categories: HttpTypes.StoreProductCategory[];
  region: HttpTypes.StoreRegion;
}

export const useStoreContext = () => useOutletContext<StoreContextType>();
