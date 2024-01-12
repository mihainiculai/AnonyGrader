import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto'
            }}
        >
            <Grid
                container
                sx={{ flex: '1 1 auto' }}
            >
                <Grid
                    xs={12}
                    lg={7}
                    sx={{
                        alignItems: 'center',
                        background: 'radial-gradient(80% 80% at 50% 50%, #3849aa 0%, #090E23 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Image src="/Logo.png" alt="Logo" height="256" width="256" priority />
                        <Typography
                            align="center"
                            color="inherit"
                            sx={{
                                fontSize: '24px',
                                lineHeight: '32px',
                                mb: 1
                            }}
                            variant="h1"
                        >
                            AnonyGrader
                        </Typography>
                        <Typography
                            align="center"
                            sx={{ mb: 3 }}
                            variant="subtitle1"
                        >
                            Anonymous grading for your assignments
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    xs={12}
                    lg={5}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "15px",
                            right: "30px",
                        }}
                    >
                        <ThemeToggle />
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            flex: "1 1 auto",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: "100px",
                                width: "100%",
                            }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
