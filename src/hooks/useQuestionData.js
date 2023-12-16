import { useQuery } from "@tanstack/react-query";
import { getInteractionsApi } from "../utils/api";
import { QUERY_KEYS } from "../config/keys";

const useQuestionData = () => {
  const questionList = useQuery({
    queryKey: [QUERY_KEYS.QUESTION_LIST],
    queryFn: () => getInteractionsApi(),
  });

  return {
    questionList,
  };
};

export default useQuestionData;
