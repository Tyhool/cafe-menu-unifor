'use client';

//Página de criação de novos itens de menu.
import Left from "../../../Components/icons/Left";
import MenuItemForm from "../../../Components/Layout/MenuItemForm";
import UserTabs from "../../../Components/Layout/UserTabs";
import {useProfile} from "../../../Components/UseProfile";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {

  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();

  //Envia os dados do formulário para o backend para criar um novo item de menu.
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/Menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok){
        resolve();
      }else{
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Salvando o item',
      success: 'Salvo',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  //Redireciona o usuário para a página de itens de menu.
  if (redirectToItems) {
    return redirect('/Menu-items');
  }

  if (loading) {
    return 'Carregando informações do usuário...';
  }

  if (!data.admin) {
    return 'Não é um admin.';
  }

  //Renderiza o formulário de criação de item de menu.
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/Menu-items'} className="button">
          <Left />
          <span>Mostrar todos os itens do menu</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}