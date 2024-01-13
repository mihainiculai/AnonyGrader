"use client";
import React from 'react';
import Link from 'next/link';
import { Unstable_Grid2 as Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import swr from 'swr';
import { fetcher } from '@/components/fetcher';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';

export default function Projects() {
    const { data } = swr('/projects', fetcher);

    return (
        <>
            <div>
                <Grid container justifyContent={'space-between'}>
                    <Grid>
                        <Typography variant="h4">Projects</Typography>
                    </Grid>
                </Grid>
            </div>
            <div>
                {data?.map((project: any) => (
                    <Accordion key={project.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Grid container alignItems={'center'} justifyContent={'space-between'} xs={12}>
                                <Grid xs={7}>
                                    <Typography variant="h6">
                                        {project.title}
                                    </Typography>
                                </Grid>
                                <Grid justifyContent={'flex-end'} container>
                                    <Link href={`/dashboard/my-team/${project.id}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            startIcon={<GroupIcon />}
                                            sx={{ mr: 2 }}
                                        >
                                            My Team
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">
                                Description:
                            </Typography>
                            <Typography>
                                {project.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    )
}