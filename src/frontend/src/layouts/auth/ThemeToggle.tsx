"use client";
import React, { useContext } from "react";
import ThemeContext from "@/contexts/theme-context";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title="Toggle theme" arrow>
            <IconButton
                onClick={toggleTheme}
                edge="end"
                aria-label="Toggle theme"
            >
                {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>

    )
}