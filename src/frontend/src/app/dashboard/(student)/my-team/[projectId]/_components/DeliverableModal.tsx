import { Unstable_Grid2 as Grid, Modal, Box, TextField, Button, Paper, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

export const DeliverableModal = ({ open, action, handleClose, formik }: any) => {
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
                                label="Details"
                                disabled={action === "delete"}
                                {...formik.getFieldProps('details')}
                                error={formik.touched.details && Boolean(formik.errors.details)}
                                helperText={formik.touched.details && formik.errors.details}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <DateTimePicker
                                label="Due Date"
                                disabled={action === "delete"}
                                value={dayjs(formik.values.dueDate)}
                                onChange={value => formik.setFieldValue('dueDate', value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Video Link"
                                disabled={action === "delete"}
                                {...formik.getFieldProps('videoLink')}
                                error={formik.touched.videoLink && Boolean(formik.errors.videoLink)}
                                helperText={formik.touched.videoLink && formik.errors.videoLink}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Server Link"
                                disabled={action === "delete"}
                                {...formik.getFieldProps('serverLink')}
                                error={formik.touched.serverLink && Boolean(formik.errors.serverLink)}
                                helperText={formik.touched.serverLink && formik.errors.serverLink}
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