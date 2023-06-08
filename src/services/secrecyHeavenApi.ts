import axios from 'axios';

const secrecyHeavenApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SECRECY_HEAVEN_API_URL,
  withCredentials: true,
});

type LoginParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

export async function signIn(params: LoginParams) {
  const { data } = await secrecyHeavenApi.post('/auth/sign_in', params);

  return data;
}

export async function getCurrentUser() {
  const { data } = await secrecyHeavenApi.get('/auth/me');

  return data;
}

export async function signUp(params: SignUpParams) {
  const { data } = await secrecyHeavenApi.post('/users');

  return data;
}
