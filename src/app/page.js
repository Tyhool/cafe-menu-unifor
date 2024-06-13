//Renderizar a página inicial da aplicação. Ele inclui vários componentes que compõem a estrutura da página inicial.
import Hero from "../Components/Layout/Hero";
import HomeMenu from "../Components/Layout/HomeMenu";
import SectionHeaders from "../Components/Layout/SectionHeaders";

export default function Home() {

// Define o componente Home que representa a página inicial da aplicação.
// Renderiza o componente Hero para o cabeçalho da página inicial.
// Renderiza o componente HomeMenu para exibir o menu inicial.
// Inclui duas seções com informações sobre a empresa e opções de contato.
// Usa o componente SectionHeaders para cada seção, fornecendo cabeçalhos relevantes.
// Contém informações sobre a empresa na primeira seção e informações de contato na segunda seção.

  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="sobre">
        <SectionHeaders subHeader={"Quem somos"} mainHeader={"Sobre nós"} />
        <div className="max-w-2xl mx-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>Somos um quiosque especializado em café, dedicados a oferecer uma experiência única com grãos selecionados e preparados artesanalmente, em um ambiente acolhedor que celebra a paixão pelo café de qualidade.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contato">
        <SectionHeaders
          subHeader={"Para saber mais"}
          mainHeader={"Contato-nos"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:=+558599999999"
          >
            +55 85 99999999
          </a>
        </div>
      </section>

    </>
  );
}
