import { Flex, Input, Table, Typography } from "antd";
import { Wrapper } from "../../common";

import { SearchOutlined } from "@ant-design/icons";
import {
  useGetReviewsQuery,
  useUpdateReviewsPublishedMutation,
} from "../../store";
import { useReviewsColumns } from "./useReviewsColumns";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import styles from "./ReviewsPage.module.scss";

export const ReviewsPage = () => {
  const [search, setSearch] = useState();

  const { data } = useGetReviewsQuery({ search });

  const [updateReviews] = useUpdateReviewsPublishedMutation();

  const onUpdateReviews = (codeid) => {
    updateReviews({ codeid });
  };

  const { columns } = useReviewsColumns(onUpdateReviews);

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
            />
          </Flex>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data}
          bordered
          scroll={{ y: 300 }}
          pagination={false}
          rowKey="codeid"
        />
      </Wrapper>
    </Flex>
  );
};
