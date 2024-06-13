'use client';
//Página de administração para gerenciar itens de menu. 
//Permite que um administrador visualize todos os itens de menu existentes e crie novos itens ou edite os existentes.
import Right from "../../Components/icons/Right";
import UserTabs from "../../Components/Layout/UserTabs";
import {useProfile} from "../../Components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function MenuItemPage() {

  const [menuItems, setMenuItems] = useState([]);
  const {loading, data} = useProfile();

  //Recupera os itens de menu da API quando o componente é montado e armazena-os no estado menuItems.
  useEffect(() => {
    fetch('/api/Menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      });
    })
  }, []);

  if (loading) {
    return 'Carregando informações do usuário...';
  }

  if (!data.admin) {
    return 'Não é um admin.';
  }

  return (
<section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {
          //Link para a página de criação de um novo item de menu.
        }
        <Link
          className="button flex"
          href={'/Menu-items/New'}>
          <span>Criar novo item de menu</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Editar item do menu:</h2>
        <div className="grid grid-cols-3 gap-2">
          {
            //Links para as páginas de edição de cada item de menu.
          }
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/Menu-items/Edit/'+item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}