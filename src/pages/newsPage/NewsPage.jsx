import { Button, Flex, Table, Typography } from "antd";
import { AddNewsModal, Wrapper } from "../../common";
import { NewsFilter } from "../../components";
import {
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import styles from "./NewsPage.module.scss";
import { useNewsColums } from "./useNewsColums";
import { useState } from "react";

const news = [
  {
    guid: "1",
    title: "Новости из мира технологий",
    description: "Новейшие разработки в сфере ИТ и технологий.",
    date: "2025-03-25",
    folder_name: "tech_photo.jpg",
  },
  {
    guid: "2",
    title: "Обновления в мире медицины",
    description: "Прогресс в лечении и новых медицинских исследованиях.",
    date: "2025-03-24",
    folder_name: "medicine_photo.jpg",
  },
  {
    guid: "3",
    title: "Экологические новости",
    description: "Состояние экологии и новые инициативы по защите природы.",
    date: "2025-03-23",
    folder_name: "eco_photo.jpg",
  },
  {
    guid: "4",
    title: "Спортивные события года",
    description: "Самые ожидаемые спортивные события 2025 года.",
    date: "2025-03-22",
    folder_name: "sports_photo.jpg",
  },
  {
    guid: "5",
    title: "Новости культуры и искусства",
    description: "Обзор культурных событий и новых выставок.",
    date: "2025-03-21",
    folder_name: "culture_photo.jpg",
  },
  {
    guid: "5",
    title: "Новости культуры и искусства",
    description: "Обзор культурных событий и новых выставок.",
    date: "2025-03-21",
    folder_name: "culture_photo.jpg",
  },
];

export const NewsPage = () => {
  const { columns } = useNewsColums();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Flex vertical className={styles.news}>
      <Typography.Title level={3}>Новостная лента</Typography.Title>
      <NewsFilter />
      <Wrapper
        header={
          <Flex justify="space-between" style={{ flexWrap: "wrap" }}>
            <Typography.Title level={4}>Новости</Typography.Title>
            <Button
              type="primary"
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => setOpen(true)}
            >
              Добавить новость
            </Button>
          </Flex>
        }
      >
        <Table
          dataSource={news}
          columns={columns}
          bordered
          scroll={{ y: 350 }}
          pagination={false}
        />
      </Wrapper>
      <AddNewsModal open={open} onCancel={onClose} />
    </Flex>
  );
};
