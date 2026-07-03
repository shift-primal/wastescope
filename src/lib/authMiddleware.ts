import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { authClient } from "#/lib/auth";

const BASE = import.meta.env.VITE_NEON_AUTH_URL;
const JWKS = createRemoteJWKSet(new URL(`${BASE}/.well-known/jwks.json`));

export const authMiddleware = createMiddleware({ type: "function" })
	.client(async ({ next }) => {
		const { data, error } = await authClient.token();
		if (error || !data) throw new Error("Not authenticated");
		return next({ headers: { Authorization: `Bearer ${data.token}` } });
	})
	.server(async ({ next }) => {
		const token = getRequestHeader("authorization")?.replace("Bearer ", "");
		if (!token) throw new Error("Unauthorized");
		const { payload } = await jwtVerify(token, JWKS, {
			issuer: new URL(BASE).origin,
		});
		return next({ context: { ownerId: payload.sub as string } });
	});
