export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // định dạng in đậm, in nghiêng, gạch chân, gạch ngang
    ["blockquote", "code-block"], // blockquote và code

    [{ header: 1 }, { header: 2 }], // các cấp độ tiêu đề
    [{ list: "ordered" }, { list: "bullet" }], // danh sách có thứ tự và không thứ tự
    [{ script: "sub" }, { script: "super" }], // chỉnh sửa sub và super script
    [{ indent: "-1" }, { indent: "+1" }], // thụt lề
    [{ direction: "rtl" }], // hướng văn bản

    [{ size: ["small", false, "large", "huge"] }], // cỡ chữ
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // tùy chọn màu chữ và nền
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // xóa định dạng
  ],
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
