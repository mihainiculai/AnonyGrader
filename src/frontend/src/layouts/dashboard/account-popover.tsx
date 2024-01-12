import { useCallback, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '@/contexts/auth-context';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';

interface AccountPopoverProps {
    anchorEl: HTMLElement | null;
    onClose?: () => void;
    open: boolean;
}

export const AccountPopover: React.FC<AccountPopoverProps> = ({ anchorEl, onClose, open }) => {
    const router = useRouter();
    const auth = useContext(AuthContext) as AuthContextType;

    const handleSignOut = useCallback(
        () => {
            onClose?.();
            auth.signOut();
            router.push('/auth/login');
        },
        [onClose, auth, router]
    );

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            slotProps={{ paper: { sx: { width: 200 } } }}
        >
            <Box sx={{ py: 1.5, px: 2 }}>
                <Typography variant="overline"> Contul meu </Typography>
                <Typography color="text.secondary" variant="body2" > {auth.user?.email} </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': { borderRadius: 1 }
                }}
            >
                <MenuItem
                    component={Link}
                    href="/dashboard/account"
                    onClick={onClose}
                > Profil </MenuItem>
                <MenuItem onClick={handleSignOut}> Deconectare </MenuItem>
            </MenuList>
        </Popover>
    );
};