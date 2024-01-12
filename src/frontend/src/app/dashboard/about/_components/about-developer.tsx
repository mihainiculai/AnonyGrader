import React from 'react';
import Link from '@mui/material/Link';
import { Avatar, Box, Card, CardContent, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export const AboutDeveloper = () => {
    return (
        <>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h5">
                            Developer
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 2 }} >
                            <Grid>
                                <Avatar
                                    alt="Niculai Mihai Bogdan"
                                    src="/avatars/avatar-niculai-mihai-bogdan.jpg"
                                    sx={{
                                        height: 80,
                                        mb: 2,
                                        width: 80
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Typography variant="h6" sx={{ mb: 2 }} >
                                    Niculai Mihai Bogdan
                                </Typography>

                                <Box sx={{ height: '3px', width: '3rem', mb: 2, background: '#3849aa' }} />

                                <Link href="mailto:horatiu.tibrea@net.ase.ro" underline="hover">
                                    <Grid container spacing={1} >
                                        <Grid>
                                            <EmailIcon />
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="text.secondary">
                                            niculaimihai21@stud.ase.ro
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                                <Link href="tel:+40723538306" underline="hover">
                                    <Grid container spacing={1} >
                                        <Grid>
                                            <PhoneIcon />
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="text.secondary">
                                                +40 750 424 252
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