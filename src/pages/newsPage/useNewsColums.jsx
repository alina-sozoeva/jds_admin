import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./NewsPage.module.scss";

export const useNewsColums = () => {
  const navigate = useNavigate();

  const onStatus = (record) => {
    console.log(record);

    navigate(`/edit-folder/${record.guid}/${record.status}`);
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
    },
    {
      title: "Фото",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
      width: 100,
    },
    {
      title: "...",
      key: "guid",
      align: "center",
      width: 50,
      render: (record) => (
        <Button type="primary" onClick={() => onStatus(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return {
    columns,
  };
};
