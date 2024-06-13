'use client';

//Exibe uma lista de pedidos realizados pelo usuário, mostrando detalhes como o status do pagamento, 
//email do usuário, data de criação e produtos no pedido
import UserTabs from "../../Components/Layout/UserTabs";
import {useProfile} from "../../Components/UseProfile";
import {dbTimeForHuman} from "../../libs/datetime";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [user,setUser] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const {loading, data:profile} = useProfile();

  //Carregar os pedidos quando o componente é montado.
  //Define a função de busca os pedidos da API e atualiza o estado orders com os dados recebidos.
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/Orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div>Carregando pedidos...</div>
        )}
        {
          //Exibe cada pedido com detalhes como status de pagamento, email do usuário, data de criação e nomes dos produtos no pedido.
        }
        {orders?.length > 0 && orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="grow flex flex-col md:flex-row items-center gap-6">
              <div>
                <div className={
                  (order.paid ? 'bg-green-500' : 'bg-red-400')
                  + ' p-2 rounded-md text-white w-24 text-center'
                }>
                  {order.paid ? 'Pago': 'Não pago'}
                </div>
              </div>
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">{order.userEmail}</div>
                  <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map(p => p.name).join(', ')}
                </div>
              </div>
            </div>
            <div className="justify-end flex gap-2 items-center whitespace-nowrap">
              {
                //Inclui um link para visualizar os detalhes do pedido individual.
              }
              <Link href={"/Orders/"+order._id} className="button">
                Mostrar pedidos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}