import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import dayjs from "dayjs";
import styles from "./EducationPage.module.scss";

export const useEduColumns = (removeEdu, onEditWar) => {
  const columns = [
    {
      title: "№",
      dataIndex: "codeid",
      key: "codeid",
      align: "center",
      width: 25,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4, // показываем 4 строки
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text}
        </div>
      ),
    },

    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 50,
      ellipsis: true,
    },
    {
      title: "Место проведения",
      dataIndex: "location",
      key: "location",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Период проведения",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      width: 100,
      ellipsis: true,
      render: (_, record) => (
        <div>
          <span>
            {record?.start_date
              ? dayjs(record?.start_date).format("DD.MM.YYYY")
              : ""}
          </span>{" "}
          -{" "}
          <span>
            {record?.start_date
              ? dayjs(record?.end_date).format("DD.MM.YYYY")
              : ""}
          </span>
        </div>
      ),
    },
    {
      title: "Дата проведения",
      dataIndex: "event_date",
      key: "event_date",
      align: "center",
      width: 120,
      ellipsis: true,
      render: (text) => (text ? dayjs(text).format("DD.MM.YYYY") : "-"),
    },
    {
      title: "...",
      key: "guid",
      align: "center",
      width: 60,
      render: (_, record) => (
        <Flex gap={"small"} justify="center">
          <Button
            type="primary"
            onClick={() => onEditWar(record)}
            style={{ width: "30px" }}
          >
            <EditOutlined />
          </Button>
          <Tooltip title={"Удалить"}>
            <Button
              danger
              style={{ width: "30px" }}
              onClick={() => removeEdu(record)}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return {
    columns,
  };
};
