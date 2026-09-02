import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { PageContainer } from "#/components/layout/PageContainer";
import { whoAmI } from "#/server/auth";

const Auth = () => {
	const { pathname } = Route.useParams();
	return (
		<PageContainer>
			<div className="flex items-center justify-center">
				<AuthView pathname={pathname} />
			</div>
		</PageContainer>
	);
};

export const Route = createFileRoute("/auth/$pathname")({
	beforeLoad: async () => {
		let authenticated = false;
		try {
			await whoAmI();
			authenticated = true;
		} catch {
			authenticated = false;
		}
		if (authenticated) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: Auth,
});
