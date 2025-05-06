import { Button, Flex, Table, Typography } from "antd";
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
import { useMemo, useState } from "react";
import { useGetNewsQuery } from "../../store";
import Cropper from "react-easy-crop";
import foto from "../../assets/news.jpg";

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

  const { columns } = useNewsColums(removeNews, editNews);

  const { data } = useGetNewsQuery();

  const filteredArr = useMemo(() => {
    return data?.body?.filter((item) => {
      const matchesName = searchName
        ? item?.nameid?.toLowerCase().includes(searchName?.toLowerCase())
        : true;

      const matchesDate = searchDate
        ? dayjs(item?.date_publish).format("YYYY-MM-DD") ===
          dayjs(searchDate, "MM-DD-YYYY").format("YYYY-MM-DD")
        : true;

      return matchesName && matchesDate;
    });
  }, [searchName, searchDate, data?.body]);

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
          dataSource={filteredArr}
          columns={columns}
          bordered
          scroll={{ y: 300 }}
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
