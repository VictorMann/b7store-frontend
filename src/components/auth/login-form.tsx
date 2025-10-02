"use client"

import { login } from "@/actions/login";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { useAuthStore } from "@/store/auth";

import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import z from "zod";

const schema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
});

type ErrorStructure = {
  email?: string;
  password?: string;
  form?: string;
}

export const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();
  const authStore = useAuthStore(state => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      const res = await login(form);
      if (res.error) {
        setErrors({ form: res.error });
      } else if (res.token) {
        await setAuthCookie(res.token);
        authStore.setToken(res.token);
        redirect('/');
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined, form: undefined});
  };

  return (
    <form 
      className="bg-white p-8 border-sm border-gray-200"
      onSubmit={handleSubmit}>
        
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email-1" className="mb-1">E-mail</label>
          <input 
            autoFocus
            id="email-1" 
            type="email"
            name="email" 
            className="w-full border border-gray-200 rounded-sm px-3 py-2"
            value={form.email}
            onChange={handleChange}
            disabled={pending}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="pass-1" className="mb-1">Senha</label>
          <input 
            id="pass-1" 
            type="password" 
            name="password"
            className="w-full border border-gray-200 rounded-sm px-3 py-2"
            value={form.password}
            onChange={handleChange}
            disabled={pending}
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
        </div>

        <button 
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-sm hover:opacity-90"
          disabled={pending}>
          {pending ? 'Entrando...' : 'Entrar'}
        </button>

        {errors.form && <div className="text-red-500 text-sm mt-1">{errors.form}</div>}
        <div className="text-center mt-5">
          <Link 
            className="text-gray-500 hover:underline"
            href='/register'>
              Ainda não tem conta? Cadastre-se.
          </Link>
        </div>
    </form>
  )
}