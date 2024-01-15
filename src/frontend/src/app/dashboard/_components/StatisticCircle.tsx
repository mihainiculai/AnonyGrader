import React from 'react';
import { Box, Typography, useTheme, SvgIcon } from '@mui/material';
import CountUp from 'react-countup';

const StatisticCircle = ({ number, decimal, icon, label }: { number: number, decimal?: boolean, icon: any, label: string }) => {
    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: theme.spacing(25),
                    height: theme.spacing(25),
                    borderRadius: '50%',
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[3],
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <SvgIcon fontSize='large' color='primary'>
                        {icon}
                    </SvgIcon>
                </Box>
                <Typography variant="h3">
                    <CountUp end={number} duration={2.5} decimal='.' decimals={decimal ? 2 : 0} />
                </Typography>
            </Box>
            <Typography variant="h6" sx={{ mt: 3 }}>
                {label}
            </Typography>
        </Box>
    );
};

export default StatisticCircle;
