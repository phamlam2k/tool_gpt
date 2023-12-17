import useQuestionData from "../../../hooks/useQuestionData"
import PromptItem from "./PromptItem";

const PromptBody = () => {
  const { questionList } = useQuestionData()

  return (
    <div className="grid border-t border-gray-600 pt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-md:container lg:w-[1300px] mx-auto">
      {
        questionList.data.map(data => {
          return (
            <PromptItem data={data} key={data.interactionId} />
          )
        })
      }
    </div>
  )
}

export default PromptBody