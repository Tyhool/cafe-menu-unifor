"use client";

//Permite que usuários autenticados visualizem e atualizem suas informações de perfil. 
import UserForm from "../../Components/Layout/UserForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../Components/Layout/UserTabs.js";


export default function ProfilePage() {
  const session = useSession();
  console.log(session);

  const [user, setUser] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;

  //Buscar os dados do perfil do usuário quando o componente é montado.
  //Atualiza os estados user, isAdmin e profileFetched com os dados recebidos da API.
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/Profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  //Função para lidar com a atualização das informações do perfil.
  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/Profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Salvando...",
      success: "Perfil salvo",
      error: "Erro",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Carregando...";
  }

  if (status === "unauthenticated") {
    return redirect("/Login");
  }

  //Renderiza a estrutura principal da página, incluindo as abas do usuário e o formulário de usuário (UserForm) para exibir e atualizar as informações do perfil.
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}