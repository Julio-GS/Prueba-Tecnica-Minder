import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";

interface AddTaskButtonProps {
  onClick: () => void;
}

function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <Box display="flex" justifyContent="flex-end" marginTop="20px">
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default AddTaskButton;
