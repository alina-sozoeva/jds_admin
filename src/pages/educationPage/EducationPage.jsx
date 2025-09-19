import { Button, Flex, Input, Table, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { AddEduModal } from "../../components";
import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetEduQuery, useRemoveEduMutation } from "../../store";
import { useEduColumns } from "./useEduColumns";

import styles from "./EducationPage.module.scss";

export const EducationPage = () => {
  const [searchName, setSearchName] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openWarModal, setOpenWarModal] = useState(false);
  const [codeid, setCodeid] = useState();

  const { data: edus } = useGetEduQuery(
    searchName ? { search: searchName } : undefined
  );

  const [deleteEdu] = useRemoveEduMutation();

  const removeEdu = () => {
    deleteEdu({ codeid });
  };

  const onOpenWar = (codeid) => {
    setCodeid(codeid);
    setOpenWarModal(true);
  };

  const { columns } = useEduColumns(onOpenWar);

  return (
    <Flex vertical className={styles.edu}>
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
          dataSource={edus?.data}
          columns={columns}
          bordered
          scroll={{ x: 1000, y: 800 }}
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
    </Flex>
  );
};
