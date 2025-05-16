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
  clearFoto,
  useAddNewsMutation,
  useUploadFileMutation,
} from "../../store";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./AddNewsModal.module.scss";
import { CropperImg } from "../CropperImg";
import { useDispatch, useSelector } from "react-redux";

const { Dragger } = Upload;

export const AddNewsModal = ({ open, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [add_news] = useAddNewsMutation();
  const [upload] = useUploadFileMutation();
  const [file, setFile] = useState();
  const [openCropper, setOpenCropper] = useState(false);
  const foto = useSelector((state) => state.newsFoto.foto);

  const onCropper = (file) => {
    const imageUrl = URL.createObjectURL(file.originFileObj);
    setOpenCropper(true);
    setFile(imageUrl);
  };

  console.log(foto, "foto");

  const onFinish = async (values) => {
    let filePath = "";

    const file =
      foto !== null
        ? foto.fileList[0]?.originFileObj
        : values.photo?.fileList[0]?.originFileObj;

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

    add_news({
      codeid: 0,
      nameid: values.title,
      descr: values.description,
      date_publish: values.date.format("MM-DD-YYYY"),
      file: filePath,
      width: 0,
      height: 0,
    });

    form.resetFields();
    setOpenCropper(false);
    dispatch(clearFoto());
    setFile("");
    onCancel();
  };

  const onClose = () => {
    onCancel();
    setOpenCropper(false);
    setFile("");
    form.resetFields();
  };

  return (
    <Modal
      width={openCropper ? 900 : 400}
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
        <Row gutter={24}>
          <Col span={openCropper ? 12 : 24}>
            <Form.Item
              name="title"
              label="Название"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите название" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Дата"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <DatePicker
                placeholder="Выберите дату"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Содержание"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input.TextArea placeholder="Введите описание новости" />
            </Form.Item>

            <Form.Item
              name="photo"
              valuePropName="photos"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
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
                      className={styles.wrap}
                    >
                      <span>{file?.name}</span>
                      <Flex gap={"small"}>
                        <Button
                          className={styles.btn}
                          onClick={() => onCropper(file)}
                        >
                          <EditOutlined />
                        </Button>
                        <Button danger className={styles.btn}>
                          <DeleteOutlined />
                        </Button>
                      </Flex>
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
          </Col>
          {openCropper && (
            <Col span={12}>
              <CropperImg img={file} />
            </Col>
          )}
        </Row>

        <Form.Item>
          <Flex align="center" gap={"small"} justify="end">
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
