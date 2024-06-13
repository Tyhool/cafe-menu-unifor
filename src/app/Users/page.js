'use client';
//Permite que um administrador visualize e edite informações de todos os usuários registrados. 
import UserTabs from "../../Components/Layout/UserTabs";
import {useProfile} from "../../Components/UseProfile";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const {loading,data} = useProfile();

  //Usa useEffect para buscar a lista de usuários quando o componente é montado.
  useEffect(() => {
    fetch('/api/Users').then(response => {
      response.json().then(users => {
        setUsers(users);
      });
    })
  }, []);

  if (loading) {
    return 'Carregando informações do usuário...';
  }

  if (!data.admin) {
    return 'Não é um admin';
  }

  //Renderiza a estrutura principal da página, incluindo as abas do usuário e a lista de usuários.
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {
          //Cada usuário é exibido em um bloco com seu nome (ou "No name" se o nome não estiver disponível) e email.
        }
        {users?.length > 0 && users.map(user => (
          <div
            key={user._id}
            className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
              <div className="text-gray-900">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic">No name</span>)}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <div>
              {
                //Cada bloco de usuário inclui um link para a página de edição do usuário.
              }
              <Link className="button" href={'/Users/'+user._id}>
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}