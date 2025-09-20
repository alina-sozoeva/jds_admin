import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useUpdateReviewsPublishedMutation } from "../../../store";

import styles from "./AddPublishModal.module.scss";
import clsx from "clsx";

export const AddPublishModal = ({
  title = "пользователя",
  open,
  onCancel,
  item,
}) => {
  const [form] = useForm();
  const [updateReviews] = useUpdateReviewsPublishedMutation();

  const onFinish = () => {
    updateReviews({ codeid: item?.codeid });
    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        codeid: item?.codeid,
        nameid: item?.nameid,
        rating: item?.rating,
        email: item?.email,
        comment: item?.comment,
      });
    }
  }, [item, form, open]);

  return (
    <Modal centered open={open} onCancel={onClose} footer={false} width={400}>
      <Typography.Title level={4}>Опублиновать</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className={clsx(styles.form)}
      >
        <Form.Item
          label={`ФИО ${title}`}
          name="nameid"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите ФИО" readOnly />
        </Form.Item>
        <Form.Item
          label="Оценка"
          name="rating"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите номер телефона" readOnly />
        </Form.Item>

        <Form.Item
          label={`Почта ${title}`}
          name="email"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder={`Введите логин ${title}`} readOnly />
        </Form.Item>
        <Form.Item
          label={`Комментарий ${title}`}
          name="comment"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input.TextArea
            rows={7}
            placeholder={`Введите пароль ${title}`}
            readOnly
          />
        </Form.Item>
        <Flex gap="small" justify="center">
          <Button type="primary" htmlType="submit">
            Подтвердить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
