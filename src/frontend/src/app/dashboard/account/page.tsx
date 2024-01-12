import { Typography, Unstable_Grid2 as Grid } from '@mui/material';
import AccountProfile from './_components/account-profile';
import { AccountProfileDetails } from './_components/account-profile-details';

export default function Account() {
    return (
        <>
            <div>
                <Typography variant="h4">
                    My Account
                </Typography>
            </div>
            <div>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        <AccountProfile />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                        lg={8}
                    >
                        <AccountProfileDetails />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}