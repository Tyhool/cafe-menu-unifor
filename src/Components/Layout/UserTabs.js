'use client'
//Responsável por exibir abas de navegação para diferentes seções da aplicação.
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center">
      <Link 
       className={path === '/Profile' ? 'active' : ''} 
      href={"/Profile"}>
        Perfil
      </Link>
      {isAdmin && (
        <>
          <Link  className={path === '/Categories' ? 'active' : ''} 
            href={"/Categories"}>Categorias
          </Link>
          <Link  className={path.includes('/Menu-items') ? 'active' : ''} 
            href={"/Menu-items"}>Itens no menu
          </Link>
          <Link  className={path === '/Users' ? 'active' : ''} 
            href={"/Users"}>Usuarios
          </Link>
        </>
      )}
      <Link
        className={path === '/Orders' ? 'active' : ''}
        href={'/Orders'}
      >
        Pedidos
      </Link>
    </div>
  );
}