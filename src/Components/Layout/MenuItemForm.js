//Formulário para editar ou adicionar itens ao menu.
import EditableImage from "../../Components/Layout/EditableImage";
import {useEffect, useState} from "react";

export default function MenuItemForm({onSubmit,menuItem}) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);

  //Buscar a lista de categorias ao montar o componente, atualizando o estado categories com os dados recebidos.
  useEffect(() => {
    fetch('/api/Categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);


// Campos de entrada (input e select) para editar os campos. A lista de categorias é renderizada dinamicamente com base no estado categories.
  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image,name,description,basePrice,category,
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Nome do item</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Categoria</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Preço de base</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
            <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
}