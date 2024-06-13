//Sistema de autenticação com um provedor de credenciais, utilizando o MongoDB para armazenar os dados e verificar se o usuário possui privilégios de administrador.
import { User } from "../../../../models/User";
import { UserInfo } from "../../../../models/UserInfo";
import * as mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

//Configurações de Autenticação
export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ]
};

//Função para Verificar Admin
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

export async function checkIsAdmin(email) {
  const userEmail = email;
  if (!userEmail) return false;

  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) return false;

  return userInfo.admin;
}

//Manipulador NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
