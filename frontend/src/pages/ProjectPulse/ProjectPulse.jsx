import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(0),
    },
    paper: {
        height: 350,
        width: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: theme.spacing(-10), // Reduce the padding inside the boxes
        backgroundColor: '#B2BEB5', // Change the color of the boxes to ash
        border: '2px solid #FFF',
    },
    greeting: {
        marginBottom: theme.spacing(2), // Add a margin to the bottom of the greeting
        marginTop: theme.spacing(-14), // Add a negative margin to the top of the greeting
    },
}));
function ProjectPulse() {
    const classes = useStyles();
    const [selectedProject, setSelectedProject] = useState(null);
    const [open, setOpen] = useState(false);

    const projects = [
        { id: 1, name: 'Project 1', status: 'Active' },
        { id: 2, name: 'Project 2', status: 'Inactive' },
        // Add more projects as needed
    ];

    const handleOpen = (project) => {
        setSelectedProject(project);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.greeting}>Hey, User</Typography>
            <Grid container spacing={1} style={{ marginLeft: '20px', marginTop: '50px' }}> {/* Add a left margin to the Grid container */}
                {projects.map((project) => (
                    <Grid key={project.id} item xs={4}>
                        <Paper className={classes.paper} onClick={() => handleOpen(project)}>
                            <Typography variant="h4">{project.name}</Typography> {/* Increase the size of the text */}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {selectedProject && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth={true}
                >
                    <DialogTitle>{selectedProject.name}</DialogTitle>
                    <DialogContent style={{ minHeight: '400px' }}> {/* Increase the height of the DialogContent */}
                        <p>Status: {selectedProject.status}</p>
                        <Link to="/team">
                            <Button variant="contained" color="primary">
                                View Team Details
                            </Button>
                        </Link>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default ProjectPulse;