import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "@fontsource-variable/public-sans";

import type { Route } from "./+types/root";
import { Provider } from "~/components/ui/provider";
import { commitSession, getSession } from "./server/session";
import { Result } from "better-result";
import { setupCart } from "./server/cart";
import { listCategories } from "./features/category/api";
import type { HttpTypes } from "@mercurjs/types";
import type { StoreContextType } from "./lib/store.context";
import { getRegionData } from "./features/shared/region";
import type { ProductCategoryWithImage } from "./features/category/types";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  const results = await Result.allAsync([
    getRegionData(request),
    setupCart(request),
    listCategories(),
  ] as const);

  let categories: Array<ProductCategoryWithImage> = [];
  let user: HttpTypes.StoreCustomer | null = null;
  let cart: HttpTypes.StoreCart | null = null;
  let region: HttpTypes.StoreRegion | null = null;

  results.map((res) => {
    const [regionResponse, cartResponse, categoriesResponse] = res;
    session.set("region", regionResponse.id);
    region = regionResponse;

    session.set("cartId", cartResponse.id);
    cart = cartResponse;
    categories = categoriesResponse.product_categories;
  });

  return data(
    { categories, cart, user, region },
    {
      headers: { "Set-Cookie": await commitSession(session) },
    },
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { categories, cart, user, region } = loaderData;

  return (
    <Provider forcedTheme="light">
      <Outlet
        context={
          {
            cart: cart!,
            categories,
            user,
            region: region!,
          } satisfies StoreContextType
        }
      />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
