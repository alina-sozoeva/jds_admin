import { useCallback, useState } from "react";

import { Button, Flex, Form, Input, Modal, Upload } from "antd";

const { Dragger } = Upload;

export const AddNewsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // onSave({ ...value, content: descriptionValue });
    form.resetFields();
  };

  return (
    <Modal width={500} centered open={open} onCancel={onCancel} >
      <Form
        onFinish={onFinish}
        form={form}
        name="newsCreateForm"
        layout="vertical"
      >
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Содержание"
          rules={[{ required: true }]}
        ></Form.Item>
        <Form.Item initialValue={{}} name="photo" valuePropName="photos">
          <Dragger
            {...{
              name: "file",
              multiple: true,
              beforeUpload: () => false,
            }}
          >
            <div className="flex justify-center items-center gap-[11px] h-[88px]">
              <p className="ant-upload-hint">
                Перетащите файлы, чтобы прикрепить их или выберите
              </p>
            </div>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button onClick={onCancel}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
