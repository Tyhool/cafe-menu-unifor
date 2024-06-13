"use client";
//Permite que os usuários insiram seu e-mail e senha e façam login no sistema.
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  //Função para lidar com o envio do formulário de login.
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    ///// @user.com
    ///// @admin.com
    let callbackUrl = '/Menu';

    if(email.includes('@admin'))
      callbackUrl = '/Profile';

    await signIn("credentials", { email, password, callbackUrl });

    setLoginInProgress(false);
  }

  //Renderiza os campos de entrada para e-mail e senha, bem como o botão de login.
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email} disabled={loginInProgress} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password} disabled={loginInProgress} onChange={(ev) => setPassword(ev.target.value)} />
        
        <button  type="submit" disabled={loginInProgress}> Login </button>
      </form>
    </section>
  );
}
