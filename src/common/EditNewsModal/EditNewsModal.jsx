import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useUploadFileMutation,
} from "../../store";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

const { Dragger } = Upload;

const options = [
  {
    value: "cm",
    label: "см",
  },
  {
    value: "px",
    label: "px",
  },
];

const convertPX = (cm) => cm * 37.8;

export const EditNewsModal = ({ open, onCancel, id }) => {
  const [form] = Form.useForm();
  const [update_news] = useUpdateNewsMutation();
  const [upload] = useUploadFileMutation();
  const { data } = useGetNewsByIdQuery(id ?? skipToken);

  const [unitWidth, setUnitWidth] = useState("px");
  const [unitHeight, setUnitHeight] = useState("px");

  const onChangeWidth = (value) => {
    setUnitWidth(value);
  };

  const onChangeHeight = (value) => {
    setUnitHeight(value);
  };

  useEffect(() => {
    if (open && data?.body?.[0]) {
      const item = data.body[0];
      form.setFieldsValue({
        title: item.nameid,
        description: item.descr,
        date: dayjs(item.date_publish),
        width: item.width,
        height: item.height,
        photo: item.file,
      });
    }
  }, [open, data, form]);

  const onFinish = async (values) => {
    let filePath = data.body[0].file;

    const file = values.photo?.fileList?.[0]?.originFileObj;

    if (file) {
      try {
        const fileBuffer = await file.arrayBuffer();
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

    const width =
      unitWidth === "cm"
        ? Math.round(convertPX(Number(values.width)))
        : Number(values.width);

    const height =
      unitHeight === "cm"
        ? Math.round(convertPX(Number(values.height)))
        : Number(values.height);

    console.log(width, "width");
    console.log(height, "height");

    update_news({
      codeid: id,
      nameid: values.title,
      descr: values.description,
      date_publish: values.date.format("MM-DD-YYYY"),
      file: filePath,
      width: width || null,
      height: height || null,
    });

    setUnitWidth("px");
    setUnitHeight("px");
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    setUnitWidth("px");
    setUnitHeight("px");
    // form.resetFields();
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
        name="editNewsForm"
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: "Введите название" }]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Содержание"
          rules={[{ required: true, message: "Введите описание" }]}
        >
          <Input.TextArea placeholder="Введите описание новости" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Дата"
          rules={[{ required: true, message: "Выберите дату" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <label>Ширина фотографии:</label>
            <Space.Compact>
              <Form.Item
                name="width"
                rules={[
                  {
                    required: true,
                    message: "Введите ширину",
                  },
                ]}
              >
                <Input type="number" placeholder="Введите ширину" />
              </Form.Item>
              <Select
                value={unitWidth}
                options={options}
                onChange={onChangeWidth}
              />
            </Space.Compact>
          </Col>
          <Col span={12}>
            <label>Высота фотографии:</label>
            <Space.Compact>
              <Form.Item
                name="height"
                rules={[
                  {
                    required: true,
                    message: "Введите высоту",
                  },
                ]}
              >
                <Input type="number" placeholder="Введите высоту" />
              </Form.Item>
              <Select
                value={unitHeight}
                options={options}
                onChange={onChangeHeight}
              />
            </Space.Compact>
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
                Перетащите файлы или нажмите для загрузки
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
    </Modal>
  );
};
