import { Flex, Input, Table, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";

import { SearchOutlined } from "@ant-design/icons";
import {
  useGetReviewsQuery,
  useRemoveReviewMutation,
  useUpdateReviewsPublishedMutation,
} from "../../store";
import { useReviewsColumns } from "./useReviewsColumns";
import { useState } from "react";

import styles from "./ReviewsPage.module.scss";
import { AddPublishModal } from "../../components";

export const ReviewsPage = () => {
  const [search, setSearch] = useState();
  const [openPub, setOpenPub] = useState(false);
  const [openWar, setOpenWar] = useState(false);
  const [item, setItem] = useState();

  const { data } = useGetReviewsQuery(search ? { search } : undefined);
  const [deleteReview] = useRemoveReviewMutation();

  const onOpenPub = (item) => {
    setItem(item);
    setOpenPub(true);
  };

  const onOpenWar = (item) => {
    setOpenWar(true);
    setItem(item);
  };

  const removeReview = () => {
    deleteReview({ codeid: item?.codeid });
  };

  const { columns } = useReviewsColumns(onOpenPub, onOpenWar);

  return (
    <Flex vertical className={styles.news}>
      <Typography.Title level={3}>Отзывы</Typography.Title>

      <Wrapper
        header={
          <Flex justify="space-between" style={{ flexWrap: "wrap" }}>
            <Input
              placeholder="Поиск"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "400px",
              }}
            />
          </Flex>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data}
          bordered
          scroll={{ x: 1000, y: 800 }}
          pagination={false}
          rowKey="codeid"
        />
      </Wrapper>
      <WarningModal
        open={openWar}
        onCancel={() => setOpenWar(false)}
        onConfirm={removeReview}
        title={"отзыв"}
      />
      <AddPublishModal
        open={openPub}
        onCancel={() => setOpenPub(false)}
        item={item}
      />
    </Flex>
  );
};
