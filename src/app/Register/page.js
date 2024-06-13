
"use client"
//Página permite que novos usuários se registrem fornecendo seu email e senha. 
//Após o envio do formulário, os dados são enviados para a API para criar um novo usuário. 
import { useState } from "react";
import Link from "next/link";


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error,setError] = useState(false);

  //Define a função para lidar com o envio do formulário de registro.
  async function handleFormSubmit(ev) {
	ev.preventDefault();      
	setCreatingUser(true);    
	setError(false);          
	setUserCreated(false);    
	const response = await fetch('/api/Register', {   
		method: 'POST',
		body: JSON.stringify({email, password}),
		headers: {'Content-Type': 'application/json'},
		});
	if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
  

  //Renderiza a estrutura principal da página, incluindo o título, mensagens de feedback e o formulário de registro.
  	return (
	<section className="mt-8">
	<h1 className="text-center text-primary text-4xl mb-4">
	Cadastro
	</h1>
	{
		//Exibe uma mensagem de sucesso se o usuário foi criado, com um link para a página de login.
	}
	{userCreated &&(
		<div className="my-4 text-center">
		Usuario criado.<br /> 
		Agora voce pode{' '}
		<Link className="underline" href={'/Login'}>Login &raquo;</Link>
		</div>
	)}
	{error &&(
		<div className="my-4 text-center">
			Ocorreu um erro.<br/>
			Tente de novo mais tarde
		</div>
	)}
	<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}> 
		<input type="email" placeholder="email" value={email} 
		disabled={creatingUser}
		onChange={ev => setEmail(ev.target.value)}/>
		<input type="password" placeholder="password"value={password} 
		disabled={creatingUser}
		onChange={ev => setPassword(ev.target.value)}/>
		
		<button type="submit"disabled={creatingUser}>
			Cadastrar
		</button>
	</form>
</section>
  );
}