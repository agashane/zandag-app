import type { HttpTypes, PaginatedResponse } from "@mercurjs/types";

export interface ProductCategoryWithImage
  extends HttpTypes.StoreProductCategory {
  media_images?: Array<{
    id: string;
    url: string;
    type?: string | null;
    is_thumbnail: boolean;
    is_banner: boolean;
    rank: number;
    created_at: string | Date;
    updated_at: string | Date;
    deleted_at?: string | Date | null;
  }>;
}

export interface ProductCategoriesListResponse extends PaginatedResponse<{
  product_categories: Array<ProductCategoryWithImage>;
}> {}
