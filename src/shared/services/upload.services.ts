'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function upload(formData: FormData) {
    const session = await getServerSession(authOptions);
    const criado = await fetch(`${baseURL}upload`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then(async (response) => {
        if (response.status === 401) Logout();
        // if (response.status !== 200) return;
        return await response.json();
    })
    return criado;
}

export {
    upload
};
