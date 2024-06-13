//Formulário reutilizável que coleta informações de endereço, incluindo telefone, endereço, CEP e bairro. 
export default function AddressInputs({addressProps,setAddressProp,disabled=false}) {
    const {telefone, endereco, cep, bairro} = addressProps;
    return (
      <>
        <label>Telefone</label>
        <input
          disabled={disabled}
          type="tel" placeholder="Numero de telefone"
          value={telefone || ''} onChange={ev => setAddressProp('telefone', ev.target.value)} />
        <label>Endereço</label>
        <input
          disabled={disabled}
          type="text" placeholder="Endereço"
          value={endereco || ''} onChange={ev => setAddressProp('endereco', ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>CEP</label>
            <input
              disabled={disabled}
              type="text" placeholder="CEP"
              value={cep || ''} onChange={ev => setAddressProp('cep', ev.target.value)}
            />
          </div>
          <div>
            <label>Bairro</label>
            <input
              disabled={disabled}
              type="text" placeholder="Bairro"
              value={bairro || ''} onChange={ev => setAddressProp('bairro', ev.target.value)}
            />
          </div>
        </div>
      </>
    );
  }