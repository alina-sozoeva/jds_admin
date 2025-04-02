import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import { useAddNewsMutation } from "../../store";

const { Dragger } = Upload;

export const AddNewsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [add_news] = useAddNewsMutation();

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
  };

  const onFinish = async (values) => {
    const file = values.photo?.fileList?.[0]?.originFileObj;
    const formData = new FormData();

    // const base64 = file ? await toBase64(file) : foto;

    formData.append("nameId", values.title);
    formData.append("descr", values.description);
    formData.append("date_publish", values.date.format("YYYY-MM-DD"));

    if (file) {
      formData.append("file", file);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });
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
