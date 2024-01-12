import React, { ForwardedRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
}

interface SnackbarComponentProps {
    snackbarState: SnackbarState;
    setSnackbarState: (state: SnackbarState) => void;
}

const Alert = React.forwardRef((props: AlertProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
            sx={{
                ...props.sx,
                '.MuiAlert-message': { color: 'white' },
                '.MuiAlert-icon': { color: 'white' },
                '.MuiAlert-action': {
                    '.MuiButtonBase-root': { color: 'white' }
                }
            }}
        />
    );
});
Alert.displayName = 'Alert';

export const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ snackbarState, setSnackbarState }) => (
    <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
    >
        <Alert
            onClose={() => setSnackbarState({ ...snackbarState, open: false })}
            severity={snackbarState.severity}
            sx={{ width: '100%' }}
        >
            {snackbarState.message}
        </Alert>
    </Snackbar>
);