"use client";
import React from 'react';
import { Unstable_Grid2 as Grid, Typography, Button, IconButton, SvgIcon, Tooltip, Accordion, AccordionSummary, AccordionDetails, Avatar, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import swr from 'swr';
import { fetcher } from '@/components/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutate } from 'swr';
import { axiosInstance } from "@/components/axiosInstance";
import { AxiosError } from "axios";
import { useSnackbar } from "@/contexts/snackbar-context";
import { ErrorResponse } from '@/types/error-response';
import { TeamModal } from './_components/TeamModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const validationSchema = Yup.object({
    id: Yup.number(),
    studentsId: Yup.array(),
    projectId: Yup.number(),
});

interface Values {
    id?: number;
    studentsId: number[];
    projectId: number;
}

export default function Project({ params }: { params: { id: number } }) {
    const { data: project } = swr(`/projects/${params.id}`, fetcher);
    const { data: students } = swr(`/users/students`, fetcher);

    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            id: undefined,
            studentsId: [],
            projectId: params.id,
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                switch (action) {
                    case "add":
                        await axiosInstance.post('/teams', values);
                        showSnackbar("Team created", "success");
                        break;
                    case "edit":
                        await axiosInstance.put(`/teams/${values.id}`, values);
                        showSnackbar("Team updated", "success");
                        break;
                    case "delete":
                        await axiosInstance.delete(`/teams/${values.id}`);
                        showSnackbar("Team deleted", "success");
                        break;
                }

                mutate(`/projects/${params.id}`);
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
    const [action, setAction] = React.useState("add");

    const handleOpen = (action: string = "add", values: any = {}) => {
        formik.resetForm();
        setAction(action);

        if (action === "edit" || action === "delete") {
            formik.setFieldValue('id', values.id);
            formik.setFieldValue('studentsId', values.Users.map((student: any) => student.id));
        }

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Grid container justifyContent={'space-between'}>
                    <Grid>
                        <Typography variant="h4">{project?.title}</Typography>
                    </Grid>
                    <Grid>
                        <Button
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <AddIcon />
                                </SvgIcon>
                            )}
                            variant="contained"
                            onClick={() => {
                                setAction("add");
                                handleOpen();
                            }}
                        >
                            New Team
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div>
                {project?.Teams.map((team: any) => (
                    <Accordion key={team.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Grid container alignItems={'center'} justifyContent={'space-between'} xs={12}>
                                <Grid xs={7}>
                                    <Typography variant="h6">
                                        {team.teamName}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                        {team.Users.map((student: any) => (
                                            <>
                                                <Chip
                                                    avatar={<Avatar />}
                                                    label={student.name}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </>
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid justifyContent={'flex-end'} container>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleOpen("edit", team)}
                                        >
                                            <SvgIcon fontSize="small" color="primary">
                                                <EditIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => handleOpen("delete", team)}
                                        >
                                            <SvgIcon fontSize="small" color="error">
                                                <DeleteIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} direction={'column'}>
                                <Grid container spacing={2} alignItems={'center'}>
                                    <Grid xs={12} md={3}>
                                        <Typography variant="h6">
                                            Project name:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={9}>
                                        <Typography>
                                            {team.projectName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems={'center'}>
                                    <Grid xs={12} md={3}>
                                        <Typography variant="h6">
                                            Project details:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={9}>
                                        <Typography>
                                            {team.projectDetails || "No details"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid xs={12} md={3}>
                                        <Typography variant="h6">
                                            Deliverables:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={9}>
                                        {team.Deliverables.map((deliverable: any) => (
                                            <>
                                                <Accordion key={deliverable.id}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                    >
                                                        <Grid container alignItems={'center'} justifyContent={'space-between'} xs={12}>
                                                            <Grid xs={7}>
                                                                <Typography variant="h6">
                                                                    {deliverable.title}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid container spacing={2} direction={'column'}>
                                                            <Grid container spacing={2} alignItems={'center'}>
                                                                <Grid xs={12} md={3}>
                                                                    <Typography variant="h6">
                                                                        Details:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={12} md={9}>
                                                                    <Typography>
                                                                        {deliverable.details || "No details"}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} alignItems={'center'}>
                                                                <Grid xs={12} md={3}>
                                                                    <Typography variant="h6">
                                                                        Grade:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={12} md={9}>
                                                                    <Typography>
                                                                        {deliverable.grade || "-"} / 10
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} alignItems={'center'}>
                                                                <Grid xs={12} md={3}>
                                                                    <Typography variant="h6">
                                                                        Votes:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={12} md={9}>
                                                                    <Typography>
                                                                        {deliverable.gradeCount || "0"} / {deliverable.gradeCountTotal || "-"}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </>
                                        ))}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

            <TeamModal
                open={open}
                action={action}
                handleClose={handleClose}
                onSubmit={formik.handleSubmit}
                students={students}
                formik={formik}
            />
        </>
    )
}