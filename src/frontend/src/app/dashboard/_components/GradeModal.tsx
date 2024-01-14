import { Unstable_Grid2 as Grid, Modal, Box, TextField, Button, Paper, Typography } from '@mui/material';

export const GradeModal = ({ open, handleClose, formik }: any) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper elevation={3} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '100%', sm: 600 }, p: 4 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Set grade
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Grade"
                                type='number'
                                {...formik.getFieldProps('grade')}
                                error={formik.touched.grade && Boolean(formik.errors.grade)}
                                helperText={formik.touched.grade && formik.errors.grade}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Set grade</Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
}