'use client';
//Exibe o menu do restaurante.
import SectionHeaders from "../../Components/Layout/SectionHeaders";
import MenuItem from "../../Components/Menu/MenuItem";
import {useEffect, useState} from "react";

export default function MenuPage() {

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  //Buscar as categorias e os itens do menu no backend assim que a página é montada. 
  useEffect(() => {
    fetch('/api/Categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    fetch('/api/Menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []);

  //Renderiza cada categoria como um cabeçalho de seção e renderiza os itens do menu correspondentes a cada categoria usando o componente MenuItem. 
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}