import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// PUBLIC_INTERFACE
const Task = ({ task, onDelete, onToggleComplete, onEdit }) => {
  /**
   * Component for displaying an individual task
   * @param {Object} task - The task object containing id, title, description, category, and completed status
   * @param {Function} onDelete - Function to handle task deletion
   * @param {Function} onToggleComplete - Function to handle toggling task completion status
   * @param {Function} onEdit - Function to handle task editing
   */
  
  return (
    <Card 
      sx={{
        mb: 2,
        borderLeft: task.completed ? '4px solid #4caf50' : '4px solid #E87A41',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Checkbox 
              checked={task.completed} 
              onChange={() => onToggleComplete(task.id)}
              sx={{ 
                color: '#E87A41',
                '&.Mui-checked': {
                  color: '#4caf50',
                },
              }}
            />
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {task.title}
            </Typography>
          </Box>
          <Chip 
            label={task.category} 
            size="small" 
            sx={{ 
              backgroundColor: '#2A2A2A',
              color: '#E87A41',
              fontWeight: 500
            }} 
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            ml: 4,
            textDecoration: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.7 : 1
          }}
        >
          {task.description}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton 
          size="small" 
          onClick={() => onEdit(task)}
          aria-label="edit task"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={() => onDelete(task.id)}
          aria-label="delete task"
          sx={{ color: '#f44336' }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Task;