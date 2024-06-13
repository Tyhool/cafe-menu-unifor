'use client';
//Gerencia o estado do carrinho de compras, incluindo a adição, remoção e limpeza de produtos no carrinho. 
//Define a função para calcular o preço de um produto no carrinho.
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

//Para calcular o preço de um produto no carrinho.
export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  return price;
}

//Aplicação e gerencia o estado do carrinho de compras.
export function AppProvider({children}) {
  const [cartProducts,setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  //Carregar o estado do carrinho do o componente é montado.
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts( JSON.parse( ls.getItem('cart') ) );
    }
  }, []);

  //Funções para limpar, remover um produto, salvar os produtos e adicionar um produto ao carrinho, atualizando o estado local e exibindo notificações de sucesso.
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts
        .filter((v,index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Produto removido');
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success('Adicionado no carrinho');
  }

  //Fornece os estados e funções relacionadas ao carrinho para os componentes filhos.
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts,
        addToCart, removeCartProduct, clearCart,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}