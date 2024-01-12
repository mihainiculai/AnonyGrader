"use client";
import React, { useState, useContext } from "react";
import { AuthContext, AuthContextType } from '@/contexts/auth-context';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link as MuiLink, Button, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface FormValues {
    email: string;
    password: string;
    submit: string | null;
}

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function Login() {
    const router = useRouter();
    const auth = useContext(AuthContext) as AuthContextType;

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
            submit: null,
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values: any, helpers: any) => {
            try {
                await auth.signIn(values.email, values.password);

                router.push('/dashboard');
            } catch (err: any) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <>
            <Stack spacing={1} sx={{ mb: 6 }}>
                <Typography variant="h4">Sign In</Typography>
                <Typography color="text.secondary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    Don&apos;t have an account?
                    <Link href="/auth/register" style={{ marginLeft: '5px' }}>
                        <MuiLink component="button" variant="body2">
                            Register
                        </MuiLink>
                    </Link>
                </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                {formik.errors.submit && (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                        {formik.errors.submit}
                    </Typography>
                )}
                
                <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 4 }}
                    type="submit"
                    variant="contained"
                >
                    Login
                </Button>
            </form>
        </>
    );
};