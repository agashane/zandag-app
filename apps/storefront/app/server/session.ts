import { Result } from "better-result";
import { createCookieSessionStorage } from "react-router";
import { env } from "~/env/server";

interface SessionData {
  useId?: string | null;
  cartId: string;
  region: string;
  token?: string | null;
}

interface SessionFlashData {}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__zandag_session",
      domain: env.WEBSITE_URL,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: [env.COOKIE_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

const findSession = (request: Request) =>
  Result.tryPromise(() => getSession(request.headers.get("Cookie")));

export { getSession, commitSession, destroySession, findSession };
