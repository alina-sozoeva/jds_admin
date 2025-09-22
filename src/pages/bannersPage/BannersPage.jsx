import { Button, Flex, Input, Table, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";

import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  useGetBannersQuery,
  useGetReviewsQuery,
  useRemoveBannerMutation,
  useRemoveReviewMutation,
} from "../../store";

import { useState } from "react";

import styles from "./BannersPage.module.scss";
import clsx from "clsx";
import { useBannersColumns } from "./useBannersColumns";
import { AddBannerModal } from "../../components";

export const BannersPage = () => {
  const [search, setSearch] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openWar, setOpenWar] = useState(false);
  const [item, setItem] = useState();

  const { data, isLoading } = useGetBannersQuery();
  const [deleteReview] = useRemoveBannerMutation();

  console.log(data, "data");

  const onOpenPub = (item) => {
    setItem(item);
    // setOpenAdd(true);
  };

  const onOpenWar = (item) => {
    setOpenWar(true);
    setItem(item);
  };

  const removeReview = () => {
    deleteReview({ codeid: item?.codeid });
  };

  const { columns } = useBannersColumns(onOpenPub, onOpenWar);

  return (
    <Flex vertical className={clsx("page_wrap")}>
      <Typography.Title level={3}>Банннеры</Typography.Title>

      <Wrapper
        header={
          <Flex gap="small" style={{ flexWrap: "wrap" }}>
            <Input
              placeholder="Поиск"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "400px",
              }}
            />
            <Button
              type="primary"
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => setOpenAdd(true)}
            >
              Добавить
            </Button>
          </Flex>
        }
      >
        <Table
          loading={isLoading}
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
      <AddBannerModal open={openAdd} onCancel={() => setOpenAdd(false)} />
    </Flex>
  );
};
