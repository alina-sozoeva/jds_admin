import { useState } from "react";
import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import dayjs from "dayjs";

const { Dragger } = Upload;

export const EditNewsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const newsArr = JSON.parse(localStorage.getItem("newsArr"));

  const newsId = localStorage.getItem("newsId");

  const newsObj = newsArr.find((item) => item.guid === parseInt(newsId));

  const onFinish = async (values) => {
    // const file = values.photo?.fileList?.[0]?.originFileObj;

    // const base64 = await toBase64(file);

    // const newNews = [
    //   ...newsArr,
    //   {
    //     guid: newsArr.length + 1,
    //     title: values.title,
    //     description: values.description,
    //     date: values.date,
    //     photo: base64,
    //   },
    // ];

    // setNewsArr(newNews);
    // localStorage.setItem("newsArr", JSON.stringify(newNews));
    // form.resetFields();
    onCancel();
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      title="Редактировать новость"
      footer={false}
    >
      <Form
        onFinish={onFinish}
        form={form}
        name="newsCreateForm"
        layout="vertical"
        initialValues={{
          title: newsObj?.title,
          description: newsObj?.description,
          date: dayjs(newsObj?.date),
        }}
      >
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Содержание"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Введите описание новости" />
        </Form.Item>
        <Form.Item name="date" label="Содержание" rules={[{ required: true }]}>
          <DatePicker placeholder="Выберите дату" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item initialValue={{}} name="photo" valuePropName="photos">
          <Dragger
            name="file"
            multiple={false}
            beforeUpload={() => false}
            fileList={
              newsObj?.photo
                ? [
                    {
                      uid: "-1",
                      name: "news-photo",
                      status: "done",
                      url: newsObj.photo,
                    },
                  ]
                : []
            }
          >
            <div className="flex justify-center items-center gap-[11px] h-[88px]">
              <p className="ant-upload-hint">
                Перетащите файлы, чтобы прикрепить их или выберите
              </p>
            </div>
          </Dragger>
        </Form.Item>
        {newsObj?.photo && (
          <div className="mt-3 flex justify-center">
            <img
              src={newsObj.photo}
              alt="Загруженное фото"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
