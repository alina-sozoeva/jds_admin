import { Button, Flex, Input, Table, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { AddEduModal, EditEduModal } from "../../components";
import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetEduQuery, useRemoveEduMutation } from "../../store";
import { useEduColumns } from "./useEduColumns";

import styles from "./EducationPage.module.scss";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const EducationPage = () => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openWarModal, setOpenWarModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [item, setItem] = useState();

  const { data: edus, isLoading } = useGetEduQuery(
    searchName ? { search: searchName } : undefined
  );

  const [deleteEdu] = useRemoveEduMutation();

  const removeEdu = () => {
    deleteEdu({ codeid: item?.codeid });
  };

  const onOpenWar = (item) => {
    setItem(item);
    setOpenWarModal(true);
  };

  const onEditWar = (item) => {
    setItem(item);
    setOpenEditModal(true);
  };

  const { columns } = useEduColumns(onOpenWar, onEditWar);

  return (
    <Flex vertical className={clsx("page_wrap")}>
      <Typography.Title level={3}>Обучение</Typography.Title>

      <Wrapper
        header={
          <Flex gap="small" style={{ flexWrap: "wrap" }}>
            <Input
              placeholder="Поиск по названию"
              prefix={<SearchOutlined />}
              style={{
                width: "400px",
              }}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <Button
              type="primary"
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => setOpenAddModal(true)}
            >
              Добавить
            </Button>
          </Flex>
        }
      >
        <Table
          loading={isLoading}
          dataSource={edus?.data}
          columns={columns}
          bordered
          scroll={{ x: 1200, y: 800 }}
          pagination={false}
          rowKey="codeid"
        />
      </Wrapper>

      <AddEduModal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
      />
      <WarningModal
        open={openWarModal}
        onCancel={() => setOpenWarModal(false)}
        onConfirm={removeEdu}
        title={"мероприятие"}
      />
      <EditEduModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        item={item}
      />
    </Flex>
  );
};
