import { Checkbox, ListItem, ListItemText, Typography } from "@mui/material";

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

interface TaskItemProps {
  task: Task;
  categories: Category[];
  onToggleTask: (task: Task) => void;
}

function TaskItem({ task, categories, onToggleTask }: TaskItemProps) {
  // Obtener el nombre de la categoría por el ID
  const categoryName =
    categories.find((cat) => cat.id === task.category_id)?.name ||
    "Sin categoría";

  return (
    <ListItem
      style={{
        backgroundColor: task.categoryColor,
        marginBottom: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
        borderRadius: "5px",
      }}
    >
      <Checkbox checked={task.completed} onChange={() => onToggleTask(task)} />
      <ListItemText
        style={{ marginLeft: "10px" }}
        primary={
          <Typography variant="subtitle1">{`${categoryName}: ${task.title}`}</Typography>
        }
        secondary={
          task.description && (
            <Typography variant="body2">{task.description}</Typography>
          )
        }
      />
    </ListItem>
  );
}

export default TaskItem;
