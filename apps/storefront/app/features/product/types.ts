import type { OfferDTO, PaginatedResponse } from "@mercurjs/types";

export interface OffersListResponse extends PaginatedResponse<{
  offers: Array<OfferDTO>;
}> {}
