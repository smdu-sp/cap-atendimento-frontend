import * as React from "react";
import Table from "@mui/joy/Table";
import { getCoordenadorias } from "@/shared/services/coordenadoria.services";

export default function TabelaAno({ ano }: { ano: number }) {
  const [coordenadorias, setCoordenadorias] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function fetchCoordenadorias() {
      try {
        const data = await getCoordenadorias();
        setCoordenadorias(data.map((item: { sigla: string }) => item.sigla)); // Extrai as siglas
      } catch (error) {
        console.error("Erro ao buscar coordenadorias:", error);
      }
    }

    fetchCoordenadorias();
  }, []);

  return (
    <Table>
      <caption>Agendamentos Técnicos - {ano}</caption>
      <thead>
        <tr>
          <th>Coordenadoria</th>
          <th>Jan</th>
          <th>Fev</th>
          <th>Mar</th>
          <th>Abr</th>
          <th>Mai</th>
          <th>Jun</th>
          <th>Jul</th>
          <th>Ago</th>
          <th>Set</th>
          <th>Out</th>
          <th>Nov</th>
          <th>Dez</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {coordenadorias.length > 0 ? (
          coordenadorias.map((sigla) => (
            <tr key={sigla}>
              <td>{sigla}</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>-</td> // Aqui você pode preencher com valores reais
              ))}
              <td>0</td> {/* Coluna "Total" */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={14}>Carregando...</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
