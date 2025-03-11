import { FileUpload, ListAlt, CalendarMonth, Home, Person, DateRange } from '@mui/icons-material';

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
            title: 'Agendamentos por Ano',
            href: '/agendamentos-por-ano',
            name: 'agendamentos-por-ano',
            icon: CalendarMonth,
        },
        {
            title: 'Agendamentos por período',
            href: '/agendamentos-por-periodo',
            name: 'agendamentos-por-periodo',
            icon: DateRange,
        },
        {
            title: 'Lista de Agendamentos',
            href: '/lista-de-agendamentos',
            name: 'lista-de-agendamentos',
            icon: ListAlt,
        },
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