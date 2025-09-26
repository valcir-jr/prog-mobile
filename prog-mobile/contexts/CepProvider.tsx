import { createContext, useState } from "react";
import { get } from "../services/cep";

type Result = {logradouro: string, localidade: string, uf: string};
type ResultArray = Result[];
type CEPContext = {
  resultado: ResultArray,
  fetchCep: (cepInput: string) => Promise<boolean>
}

export const Contexto = createContext({} as CEPContext);

export function Provider({ children }: any) {
  const [resultado, setResultado] = useState<ResultArray>([]);

  const fetchCep = async (cepInput: string) => {
    const res = await get(parseInt(cepInput));
    if (!("erro" in res)) {
      setResultado((prev) => [...prev, res]);
      return true;
    } else {
      console.error("CEP not found.");
      return false;
    }
  }

  return (
    <Contexto.Provider value={{ resultado, fetchCep }}>
        {children}
    </Contexto.Provider>
  );
}