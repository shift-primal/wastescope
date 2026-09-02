import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "#/components/layout/PageContainer";

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
	component: Auth,
});
