import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { authClient } from "#/lib/auth";

const BASE = import.meta.env.VITE_NEON_AUTH_URL;
const JWKS = createRemoteJWKSet(new URL(`${BASE}/.well-known/jwks.json`));

export const authMiddleware = createMiddleware({ type: "function" })

	.client(async ({ next }) => {
		const { data, error } = await authClient.token();
		const token =
			data?.token ??
			(data as unknown as { session?: { token?: string } })?.session?.token;
		if (error || !token) throw new Error("Not authenticated");
		return next({ headers: { Authorization: `Bearer ${token}` } });
	})

	.server(async ({ next }) => {
		const raw = getRequestHeader("authorization");
		const token = raw?.replace("Bearer ", "");
		if (!token) throw new Error("Unauthorized");
		const { payload } = await jwtVerify(token, JWKS, {
			issuer: new URL(BASE).origin,
		});
		return next({ context: { ownerId: payload.sub as string } });
	});
