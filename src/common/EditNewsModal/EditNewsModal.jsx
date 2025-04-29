import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Upload,
} from "antd";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useUploadFileMutation,
} from "../../store";
import dayjs from "dayjs";
import { useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

const { Dragger } = Upload;

export const EditNewsModal = ({ open, onCancel, id }) => {
  const [form] = Form.useForm();

  const [update_news] = useUpdateNewsMutation();

  const [upload] = useUploadFileMutation();

  const { data } = useGetNewsByIdQuery(id ? id : skipToken);

  useEffect(() => {
    if (data && data.body[0]) {
      form.setFieldsValue({
        title: data.body[0].nameid,
        description: data.body[0].descr,
        date: dayjs(data.body[0].date_publish),
        photo: data.body[0].file,
        width: data.body[0].width,
        height: data.body[0].height,
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    let filePath = data.body[0].file;
    if (values.photo && values.photo.fileList) {
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
    }

    update_news({
      codeid: id,
      nameid: values.title,
      descr: values.description,
      date_publish: values.date.format("MM-DD-YYYY"),
      file: filePath || data.body[0].file,
      width: values.width || null,
      height: values.height || null,
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
      width={600}
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
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="width"
              label="Длина фотографии, пиксель"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите длину" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="height"
              label="Высота фотографии, пиксель"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите высоту" />
            </Form.Item>
          </Col>
        </Row>
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
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      {/* <div className="mt-3 flex justify-center">
        <button onClick={() => test()}>rhrteh</button>
      </div> */}
    </Modal>
  );
};
