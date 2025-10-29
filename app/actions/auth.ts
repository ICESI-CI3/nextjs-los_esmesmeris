'use server'
import { SignInFormSchema, SignInFormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
import {createSession} from '@/app/lib/session'


export async function signIn(formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/auth/login',
                               {method: "POST",body: JSON.stringify(validatedFields.data),
                                 headers: {
                                   "Content-Type": "application/json",
                                 }
  });

  const body =await response.json();
  if (!body.success){
    redirect('/login');
  }
  const token= body.token;
  await createSession(token);


  console.log("success");






}
