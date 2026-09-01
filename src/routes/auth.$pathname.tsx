import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$pathname")({
	component: Auth,
});

function Auth() {
	const { pathname } = Route.useParams();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<AuthView pathname={pathname} />
		</div>
	);
}
