// Renderiza cabeçalhos de seção com um subtítulo e um título principal.
export default function SectionHeaders({subHeader,mainHeader}) {
    return (
      <div>
        <h3 className="uppercase text-gray-500 font-semibold leading-4 pt-4">
        {subHeader}
        </h3>
        <h2 className="text-primary font-bold text-3xl italic">{mainHeader}</h2>
      </div>
    );
  }