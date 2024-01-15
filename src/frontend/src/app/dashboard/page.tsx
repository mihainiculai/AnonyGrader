"use client";
import React from 'react';
import { Unstable_Grid2 as Grid, Typography, SvgIcon } from '@mui/material';
import { GradeCard } from './_components/GradeCard';
import { AuthContext, AuthContextType } from '@/contexts/auth-context';
import useSWR from 'swr';
import { fetcher } from "@/components/fetcher";
import StatisticCircle from './_components/StatisticCircle';
import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from '@mui/icons-material/Send';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';

export default function Dashboard() {
    const { data: stats } = useSWR('users/stats', fetcher);
    const authContext = React.useContext(AuthContext) as AuthContextType;

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
                <Grid container spacing={2} direction={'row'} justifyContent="space-around" sx={{ my: 4 }}>
                    <Grid xs={12} md={4}>
                        <StatisticCircle
                            number={stats?.numberOfProjects}
                            icon={<ArticleIcon />}
                            label="Projects"
                        />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <StatisticCircle
                            number={authContext.user?.roleId === 1 ? stats?.numberOfDeliverables : stats?.numberOfTeams}
                            icon={authContext.user?.roleId === 1 ? <SendIcon /> : <GroupsIcon />}
                            label={authContext.user?.roleId === 1 ? "Deliverables" : "Teams coordinated"}
                        />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <StatisticCircle
                            number={authContext.user?.roleId === 1 ? stats?.avgGrade : stats?.numberOfStudents}
                            decimal={authContext.user?.roleId === 1 ? true : false}
                            icon={authContext.user?.roleId === 1 ? <GradeIcon /> : <SchoolIcon />}
                            label={authContext.user?.roleId === 1 ? "Average Grade" : "Students"}
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={2} direction={'column'}>
                    {authContext.user?.roleId === 1 && (
                        <>
                            <Grid xs={12}>
                                <GradeCard />
                            </Grid>
                        </>
                    )}
                </Grid>
            </div>
        </>
    )
}