'use client';
//Exibe detalhes de um pedido específico, incluindo produtos no carrinho e informações de endereço.
import {CartContext, cartProductPrice} from "../../../Components/AppContext";
import AddressInputs from "../../../Components/Layout/AddressInputs";
import SectionHeaders from "../../../Components/Layout/SectionHeaders";
import CartProduct from "../../../Components/Menu/CartProduct";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";

export default function OrderPage() {
  const {clearCart} = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const {id} = useParams();

  //Limpar o carrinho.
  //Faz para buscar os dados do pedido e atualiza o estado order com os dados recebidos.
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/Orders?_id='+id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  //Calcula o subtotal do pedido somando os preços dos produtos no carrinho.
  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Seu pedido" />
        <div className="mt-4 mb-8">
          <p>Obrigado pelo seu pedido.</p>
        </div>
      </div>
      {loadingOrder && (
        <div>Carregando pedido...</div>
      )}
      {
        //A carregado, exibe os produtos do carrinho e o subtotal calculado.
      }
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              {
                //Renderiza os componentes de endereço usando AddressInputs com os dados do pedido.
              }
              <AddressInputs
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}