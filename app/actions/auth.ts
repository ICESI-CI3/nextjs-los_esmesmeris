import { SignInFormSchema, SignInFormState } from '../lib/definitions';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
    redirect('/profile')


}
