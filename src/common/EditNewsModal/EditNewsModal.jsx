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
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useUploadFileMutation,
} from "../../store";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./EditNewsModal.module.scss";
import { CropperImg } from "../CropperImg";

const { Dragger } = Upload;

export const EditNewsModal = ({ open, onCancel, id }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [update_news] = useUpdateNewsMutation();
  const [upload] = useUploadFileMutation();
  const { data } = useGetNewsByIdQuery(id ?? skipToken);
  const foto = useSelector((state) => state.newsFoto.foto);
  const [file, setFile] = useState();
  const [openCropper, setOpenCropper] = useState(false);

  useEffect(() => {
    const item = data?.body[0];
    if (open && data?.body?.[0]) {
      form.setFieldsValue({
        title: item.nameid,
        description: item.descr,
        date: dayjs(item.date_publish),
        width: item.width,
        height: item.height,
        photo: item.file,
      });
    }

    setFile(item?.file);
  }, [open, data, form]);

  const onFinish = async (values) => {
    let filePath = data.body[0].file;

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

    update_news({
      codeid: id,
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

  const onCropper = (fileOrUrl) => {
    const isUrl = typeof fileOrUrl === "string";

    const imageUrl = isUrl
      ? fileOrUrl
      : URL.createObjectURL(fileOrUrl.originFileObj);

    setOpenCropper(true);
    setFile(imageUrl);
  };

  const onEditExisting = async () => {
    try {
      const response = await fetch(`https://sakbol.com${file}`);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);

      const wrappedFile = {
        originFileObj: new File([blob], "cropped.jpg", { type: blob.type }),
      };

      onCropper(wrappedFile);
    } catch (err) {
      console.error("Ошибка загрузки изображения:", err);
    }
  };

  const onClose = () => {
    onCancel();
    setOpenCropper(false);
    setFile("");
    dispatch(clearFoto());
    form.resetFields();
  };

  return (
    <Modal
      width={openCropper ? 900 : 500}
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
        <Row gutter={24}>
          <Col span={openCropper ? 12 : 24}>
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
            <Form.Item name="photo" valuePropName="photos">
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
            <Button onClick={onEditExisting}>
              Отредактировать существующий
            </Button>
          </Col>
          {openCropper && (
            <Col span={12}>
              <CropperImg img={file} />
            </Col>
          )}
        </Row>

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
