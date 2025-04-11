import { Button, DatePicker, Flex, Form, Input, Modal, Upload } from "antd";
import { useAddNewsMutation, useUploadFileMutation } from "../../store";

const { Dragger } = Upload;

export const AddNewsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [add_news] = useAddNewsMutation();
  const [upload] = useUploadFileMutation();

  const onFinish = async (values) => {
    let filePath = "";
    const file = values.photo.fileList[0].originFileObj;
    const fileBuffer = await file.arrayBuffer();

    if (file) {
      try {
        const response = await upload(fileBuffer);
        if (response?.data?.status === 200) {
          filePath = response.data.body.path;
        } else {
          console.error("Ошибка при загрузке файла");
          return;
        }
      } catch (err) {
        console.error("Ошибка при загрузке файла:", err);
        return;
      }
    }

    add_news({
      codeid: 0,
      nameid: values.title,
      descr: values.description,
      date_publish: values.date.format("MM-DD-YYYY"),
      file: filePath,
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
