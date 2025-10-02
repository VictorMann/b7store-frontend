"use server"

type LoginData = {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginData): Promise<{ error: null | string, token?: string }> => {
  // TODO: requisição para fazer login
  return { error: null, token: '123'};
};