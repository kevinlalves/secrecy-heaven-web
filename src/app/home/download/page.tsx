'use client';

import { Button } from '@/components/ui/Button';
import { useFiles } from '@/queries/useFiles';
import { getFileDownloadUrl } from '@/services/secrecyHeavenApi';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const { files, isLoading } = useFiles();

  if (isLoading) {
    return <>Carregando</>;
  }

  return (
    <main className="flex justify-center">
      <ul className="flex max-w-sm flex-col justify-center gap-4 rounded-xl bg-background-main p-5 shadow-md sm:p-10">
        {files.map((file, key) => (
          <li className="flex items-center gap-10 bg-gray-900 p-4 text-accent-main" key={key}>
            <p className="text-2xl font-semibold">{file.fileName}</p>

            <Button size="lg" variant="ghost" icon={faDownload} onClick={() => handleDownloadClick(file.id)} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function handleDownloadClick(id: string) {
  const link = document.createElement('a');

  link.href = getFileDownloadUrl(id);
  link.target = '_blank';

  link.click();
}
