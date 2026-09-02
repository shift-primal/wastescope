import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { whoAmI } from "#/server/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async () => {
		try {
			return await whoAmI();
		} catch {
			throw redirect({
				to: "/auth/$pathname",
				params: { pathname: "sign-in" },
			});
		}
	},
	component: Outlet,
});
