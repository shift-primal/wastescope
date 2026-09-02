import { SignedIn, SignedOut } from "@neondatabase/neon-js/auth/react";
import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "#/components/layout/PageContainer";
import { LinkButton } from "#/components/ui/LinkButton";

const Home = () => {
	return (
		<PageContainer>
			<div className="flex h-full flex-col items-center gap-4 p-8 text-center mt-32">
				<h1 className="text-4xl font-bold">wastescope</h1>
				<p className="max-w-md text-lg text-muted-foreground">
					Track and categorize your spending from imported bank transactions.
				</p>
				<div className="flex gap-6">
					<SignedOut>
						<LinkButton
							to="/auth/$pathname"
							params={{ pathname: "sign-in" }}
							className="text-xl p-4"
						>
							Sign in
						</LinkButton>
						<LinkButton
							to="/auth/$pathname"
							params={{ pathname: "sign-up" }}
							className="text-xl p-4"
						>
							Sign up
						</LinkButton>
					</SignedOut>
					<SignedIn>
						<LinkButton to="/dashboard" className="text-xl p-4">
							Dashboard
						</LinkButton>
						<LinkButton to="/import" className="text-xl p-4">
							Import
						</LinkButton>
					</SignedIn>
				</div>
			</div>
		</PageContainer>
	);
};

export const Route = createFileRoute("/")({ component: Home });
