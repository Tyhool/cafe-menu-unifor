'use client';
//Permite a edição de informações do usuário, incluindo nome, imagem, telefone, endereço, CEP, bairro e status de administrador. 
import AddressInputs from "../../Components/Layout/AddressInputs";
import EditableImage from "../../Components/Layout/EditableImage";
import {useProfile} from "../../Components/UseProfile";
import {useState} from "react";

export default function UserForm({user,onSave}) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [telefone, setTelefone] = useState(user?.telefone || '');
  const [endereco, setEndereco] = useState(user?.endereco || '');
  const [cep, setCep] = useState(user?.cep || '');
  const [bairro, setBairro] = useState(user?.bairro || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const {data:loggedInUserData} = useProfile();

  //Para atualizar os estados relacionados ao endereço com base no nome da propriedade e no valor fornecido.
  function handleAddressChange(propName, value) {
    if (propName === 'telefone') setTelefone(value);
    if (propName === 'endereco') setEndereco(value);
    if (propName === 'cep') setCep(value);
    if (propName === 'bairro') setBairro(value);
  }
//Permite a edição das informações do usuário. Ele utiliza estados para gerenciar os dados do formulário.
  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, telefone, admin,
            endereco, bairro, cep,
          })
        }
      >
        <label>
          Nome e sobrenome
        </label>
        <input
          type="text" placeholder="Nome"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={'email'}
        />
        <AddressInputs
          addressProps={{telefone, endereco, cep, bairro}}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}