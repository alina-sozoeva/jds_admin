import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import { useGetNewsByIdQuery, useUpdateNewsMutation } from "../../store";
import dayjs from "dayjs";
import { useEffect } from "react";

const { Dragger } = Upload;

export const EditNewsModal = ({ open, onCancel, id }) => {
  const [form] = Form.useForm();

  const [update_news] = useUpdateNewsMutation();

  const { data } = useGetNewsByIdQuery(id);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (data && data.body[0]) {
      form.setFieldsValue({
        title: data.body[0].nameid,
        description: data.body[0].descr,
        date: dayjs(data.body[0].date_publish),
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    console.log(values);

    const file = values.photo?.fileList?.[0]?.originFileObj;

    // const base64 = file ? await toBase64(file) : newsById?.foto;

    // const base64 = await toBase64(file);

    update_news({
      codeid: id,
      nameid: values.title,
      descr: values.description,
      date_publish: values.date.format("MM-DD-YYYY"),
      file: "test",
    });

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
            accept="image/*"
            beforeUpload={() => false}
          >
            <div className="flex justify-center items-center gap-[11px] h-[88px]">
              <p className="ant-upload-hint">
                Перетащите файлы, чтобы прикрепить их или выберите
              </p>
            </div>
          </Dragger>
        </Form.Item>
        {/* {newsById?.foto && (
          <div className="mt-3 flex justify-center">
            <img
              src={newsById.foto}
              alt="Загруженное фото"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        )} */}
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
