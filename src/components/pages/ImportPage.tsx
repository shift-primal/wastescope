import { FileUp } from 'lucide-react';
import { FileUploadForm } from '../import/FileUploadForm';

export const ImportPage = () => (
    <div className="px-4 sm:px-6 py-8 flex flex-col items-center gap-y-8 max-w-lg mx-auto">
        <div className="flex flex-col gap-y-2 w-full">
            <div className="flex items-center gap-x-2 text-muted-foreground">
                <FileUp size={16} />
                <span className="text-xs font-medium uppercase tracking-widest">Import</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Importer transaksjoner</h1>
            <p className="text-sm text-muted-foreground">
                Last opp en CSV-eksport fra DNB eller Eika/Valle. Transaksjoner blir automatisk
                kategorisert og lagt til dashboardet.
            </p>
        </div>
        <FileUploadForm />
    </div>
);
