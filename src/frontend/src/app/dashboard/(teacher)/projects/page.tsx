"use client";
import React from 'react';
import { Unstable_Grid2 as Grid, Typography, Button, IconButton, SvgIcon, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
import { ProjectModal } from './_components/ProjectModal';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const validationSchema = Yup.object({
    id: Yup.number(),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

interface Values {
    id?: number;
    title: string;
    description: string;
}

export default function Projects() {
    const { data } = swr('/projects', fetcher);

    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            id: undefined,
            title: "",
            description: "",
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                switch (action) {
                    case "add":
                        await axiosInstance.post('/projects', {
                            title: values.title,
                            description: values.description,
                        });
                        showSnackbar("Project created", "success");
                        break;
                    case "edit":
                        await axiosInstance.put(`/projects/${values.id}`, {
                            title: values.title,
                            description: values.description,
                        });
                        showSnackbar("Project updated", "success");
                        break;
                    case "delete":
                        await axiosInstance.delete(`/projects/${values.id}`);
                        showSnackbar("Project deleted", "success");
                        break;
                }

                mutate('/projects');
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
            formik.setFieldValue('title', values.title);
            formik.setFieldValue('description', values.description);
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
                        <Typography variant="h4">Projects</Typography>
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
                            New project
                        </Button>
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
                                    <Tooltip title="Teams">
                                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
                                            <SvgIcon fontSize="small" sx={{ mr: 2 }}>
                                                <GroupsIcon />
                                            </SvgIcon>

                                            <Typography variant="body1">
                                                {project.Teams.length}
                                            </Typography>
                                        </div>
                                    </Tooltip>
                                    <IconButton
                                        onClick={() => handleOpen("edit", project)}
                                    >
                                        <SvgIcon fontSize="small" color="primary">
                                            <EditIcon />
                                        </SvgIcon>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpen("delete", project)}
                                    >
                                        <SvgIcon fontSize="small" color="error">
                                            <DeleteIcon />
                                        </SvgIcon>
                                    </IconButton>
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

            <ProjectModal
                open={open}
                action={action}
                handleClose={handleClose}
                onSubmit={formik.handleSubmit}
                formik={formik}
            />
        </>
    )
}