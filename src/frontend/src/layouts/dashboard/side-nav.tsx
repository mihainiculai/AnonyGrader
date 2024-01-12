import NextLink from "next/link";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Drawer, Stack, Typography, useMediaQuery, Avatar, List } from "@mui/material";
import { styled, alpha, Theme } from "@mui/material/styles";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { AuthContext, AuthContextType } from '@/contexts/auth-context';
import packageJson from "../../../package.json";

interface SideNavProps {
    open: boolean;
    onClose: () => void;
}

const ScrollbarStyles = {
    "&::-webkit-scrollbar": {
        width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
    },
};

const StyledAccount = styled("div")(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
    textDecoration: "none",
    color: "inherit",
}));

export const SideNav: React.FC<SideNavProps> = ({ open, onClose }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const displayName = auth.user?.name
    const role = auth.user?.roleId === 2 ? 'Teacher' : 'Student'
    const appVersion = packageJson.version;

    const pathname = usePathname();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

    const [openButtons, setOpenButtons] = useState<{ [key: string]: boolean }>({});

    const toggleButton = (title: string) => {
        setOpenButtons({ ...openButtons, [title]: !openButtons[title] });
    };

    const content = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box component={NextLink} href="/" sx={{ p: 3, display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "inline-flex", height: 32, width: 32 }}>
                    <Image alt="Logo" width={35} height={35} src="/Logo.png" priority />
                </Box>
                <Typography variant="h6" sx={{ ml: 2, color: "text.dprimary" }}>
                    AnonyGrader
                </Typography>
            </Box>
            <Box sx={{ my: 1, mx: 2.5 }}>
                <Link href="/dashboard/account">
                    <StyledAccount>
                        <Avatar alt="Profile Picture" sx={{ color: "text.dprimary" }} />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: "text.dprimary" }}>
                                {displayName}
                            </Typography>

                            <Typography variant="body2" sx={{ color: "text.dsecondary" }}>
                                {role}
                            </Typography>
                        </Box>
                    </StyledAccount>
                </Link>
            </Box>
            <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3, overflowY: 'auto', ...ScrollbarStyles }}>
                <Stack component="ul" spacing={0.5} sx={{ listStyle: "none", p: 0, m: 0 }}>
                    {items.map((item) => {
                        const active = item.path ? pathname === item.path : false;

                        const isRoleAllowed = !item.privateRoles || item.privateRoles.includes(auth.user?.roleId as number);

                        return isRoleAllowed ? (
                            <div key={item.title}>
                                <SideNavItem
                                    active={active}
                                    disabled={item.disabled}
                                    external={item.external}
                                    icon={item.icon}
                                    path={item.path}
                                    title={item.title}
                                    hasSubMenu={Boolean(item.subMenu)}
                                    isSubMenuOpen={Boolean(openButtons[item.title])}
                                    onClick={() => item.subMenu && toggleButton(item.title)}
                                />
                                {item.subMenu && openButtons[item.title] && (
                                    <List component="div" disablePadding>
                                        {item.subMenu.map((subItem) => {
                                            const subItemActive = subItem.path ? pathname === subItem.path : false;

                                            return (
                                                <div style={{ marginLeft: "20px" }} key={subItem.title}>
                                                    <SideNavItem
                                                        key={subItem.title}
                                                        active={subItemActive}
                                                        disabled={subItem.disabled}
                                                        external={subItem.external}
                                                        path={subItem.path}
                                                        icon={subItem.icon}
                                                        title={subItem.title}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </List>
                                )}
                            </div>
                        ) : null;
                    })}
                </Stack>
                <Typography
                    variant="body2"
                    color="neutral.400"
                    sx={{
                        padding: '16px',
                        textAlign: 'center',
                    }}
                >
                    AnonyGrader &#x2022; v{appVersion}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neutral.800",
                        color: "common.white",
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "neutral.800",
                    color: "common.white",
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
