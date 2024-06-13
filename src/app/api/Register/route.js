//Criar um novo usuário, onde a senha é criptografada antes de ser armazenada no banco de dados.

import mongoose from "mongoose";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";


// Função para lidar com solicitações POST
export async function POST(req) {
    const body = await req.json();    // Extrai o corpo da solicitação
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      new Error('a senha tem que ser mais que 5 letras');
    }
  
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);
  
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}