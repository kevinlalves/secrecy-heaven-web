'use client';

import { TextField } from '@/components/Form/TextField';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast/use-toast';
import UserProvider, { useUser } from '@/providers/UserProvider';
import { LoginSchema } from '@/schemas/LoginSchema';
import { signIn as signInService } from '@/services/secrecyHeavenApi';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export default function LoginPage() {
  const methods = useForm({ resolver: joiResolver(LoginSchema) });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useUser();
  const router = useRouter();

  const handleUserMutationSuccess = (user) => {
    signIn(user);
    router.push('/home');
  };

  const userMutation = useMutation({
    mutationFn: signInService,
    onSuccess: handleUserMutationSuccess,
    onError: () => {
      setIsLoading(false);

      toast({
        variant: 'destructive',
        title: 'Houve um erro durante a autenticação',
        description: 'Verifique suas credenciais e tente novamente.',
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);

    userMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <main className="flex h-screen items-center justify-center bg-accent-most p-4 sm:p-28">
      <div className="max-w-sm rounded bg-background-main p-5 shadow-md sm:p-10">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-y-4">
              <TextField name="email" label="E-mail" isRequired autoComplete="e-mail" />

              <TextField
                name="password"
                label="Senha"
                isRequired
                autoComplete="password"
                type={isPasswordVisible ? 'text' : 'password'}
                endAdornment={
                  <FontAwesomeIcon
                    className="h-5 w-5 cursor-pointer align-middle text-foreground-subtle"
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />

              <Button className="w-full" size="md" isLoading={isLoading}>
                Entrar
              </Button>

              <Button variant="ghost" as={Link} href="/sign-up">
                Cadastre-se!
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
