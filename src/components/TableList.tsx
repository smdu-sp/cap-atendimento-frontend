"use client";

import React from "react";
import { Table } from "@mui/joy";
import * as dateFnsTz from "date-fns-tz";
import { format } from "date-fns";

interface TabelaListaProps {
  data: any[];
}

const TabelaLista: React.FC<TabelaListaProps> = ({ data }) => {
  return (
    <Table sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}>
      <thead>
        <tr>
          <th>Munícipe</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Processo</th>
          <th>Técnico SMUL</th>
          <th>Coordenadoria</th>
          <th>Motivo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((agendamento, index) => (
          <tr key={index}>
            <td>{agendamento.municipe}</td>
            <td>{new Date(agendamento.datainicio).toLocaleDateString()}</td>
            <td>
              {format(
                dateFnsTz.utcToZonedTime(
                  new Date(agendamento.datainicio),
                  "America/Sao_Paulo"
                ),
                "HH:mm"
              )}
            </td>
            <td>{agendamento.processo}</td>
            <td>{agendamento.tecnico}</td>
            <td>{agendamento.coordenadoria}</td>
            <td>{agendamento.motivo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaLista;
