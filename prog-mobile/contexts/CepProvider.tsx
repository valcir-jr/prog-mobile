import { createContext } from "react";
import { CepProps } from "../types/cep";
import useCep from "../hooks/useCep";

export const Contexto = createContext({} as CepProps);

export function Provider({ children }: any) {
const { logradouro, localidade, uf } = useCep();

  return (
    <Contexto.Provider value={{ logradouro, localidade, uf }}>
        {children}
    </Contexto.Provider>
  );
}