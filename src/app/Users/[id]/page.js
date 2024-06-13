'use client';
//Edição de usuário. 
//Visualize e edite as informações de um usuário específico. 
import UserForm from "../../../Components/Layout/UserForm";
import UserTabs from "../../../Components/Layout/UserTabs";
import {useProfile} from "../../../Components/UseProfile";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const {loading, data} = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();

  //Buscar os dados do usuário quando o componente é montado.
  useEffect(() => {
    fetch('/api/Profile?_id='+id).then(res => {
      res.json().then(user => {
        setUser(user);
      });
    })
  }, []);

  //Define a função para lidar com a atualização das informações do usuário.
  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/Profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data,_id:id}),
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Salvando usuário...',
      success: 'Usuário salvo',
      error: 'Ocorreu um erro ao salvar o usuário',
    });
  }

  if (loading) {
    return 'Carregando perfil de usuário...';
  }

  if (!data.admin) {
    return 'Não é um admin';
  }

  //Renderiza a estrutura principal da página, incluindo as abas do usuário e o formulário de usuário (UserForm) para exibir e atualizar as informações do usuário.
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}