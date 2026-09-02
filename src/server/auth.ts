import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/lib/authMiddleware";

export const whoAmI = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(({ context }) => ({ ownerId: context.ownerId }));
