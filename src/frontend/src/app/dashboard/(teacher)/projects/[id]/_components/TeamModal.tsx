import React from 'react';
import { Unstable_Grid2 as Grid, Modal, Box, Button, Paper, Typography, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, Avatar } from '@mui/material';

export const TeamModal = ({ open, action, handleClose, students, formik }: any) => {
    const renderValue = (selected: any) => (
        <div>
            {selected.map((value: string) => (
                <Chip avatar={<Avatar />} key={value} label={value} />
            ))}
        </div>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper elevation={3} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '100%', sm: 600 }, p: 4 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {action.charAt(0).toUpperCase() + action.slice(1)} team
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="students-label">Students</InputLabel>
                                <Select
                                    labelId="students-label"
                                    multiple
                                    value={formik.values.studentsId.map((id: any) => students.find((s: any) => s.id === id)?.name || '')}
                                    onChange={(event) => {
                                        const ids = event.target.value.map(
                                            (name: string) => students.find((s: any) => s.name === name)?.id
                                        );
                                        formik.setFieldValue('studentsId', ids);
                                    }}
                                    renderValue={renderValue}
                                >
                                    {students?.map((student: any) => (
                                        <MenuItem key={student.id} value={student.name}>
                                            {student.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
};
