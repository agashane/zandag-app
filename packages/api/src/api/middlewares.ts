import { configureStoreSearch } from "@medusajs/framework/http";
import { defineMiddlewares } from "@medusajs/medusa";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/search",
      middlewares: [
        configureStoreSearch({
          allowed_indexes: {
            products: true,
            categories: true,
          },
        }),
      ],
    },
  ],
});
