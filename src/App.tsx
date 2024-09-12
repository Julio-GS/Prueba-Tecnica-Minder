import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTaskButton from "./components/AddTaskButton";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchTasksAndCategories } from "./services/taskService";
interface Task {
  id: string;
  title: string;
  description?: string;
  category_id: string;
  completed: boolean;
  categoryColor: string;
}

interface Category {
  id: string;
  name: string;
  color: string | null;
}

const theme = createTheme();

function App() {
  // Estados necesarios para la aplicación
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  // Hook para cargar tareas y categorías al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para cargar las tareas y categorías
  const fetchData = async () => {
    const { tasksWithCategories, categories } = await fetchTasksAndCategories();
    setTasks(tasksWithCategories);
    setCategories(categories);
  };

  // Función para marcar una tarea como completada o pendiente
  const handleToggleTask = async (task: Task) => {
    try {
      const updatedTask: Task = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:3000/tasks/${task.id}`, updatedTask);
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="md"
          style={{
            position: "relative",
            minHeight: "100vh",
            padding: "40px 0 40px 0",
          }}
        >
          <Typography variant="h3">Lista de Tareas</Typography>

          {/* Lista de Tareas */}
          <TaskList
            tasks={tasks}
            categories={categories}
            onToggleTask={handleToggleTask}
          />

          {/* Botón para abrir el formulario de nueva tarea */}
          <AddTaskButton onClick={handleOpenForm} />

          {/* Formulario para nueva tarea */}
          {openForm && (
            <TaskForm onClose={handleCloseForm} onTaskCreated={fetchData} />
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
