import React from 'react';
import Link from '@mui/material/Link';
import { Avatar, Box, Card, CardContent, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export const AboutInstitution = () => {
    return (
        <>
            <Card sx={{ backgroundColor: 'primary.main' }} >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#fff'
                        }}
                    >
                        <Typography variant="h5">
                            Institution
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 2 }} >
                            <Grid>
                                <Avatar
                                    alt="Logo ASE"
                                    src="/avatars/avatar-ase.png"
                                    sx={{
                                        height: 80,
                                        mb: 2,
                                        width: 80
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Typography variant="h6" sx={{ mb: 2 }} >
                                    Academia de Studii Economice
                                </Typography>

                                <Box sx={{ height: '3px', width: '3rem', mb: 2, background: '#fff' }} />

                                <Link href="mailto:contact@ase.ro" underline="hover">
                                    <Grid container spacing={1} >
                                        <Grid>
                                            <EmailIcon sx={{ color: '#fff' }} />
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="#fff">
                                                contact@ase.ro
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                                <Link href="tel:+40213191900" underline="hover">
                                    <Grid container spacing={1} >
                                        <Grid>
                                            <PhoneIcon sx={{ color: '#fff' }} />
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="#fff">
                                                +40 21 319 1900
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}