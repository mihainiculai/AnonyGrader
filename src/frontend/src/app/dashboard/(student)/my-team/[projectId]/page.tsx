"use client";
import React from 'react';
import { Unstable_Grid2 as Grid, Typography, Card, CardContent, Box, Button, Stack, Chip, Avatar, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import swr from 'swr';
import { fetcher } from '@/components/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutate } from 'swr';
import { axiosInstance } from "@/components/axiosInstance";
import { AxiosError } from "axios";
import { useSnackbar } from "@/contexts/snackbar-context";
import { ErrorResponse } from '@/types/error-response';
import { EditProjectModal } from './_components/EditProjectModal';
import { PartialDeliverable } from './_components/PartialDeliverable';

const validationSchema = Yup.object({
    id: Yup.number(),
    teamName: Yup.string().required('Team name is required'),
    projectName: Yup.string().required('Project name is required'),
    projectDescription: Yup.string()
});

interface Values {
    id: number;
    teamName: string;
    projectName: string;
    projectDescription: string;
}

export default function MyTeam({ params }: { params: { projectId: number } }) {
    const { data: team } = swr(`/teams/${params.projectId}`, fetcher);

    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            id: team?.id,
            teamName: team?.teamName,
            projectName: team?.projectName,
            projectDescription: team?.projectDescription,
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                await axiosInstance.put(`/teams/project/${values.id}`, values);
                showSnackbar("Project updated", "success");

                mutate(`/teams/${params.projectId}`);
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

        formik.setFieldValue('id', team?.id);
        formik.setFieldValue('teamName', values.teamName);
        formik.setFieldValue('projectName', values.projectName);
        formik.setFieldValue('projectDescription', values.projectDescription);

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div>
                <Grid container justifyContent={'space-between'}>
                    <Grid>
                        <Typography variant="h4">{team?.teamName}</Typography>
                    </Grid>
                    <Button
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <EditIcon />
                            </SvgIcon>
                        )}
                        variant="contained"
                        onClick={() => {
                            handleOpen(team);
                        }}
                    >
                        Edit details
                    </Button>
                </Grid>
            </div>

            <div>
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography variant="h5" sx={{ mb: 2 }}>Project Details</Typography>

                                    <Typography variant="h6">Title: {team?.projectName}</Typography>

                                    <Typography variant="h6" sx={{ mt: 2 }}>Description:</Typography>
                                    <Typography>{team?.projectDescription ? team?.projectDescription : "No description"}</Typography>

                                    <Typography variant="h6" sx={{ mt: 2 }}>Members:</Typography>
                                    <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                                        {team?.Users.map((student: any) => (
                                            <>
                                                <Chip avatar={<Avatar />} label={student.name} key={student.id} />
                                            </>
                                        ))}
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Stack spacing={3}>
                                        <PartialDeliverable teamId={team?.id} deliverables={team?.Deliverables} projectId={params.projectId} />
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <EditProjectModal open={open} handleClose={handleClose} formik={formik} />
        </>
    )
}