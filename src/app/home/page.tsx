'use client';

import { Button } from '@/components/ui/Button';
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
        variant: 'destructive',
        description: 'Nao foi possivel enviar o arquivo',
      }),
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);

    storageMutation.mutate({
      file: data.file[0],
    });
  };

  return (
    <main className="flex justify-center">
      <div className="flex max-w-sm flex-col justify-center rounded-xl bg-background-main p-5 shadow-md sm:p-10">
        <p className="mb-10 text-center text-3xl text-foreground-main">Selecione o arquivo para upload</p>

        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
          <input className="bg-white text-xl" type="file" {...register('file')} />

          <Button isLoading={isLoading} className="bg-white text-xl" type="submit">
            Fazer upload
          </Button>
        </form>
      </div>
    </main>
  );
}
