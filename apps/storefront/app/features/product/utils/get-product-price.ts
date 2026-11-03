import { HttpTypes } from "@medusajs/types";
import { getPercentageDiff } from "~/features/shared/utils/get-percentage-diff";
import { convertToLocale } from "~/features/shared/utils/money";

export const getPricesForVariant = (variant: HttpTypes.StoreProductVariant) => {
  if (
    !variant?.calculated_price?.calculated_amount_with_tax &&
    !variant?.calculated_price?.calculated_amount
  ) {
    return null;
  }

  if (!variant?.calculated_price?.calculated_amount_with_tax) {
    return {
      calculated_price_number: variant.calculated_price.calculated_amount,
      calculated_price: convertToLocale({
        amount: variant.calculated_price.calculated_amount!,
        currency_code: variant.calculated_price.currency_code!,
      }),
      calculated_price_without_tax: convertToLocale({
        amount: variant.calculated_price.calculated_amount_without_tax!,
        currency_code: variant.calculated_price.currency_code!,
      }),
      calculated_price_without_tax_number:
        variant.calculated_price.calculated_amount_without_tax,
      original_price_number: variant.calculated_price.original_amount,
      original_price: convertToLocale({
        amount: variant.calculated_price.original_amount!,
        currency_code: variant.calculated_price.currency_code!,
      }),
      currency_code: variant.calculated_price.currency_code,
      price_type: variant.calculated_price.calculated_price!.price_list_type,
      percentage_diff: getPercentageDiff(
        variant.calculated_price.original_amount!,
        variant.calculated_price.calculated_amount!,
      ),
    };
  }

  return {
    calculated_price_number:
      variant.calculated_price.calculated_amount_with_tax,
    calculated_price: convertToLocale({
      amount: variant.calculated_price.calculated_amount_with_tax,
      currency_code: variant.calculated_price.currency_code!,
    }),
    calculated_price_without_tax: convertToLocale({
      amount: variant.calculated_price.calculated_amount_without_tax!,
      currency_code: variant.calculated_price.currency_code!,
    }),
    calculated_price_without_tax_number:
      variant.calculated_price.calculated_amount_without_tax,
    original_price_number: variant.calculated_price.original_amount_with_tax,
    original_price: convertToLocale({
      amount: variant.calculated_price.original_amount_with_tax!,
      currency_code: variant.calculated_price.currency_code!,
    }),
    currency_code: variant.calculated_price.currency_code,
    price_type: variant.calculated_price.calculated_price!.price_list_type,
    percentage_diff: getPercentageDiff(
      variant.calculated_price.original_amount!,
      variant.calculated_price.calculated_amount!,
    ),
  };
};

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct;
  variantId?: string;
}) {
  if (!product || !product.id) {
    throw new Error("No product provided");
  }

  const cheapestVariant = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    return product.variants
      .filter((v) => !!v.calculated_price)
      .sort((a, b) => {
        return a.calculated_price?.calculated_amount_with_tax &&
          b.calculated_price?.calculated_amount_with_tax
          ? a.calculated_price.calculated_amount_with_tax -
              b.calculated_price.calculated_amount_with_tax
          : // @ts-expect-error
            a.calculated_amount - b.calculated_amount;
      })[0];
  };

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    const variant = cheapestVariant();

    return getPricesForVariant(variant!);
  };

  const variantPrice = () => {
    if (!product || !variantId) {
      return null;
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId,
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant);
  };

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
    cheapestVariant: cheapestVariant(),
  };
}
