import { FileUpload } from '#/components/FileUpload';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/import')({ component: ImportPage });

export function ImportPage() {
    return <FileUpload />;
}
