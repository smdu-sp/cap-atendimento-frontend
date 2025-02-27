"use client";

import React from "react";
import Content from "@/components/Content";
import TabelaAno from "@/components/TableYear";
import { Box } from "@mui/material";
import Button from "@mui/joy/Button";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { FormControl, FormLabel, Select, Option } from "@mui/joy";

export default function Relatorios() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Content titulo="Relatórios">
        {/* Box para alinhar o botão à direita */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Alinha o botão à direita
            mb: 2, // Espaço abaixo do botão
          }}
        >
          <Button color="primary" size="sm" startDecorator={<DownloadRoundedIcon />}>
            Download PDF
          </Button>
        </Box>
        
        <TabelaAno ano={2025} />
      </Content>
    </Box>
  );
}
