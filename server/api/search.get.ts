import type { NominatimRes } from "~/lib/types";

import { QuerySchema } from "~/lib/zod-schemas";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAuthenticatedEventHandler(
  defineCachedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, QuerySchema.safeParse);

    if (!result.success) {
      return sendZodError(event, result.error);
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${result.data.q}&format=json`, {
        headers: {
          "User-Agent": "travel-log-nuxt (leonovstepan.jobs@outlook.com)",
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        return sendError(event, createError({
          statusCode: 504,
          statusMessage: "Service is unavailable",
        }));
      }

      const res = await response.json() as NominatimRes[];

      return res;
    }
    catch {
      return sendError(event, createError({
        statusCode: 504,
        statusMessage: "Service is unavailable",
      }));
    }
  }, {
    maxAge: 60 * 60 * 24,
    name: "search",
    getKey: async (event) => {
      const query = await getQuery(event);
      return query.q?.toString() || "";
    },
  }),
);
