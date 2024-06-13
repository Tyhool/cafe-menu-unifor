'use client';
//Página de edição de itens de menu.
import DeleteButton from "../../../../Components/DeleteButton";
import Left from "../../../../Components/icons/Left";
import MenuItemForm from "../../../../Components/Layout/MenuItemForm";
import UserTabs from "../../../../Components/Layout/UserTabs";
import {useProfile} from "../../../../Components/UseProfile";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {

  const {id} = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();

  //Buscar os itens de menu do backend quando a página é carregada e encontra o item específico pelo ID.
  useEffect(() => {
    fetch('/api/Menu-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
    })
  }, []);

  //Envia os dados do formulário para o backend para atualizar o item de menu.
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = {...data, _id:id};
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/Menu-items', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Salvando este item',
      success: 'Salvo',
      error: 'Error',
    });

    setRedirectToItems(true);
  }
  //Envia uma requisição para o backend para excluir o item de menu.
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/Menu-items?_id='+id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Excluindo...',
      success: 'Excluído',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  //Redireciona o usuário para a página de itens de menu se for verdadeiro.
  if (redirectToItems) {
    return redirect('/Menu-items');
  }

  if (loading) {
    return 'Carregando informações do usuário...';
  }

  if (!data.admin) {
    return 'Não é um admin.';
  }

  //Renderiza o formulário de edição de item de menu e o botão de exclusão se o usuário for administrador.
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/Menu-items'} className="button">
          <Left />
          <span>Mostrar todos os itens do menu</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Excluir este item de menu"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}