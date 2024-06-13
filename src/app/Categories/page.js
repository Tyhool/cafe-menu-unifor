'use client';
//Permite aos administradores gerenciar categorias em um sistema de administração. 
//Ele permite a criação, edição e exclusão de categorias, e exibe uma lista de categorias existentes.
import DeleteButton from "../../Components/DeleteButton";
import UserTabs from "../../Components/Layout/UserTabs";
import {useEffect, useState} from "react";
import {useProfile} from "../../Components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const {loading:profileLoading, data:profileData} = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  //Usado para carregar as categorias existentes ao montar a página.
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/Categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }

    //Função para enviar a categoria para o backend, seja para criar uma nova categoria ou atualizar uma existente.
  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {name:categoryName};
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/Categories', {
        method: editedCategory ? 'PUT' :'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);
      if (response.ok)
        resolve();
      else
        reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
                 ? 'Atualizando categoria...'
                 : 'Criando sua nova categoria...',
      success: editedCategory ? 'Categoria atualizada': 'Categoria criada',
      error: 'Erro...',
    });
  }

  //Função para excluir uma categoria existente.
  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/Categories?_id='+_id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Excluindo...',
      success: 'Excluido',
      error: 'Erro',
    });

    fetchCategories();
  }

  //Renderiza uma mensagem de carregamento enquanto as informações do perfil do usuário estão sendo carregadas.
  if (profileLoading) {
    return 'Carregando informações do usuário...';
  }

  //Retorna uma mensagem se o usuário não for um administrador.
  if (!profileData.admin) {
    return 'Não é admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {
                //Renderiza um formulário para criar ou atualizar uma categoria, com campos para o nome da categoria e botões para enviar ou cancelar a operação.
              }
              {editedCategory ? 'Atualizar categoria': 'Novo nome da categoria'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input type="text"
                   value={categoryName}
                   onChange={ev => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Atualizar': 'Criar'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Categorias Existentes</h2>
        {
          //Renderiza uma lista de categorias existentes, com opções para editar ou excluir cada categoria.
        }
        {categories?.length > 0 && categories.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {c.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
              >
                Editar
              </button>
              <DeleteButton
                label="Excluir"
                onDelete={() => handleDeleteClick(c._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}