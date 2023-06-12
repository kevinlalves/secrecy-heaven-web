'use client';

import { toast } from '@/components/ui/Toast/use-toast';
import { createStorage as createStorageService } from '@/services/secrecyHeavenApi';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export default function HomePage() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const storageMutation = useMutation({
    mutationFn: createStorageService,
    onSuccess: () =>
      toast({
        description: 'Arquivo enviado!',
      }),
    onError: () =>
      toast({
        variant: 'desctructive',
        description: 'Nao foi possivel enviar o arquivo',
      }),
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    console.log(data.file);

    storageMutation.mutate({
      file: data.file[0],
    });
  };

  return (
    <main className="flex h-screen items-center justify-center bg-accent-most p-4 sm:p-28">
      <div className="max-w-sm rounded bg-background-main p-5 shadow-md sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="bg-white" type="file" {...register('file')} />

          <input className="bg-white" type="submit" />
        </form>
      </div>
    </main>
  );
}
