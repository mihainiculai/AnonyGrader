"use client";
import React from 'react';
import Link from 'next/link';
import { Unstable_Grid2 as Grid, Typography, Button, IconButton, SvgIcon, Tooltip, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutate } from 'swr';
import { axiosInstance } from "@/components/axiosInstance";
import { AxiosError } from "axios";
import { useSnackbar } from "@/contexts/snackbar-context";
import { ErrorResponse } from '@/types/error-response';
import { DeliverableModal } from './DeliverableModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';

const validationSchema = Yup.object({
    id: Yup.number(),
    title: Yup.string().required('Title is required'),
    details: Yup.string().required('Details is required'),
    dueDate: Yup.date().required('Due date is required'),
    videoLink: Yup.string().url('Video link must be a valid URL').nullable(),
    serverLink: Yup.string().url('Server link must be a valid URL').nullable(),
});

interface Values {
    id?: number;
    title: string;
    details: string;
    dueDate: Date;
    videoLink?: string;
    serverLink?: string;
}

export const PartialDeliverable = ({ teamId, projectId, deliverables }: any) => {
    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            id: undefined,
            title: '',
            details: '',
            dueDate: new Date(),
            videoLink: undefined,
            serverLink: undefined,
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                switch (action) {
                    case "add":
                        await axiosInstance.post('/deliverables', {
                            teamId: teamId,
                            title: values.title,
                            details: values.details,
                            dueDate: values.dueDate,
                            videoLink: values.videoLink,
                            serverLink: values.serverLink,
                        });
                        showSnackbar("Deliverable created", "success");
                        break;
                    case "edit":
                        await axiosInstance.put(`/deliverables/${values.id}`, {
                            title: values.title,
                            details: values.details,
                            dueDate: values.dueDate,
                            videoLink: values.videoLink,
                            serverLink: values.serverLink,
                        });
                        showSnackbar("Deliverable updated", "success");
                        break;
                    case "delete":
                        await axiosInstance.delete(`/deliverables/${values.id}`);
                        showSnackbar("Deliverable deleted", "success");
                        break;
                }

                mutate('/teams/' + projectId);
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
            formik.setFieldValue('details', values.details);
            formik.setFieldValue('dueDate', values.dueDate);
            formik.setFieldValue('videoLink', values.videoLink);
            formik.setFieldValue('serverLink', values.serverLink);
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
                        <Typography variant="h4">Partial Deliverables</Typography>
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
                            New Deliverable
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div>
                {deliverables?.sort((a: any, b: any) => dayjs(a.dueDate).isAfter(dayjs(b.dueDate)) ? 1 : -1).map((deliverable: any) => (
                    <Accordion key={deliverable.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Grid container alignItems={'center'} justifyContent={'space-between'} xs={12}>
                                <Grid xs={12} md={6}>
                                    <Typography variant="h6">
                                        {deliverable.title}
                                    </Typography>
                                </Grid>
                                <Grid xs={8} md={4}>
                                    <Typography variant="body1">
                                        Due date: <b>{dayjs(deliverable.dueDate).format('DD/MM/YYYY HH:mm')}</b>
                                    </Typography>
                                </Grid>
                                <Grid justifyContent={'flex-end'} container xs={4} md={2}>
                                    {!dayjs().isAfter(dayjs(deliverable.dueDate)) && (
                                        <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleOpen("edit", deliverable)}
                                            
                                        >
                                            <SvgIcon fontSize="small" color="primary">
                                                <EditIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </Tooltip>
                                    )}
                                    
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => handleOpen("delete", deliverable)}
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
                                    <Grid xs={12} md={2}>
                                        <Typography variant="h6">
                                            Details:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={10}>
                                        <Typography>
                                            {deliverable.details}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {deliverable.videoLink && (
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid xs={12} md={2}>
                                            <Typography variant="h6">
                                                Video Link:
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} md={10}>
                                            <Link href={deliverable.videoLink}>
                                                <Typography color="primary">
                                                    {deliverable.videoLink}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                )}
                                {deliverable.serverLink && (
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid xs={12} md={2}>
                                            <Typography variant="h6">
                                                Server Link:
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} md={10}>
                                            <Link href={deliverable.serverLink}>
                                                <Typography color="primary">
                                                    {deliverable.serverLink}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                )}
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2} alignItems={'center'}>
                                    <Grid xs={12} md={2}>
                                        <Typography variant="h6">
                                            Created at:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={10}>
                                        <Typography>
                                            {dayjs(deliverable.createdAt).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems={'center'}>
                                    <Grid xs={12} md={2}>
                                        <Typography variant="h6">
                                            Updated at:
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={10}>
                                        <Typography>
                                            {dayjs(deliverable.updatedAt).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

            <DeliverableModal
                open={open}
                action={action}
                handleClose={handleClose}
                onSubmit={formik.handleSubmit}
                formik={formik}
            />
        </>
    )
}