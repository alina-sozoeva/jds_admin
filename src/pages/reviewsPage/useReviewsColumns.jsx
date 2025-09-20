import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import dayjs from "dayjs";
import styles from "./ReviewsPage.module.scss";

export const useReviewsColumns = (onOpenPub, onOpenWar) => {
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
      title: "ФИО",
      dataIndex: "nameid",
      key: "nameid",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Оценка",
      dataIndex: "rating",
      key: "rating",
      width: 60,
      ellipsis: true,
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Дата",
      dataIndex: "date_system",
      key: "date_system",
      align: "center",
      width: 80,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Статус",
      dataIndex: "is_published",
      key: "is_published",
      align: "center",
      width: 100,
      render: (_, record) => (
        <>
          {record?.is_published === 1 ? (
            <span>опубликован</span>
          ) : (
            <span>не опубликован</span>
          )}
        </>
      ),
    },
    {
      title: "...",
      key: "guid",
      align: "center",
      width: 60,
      render: (_, record) => (
        <Flex gap={"small"} justify="center">
          <Tooltip title={"Опубликовать"}>
            <Button
              disabled={record?.is_published === 1}
              type="primary"
              onClick={() => onOpenPub(record)}
              style={{ width: "30px" }}
            >
              <UploadOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={"Удалить"}>
            <Button
              danger
              style={{ width: "30px" }}
              onClick={() => onOpenWar(record)}
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
