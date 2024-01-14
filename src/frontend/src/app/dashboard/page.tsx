"use client";
import React from 'react';
import Link from 'next/link';
import { Unstable_Grid2 as Grid, Typography, Card, Button, IconButton, SvgIcon, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { GradeCard } from './_components/GradeCard';

export default function Dashboard() {
    return (
        <>
            <div>
                <Grid container justifyContent={'space-between'}>
                    <Grid>
                        <Typography variant="h4">Dashboard</Typography>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={2} direction={'column'}>
                    <Grid xs={12}>
                        <GradeCard />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}