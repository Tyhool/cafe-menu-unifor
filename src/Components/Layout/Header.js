"use client";
//Renderização do cabeçalho da aplicação, incluindo a navegação principal e os links de autenticação. 
//Ele exibe diferentes links de navegação com base no estado de autenticação do usuário e mostra o número de produtos no carrinho.
import {CartContext} from "../../Components/AppContext";
import ShoppingCart from "../../Components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {useContext, useState} from "react";

function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/Profile'} className="whitespace-nowrap">
          Olá, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/Login'}>Login</Link>
        <Link href={'/Register'} className="bg-primary rounded-full text-white px-8 py-2">
          Cadastrar
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession(); 
  const status = session?.status; 
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);

  if (userData && userData.email) {
    if (userName.includes("@")) {
      userName = userName.split("@")[0];
    }
  }
  return (
    <header className="flex items-center justify-between pt-2">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold ">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          iCoffe
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/Menu"}>Menu</Link>
        <Link href={"/#sobre"}>Sobre</Link>
        <Link href={"/#contato"}>Contato</Link>
        
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font -semibold">
      <AuthLinks status={status} userName={userName} />
      <Link href={'/Cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
      </nav>
    </header>
  );
}
