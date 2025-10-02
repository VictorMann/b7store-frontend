"use server"

type RegisterData = {
  name: string;
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: RegisterData): Promise<{ error: null | string }> => {
  // TODO: requisição para fazer login
  return { error: null };
};