import { useState, useEffect } from "react";
import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import foto from "../../assets/news.jpg";
import { useAddNewsMutation } from "../../store";

const { Dragger } = Upload;

export const AddNewsModal = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [add_news] = useAddNewsMutation();

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); 
      reader.readAsDataURL(file);
    });
  };

  // const onFinish = async (values) => {
  //   const file = values.photo?.fileList?.[0]?.originFileObj;

  //   const base64 = file ? await toBase64(file) : foto;

  //   const newNews = {
  //     guid: uuidv4(),
  //     title: values.title,
  //     description: values.description,
  //     date: values.date.format("YYYY-MM-DD"),
  //     photo: base64,
  //   };

  //   onAdd(newNews);
  //   form.resetFields();
  //   onCancel();
  // };

  const onFinish = async (values) => {
    const file = values.photo?.fileList?.[0]?.originFileObj;

    const base64 = file ? await toBase64(file) : foto;

    console.log(base64, 'base64');
    

    // add_news({
    //   nameId: values.title,
    //   descr: values.description,
    //   date_publish: values.date.format("YYYY-MM-DD"),
    //   file: base64,
    // });

    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      width={500}
      centered
      open={open}
      onCancel={onClose}
      title="Добавить новость"
      footer={false}
    >
      <Form
        onFinish={onFinish}
        form={form}
        name="newsCreateForm"
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[
            { required: true, message: "Это обязательное поле для заполнения" },
          ]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Содержание"
          rules={[
            { required: true, message: "Это обязательное поле для заполнения" },
          ]}
        >
          <Input.TextArea placeholder="Введите описание новости" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[
            { required: true, message: "Это обязательное поле для заполнения" },
          ]}
        >
          <DatePicker placeholder="Выберите дату" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          initialValue={{}}
          name="photo"
          valuePropName="photos"
          rules={[
            { required: true, message: "Это обязательное поле для заполнения" },
          ]}
        >
          <Dragger
            name="file"
            multiple={false}
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
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
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
