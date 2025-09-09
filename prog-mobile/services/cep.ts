import api from "./api";
import { CepProps, NotFound } from "../types/cep";

export async function get(cep: number): Promise<CepProps | NotFound> {
  const { data } = await api.get(`/${cep}/json/`);
  return data;
};
