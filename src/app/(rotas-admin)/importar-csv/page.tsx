"use client";

import Content from "@/components/Content";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/joy";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { upload } from "@/shared/services/agendamentos.services";

const FileUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await upload(formData);
      console.log(response.message);
      // setUploadStatus(response.data); // Exibir a resposta do backend
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      setUploadStatus("Erro ao enviar o arquivo.");
    }
  };

  return (
    <Content
      breadcrumbs={[{ label: "Importar CSV", href: "/importar-csv" }]}
      titulo="Importar CSV"
      pagina="Importar CSV"
    >
      <Container
        maxWidth="sm"
        sx={{ mt: 4, display: "flex", flexDirection: "column" }}
      >
        <input
          accept="*/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            size="small"
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 16,
              px: 3,
              py: 1.5,
              mt: 1,
              mb: 2,
            }}
          >
            Escolher Arquivo
          </Button>
        </label>

        {selectedFile && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Arquivo selecionado: <strong>{selectedFile.name}</strong>
          </Typography>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={!selectedFile}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontSize: 16,
            px: 3,
            py: 1.5,
          }}
        >
          Enviar Arquivo
        </Button>

        {uploadStatus && (
          <Typography
            variant="body2"
            color={uploadStatus.includes("Erro") ? "error" : "success"}
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            {uploadStatus}
          </Typography>
        )}
      </Container>
    </Content>
  );
};

export default FileUploadPage;
