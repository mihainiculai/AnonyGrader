import { Unstable_Grid2 as Grid, Modal, Box, TextField, Button, Paper, Typography } from '@mui/material';

export const ProjectModal = ({ open, action, handleClose, formik }: any) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper elevation={3} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '100%', sm: 600 }, p: 4 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {action.charAt(0).toUpperCase() + action.slice(1)} project
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                disabled={action === "delete"}
                                {...formik.getFieldProps('title')}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                minRows={4}
                                disabled={action === "delete"}
                                {...formik.getFieldProps('description')}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                        <Button type="submit" variant="contained" color={action === "delete" ? "error" : "primary"}>{action.charAt(0).toUpperCase() + action.slice(1)} project</Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
}