"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function fetchAnos() {
      try {
        const data = await getAnos();
        setAnos(data);
        if (data.length > 0) {
          setAnoSelecionado(data[0]); // Define o primeiro ano como padrão
        }
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
      }
    }

    fetchAnos();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Content titulo="Relatórios">
        {/* Botão para download */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button color="primary" size="sm" startDecorator={<DownloadRoundedIcon />}>
            Download PDF
          </Button>
        </Box>

        {/* Seletor de Ano */}
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

        {/* Tabela de Agendamentos para o ano selecionado */}
        {anoSelecionado && <TabelaAno ano={parseInt(anoSelecionado, 10)} />}
      </Content>
    </Box>
  );
}
