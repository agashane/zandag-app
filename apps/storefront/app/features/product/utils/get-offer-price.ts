import type { OfferDTO } from "@mercurjs/types";
import { getPercentageDiff } from "~/features/shared/utils/get-percentage-diff";
import { convertToLocale } from "~/features/shared/utils/money";
import type { ProductWithOffers } from "./group-offers";

export const getPricesForOffer = (offer?: OfferDTO | null) => {
  if (!offer) {
    return null;
  }

  if (
    !offer?.calculated_price?.calculated_amount_with_tax &&
    !offer?.calculated_price?.calculated_amount
  ) {
    return null;
  }

  if (!offer?.calculated_price?.calculated_amount_with_tax) {
    return {
      calculated_price_number: offer.calculated_price.calculated_amount,
      calculated_price: convertToLocale({
        amount: offer.calculated_price.calculated_amount!,
        currency_code: offer.calculated_price.currency_code!,
      }),
      calculated_price_without_tax: convertToLocale({
        amount: offer.calculated_price.calculated_amount_without_tax!,
        currency_code: offer.calculated_price.currency_code!,
      }),
      calculated_price_without_tax_number:
        offer.calculated_price.calculated_amount_without_tax,
      original_price_number: offer.calculated_price.original_amount,
      original_price: convertToLocale({
        amount: offer.calculated_price.original_amount!,
        currency_code: offer.calculated_price.currency_code!,
      }),
      currency_code: offer.calculated_price.currency_code,
      price_type: offer.calculated_price.calculated_price!.price_list_type,
      percentage_diff: getPercentageDiff(
        offer.calculated_price.original_amount!,
        offer.calculated_price.calculated_amount!,
      ),
    };
  }

  return {
    calculated_price_number: offer.calculated_price.calculated_amount_with_tax,
    calculated_price: convertToLocale({
      amount: offer.calculated_price.calculated_amount_with_tax!,
      currency_code: offer.calculated_price.currency_code!,
    }),
    calculated_price_without_tax: convertToLocale({
      amount: offer.calculated_price.calculated_amount_without_tax!,
      currency_code: offer.calculated_price.currency_code!,
    }),
    calculated_price_without_tax_number:
      offer.calculated_price.calculated_amount_without_tax,
    original_price_number: offer.calculated_price.original_amount_with_tax,
    original_price: convertToLocale({
      amount: offer.calculated_price.original_amount_with_tax!,
      currency_code: offer.calculated_price.currency_code!,
    }),
    currency_code: offer.calculated_price.currency_code,
    price_type: offer.calculated_price.calculated_price!.price_list_type,
    percentage_diff: getPercentageDiff(
      offer.calculated_price.original_amount!,
      offer.calculated_price.calculated_amount!,
    ),
  };
};

export const getProductWithOfferPrice = ({
  item,
  offerId,
}: {
  item: ProductWithOffers;
  offerId?: string;
}) => {
  if (!item || !item.product.id) throw new Error("No product provided");

  const cheapestOffer = () => {
    if (!item || !item.offers?.length) {
      return null;
    }

    return item.offers
      .filter((offer) => !!offer.calculated_price)
      .sort((a, b) => {
        return a.calculated_price?.calculated_amount_with_tax &&
          b.calculated_price?.calculated_amount_with_tax
          ? a.calculated_price.calculated_amount_with_tax -
              b.calculated_price.calculated_amount_with_tax
          : a.calculated_price?.calculated_amount! -
              b.calculated_price?.calculated_amount!;
      })
      .at(0);
  };

  const cheapestPrice = () => {
    if (!item || !item.offers?.length) {
      return null;
    }

    const offer = cheapestOffer();

    return getPricesForOffer(offer);
  };

  const offerPrice = () => {
    if (!item || !offerId) {
      return null;
    }

    const offer = item.offers?.find(
      (o) => o.id === offerId || o.sku === offerId,
    );

    if (!offer) {
      return null;
    }

    return getPricesForOffer(offer);
  };

  return {
    item,
    cheapestPrice: cheapestPrice(),
    cheapestOffer: cheapestOffer(),
    offerPrice: offerPrice(),
  };
};
