import { useState, useEffect } from "react";
import { CepProps } from "../types/cep";
import { get } from "../services/cep";

const useCep = () => {
  const [logradouro, setLogradouro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    const fetchResultado = async () => {
      const res = await get(123890123);
      if (!("erro" in res)) {
        setLogradouro(res.logradouro);
        setLocalidade(res.localidade);
        setUf(res.uf);
      } else {
        console.error("CEP not found.");
      }
    };

    fetchResultado();
  }, []);

  return { logradouro, localidade, uf };
};

export default useCep;
