'use client';
//Representa o carrinho de compras de um usuário. 
//Ele exibe os produtos no carrinho, permite remover itens do carrinho, exibe o subtotal da compra e permite proceder para o pagamento.

import {CartContext, cartProductPrice} from "../../Components/AppContext";
import AddressInputs from "../../Components/Layout/AddressInputs";
import Trash from "../../Components/icons/Trash";
import SectionHeaders from "../../Components/Layout/SectionHeaders";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {useProfile} from "../../Components/UseProfile";
import toast from "react-hot-toast";


export default function CartPage() {
  const {cartProducts,removeCartProduct} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  //Para carregar os dados do perfil do usuário.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('O pagamento falhou');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.bairro) {
      const {telefone, endereco, bairro, cep} = profileData;
      const addressFromProfile = {
        telefone,
        endereco,
        bairro,
        cep,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  
  //Calcula o subtotal da compra somando o preço de cada produto no carrinho.
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  //Define uma função para manipular as mudanças no endereço de entrega e atualizar o estado do endereço.
  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }

  //Define uma função para proceder para o checkout ao enviar o formulário de pagamento. Isso envia uma requisição para o backend para processar o pagamento e exibe notificações de carregamento, sucesso ou erro.
  async function proceedToCheckout(ev) {
    ev.preventDefault();
  
    const promise = new Promise((resolve, reject) => {
        fetch('/api/Checkout', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            address,
            cartProducts,
          }),
        }).then(async (response) => {
          if (response.ok) {
            resolve();
            window.location = await response.json();
          } else {
            reject();
          }
        });
      });
  
      await toast.promise(promise, {
        loading: 'Preparando seu pedido...',
        success: 'Redirecionando para pagamento...',
        error: 'Algo deu errado... Tente novamente mais tarde',
      })
    }
    //Renderiza uma mensagem se o carrinho estiver vazio.
    if (cartProducts?.length === 0) {
      return (
        <section className="mt-8 text-center">
          <SectionHeaders mainHeader="Cart" />
          <p className="mt-4">Seu carrinho de compras está vazio</p>
        </section>
      );
    }
    

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Carrinho" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>Nenhum produto em seu carrinho de compras</div>
          )}
          {//Renderiza cada produto no carrinho com sua imagem, nome, preço e botão para remover o produto.
          }
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <div className="flex items-center gap-4 mb-2 border-b py-2">
                <div className="w-24">
                    <Image width={240} height={240} src={product.image} alt={''}/>
                </div>
                <div className="grow">
                    <h3>
                        {product.name}
                    </h3>
                </div>
                <div className="text-lg font-semibold">
                    R${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                    <button 
                        type="button"
                        onClick={()=> removeCartProduct(index)}                   
                        className="p-2">
                   <Trash/>
                    </button>
                </div>
            </div>
          ))}    
            <div className="py-4 text-right pr-16">
                <span className="text-gray-500">
                    Subtotal: 
                </span>
                <span className="text-lg font-semibold pl-2">
                R${total}
                </span>
            </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
            <h2>Confira os dados:</h2>
            <form onSubmit={proceedToCheckout}>
                <AddressInputs
                    addressProps={address}
                    setAddressProp={handleAddressChange}
                />
                <button type="submit"> Pagamento de R${total}</button>
            </form>

        </div>
      </div>
    </section>
  );
}