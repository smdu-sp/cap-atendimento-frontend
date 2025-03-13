"use client";

import React, { useEffect, useState } from "react";
import Content from "@/components/Content";
import { Box, FormControl } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import * as XLSX from "xlsx";
import ptBR from "date-fns/locale/pt-BR";
import { getContagemAgendamentos } from "@/shared/services/agendamentos.services";
import { Table } from "@mui/joy";
import Button from "@mui/joy/Button";

export default function RelatorioPorPeriodo() {
  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [dataFim, setDataFim] = useState<Date | null>(new Date());
  const [dados, setDados] = useState<
    { coordenadoria: string; total: number }[]
  >([]);
  const [totalAno, setTotalAno] = useState(0);
  const [ano, setAno] = useState<number | null>(null);

  useEffect(() => {
    const buscarAgendamentos = async () => {
      if (!dataInicio || !dataFim) return;

      setAno(dataInicio.getFullYear());

      try {
        const resultado = await getContagemAgendamentos(dataInicio, dataFim);

        console.log("Resultado da API:", resultado);

        if (!resultado || !resultado.porCoordenadoria) {
          console.warn("Nenhum dado encontrado para esse período.");
          setDados([]);
          setTotalAno(0);
          return;
        }

        const coordenadorias = Object.keys(resultado.porCoordenadoria);
        const dadosFormatados = coordenadorias.map((coordenadoria) => ({
          coordenadoria: coordenadoria.trim(), 
          total: resultado.porCoordenadoria[coordenadoria], 
        }));

        const totalGeralAno = resultado.total;

        setDados(dadosFormatados);
        setTotalAno(totalGeralAno);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    buscarAgendamentos();
  }, [dataInicio, dataFim]);

  const exportTableToXLSX = () => {
    if (!dados.length) {
      console.warn("Nenhum dado disponível para exportação.");
      return;
    }

    const dadosFormatados = dados.map(({ coordenadoria, total }) => ({
      Coordenadoria: coordenadoria,
      Total: total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosFormatados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamentos");
    XLSX.writeFile(workbook, "agendamentos_por_periodo.xlsx");
  };

  return (
    <Content titulo="Agendamentos por Período">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          color="success"
          size="sm"
          startDecorator={<DownloadRoundedIcon />}
          onClick={exportTableToXLSX}
        >
          Download XLSX
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "left", gap: 2, mb: 2 }}>
        <FormControl size="sm">
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data Início"
              value={dataInicio}
              onChange={(newValue) => setDataInicio(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl size="sm">
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data Fim"
              value={dataFim}
              onChange={(newValue) => setDataFim(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      {dados.length > 0 && (
        <Table borderAxis="both">
          <caption>Quantidade de agendamentos</caption>
          <thead>
            <tr>
              <th>Coordenadoria</th>
              <th>Total de Agendamentos</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(({ coordenadoria, total }) => (
              <tr key={coordenadoria}>
                <td>{coordenadoria}</td>
                <td>
                  <strong>{total}</strong>
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
              <td>Total Geral</td>
              <td>{totalAno}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </Content>
  );
}
