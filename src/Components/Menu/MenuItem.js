//Exibir os detalhes de um item do menu, e permitir que o usuário adicione o item ao carrinho.
import {CartContext} from "../../Components/AppContext";
import {useContext, useState} from "react";

export default function MenuItem(menuItem) {
  const {
    image,name,description,basePrice,
  } = menuItem;

  const {addToCart} = useContext(CartContext);


  // O nome, descrição e preço do item do menu.
  // Um botão para adicionar o item ao carrinho, com os dados do menuItem.
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="cafe"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        {description}
      </p>
      <button 
      type="button"
        onClick={() => addToCart(menuItem)}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2">
       Adicionar no carrinho R${basePrice}
      </button>
    </div>
  );
}