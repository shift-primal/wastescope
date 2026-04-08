import { db } from '#/db';
import { users } from '#/db/schema';
import { getUsers } from '#/db/txQueries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/users/')({
    server: {
        handlers: {
            GET: async () => {
                return Response.json(await getUsers());
            },

            POST: async ({ request }) => {
                const { name, color } = await request.json();
                const [user] = await db.insert(users).values({ name, color }).returning();
                return Response.json(user);
            },
        },
    },
});
