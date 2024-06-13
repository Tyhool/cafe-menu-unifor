//Criação de pedidos (orders), ele recebe os dados do carrinho e calcula o preço total dos produtos.

import {authOptions} from "../auth/[...nextauth]/route";
import {MenuItem} from "../../../models/MenuItem";
import {Order} from "../../../models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";


export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const {cartProducts, address} = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  //Criação de Pedido: Cria um novo documento de pedido (Order) com o email do usuário, endereço e produtos do carrinho, e marca o pedido como não pago.
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });


  //Configuração dos Itens do Carrinho
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {

    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    
    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }


  //Cria uma sessão de checkout com os itens do carrinho.
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    payment_intent_data: {
      metadata:{orderId:orderDoc._id.toString()},
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'USD'},
        },
      }
    ],
  });

  return Response.json(stripeSession.url);
}