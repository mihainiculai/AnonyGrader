import { Unstable_Grid2 as Grid, Modal, Box, TextField, Button, Paper, Typography, Divider } from '@mui/material';

export const EditProjectModal = ({ open, handleClose, formik }: any) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper elevation={3} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '100%', sm: 600 }, p: 4 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Edit project details
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Team Name"
                                {...formik.getFieldProps('teamName')}
                                error={formik.touched.teamName && Boolean(formik.errors.teamName)}
                                helperText={formik.touched.teamName && formik.errors.teamName}
                            />
                        </Grid>
                        <Grid xs={12}>
                        <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Project Name"
                                {...formik.getFieldProps('projectName')}
                                error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                                helperText={formik.touched.projectName && formik.errors.projectName}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Project Description"
                                multiline
                                rows={4}
                                {...formik.getFieldProps('projectDescription')}
                                error={formik.touched.projectDescription && Boolean(formik.errors.projectDescription)}
                                helperText={formik.touched.projectDescription && formik.errors.projectDescription}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                        <Button type="submit" variant="contained" color='primary'>Update project</Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
}