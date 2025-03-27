import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const { Dragger } = Upload;

export const EditNewsModal = ({ open, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const newsArr = JSON.parse(localStorage.getItem("newsArr"));
  const newsId = localStorage.getItem("newsId");
  const newsObj = newsArr?.find((item) => item.guid === newsId);

  useEffect(() => {
    if (newsObj) {
      form.setFieldsValue({
        title: newsObj?.title,
        description: newsObj?.description,
        date: dayjs(newsObj?.date),
      });
    }
  }, [newsObj, form]);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFinish = async (values) => {
    const file = values.photo?.fileList?.[0]?.originFileObj;

    const base64 = file ? await toBase64(file) : newsObj?.photo;

    const updatedNews = {
      ...newsObj,
      title: values.title,
      description: values.description,
      date: values.date.format("YYYY-MM-DD"),
      photo: base64,
    };

    const updatedNewsArr = newsArr.map((item) =>
      item.guid === newsObj.guid ? updatedNews : item
    );

    localStorage.setItem("newsArr", JSON.stringify(updatedNewsArr));
    onUpdate(updatedNews);
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
      title="Редактировать новость"
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
        <Form.Item name="photo" valuePropName="photos">
          <Dragger
            name="file"
            multiple={false}
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
