import { useMutation } from "@tanstack/react-query";
import { saveInteractionsApi } from "../utils/api";
import { message } from "antd";

const useQuestionAction = () => {
  const saveInteractions = useMutation({
    mutationFn: (data) => saveInteractionsApi(data),
    onSuccess: (data) => {
      message.success(data.data.message);
    },
  });

  return {
    saveInteractions,
  };
};

export default useQuestionAction;
