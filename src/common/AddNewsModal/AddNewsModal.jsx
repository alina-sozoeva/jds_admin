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
import { useAddNewsMutation, useUploadFileMutation } from "../../store";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./AddNewsModal.module.scss";
import foto from "../../assets/news.jpg";

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

export const AddNewsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [add_news] = useAddNewsMutation();
  const [upload] = useUploadFileMutation();
  const [unitWidth, setUnitWidth] = useState("px");
  const [unitHeight, setUnitHeight] = useState("px");
  const [file, setFile] = useState();
  const [openCropper, setOpenCropper] = useState(false);

  const onCropper = (file) => {
    setOpenCropper(true);
    setFile(file);
  };

  console.log(file, "file!!!!");
  console.log(foto, "foto!!!");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const onChangeWidth = (value) => {
    setUnitWidth(value);
  };

  const onChangeHeight = (value) => {
    setUnitHeight(value);
  };

  const convertPX = (cm) => cm * 37.8;

  const onFinish = async (values) => {
    let filePath = "";
    const file = values.photo.fileList[0]?.originFileObj;

    // if (file) {
    //   try {
    //     const fileBuffer = await file.arrayBuffer();
    //     const response = await upload(fileBuffer);
    //     if (response?.data?.status === 200) {
    //       filePath = response.data.body.path;
    //     } else {
    //       console.error("Ошибка при загрузке файла");
    //       return;
    //     }
    //   } catch (err) {
    //     console.error("Ошибка при загрузке файла:", err);
    //     return;
    //   }
    // }

    const width =
      unitWidth === "cm"
        ? Math.round(convertPX(Number(values.width)))
        : Number(values.width);

    const height =
      unitHeight === "cm"
        ? Math.round(convertPX(Number(values.height)))
        : Number(values.height);

    // add_news({
    //   codeid: 0,
    //   nameid: values.title,
    //   descr: values.description,
    //   date_publish: values.date.format("MM-DD-YYYY"),
    //   file: filePath,
    //   width: width || null,
    //   height: height || null,
    // });

    setUnitWidth("px");
    setUnitHeight("px");
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    setUnitWidth("px");
    setUnitHeight("px");
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
            itemRender={(originNode, file) => {
              console.log(originNode, "originNode!!!");

              return (
                <Flex
                  justify="space-between"
                  align="center"
                  onClick={() => onCropper(file)}
                  className={styles.wrap}
                >
                  <span>{file?.name}</span>
                  <Button danger className={styles.btn}>
                    <DeleteOutlined />
                  </Button>
                </Flex>
              );
            }}
          >
            <div className="flex justify-center items-center gap-[11px] h-[88px]">
              <p className="ant-upload-hint">
                Перетащите файл или нажмите для выбора
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
      {openCropper && (
        <Cropper
          image={file}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          cropSize={{ width: 300, height: 300 }}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )}
    </Modal>
  );
};
