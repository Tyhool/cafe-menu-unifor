//Define uma seção de destaque em uma página web.

import Image from "next/image";


export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Em todo lugar<br />
          tem o melhor<br />
          tipo de&nbsp;
          <span className="text-primary">
            Café
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
        Descubra o sabor autêntico do café no nosso quiosque especializado, onde cada xícara é preparada com grãos selecionados e torrados na perfeição. Nosso ambiente acolhedor e aroma irresistível convidam você a uma experiência única. Venha provar a excelência do café artesanal e transforme seu momento do dia em um verdadeiro ritual de prazer.
        </p>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/cafe-Menu.jpg'} layout={'fill'} objectFit={'contain'} alt={'cafe'} />
      </div>
    </section>
  );
}