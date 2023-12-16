import useQuestionData from "../../../hooks/useQuestionData"
import PromptItem from "./PromptItem";

const data = {
  "interactionId": 3,
  "userIdentifier": "long vu",
  "promptText": "aaaaaaaaaaaaaaaaaaaa",
  "responseText": "<p>aaaaaaaaaaaaaaaaaaaaaaaaaaa</p>",
  "timestamp": "2023-12-15T17:45:16.320286",
  "responseTime": null,
  "qualityScore": null,
  "topic": "js",
  "feedback": "aaaaaaaaaaaaaaaaaaa"
};


const PromptBody = () => {
  const { questionList } = useQuestionData()

  console.log({ questionList: questionList.data })

  return (
    <PromptItem data={data} />
  )
}

export default PromptBody