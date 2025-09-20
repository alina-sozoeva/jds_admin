import ReactQuill from "react-quill";

export const CustomEditor = () => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ size: ["small", false, "large", "huge"] }],
      ],
      handlers: {},
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "list",
    "bullet",
    "align",
    "size",
  ];
  function CustomToolbar() {
    return (
      <div id="toolbar">
        <select className="ql-header" defaultValue="">
          <option value="1">Заголовок 1</option>
          <option value="2">Заголовок 2</option>
          <option value="3">Заголовок 3</option>
          <option value="">Обычный текст</option>
        </select>

        <button className="ql-bold" aria-label="Жирный" />
        <button className="ql-italic" aria-label="Курсив" />

        <button
          className="ql-list"
          value="ordered"
          aria-label="Нумерованный список"
        />
        <button
          className="ql-list"
          value="bullet"
          aria-label="Маркированный список"
        />

        <select className="ql-align" aria-label="Выравнивание" />
        <select className="ql-size" aria-label="Размер текста" />
      </div>
    );
  }

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={{ toolbar: { container: "#toolbar" } }}
        formats={formats}
      />
      <CustomToolbar />{" "}
    </>
  );
};
