"use client";

import React, { useEffect, useState } from "react";
import Content from "@/components/Content";
import TabelaLista from "@/components/TableList";
import { getListaAgendamentos } from "@/shared/services/agendamentos.services";
import { Box, Button, FormControl } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import * as XLSX from "xlsx"; 
import ptBR from "date-fns/locale/pt-BR";

export default function ListaDeAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [dataFim, setDataFim] = useState<Date | null>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataInicio && dataFim) {
          const data = await getListaAgendamentos(dataInicio, dataFim);
          setAgendamentos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataInicio, dataFim]);
 
  const exportTableToXLSX: () => void = () => {

    const dadosFormatados = agendamentos.map((agendamentos) => ({
      Municipe: agendamentos.municipe,
      Data: agendamentos.datainicio,  
      Processo: agendamentos.processo,      
      Tecnico: agendamentos.tecnico,
      Coordenadoria: agendamentos.coordenadoria,
      Motivo: agendamentos.motivo,
    }))    

    const worksheet = XLSX.utils.json_to_sheet(dadosFormatados);

      const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamentos");
   
    XLSX.writeFile(workbook, "agendamentos.xlsx");
  };

  return (
    <Content titulo="Lista de Agendamentos" pagina="/lista-de-agendamentos">      
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          color="success"
          size="sm"
          startDecorator={<DownloadRoundedIcon />}
          onClick={exportTableToXLSX}
        >
          Download XLSX
        </Button>
      </Box>      
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          gap: 2,
          mb: 2,
        }}
      >
        <FormControl size="sm">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data Início"
              value={dataInicio}
              onChange={(newValue) => setDataInicio(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl size="sm">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data Fim"
              value={dataFim}
              onChange={(newValue) => setDataFim(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>      
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? <p>Carregando...</p> : <TabelaLista data={agendamentos} />}
      </Box>
    </Content>
  );
}