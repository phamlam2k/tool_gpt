import { useQuery } from "@tanstack/react-query";
import { getInteractionsApi } from "../utils/api";
import { QUERY_KEYS } from "../config/keys";
import useDataStore from "../store/useDataStore";

const useQuestionData = () => {
  const {
    currentPage,
    selectedCategory,
    itemsPerPage,
    keyword,
    sortDir,
    sortBy,
  } = useDataStore();

  const questionList = useQuery({
    queryKey: [
      QUERY_KEYS.QUESTION_LIST,
      currentPage,
      selectedCategory,
      itemsPerPage,
      keyword,
      sortDir,
      sortBy,
    ],
    queryFn: () =>
      getInteractionsApi({
        currentPage,
        selectedCategory,
        itemsPerPage,
        keyword,
        sortDir,
        sortBy,
      }),
    placeholderData: {
      totalItems: 0,
      data: [],
      totalPages: 0,
      currentPage: 0,
    },
  });

  return {
    questionList,

    currentPage,
    itemsPerPage,
  };
};

export default useQuestionData;
