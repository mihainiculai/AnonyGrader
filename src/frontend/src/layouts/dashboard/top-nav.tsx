import React, { useContext } from "react";
import { Avatar, Box, IconButton, Stack, useMediaQuery, Tooltip, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeContext from "../../contexts/theme-context";
import { usePopover } from "../../hooks/use-popover";
import { AccountPopover } from "./account-popover";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

interface TopNavProps {
    onNavOpen: () => void;
}

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onNavOpen }) => {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    const accountPopover = usePopover();
    const { theme, toggleTheme }: ThemeContextType = useContext(ThemeContext);

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: "blur(6px)",
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: "sticky",
                    left: { lg: `${SIDE_NAV_WIDTH}px`, },
                    top: 0,
                    width: { lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`, },
                    zIndex: (theme) => theme.zIndex.appBar,
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <MenuIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Tooltip title="Comută între modurile light și dark">
                            <IconButton
                                onClick={toggleTheme}
                                edge="end"
                                aria-label="Comută între modurile light și dark"
                            >
                                {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: "pointer",
                                height: 40,
                                width: 40,
                                color: "text.dprimary"
                            }}
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
};
