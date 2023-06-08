'use client';
import React, { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/secrecyHeavenApi';
import { User } from '@/types';
import { publicPages } from '@/utils/constants';

type UserProviderContextType = {
  authorized: boolean;
  user: User | void;
  signIn: (userData: User) => void;
  signOut: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProviderContext = createContext<UserProviderContextType>({
  authorized: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

const UserProvider = (props: UserProviderProps): ReactElement => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [fetchUser, setFetchUser] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const { data: user } = useQuery(
    ['user'],
    () => {
      return getCurrentUser()
        .then((user) => {
          setAuthorized(true);

          return user;
        })
        .catch(() => {
          if (!publicPages.includes(pathname)) signOut();

          return null;
        })
        .finally(() => setFetchUser(false));
    },
    {
      enabled: fetchUser,
    },
  );

  useEffect(() => {
    const authCheck = () => {
      if (!authorized && !publicPages.includes(pathname)) {
        setFetchUser(true);
      }
    };

    authCheck();
  }, [authorized, router]);

  const signIn = (user: User) => {
    queryClient.setQueryData(['user'], user);
    setAuthorized(true);
  };

  const signOut = () => {
    router.push('/entrar');
    setAuthorized(false);
    queryClient.setQueryData(['user'], null);
  };

  const value = {
    authorized,
    user,
    signIn,
    signOut,
  };
  return <UserProviderContext.Provider value={value}>{props.children}</UserProviderContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserProviderContext);

  return context;
};

export default UserProvider;
