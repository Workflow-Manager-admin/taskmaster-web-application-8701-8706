import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';
import Task from './Task';

// PUBLIC_INTERFACE
const TaskList = ({ tasks, onDeleteTask, onToggleComplete, onEditTask }) => {
  /**
   * Component for displaying a list of tasks with filtering options
   * @param {Array} tasks - Array of task objects
   * @param {Function} onDeleteTask - Function to handle task deletion
   * @param {Function} onToggleComplete - Function to handle toggling task completion status
   * @param {Function} onEditTask - Function to handle task editing
   */
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Get unique categories from tasks
  const categories = ['all', ...new Set(tasks.map(task => task.category))];
  
  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || 
      (filterStatus === 'completed' && task.completed) || 
      (filterStatus === 'active' && !task.completed);
      
    const categoryMatch = filterCategory === 'all' || task.category === filterCategory;
    
    return statusMatch && categoryMatch;
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" component="h2">
          Tasks ({filteredTasks.length})
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
          />
        ))
      ) : (
        <Paper 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            backgroundColor: '#2A2A2A'
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No tasks found matching your filters.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TaskList;