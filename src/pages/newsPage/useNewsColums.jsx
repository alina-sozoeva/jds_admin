import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import styles from "./NewsPage.module.scss";

export const useNewsColums = ({ onOpenEditModal, onOpenWarningModal }) => {
  const [getId, setGetId] = useState("");
  localStorage.setItem("newsId", getId);

  const onGetId = (guid) => {
    setGetId(guid);
    onOpenEditModal();
  };

  const removNews = (guid) => {
    setGetId(guid);
    onOpenWarningModal();
  };

  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 30,
      render: (_, __, index) => index + 1,
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
        <Flex gap={"small"} justify="center">
          <Button
            type="primary"
            onClick={() => onGetId(record.guid)}
            style={{ width: "30px" }}
          >
            <EditOutlined />
          </Button>
          <Button
            danger
            style={{ width: "30px" }}
            onClick={() => removNews(record.guid)}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  return {
    columns,
  };
};
