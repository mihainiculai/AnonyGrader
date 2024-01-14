"use client";
import React from 'react';
import Link from 'next/link';
import { Unstable_Grid2 as Grid, Typography, Button, IconButton, SvgIcon, Tooltip, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Box } from '@mui/material';
import swr from 'swr';
import { fetcher } from '@/components/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutate } from 'swr';
import { axiosInstance } from "@/components/axiosInstance";
import { AxiosError } from "axios";
import { useSnackbar } from "@/contexts/snackbar-context";
import { ErrorResponse } from '@/types/error-response';
import { GradeModal } from './GradeModal';
import GradeIcon from '@mui/icons-material/Grade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const validationSchema = Yup.object({
    id: Yup.number(),
    grade: Yup.number()
        .min(1, 'Grade must be between 1 and 10')
        .max(10, 'Grade must be between 1 and 10')
        .integer('Grade must be an integer')
        .required('Grade is required'),

});

interface Values {
    id?: number;
    grade: number | null;
}

export const GradeCard = () => {
    const { data } = swr('/grades', fetcher);

    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            id: undefined,
            grade: null,
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                await axiosInstance.put(`/grades/${values.id}`, {
                    grade: values.grade,
                });
                showSnackbar("Grade setted", "success");

                mutate('/grades');
                handleClose();
            }
            catch (err) {
                const error = err as AxiosError<ErrorResponse>;
                if (error.response && error.response.data && error.response.data.Message) {
                    showSnackbar(error.response.data.Message, "error");
                } else {
                    showSnackbar("An unknown error has occurred", "error");
                }
            }
        }
    });

    const [open, setOpen] = React.useState(false);

    const handleOpen = (values: any = {}) => {
        formik.resetForm();

        formik.setFieldValue('id', values.id);
        formik.setFieldValue('grade', values.grade);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div>
                            <Grid container justifyContent={'space-between'}>
                                <Grid>
                                    <Typography variant="h5" sx={{ mb: 1 }}>Project to grade</Typography>
                                    <Typography sx={{ mb: 3 }}>Here you can grade the projects of other teams.</Typography>
                                </Grid>
                            </Grid>
                        </div>

                        {data?.map((grade: any) => (
                            <Accordion key={grade.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Grid container alignItems={'center'} justifyContent={'space-between'} xs={12}>
                                        <Grid xs={7}>
                                            <Typography variant="h6">
                                                {grade.Deliverable.Team.Project.title}
                                            </Typography>
                                        </Grid>
                                        <Grid justifyContent={'flex-end'} container>
                                            <Button
                                                variant={grade.grade ? "outlined" : "contained"}
                                                color={grade.grade ? "secondary" : "primary"}
                                                startIcon={<GradeIcon />}
                                                sx={{ mr: 2 }}
                                                onClick={() => handleOpen(grade)}
                                            >
                                                {grade.grade ? "Change grade" : "Set grade"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} direction={'column'}>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Team name:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Typography>
                                                    {grade.Deliverable.Team.teamName}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Project title:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Typography>
                                                    {grade.Deliverable.Team.projectName}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Project description:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Typography>
                                                    {grade.Deliverable.Team.projectDescription || "No description"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Deliverable title:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Typography>
                                                    {grade.Deliverable.title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Deliverable details:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Typography>
                                                    {grade.Deliverable.details}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Video link:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Link href={grade.Deliverable.videoLink}>
                                                    <Typography color="primary">
                                                        {grade.Deliverable.videoLink || "-"}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid xs={12} md={3}>
                                                <Typography variant="h6">
                                                    Server link:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} md={9}>
                                                <Link href={grade.Deliverable.serverLink || "#"}>
                                                    <Typography color="primary">
                                                        {grade.Deliverable.serverLink || "-"}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            <GradeModal
                open={open}
                handleClose={handleClose}
                onSubmit={formik.handleSubmit}
                formik={formik}
            />
        </>
    )
}