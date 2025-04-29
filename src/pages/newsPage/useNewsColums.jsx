import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import dayjs from "dayjs";
import styles from "./NewsPage.module.scss";

export const useNewsColums = (removeNews, editNews) => {
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
      dataIndex: "nameid",
      key: "nameid",
      width: 100,
      ellipsis: true,
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
      render: (text) => dayjs(text).format("DD-MM-YYYY"),
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      width: 100,
      render: (_, record) =>
        record?.file ? (
          <img
            src={`https://sakbol.com/${record?.file}`}
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
            onClick={() => editNews(record.codeid)}
            style={{ width: "30px" }}
          >
            <EditOutlined />
          </Button>
          <Button
            danger
            style={{ width: "30px" }}
            onClick={() => removeNews(record.codeid)}
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
