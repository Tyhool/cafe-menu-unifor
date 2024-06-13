//Usado como um layout raiz para a aplicação. Ele envolve todo o conteúdo da aplicação.
import { AppProvider } from "../Components/AppContext";
import Header from "../Components/Layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "iCoffe",
  description: "Cafeteria",
};

//Define o componente RootLayout que envolve todo o conteúdo da aplicação.
//Inclui o provedor de contexto AppProvider para fornecer o contexto para toda a aplicação.
//Renderiza o <Header> para exibir o cabeçalho da página.
//{children} é onde o conteúdo da página é renderizado dinamicamente.
//Renderiza um <footer> com informações de direitos autorais e outras informações.

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto">
          <AppProvider>
            <Toaster/>
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 Todos os direitos reservados
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}