import { Button } from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

export  const titleCBCreator = (videoState) => {
    return () => {
      return (
        <Button
          sx={{
            marginBottom: '10px',
          }}
          variant="outlined"
        >
          {videoState ? "Заменить видео" : "Добавить видео"}
          <CropOriginalIcon />
        </Button>
      );
    };
  };