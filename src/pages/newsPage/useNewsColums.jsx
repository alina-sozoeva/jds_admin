import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import styles from "./NewsPage.module.scss";

export const useNewsColums = ({ onOpenEditModal }) => {
  const [getId, setGetId] = useState("");
  localStorage.setItem("newsId", getId);

  const onGetId = (guid) => {
    setGetId(guid);
    onOpenEditModal();
  };

  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 30,
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 150,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 100,
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      width: 100,
      render: (photo) =>
        photo ? (
          <img
            src={photo}
            alt="Фото"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "Нет фото"
        ),
    },
    {
      title: "...",
      key: "guid",
      align: "center",
      width: 50,
      render: (_, record) => (
        <Button type="primary" onClick={() => onGetId(record.guid)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return {
    columns,
  };
};
