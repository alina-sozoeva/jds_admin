import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import dayjs from "dayjs";
import styles from "./ReviewsPage.module.scss";

export const useReviewsColumns = (onUpdateReviews) => {
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
      width: 100,
      ellipsis: true,
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      width: 100,
    },
    {
      title: "Дата",
      dataIndex: "date_system",
      key: "date_system",
      align: "center",
      width: 100,
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
      width: 50,
      render: (_, record) => (
        <Flex gap={"small"} justify="center">
          <Tooltip title={"Опубликовать"}>
            <Button
              type="primary"
              onClick={() => onUpdateReviews(record.codeid)}
              style={{ width: "30px" }}
            >
              <UploadOutlined />
            </Button>
          </Tooltip>

          <Button
            danger
            style={{ width: "30px" }}
            // onClick={() => removeNews(record.codeid)}
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
