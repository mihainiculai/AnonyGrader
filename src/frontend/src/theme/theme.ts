import { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { components } from './components';
import { typography } from './typography';
import { shadows } from './shadows';

const generateTheme = (mode: 'light' | 'dark') => createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440
        }
    },
    components: components(mode) as Theme['components'],
    palette: palette(mode),
    shadows: shadows() as Theme['shadows'],
    shape: { borderRadius: 8 },
    typography: typography() as Theme['typography'],
});

export default generateTheme;
