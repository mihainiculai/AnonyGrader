import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, blue, info, neutral, success, warning } from "./colors";

export function palette(mode: "light" | "dark") {
    return {
        action: {
            active: mode === "light" ? neutral[500] : neutral[200],
            disabled: mode === "light" ? alpha(neutral[900], 0.38) : alpha(neutral[400], 0.38),
            disabledBackground: mode === "light" ? alpha(neutral[900], 0.12) : alpha(neutral[400], 0.12),
            focus: mode === "light" ? alpha(neutral[900], 0.16) : alpha(neutral[400], 0.16),
            hover: mode === "light" ? alpha(neutral[900], 0.04) : alpha(neutral[400], 0.08),
            selected: mode === "light" ? alpha(neutral[900], 0.12) : alpha(neutral[400], 0.24),
        },
        background: {
            default: mode === "light" ? common.white : '#0e1320',
            paper: mode === "light" ? common.white : neutral[900]
        },
        divider: mode === "light" ? "#F2F4F7" : neutral[700],
        error,
        info,
        mode: mode,
        neutral,
        primary: { ...blue, },
        secondary: { main: "#ff7043", },
        success,
        text: {
            primary: mode === "light" ? neutral[900] : neutral[50],
            secondary: mode === "light" ? neutral[500] : neutral[200],
            lprimary: neutral[900],
            lsecondary: neutral[500],
            dprimary: neutral[50],
            dsecondary: neutral[200],
            disabled: mode === "light" ? alpha(neutral[900], 0.38) : alpha(neutral[200], 0.38),
        },
        warning,
    };
}
