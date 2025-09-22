import { Button, Flex, Form, Input, Modal, Upload } from "antd";

import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useAddBannerMutation } from "../../../store";

import styles from "./AddBannerModal.module.scss";
import clsx from "clsx";

const { Dragger } = Upload;

export const AddBannerModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const [addBanner] = useAddBannerMutation();

  const onFinish = async (values) => {
    const formData = new FormData();

    fileList.forEach((f, index) => {
      formData.append("codeid", 0);
      formData.append("files", f.originFileObj, f.name);
      formData.append("sort_orders", f.sort_order || index);
    });

    await addBanner(formData).unwrap();

    form.resetFields();
    setFileList();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    setFileList();
    form.resetFields();
  };

  return (
    <Modal
      width={500}
      centered
      open={open}
      onCancel={onClose}
      title="Добавить"
      footer={false}
    >
      <Form
        onFinish={onFinish}
        form={form}
        name="newsCreateForm"
        layout="vertical"
        className={clsx(styles.form)}
      >
        <Form.Item
          name="photo"
          valuePropName="photos"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения",
            },
          ]}
        >
          <Dragger
            name="file"
            multiple={true}
            accept="image/*"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={(info) => setFileList(info.fileList)}
            itemRender={(originNode, file) => {
              const handleDelete = () => {
                setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
              };

              return (
                <Flex
                  justify="space-between"
                  align="center"
                  className={styles.wrap}
                >
                  <span className={clsx(styles.hidden_name)}>{file?.name}</span>
                  <Flex gap={"small"} align="center">
                    {/* <Input
                      style={{
                        width: "50px",
                        height: "26px",
                        textAlign: "center",
                      }}
                      value={file.sort_order || ""}
                      onChange={(e) => {
                        const newOrder = e.target.value;
                        setFileList((prev) =>
                          prev.map((f) =>
                            f.uid === file.uid
                              ? { ...f, sort_order: newOrder }
                              : f
                          )
                        );
                      }}
                    /> */}

                    <Button
                      danger
                      className={styles.btn}
                      onClick={handleDelete}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Flex>
              );
            }}
          >
            <div className="flex justify-center items-center gap-[11px] h-[30px]">
              <p className="ant-upload-hint">
                Перетащите файл или нажмите для выбора
              </p>
            </div>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Flex align="center" gap={"small"} justify="center">
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
