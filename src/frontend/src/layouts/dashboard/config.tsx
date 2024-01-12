import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail';

type Item = {
    title: string;
    path?: string;
    icon?: React.ReactElement;
    disabled?: boolean;
    external?: boolean;
    subMenu?: Item[];
    privateRoles?: number[];
};

export const items: Item[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <HomeIcon fontSize="small" />
    },
    {
        title: 'Projects',
        path: '/dashboard/projects',
        icon: <AssignmentIcon fontSize="small" />,
        privateRoles: [2]
    },
    {
        title: 'About',
        path: '/dashboard/about',
        icon: <ContactMailIcon fontSize="small" />
    }
];