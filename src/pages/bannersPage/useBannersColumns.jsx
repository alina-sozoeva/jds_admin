import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

import styles from "./BannersPage.module.scss";

export const useBannersColumns = (removeEdu, onEditWar) => {
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
      dataIndex: "original_name",
      key: "original_name",
      width: 100,
    },
    {
      title: "Фото",
      dataIndex: "img_url",
      key: "img_url",
      width: 300,
      render: (_, record) => (
        <div>
          <img
            style={{ width: "300px" }}
            src={`https://api-jds-admin.ibm.kg${record.img_url}`}
            alt=""
          />
        </div>
      ),
    },

    {
      title: "Дата создания",
      dataIndex: "date_system",
      key: "date_system",
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
          {/* <Button
            type="primary"
            style={{ width: "30px" }}
            onClick={() => removeEdu(record)}
          >
            <EditOutlined />
          </Button> */}
          <Tooltip title={"Удалить"}>
            <Button
              danger
              style={{ width: "30px" }}
              onClick={() => onEditWar(record)}
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
