import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// PUBLIC_INTERFACE
const TaskForm = ({ onAddTask, onUpdateTask, editingTask, categories }) => {
  /**
   * Component for adding and editing tasks
   * @param {Function} onAddTask - Function to handle adding a new task
   * @param {Function} onUpdateTask - Function to handle updating an existing task
   * @param {Object} editingTask - Task object being edited (null if adding a new task)
   * @param {Array} categories - Array of available categories
   */
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [completed, setCompleted] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [titleError, setTitleError] = useState(false);
  
  // Reset form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategory(editingTask.category);
      setCompleted(editingTask.completed);
    } else {
      resetForm();
    }
  }, [editingTask]);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory(categories[0] || '');
    setCompleted(false);
    setNewCategory('');
    setTitleError(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    
    const taskCategory = category === 'new' ? newCategory : category;
    
    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        description,
        category: taskCategory,
        completed
      });
    } else {
      onAddTask({
        id: Date.now(),
        title,
        description,
        category: taskCategory,
        completed
      });
      resetForm();
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: 3, 
        backgroundColor: '#2A2A2A',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setTitleError(false);
          }}
          fullWidth
          required
          error={titleError}
          helperText={titleError ? 'Title is required' : ''}
        />
        
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
            <MenuItem value="new">+ Add New Category</MenuItem>
          </Select>
        </FormControl>
        
        {category === 'new' && (
          <TextField
            label="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            required
          />
        )}
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={completed} 
              onChange={(e) => setCompleted(e.target.checked)}
              sx={{ 
                color: '#E87A41',
                '&.Mui-checked': {
                  color: '#4caf50',
                },
              }}
            />
          }
          label="Mark as completed"
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {editingTask && (
            <Button 
              variant="outlined" 
              onClick={resetForm}
              sx={{ borderColor: '#555', color: '#fff' }}
            >
              Cancel
            </Button>
          )}
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={editingTask ? <EditIcon /> : <AddIcon />}
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskForm;