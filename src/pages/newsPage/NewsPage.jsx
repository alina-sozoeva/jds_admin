import { Button, Flex, Table, Typography } from "antd";
import { AddNewsModal, EditNewsModal, Wrapper } from "../../common";
import { NewsFilter } from "../../components";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import styles from "./NewsPage.module.scss";
import { useNewsColums } from "./useNewsColums";
import dayjs from "dayjs";
import { useState } from "react";

// const news = [
//   {
//     guid: "1",
//     title: "Новости из мира технологий",
//     description: "Новейшие разработки в сфере ИТ и технологий.",
//     date: "2025-03-25",
//     folder_name: "tech_photo.jpg",
//   },
//   {
//     guid: "2",
//     title: "Обновления в мире медицины",
//     description: "Прогресс в лечении и новых медицинских исследованиях.",
//     date: "2025-03-24",
//     folder_name: "medicine_photo.jpg",
//   },
//   {
//     guid: "3",
//     title: "Экологические новости",
//     description: "Состояние экологии и новые инициативы по защите природы.",
//     date: "2025-03-23",
//     folder_name: "eco_photo.jpg",
//   },
//   {
//     guid: "4",
//     title: "Спортивные события года",
//     description: "Самые ожидаемые спортивные события 2025 года.",
//     date: "2025-03-22",
//     folder_name: "sports_photo.jpg",
//   },
//   {
//     guid: "5",
//     title: "Новости культуры и искусства",
//     description: "Обзор культурных событий и новых выставок.",
//     date: "2025-03-21",
//     folder_name: "culture_photo.jpg",
//   },
//   {
//     guid: "5",
//     title: "Новости культуры и искусства",
//     description: "Обзор культурных событий и новых выставок.",
//     date: "2025-03-21",
//     folder_name: "culture_photo.jpg",
//   },
// ];

export const NewsPage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const onOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const { columns } = useNewsColums({ onOpenEditModal });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState();

  const news = JSON.parse(localStorage.getItem("newsArr"));

  const onCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const onCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const filteredArr = () => {
    return news.filter((item) => {
      const matchesName = searchName
        ? item.title.toLowerCase().includes(searchName.toLowerCase())
        : true;

      const matchesDate = searchDate
        ? dayjs(item.date).isSame(dayjs(searchDate).startOf("day"))
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
          rowKey="guid"
        />
      </Wrapper>
      <AddNewsModal open={openAddModal} onCancel={onCloseAddModal} />
      <EditNewsModal open={openEditModal} onCancel={onCloseEditModal} />
    </Flex>
  );
};
