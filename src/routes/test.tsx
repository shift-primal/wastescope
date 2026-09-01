import {
	clearTransactions,
	fetchTransactions,
	importTransactions,
} from "#/server/transactions";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@neondatabase/neon-js/auth/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	component: RouteComponent,
});

function RouteComponent() {
	const runImport = () => {
		importTransactions({
			data: [
				{
					date: "2026-06-10",
					amount: -99,
					merchant: "KIWI",
					type: "Varekjøp",
					category: "Dagligvare",
				},
				{
					date: "2026-06-11",
					amount: -50,
					merchant: "STEAM",
					type: "Visa",
					category: "Gaming",
					valuta: { currency: "USD", exchangeRate: 10.85 },
				},
			],
		})
			.then((res) => console.log("imported:", res))
			.catch((err) => console.error("import error:", err));
	};

	const testRead = () => {
		fetchTransactions({ data: {} })
			.then((r) => console.log("read ok:", r.totalResults))
			.catch((e) => console.error("read err:", e));
	};

	const testClearTransactions = () => {
		clearTransactions()
			.then((r) => console.log("cleared transactions: ", r))
			.catch((e) => console.error("read err:", e));
	};

	return (
		<div>
			<SignedIn>
				<p>Du er logga inn!</p>
				<div className="flex items-center gap-2">
					<button
						className="border bg-blue-400"
						type="button"
						onClick={runImport}
					>
						Run import
					</button>
					<button
						className="border bg-blue-400"
						type="button"
						onClick={testRead}
					>
						Test read
					</button>
					<button
						className="border bg-blue-400"
						type="button"
						onClick={testClearTransactions}
					>
						Clear
					</button>
				</div>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</div>
	);
}
