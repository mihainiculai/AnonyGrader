"use client";
import { Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { AboutInstitution } from './_components/about-institution';
import { AboutDeveloper } from './_components/about-developer';

export default function About() {
    return (
        <>
            <div>
                <Typography variant="h4">
                    About
                </Typography>
            </div>
            <div>
                <Grid container spacing={3} >
                    <Grid xs={12} md={7} >
                        <AboutInstitution />
                    </Grid>
                    <Grid xs={12} md={5} >
                        <AboutDeveloper />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}