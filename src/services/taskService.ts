import axios from "axios";

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

export const fetchTasksAndCategories = async (): Promise<{
  tasksWithCategories: Task[];
  categories: Category[];
}> => {
  try {
    const [tasksResponse, categoriesResponse] = await Promise.all([
      axios.get<Task[]>("http://localhost:3000/tasks"),
      axios.get<Category[]>("http://localhost:3000/categories"),
    ]);

    const tasksWithCategories = tasksResponse.data.map((task) => {
      const category = categoriesResponse.data.find(
        (cat) => cat.id === task.category_id
      );
      return {
        ...task,
        categoryColor: category?.color || "#fff",
      };
    });

    return { tasksWithCategories, categories: categoriesResponse.data };
  } catch (error) {
    console.error("Error en el fetch de la data", error);
    return { tasksWithCategories: [], categories: [] };
  }
};
