"use client";

import React from "react";
import { Table } from "@mui/joy";

interface TabelaListaProps {
  data: any[];
}

const TabelaLista: React.FC<TabelaListaProps> = ({ data }) => {
  return (
    <Table sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}>
      <thead>
        <tr>
          <th>Munícipe</th>
          <th>Técnico</th>
          <th>Processo</th>
          <th>Coordenadoria</th>
          <th>Data Início</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
        {data.map((agendamento, index) => (
          <tr key={index}>
            <td>{agendamento.municipe}</td>
            <td>{agendamento.tecnico}</td>
            <td>{agendamento.processo}</td>
            <td>{agendamento.coordenadoria}</td>
            <td>{new Date(agendamento.datainicio).toLocaleDateString()}</td>
            <td>{new Date(agendamento.datafim).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaLista;
