import { Button, Flex, Table, Typography } from "antd";
import {
  AddNewsModal,
  EditNewsModal,
  WarningModal,
  Wrapper,
} from "../../common";
import { NewsFilter } from "../../components";
import {
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import styles from "./NewsPage.module.scss";
import { useNewsColums } from "./useNewsColums";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetNewsQuery } from "../../store";

export const NewsPage = () => {
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [idNews, setIdNews] = useState("");

  const removeNews = (id) => {
    setIdNews(id);
    setOpenWarningModal(true);
  };

  const editNews = (id) => {
    setIdNews(id);
    setOpenEditModal(true);
  };

  // const { columns } = useNewsColums();

  const { data } = useGetNewsQuery();

  const newsData = data?.body || [];

  const updateArr = [
    ...newsData,
    {
      codeid: 1,
      nameId: "Новость 1",
      descr: "Описание новости 1",
      date_publish: "2025-04-02",
      file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    },

    {
      codeid: 2,
      nameId: "Новость 1",
      descr: "Описание новости 1",
      date_publish: "2025-04-02",
      file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    },
    {
      codeid: 3,
      nameId: "Новость 1",
      descr: "Описание новости 1",
      date_publish: "2025-04-02",
      file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    },
  ];

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

  const filteredArr = () => {
    return updateArr.filter((item) => {
      const matchesName = searchName
        ? item.nameId.toLowerCase().includes(searchName.toLowerCase())
        : true;

      const matchesDate = searchDate
        ? dayjs(item.date_publish).isSame(dayjs(searchDate).startOf("day"))
        : true;

      return matchesName && matchesDate;
    });
  };

  return (
    <Flex vertical className={styles.news}>
      <Typography.Title level={3}>Новостная лента</Typography.Title>
      <NewsFilter setSearchName={setSearchName} setSearchDate={setSearchDate} />
      <Wrapper
        header={
          <Flex justify="space-between" style={{ flexWrap: "wrap" }}>
            <Typography.Title level={4}>Новости</Typography.Title>
            <Button
              type="primary"
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => setOpenAddModal(true)}
            >
              Добавить новость
            </Button>
          </Flex>
        }
      >
        <Table
          dataSource={filteredArr()}
          columns={columns}
          bordered
          scroll={{ y: 350 }}
          pagination={false}
          rowKey="codeid"
        />
      </Wrapper>
      <AddNewsModal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
      />
      <WarningModal
        open={openWarningModal}
        onCancel={() => setOpenWarningModal(false)}
        id={idNews}
      />

      <EditNewsModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        id={idNews}
      />
    </Flex>
  );
};
