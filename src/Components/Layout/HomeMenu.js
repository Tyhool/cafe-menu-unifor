'use client'
//Exibe um menu de itens, com uma imagem de fundo e cabeçalhos de seção.
//Exibe uma seção de menu com itens populares, e utiliza componentes internos para a estrutura e exibição.
//Responsável por exibir uma seção do menu com os itens mais populares.

import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import {useEffect, useState} from "react";

export default function HomeMenu() {

  const [bestSellers, setBestSellers] = useState([]);
  //Buscar os itens do menu ao montar o componente, atualizando com os três últimos itens da lista.
  useEffect(() => {
    fetch('/api/Menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);


  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        
      </div>
      <div className="text-center mb-4">
        <SectionHeaders 
            subHeader={"Favoritos"} 
            mainHeader={"Menu"} 
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
      {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
}
