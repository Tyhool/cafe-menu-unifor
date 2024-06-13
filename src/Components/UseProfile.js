//Utilizado para carregar dados de perfil de um usuário. 
import {useEffect, useState} from "react";

//Utilizado para carregar os dados do perfil do usuário.
export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  //Realizar uma requisição à API de perfil quando o componente é montado. Assim que os dados são recebidos, eles são armazenados no dat.a
  useEffect(() => {
    setLoading(true);
    fetch('/api/Profile').then(response => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    })
  }, []);

  return {loading, data};
}