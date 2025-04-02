import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { EditNewsModal, WarningModal } from "../../common";
import styles from "./NewsPage.module.scss";

export const useNewsColums = () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [idNews, setIdNews] = useState();

  const removeNews = (id) => {
    setOpenWarningModal(true);
    setIdNews(id);
  };

  const editNews = (id) => {
    setOpenEditModal(true);
    setIdNews(id);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "codeid",
      key: "codeid",
      align: "center",
      width: 30,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Название",
      dataIndex: "nameId",
      key: "nameId",
      width: 100,
    },
    {
      title: "Описание",
      dataIndex: "descr",
      key: "descr",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Дата",
      dataIndex: "date_publish",
      key: "date_publish",
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
      render: (file) =>
        file ? (
          <img
            src={file}
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
            onClick={() => editNews(record.guid)}
            style={{ width: "30px" }}
          >
            <EditOutlined />
          </Button>
          <Button
            danger
            style={{ width: "30px" }}
            onClick={() => removeNews(record.guid)}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  <WarningModal
    open={openWarningModal}
    onCancel={() => setOpenWarningModal(false)}
    id={idNews}
  />;

  <EditNewsModal
    open={openEditModal}
    onCancel={() => setOpenEditModal(false)}
    id={idNews}
  />;

  return {
    columns,
  };
};
