import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  color: string | null;
}

interface TaskFormProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

function TaskForm({ onClose, onTaskCreated }: TaskFormProps) {
  // Estados necesarios para el formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Obtener categorías desde la API
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3000/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error al buscar categorias", error);
      }
    };

    fetchCategories();
  }, []);

  // Función para crear una nueva tarea
  const handleCreateTask = async () => {
    if (!title || !categoryId) {
      alert("El título y la categoría son obligatorios.");
      return;
    }

    const newTask = {
      title,
      description,
      category_id: categoryId,
      completed: false,
    };

    try {
      await axios.post("http://localhost:3000/tasks", newTask);
      onTaskCreated(); // Actualizar la lista de tareas
      onClose();
    } catch (error) {
      console.error("Error creando tarea", error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Nueva Tarea</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          inputProps={{ maxLength: 40 }}
          margin="normal"
        />
        <TextField
          label="Descripción"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          select
          label="Categoría"
          variant="standard"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            onClick={onClose}
            variant="text"
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateTask}
            variant="contained"
            color="primary"
          >
            Crear
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TaskForm;
