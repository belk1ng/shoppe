import { useCallback, useEffect, useState } from "react";

// TODO: Add "error" type
type SnackbarType = "success";

export const useSnackbar = (autoHideDuration: number) => {
  const [isOpen, setOpen] = useState(false);

  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const [message, setMessage] = useState("");

  // NOTE: Created for type safety
  const getSnackbarType = (type: SnackbarType): SnackbarType => {
    switch (type) {
      case "success":
        return "success";
    }

    throw new Error("There is an unexpected type found: ", type);
  };

  const onCloseSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpenSnackbar = useCallback(
    (type: SnackbarType, message: string) => {
      setSnackbarType(getSnackbarType(type));
      setOpen(true);
      setMessage(message);

      setTimeout(onCloseSnackbar, autoHideDuration);
    },
    [autoHideDuration, onCloseSnackbar]
  );

  useEffect(() => {
    if (!isOpen) {
      setMessage("");
    }
  }, [isOpen]);

  return {
    isOpen,
    message,
    snackbarType,
    onOpenSnackbar,
    onCloseSnackbar,
  } as const;
};
