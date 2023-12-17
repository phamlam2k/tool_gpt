import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveInteractionsApi } from "../utils/api";
import { message } from "antd";
import { QUERY_KEYS } from "../config/keys";

const useQuestionAction = () => {
  const queryClient = useQueryClient();
  const saveInteractions = useMutation({
    mutationFn: (data) => saveInteractionsApi(data),
    onSuccess: (data) => {
      message.success(data.data.message);

      queryClient.invalidateQueries([QUERY_KEYS.QUESTION_LIST]);
    },
    onError: () => {
      message.error("Interaction created failed");
    },
  });

  return {
    saveInteractions,
  };
};

export default useQuestionAction;
