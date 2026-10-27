import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { RegionNotFound } from "./errors";
import { getRegionFromSession } from "~/server/region";

export const getRegion = (id: string) =>
  Result.tryPromise({
    try: () => mercur.store.regions.$id.query({ $id: id }),
    catch: () => new RegionNotFound({ id, message: "Region not found" }),
  });

export const getRegionData = async (request: Request) => {
  const region = await getRegionFromSession(request)
    .then(Result.andThenAsync((regionId) => getRegion(regionId.unwrap())))
    .then(Result.map((response) => response.region));

  return region;
};
