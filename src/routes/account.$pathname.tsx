import { AccountView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "#/components/layout/PageContainer";

const Account = () => {
	const { pathname } = Route.useParams();

	return (
		<PageContainer>
			<AccountView pathname={pathname} />
		</PageContainer>
	);
};

export const Route = createFileRoute("/account/$pathname")({
	component: Account,
});
