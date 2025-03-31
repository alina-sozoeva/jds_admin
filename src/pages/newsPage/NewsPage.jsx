import { Button, Flex, Table, Tabs, Typography } from "antd";
import {
  AddNewsModal,
  EditNewsModal,
  WarningModal,
  Wrapper,
} from "../../common";
import { NewsFilter } from "../../components";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import styles from "./NewsPage.module.scss";
import { useNewsColums } from "./useNewsColums";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useGetNewsQuery } from "../../store";

export const NewsPage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [newsArr, setNewsArr] = useState([]);
  const newsId = localStorage.getItem("newsId");

  const { data } = useGetNewsQuery();


  // console.log(data);

  useEffect(() => {
    const storedNews = localStorage.getItem("newsArr");
    if (storedNews) {
      setNewsArr(JSON.parse(storedNews));
    }
  }, []);

  const onOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const onOpenWarningModal = () => {
    setOpenWarningModal(true);
  };

  const { columns } = useNewsColums({ onOpenEditModal, onOpenWarningModal });

  const onCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const onCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const onCloseWarningModal = () => {
    setOpenWarningModal(false);
  };

  const filteredArr = () => {
    return newsArr.filter((item) => {
      const matchesName = searchName
        ? item.title.toLowerCase().includes(searchName.toLowerCase())
        : true;

      const matchesDate = searchDate
        ? dayjs(item.date).isSame(dayjs(searchDate).startOf("day"))
        : true;

      return matchesName && matchesDate;
    });
  };

  const removeNews = () => {
    console.log(newsId);

    const updatedNews = newsArr.filter((item) => item.guid !== newsId);
    console.log(updatedNews);

    localStorage.setItem("newsArr", JSON.stringify(updatedNews));
    setNewsArr(updatedNews);
    setOpenWarningModal(false);
  };

  const addNews = (newNews) => {
    const updatedNewsArr = [...newsArr, newNews];
    setNewsArr(updatedNewsArr);
    localStorage.setItem("newsArr", JSON.stringify(updatedNewsArr));
  };

  const onUpdateNews = (updatedNews) => {
    const updatedNewsArr = newsArr.map((item) =>
      item.guid === updatedNews.guid ? updatedNews : item
    );

    localStorage.setItem("newsArr", JSON.stringify(updatedNewsArr));
    setNewsArr(updatedNewsArr);
    setOpenEditModal(false);
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
          rowKey="guid"
        />
      </Wrapper>
      <AddNewsModal
        open={openAddModal}
        onCancel={onCloseAddModal}
        onAdd={addNews}
      />
      <EditNewsModal
        open={openEditModal}
        onCancel={onCloseEditModal}
        onUpdate={onUpdateNews}
      />
      <WarningModal
        open={openWarningModal}
        onCancel={onCloseWarningModal}
        onConfirm={removeNews}
      />
    </Flex>
  );
};
