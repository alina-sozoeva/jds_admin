import { Flex, Input, Table, Typography } from "antd";
import { Wrapper } from "../../common";

import { SearchOutlined } from "@ant-design/icons";
import {
  useGetReviewsQuery,
  useRemoveReviewMutation,
  useUpdateReviewsPublishedMutation,
} from "../../store";
import { useReviewsColumns } from "./useReviewsColumns";
import { useState } from "react";

import styles from "./ReviewsPage.module.scss";

export const ReviewsPage = () => {
  const [search, setSearch] = useState();

  const { data } = useGetReviewsQuery(search ? { search } : undefined);
  const [updateReviews] = useUpdateReviewsPublishedMutation();
  const [deleteReview] = useRemoveReviewMutation();

  const onUpdateReviews = (codeid) => {
    updateReviews({ codeid });
  };

  const removeReview = (codeid) => {
    deleteReview({ codeid });
  };

  const { columns } = useReviewsColumns(onUpdateReviews, removeReview);

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
    </Flex>
  );
};
