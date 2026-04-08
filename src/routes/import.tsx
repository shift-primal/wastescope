import { FileUploadForm } from '#/components/import/FileUploadForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/import')({ component: ImportPage });

export function ImportPage() {
    return <FileUploadForm />;
}
