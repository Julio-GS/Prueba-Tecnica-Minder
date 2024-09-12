import { List, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

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

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (task: Task) => void;
}

function TaskList({ tasks, categories, onToggleTask }: TaskListProps) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <Typography variant="h6">Tareas Pendientes</Typography>
      <List>
        {pendingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            categories={categories}
            onToggleTask={onToggleTask}
          />
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Tareas Completadas
      </Typography>
      <List>
        {completedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            categories={categories}
            onToggleTask={onToggleTask}
          />
        ))}
      </List>
    </>
  );
}

export default TaskList;
