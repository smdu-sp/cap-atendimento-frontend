"use server";

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
  await signOut({ redirect: false });
  window.location.href = "/login";
}

const baseURL = process.env.API_URL || "http://localhost:3000/";

async function upload(formData: FormData) {
  const session = await getServerSession(authOptions);
  const criado = await fetch(`${baseURL}upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  }).then(async (response) => {
    if (response.status === 401) Logout();
    // if (response.status !== 200) return;
    return await response.json();
  });
  return criado;
}

 async function getAgendamentosPorAno(ano: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    Logout();
    return { coordenadorias: [], totalAno: 0 };
  }

  try {
    const response = await fetch(`${baseURL}agendamentos/ano/${ano}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      Logout();
      return { coordenadorias: [], totalAno: 0 };
    }

    if (!response.ok) {
      console.error("Erro ao buscar agendamentos:", await response.text());
      return { coordenadorias: [], totalAno: 0 };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { coordenadorias: [], totalAno: 0 };
  }

}

async function getListaAgendamentos(datainicio: Date, datafim: Date) {
  const session = await getServerSession(authOptions);
  if (!session) {
    Logout();
    return [];
  }

  try {
    const response = await fetch(
      `${baseURL}agendamentos/lista-de-agendamentos?dataInicio=${datainicio}&dataFim=${datafim}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      Logout();
      return [];
    }

    if (!response.ok) {
      console.error("Erro ao buscar agendamentos:", await response.text());
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}

export { upload, getAgendamentosPorAno, getListaAgendamentos};
