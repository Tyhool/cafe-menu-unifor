//Funcionalidade de busca de pedidos (orders).
//Se for administrativo ele retorna os pedidos correspondentes a todos os pedidos.

import {authOptions, isAdmin} from "../auth/[...nextauth]/route";
import {Order} from "../../../models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  //Se houver um ID especificado na URL, retorna o pedido correspondente.
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }

  //Se o usuário for administrador, retorna todos os pedidos.
  if (admin) {
    return Response.json( await Order.find() );
  }
  //Se o usuário estiver autenticado, retorna os pedidos associados ao email do usuário.
  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}