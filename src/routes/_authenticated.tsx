import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@neondatabase/neon-js/auth/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { PageContainer } from "#/components/layout/PageContainer";
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
	component: () => (
		<PageContainer>
			<div>
				<SignedIn>
					<Outlet />
				</SignedIn>
				<SignedOut>
					<RedirectToSignIn />
				</SignedOut>
			</div>
		</PageContainer>
	),
});
