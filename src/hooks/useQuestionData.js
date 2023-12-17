import { useQuery } from "@tanstack/react-query";
import { getInteractionsApi } from "../utils/api";
import { QUERY_KEYS } from "../config/keys";
import useDataStore from "../store/useDataStore";

const useQuestionData = () => {
  const { currentPage, selectedCategory, itemsPerPage } = useDataStore(
    (state) => ({
      currentPage: state.currentPage,
      selectedCategory: state.selectedCategory,
      itemsPerPage: state.itemsPerPage,
    })
  );

  const questionList = useQuery({
    queryKey: [
      QUERY_KEYS.QUESTION_LIST,
      currentPage,
      selectedCategory,
      itemsPerPage,
    ],
    queryFn: () =>
      getInteractionsApi({
        currentPage,
        selectedCategory,
        itemsPerPage,
      }),
    placeholderData: [],
  });

  return {
    questionList,

    currentPage,
    itemsPerPage,
  };
};

export default useQuestionData;
