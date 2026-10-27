import { loadEnv } from "@medusajs/framework/utils";
import { withMercur } from "@mercurjs/core";
import fs from "fs";
import path from "path";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

// Resolves where a dashboard app lives:
// - in the source tree (development): ../../apps/<name>
// - in the production build artifact: hosts that deploy only `.medusa/server` (for example
//   Medusa Cloud) get the panels bundled into ./dashboards/<name> by
//   scripts/bundle-dashboards.mjs during `build`. The compiled config runs from the
//   artifact root, so __dirname points there.
const dashboardAppDir = (name: string) => {
  const bundled = path.join(__dirname, "dashboards", name);
  return fs.existsSync(bundled)
    ? bundled
    : path.join(__dirname, `../../apps/${name}`);
};

module.exports = withMercur({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      vendorCors: process.env.VENDOR_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: process.env.REDIS_URL,
  },
  featureFlags: {
    seller_registration: true,
  },
  modules: [
    {
      resolve: "@mercurjs/core/modules/admin-ui",
      options: {
        appDir: dashboardAppDir("admin"),
        path: "/dashboard",
      },
    },
    {
      resolve: "@mercurjs/core/modules/vendor-ui",
      options: {
        appDir: dashboardAppDir("vendor"),
        path: "/seller",
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              // The local provider bakes this into every uploaded file URL.
              // It must be the publicly reachable origin in production, or
              // images resolve to localhost and render broken.
              backend_url:
                process.env.FILE_BACKEND_URL || "http://localhost:9000/static",
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/caching",
      options: {
        providers: [
          {
            resolve: "@medusajs/caching-redis",
            id: "caching-redis",
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
        jobOptions: {
          removeOnComplete: {
            age: 3600,
            count: 1000,
          },
          removeOnFail: {
            age: 3600,
            count: 1000,
          },
        },
      },
    },
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          redisUrl: process.env.REDIS_URL,
        },
      },
    },

    // Meilisearch
    {
      resolve: "@medusajs/medusa/search",
      options: {
        providers: [
          {
            resolve:
              "@rokmohar/medusa-plugin-meilisearch/providers/meilisearch",
            id: "meilisearch",
            options: {
              config: {
                host: process.env.MEILISEARCH_HOST,
                apiKey: process.env.MEILISEARCH_API_KEY,
              },
            },
          },
        ],
      },
    },
  ],

  plugins: [
    {
      resolve: "@rokmohar/medusa-plugin-meilisearch",
      options: {},
    },
  ],
});
