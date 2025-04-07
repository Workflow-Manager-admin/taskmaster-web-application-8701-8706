import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Button,
  Container,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Paper
} from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E87A41', // Kavia orange
    },
    background: {
      default: '#1A1A1A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.7)',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 20px',
          fontSize: '1rem',
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#E87A41',
          '&:hover': {
            backgroundColor: '#FF8B4D',
          },
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }
    }
  }
});

// Sample initial tasks
const initialTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Draft and submit the project proposal for client review',
    category: 'work',
    completed: false
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and vegetables',
    category: 'personal',
    completed: true
  },
  {
    id: 3,
    title: 'Schedule team meeting',
    description: 'Coordinate with team members for weekly sync-up',
    category: 'work',
    completed: false
  }
];

// Sample initial categories
const initialCategories = ['work', 'personal', 'study', 'health'];

function App() {
  // State for tasks and task being edited
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [categories, setCategories] = useState(initialCategories);
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
    }
    
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Save categories to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  // Add a new task
  const handleAddTask = (newTask) => {
    // Add new category if it doesn't exist
    if (!categories.includes(newTask.category)) {
      setCategories([...categories, newTask.category]);
    }
    
    setTasks([...tasks, newTask]);
  };
  
  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  };
  
  // Toggle task completion status
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Set task for editing
  const handleEditTask = (task) => {
    setEditingTask(task);
  };
  
  // Update an existing task
  const handleUpdateTask = (updatedTask) => {
    // Add new category if it doesn't exist
    if (!categories.includes(updatedTask.category)) {
      setCategories([...categories, updatedTask.category]);
    }
    
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                mr: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <span style={{ color: '#E87A41' }}>*</span> Task Management Interface
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{
          pt: 12,
          pb: 8,
        }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <TaskList 
                tasks={tasks} 
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
              />
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: '100px' }}>
                <TaskForm 
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  editingTask={editingTask}
                  categories={categories}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
