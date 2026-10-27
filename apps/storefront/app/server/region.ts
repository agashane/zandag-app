import { Result } from "better-result";
import { findSession } from "./session";
import { env } from "~/env/server";

export const getRegionFromSession = (request: Request) =>
  Result.tryPromise(async () => {
    const session = await findSession(request);
    return session.andThen((session) =>
      Result.ok(session.get("region") || env.DEFAULT_REGION_VALUE),
    );
  });
