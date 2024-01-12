"use client";
import React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { AuthContext, AuthContextType } from '@/contexts/auth-context';

interface ErrorResponse {
    Message: string;
}

const AccountProfile: React.FC = () => {
    const auth = React.useContext(AuthContext) as AuthContextType;

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                            color: '#fff',
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        {auth.user?.name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {auth.user?.roleId === 2 ? "Teacher" : "Student"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default AccountProfile;