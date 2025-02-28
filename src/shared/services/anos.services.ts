"use server";

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function getAnos() {
    const session = await getServerSession(authOptions);
    
    const response = await fetch(`${baseURL}anos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session?.access_token}`
        }
    });

    if (response.status === 401) Logout();
    if (!response.ok) throw new Error("Erro ao buscar coordenadorias");

    return await response.json();
}

export {
    getAnos,   
};
