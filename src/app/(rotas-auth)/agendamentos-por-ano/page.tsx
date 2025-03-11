"use client";

import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Content from "@/components/Content";
import TabelaAno from "@/components/TableYear";
import { Box } from "@mui/material";
import Button from "@mui/joy/Button";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { FormControl, FormLabel, Select, Option } from "@mui/joy";
import { getAnos } from "@/shared/services/anos.services";

export default function RelatorioPorAno() {
  const [anos, setAnos] = useState<string[]>([]);
  const [anoSelecionado, setAnoSelecionado] = useState<string | null>(null);
  const tabelaRef = useRef<{ getDados: () => any[] } | null>(null);

  useEffect(() => {
    async function fetchAnos() {
      try {
        const data = await getAnos();
        setAnos(data);
        if (data.length > 0) {
          setAnoSelecionado(data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
      }
    }

    fetchAnos();
  }, []);

  const exportTableToXLSX = () => {
    if (!tabelaRef.current || !tabelaRef.current.getDados) {
      console.error("Erro: Não foi possível acessar os dados da tabela.");
      return;
    }

    const dadosFormatados = tabelaRef.current.getDados();

    if (!dadosFormatados || dadosFormatados.length === 0) {
      console.warn("Nenhum dado disponível para exportação.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dadosFormatados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamentos");
    XLSX.writeFile(workbook, "agendamentos_por_ano.xlsx");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Content titulo="Agendamentos por Ano">
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
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <FormControl size="sm">
            <FormLabel>Selecione o ano:</FormLabel>
            <Select
              value={anoSelecionado || ""}
              onChange={(event, newValue) => setAnoSelecionado(newValue)}
              placeholder="Escolha um ano"
            >
              {anos.map((ano) => (
                <Option key={ano} value={ano}>
                  {ano}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Box>
        {anoSelecionado && (
          <TabelaAno ref={tabelaRef} ano={parseInt(anoSelecionado, 10)} />
        )}
      </Content>
    </Box>
  );
}
