import { ImportPage } from '#/components/pages/ImportPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/import')({ component: ImportPage });
