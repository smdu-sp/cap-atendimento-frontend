import { FileUpload, Handyman, Home, Person } from '@mui/icons-material';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
        },
        {
            title: 'Relatórios',
            href: '/relatorios',
            name: 'relatorios',
            icon: Handyman,
        }
    ],
    adminOptions: [
        {
            title: 'Importar CSV',
            href: '/importar-csv',
            name: 'csv',
            icon: FileUpload,
        },        
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        }         
    ]
}