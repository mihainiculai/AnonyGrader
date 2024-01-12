"use client";
import { useEffect } from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWR from 'swr';
import { fetcher } from "@/components/fetcher";
import { mutate } from 'swr';
import { axiosInstance } from "@/components/axiosInstance";
import { AxiosError } from "axios";
import { useSnackbar } from "@/contexts/snackbar-context";

interface Values {
    name: string;
    email: string;
}

interface ErrorResponse {
    Message: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
});

export const AccountProfileDetails = () => {
    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
        },
        validationSchema,
        onSubmit: async (values: Values) => {
            try {
                await axiosInstance.put('users/changeName', { name: values.name });
                showSnackbar("The name has been changed", "success");
                mutate('auth/me');
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

    const { data: user } = useSWR('auth/me', fetcher)

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user.name,
                email: user.email,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    
    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Card>
                <CardHeader subheader="The information can be edited" title="Profile" />
                <CardContent sx={{ pt: 0 }}>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    {...formik.getFieldProps('name')}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    {...formik.getFieldProps('email')}
                                    helperText="The email address is not changeable."
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button type="submit" variant="contained">Save details</Button>
                </CardActions>
            </Card>
        </form>
    );
};