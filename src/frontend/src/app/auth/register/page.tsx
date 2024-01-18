"use client";
import React, { useState, useContext } from "react";
import { AuthContext, AuthContextType } from '@/contexts/auth-context';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link as MuiLink, Button, Stack, TextField, Typography, IconButton, InputAdornment, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface FormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: number;
    submit: string | null;
}

const loginValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string().
        test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
        }
    ),
    role: Yup.number().required('Role is required'),
});

export default function Login() {
    const router = useRouter();
    const auth = useContext(AuthContext) as AuthContextType;

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            role: 1,
            submit: null,
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values: any, helpers: any) => {
            try {
                await auth.signUp(values.email, values.password, values.name, values.role);

                router.push('/dashboard');
            } catch (err: any) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.response.data.message });
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <>
            <Stack spacing={1} sx={{ mb: 6 }}>
                <Typography variant="h4">Sign Up</Typography>
                <Typography color="text.secondary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    All ready have an account?
                    <Link href="/auth/login" style={{ marginLeft: '5px' }}>
                        <MuiLink component="button" variant="body2">
                            Login
                        </MuiLink>
                    </Link>
                </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Full Name"
                        name="name"
                        type="text"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
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
                    <TextField
                        label="Confirm Password"
                        name="passwordConfirm"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                        helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup
                            row
                            aria-label="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Student" />
                            <FormControlLabel value="2" control={<Radio />} label="Teacher" />
                        </RadioGroup>
                    </FormControl>
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
                    Create Account
                </Button>
            </form>
        </>
    );
};