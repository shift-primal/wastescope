import { AccountView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/$pathname")({
	component: Account,
});

function Account() {
	const { pathname } = Route.useParams();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<AccountView pathname={pathname} />
		</div>
	);
}
