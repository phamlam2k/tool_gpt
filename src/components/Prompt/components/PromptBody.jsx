import useQuestionData from "../../../hooks/useQuestionData"
import useCommonStore from "../../../store/useCommonStore";
import useDataStore from "../../../store/useDataStore";
import extendedDayJs from "../../../utils/dayjs";
import PromptItem, { PromptItemSkeleton } from "./PromptItem";
import { Modal, Pagination } from 'antd'

const PromptBody = () => {
  const { selectedPrompt, setSelectedPrompt } = useCommonStore()
  const { currentPage, setCurrentPage } = useDataStore();

  const { questionList } = useQuestionData()

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-[20px]">
      <div className={`${questionList.data.data.length !== 0 && "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"} border-t border-gray-600 pt-10 gap-4 p-4 max-md:container xl:w-[1300px] mx-auto`}>
        {
          questionList.data.data.map(data => {
            return (
              <PromptItem data={data} key={data.interactionId} />
            )
          })
        }

        {
          questionList.data.data.length === 0 && (
            <div className="text-white text-[30px] h-[300px] flex justify-center items-center">
              <p>
                Không có dữ liệu
              </p>
            </div>
          )
        }

        {
          (questionList.isLoading || questionList.isFetching) && (
            Array(9).fill().map((_, index) => {
              return <PromptItemSkeleton key={index} />
            })
          )
        }

        {
          selectedPrompt && (
            <Modal
              title={selectedPrompt.promptText}
              open={selectedPrompt}
              onCancel={() => {
                setSelectedPrompt(null)
              }}
              footer={null} // Removes the default footer
              closable
              width={700}
            >
              <div className="flex justify-end gap-[10px] my-[10px]">
                <p className="text-[14px]">{selectedPrompt.userIdentifier}</p>
                <p>-</p>
                <p>{extendedDayJs(selectedPrompt.timestamp).format('MMMM D, YYYY')}</p>
              </div>
              {/* Modal content goes here */}
              <h1 className="text-[20px] font-bold mb-[10px]">- Câu trả lời của ChatGPT -</h1>
              <div dangerouslySetInnerHTML={{ __html: selectedPrompt.responseText.replaceAll('Copy code', '') }} className="code_block" />
              <h1 className="text-[20px] font-bold mb-[10px]">- Câu trả lời mong muốn -</h1>
              <p>{selectedPrompt.feedback}</p>
              {/* You can add more content or structure it according to your data */}
            </Modal>
          )
        }
      </div>
      <div className="custom-pagination flex justify-center mt-[20px]">
        <Pagination current={currentPage} onChange={onPageChange} total={questionList.data.totalItems} />
      </div>
    </div>
  )
}

export default PromptBody