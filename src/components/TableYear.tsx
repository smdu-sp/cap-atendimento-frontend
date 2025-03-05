import * as React from "react";
import Table from "@mui/joy/Table";
import { Box, Typography, Card } from "@mui/joy";
import { getAgendamentosPorAno } from "@/shared/services/agendamentos.services";

export default function TabelaAno({ ano }: { ano: number }) {
  const [dados, setDados] = React.useState<
    { coordenadoria: string; meses: number[]; total: number }[]
  >([]);
  const [totalAno, setTotalAno] = React.useState<number>(0);

  React.useEffect(() => {
    async function fetchDados() {
      try {
        const data = await getAgendamentosPorAno(ano);
        setDados(data.resultados); // Corrigido: acessando data.resultados
        setTotalAno(data.totalAno);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    }
    fetchDados();
  }, [ano]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Card com total anual */}
      <Card variant="outlined" sx={{ mb: 2, p: 2, textAlign: "center" }}>
        <Typography level="h4">
          Total de Agendamentos em {ano}: {totalAno}
        </Typography>
      </Card>
     
      <Table borderAxis="both">
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
          {dados.length > 0 ? (
            dados.map(({ coordenadoria, meses, total }) => (
              <tr key={coordenadoria}>
                <td>{coordenadoria}</td>
                {meses.map((qtd, index) => (
                  <td key={index}>{qtd}</td>
                ))}
                <td>
                  <strong>{total}</strong> {/* Total por coordenadoria */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={14}>Carregando...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
}