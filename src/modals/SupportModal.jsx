/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import { Modal, Image } from "antd";

const SupportModal = ({ isModalOpen, handleCancel }) => {
  return (
    <Modal
      title="Hướng dẫn cách lấy file Conversation trong ChatGPT"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
      style={{
        minWidth: "650px",
      }}
    >
      <div
        className="w-full"
        style={{
          maxHeight: "700px",
          overflowY: "auto",
          padding: "0px 10px",
        }}
      >
        <p className="text-[20px]">
          Để tải được File txt cuộc trò chuyện ở ChatGPT phải trải qua các bước
          như sau:
        </p>

        <p className="text-[25px] font-bold">
          Bước 1: Bấm giữ nút Tải file ChatGPT và kéo lên Bookmark bar của trình
          duyệt Chrome / Edge
        </p>
        <a
          className="text-[20px] bg-blue-400 text-white text-center"
          href={`javascript:link = document.createElement('a');
link.href = window.URL.createObjectURL(new Blob([Array.from(document.querySelectorAll('.antialiased')).map(element => element.outerHTML).join('\n')], { type: 'text/plain' }));
link.download = 'conversation.txt';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);`}
          style={{
            width: "100%",
            display: "block",
            padding: "10px 0px",
            borderRadius: "4px",
            margin: "15px 0px",
          }}
        >
          Tải file ChatGPT
        </a>

        <Image src="./images/Screenshot_47.png" alt="Hướng dẫn ảnh" />
        <p className="text-[20px]">
          Nhấn giữ nút <span className="font-bold">Tải file ChatGPT</span> rồi
          kéo lên <span className="font-bold">Bookmark bar.</span>
        </p>

        <div className="mt-[20px]">
          <Image src="./images/Screenshot_48.png" alt="Hướng dẫn ảnh" />
          <p className="text-[20px]">
            Nếu trình duyệt của bạn không hiển thị thanh{" "}
            <span className="font-bold">Bookmark bar</span> thì hãy làm như hình
            trên để hiển thị.
          </p>
        </div>

        <div className="mt-[10px]">
          <p className="text-[25px] font-bold">
            Bước 2: Truy cập vào trang{" "}
            <a href="https://chat.openai.com/">https://chat.openai.com/</a> vào
            detail một conversation cụ thể
          </p>
          <Image src="./images/Screenshot_49.png" alt="Hướng dẫn ảnh" />
        </div>

        <div className="mt-[10px]">
          <p className="text-[25px] font-bold">
            Bước 3: Bấm vào nút Tải file ChatGPT trên Bookmark bar.
          </p>
          <Image src="./images/Screenshot_50.png" alt="Hướng dẫn ảnh" />

          <p className="mt-[10px]">
            Tải thành công sẽ ra file conversation.txt
          </p>
        </div>

        <div className="mt-[10px]">
          <p className="text-[25px] font-bold">
            Bước 4: Điền đầy đủ thông tin và ở chọn file Conversation, chọn lấy
            file vừa tải về rồi ấn nút Gửi
          </p>
          <Image src="./images/Screenshot_51.png" alt="Hướng dẫn ảnh" />
        </div>
      </div>
    </Modal>
  );
};

export default SupportModal;
