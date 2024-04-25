import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { DataGrid } from '@material-ui/data-grid';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { tokens } from "../../Theme";
import axios from 'axios';

const ProjectPulse = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const employeeId = localStorage.getItem('cususerid');  // Fetch employee id from local storage
    if (employeeId) {
      console.log('employeeId:', employeeId);  // Log employeeId
      const url = `http://localhost:8000/projects/employee/${employeeId}/`;
      console.log('Request URL:', url);  // Log request URL
      axios.get(url)  // Use employee id in API URL
        .then(response => {
          console.log(response.data);
          const projects = response.data;
          if (projects) {
            const data = projects.map(project => {
              if (project) {
                return {
                  id: project.id,
                  name: project.name,
                  status: project.status,
                  deadline: project.deadline,
                };
              } else {
                console.error('Project is undefined');
                return null;
              }
            }).filter(item => item !== null);
            setProjects(data);
          } else {
            console.error('Projects is undefined');
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      console.error('Employee ID is null');
    }
  }, []);
  const columns = [
    { field: 'id', headerName: 'Project ID', width: 170 },
    { field: 'name', headerName: 'Project Name', width: 230 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value}
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row.id, params.value)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    { field: 'deadline', headerName: 'Deadline', width: 200 },
    {
        field: 'details',
        headerName: 'Details',
        width: 200,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            component={Link}
            to={`/catalog/${params.row.id}`}
          >
            View Details
          </Button>
        ),
      },
      {
        field: 'graph',
        headerName: 'Graph',
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShowGraph(params.row.id)}
          >
            Show Graph
          </Button>
        ),
      },
  ];

  const handleEdit = (id, currentStatus) => {
    setEditingId(id);
    setStatus(currentStatus);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(`Update status of project with id ${editingId} to ${status}`);
    setOpen(false);
    navigate('/catalog');
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleShowGraph = (id) => {
    console.log(`Show graph for project with id ${id}`);
  };

  return (
    <Box style={{ height: 400, width: '90%', marginLeft: '6%', backgroundColor: colors.primary[400], borderRadius: '5px',color: `${colors.greenAccent[200]} !important` }}>
      <DataGrid rows={projects} columns={columns} pageSize={5} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <Select value={status} onChange={handleChange}>
            <MenuItem value={'Not Started'}>Not Started</MenuItem>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Completed'}>Completed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectPulse;