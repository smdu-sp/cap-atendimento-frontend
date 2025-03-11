import * as React from "react";
import Table from "@mui/joy/Table";
import {
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  SvgIcon,
} from "@mui/joy";
import { getAgendamentosPorAno } from "@/shared/services/agendamentos.services";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";

const mesesNome = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const TabelaAno = forwardRef(({ ano }: { ano: number }, ref) => {
  const [dados, setDados] = React.useState<
    { coordenadoria: string; meses: number[]; total: number }[]
  >([]);
  const [totalAno, setTotalAno] = React.useState<number>(0);
  const [totalMensal, setTotalMensal] = React.useState<number[]>(
    Array(12).fill(0)
  );

  React.useEffect(() => {
    async function fetchDados() {
      try {
        const data = await getAgendamentosPorAno(ano);
        setDados(data.resultados);
        setTotalAno(data.totalAno);
        setTotalMensal(data.totalMensal);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    }
    fetchDados();
  }, [ano]);

  // Expondo os dados para o componente pai
  useImperativeHandle(ref, () => ({
    getDados: () => dados.map(({ coordenadoria, meses, total }) => ({
      coordenadoria,
      ...meses.reduce((acc, qtd, index) => {       
        acc[mesesNome[index]] = qtd;
        return acc;
      }, { total }),
    }))
  }));

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        <Card variant="solid" color="primary" invertedColors>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <CalendarMonthIcon />
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">Total {ano}</Typography>
              <Typography level="h2">{totalAno}</Typography>
            </CardContent>
          </CardContent>
        </Card>
      </Box>

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
            <th>Total Ano</th>
          </tr>
        </thead>
        <tbody>
          {dados.length > 0 ? (
            <>
              {dados.map(({ coordenadoria, meses, total }) => (
                <tr key={coordenadoria}>
                  <td>{coordenadoria}</td>
                  {meses.map((qtd, index) => (
                    <td key={index}>{qtd}</td>
                  ))}
                  <td>
                    <strong>{total}</strong>
                  </td>
                </tr>
              ))}

              <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
                <td>Total Mensal</td>
                {totalMensal.map((qtd, index) => (
                  <td key={index}>{qtd}</td>
                ))}
                <td>{totalAno}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={14}>Carregando...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
});

TabelaAno.displayName = "TabelaAno"; 

export default TabelaAno;
