import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Upload,
} from "antd";

import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useAddEduMutation,
  useGetEduQuery,
  useRemoveEduImgMutation,
} from "../../../store";

import styles from "./EditEduModal.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import ReactQuill from "react-quill";

const { Dragger } = Upload;

export const EditEduModal = ({ open, onCancel, item }) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const [checkPeriod, setCheckPeriod] = useState(false);
  const [checkDate, setCheckDate] = useState(false);
  const [localItem, setLocalItem] = useState(item);

  const [addEdu] = useAddEduMutation();
  const [removeEduImg] = useRemoveEduImgMutation();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append("codeid", item?.codeid);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price || "");
    formData.append("location", values.location);
    if (values.start_date)
      formData.append("start_date", values.start_date.format("YYYY-MM-DD"));
    if (values.end_date)
      formData.append("end_date", values.end_date.format("YYYY-MM-DD"));
    if (values.event_date)
      formData.append("event_date", values.event_date.format("YYYY-MM-DD"));

    if (fileList && fileList.length > 0) {
      fileList.forEach((f) => {
        formData.append("files", f.originFileObj, f.name);
      });
    }

    await addEdu(formData).unwrap();

    form.resetFields();
    setFileList([]);
    onCancel();
  };

  useEffect(() => {
    if (item) {
      const startDate = item?.start_date ? dayjs(item.start_date) : null;
      const endDate = item?.end_date ? dayjs(item.end_date) : null;
      const eventDate = item?.event_date ? dayjs(item.event_date) : null;

      form.setFieldsValue({
        codeid: item?.codeid,
        title: item?.title,
        description: item?.description,
        price: item?.price,
        location: item?.location,
        start_date: startDate,
        end_date: endDate,
        event_date: eventDate,
      });

      if (startDate && endDate) {
        setCheckPeriod(true);
        setCheckDate(false);
      } else if (eventDate) {
        setCheckDate(true);
        setCheckPeriod(false);
      } else {
        setCheckDate(false);
        setCheckPeriod(false);
      }
    }
  }, [item, form, open]);

  const onCheckPeriod = () => {
    setCheckPeriod(true);
    setCheckDate(false);
  };

  const onCheckDate = () => {
    setCheckDate(true);
    setCheckPeriod(false);
  };

  const onClose = () => {
    onCancel();
    setFileList();
    form.resetFields();
  };

  useEffect(() => {
    setLocalItem(item);
  }, [item]);

  const delEduImg = async (codeid) => {
    await removeEduImg({ codeid });

    setLocalItem((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((img) => img.codeid !== codeid),
    }));
  };

  return (
    <Modal
      width={1000}
      centered
      open={open}
      onCancel={onClose}
      title="Редактировать"
      footer={false}
    >
      <Form
        onFinish={onFinish}
        form={form}
        name="newsCreateForm"
        layout="vertical"
        className={clsx(styles.form)}
      >
        <Row gutter={24}>
          <Col span={15}>
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
              <Input.TextArea rows={2} placeholder="Введите название" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Описание"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <ReactQuill theme="snow" modules={modules} />
            </Form.Item>

            <Form.Item name="price" label="Стоимость">
              <Input placeholder="Введите стоимость" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Место проведения"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input.TextArea rows={2} placeholder="Введите место проведения" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Flex
              align="center"
              justify="space-between"
              className={clsx("mb-4")}
            >
              <Checkbox checked={checkPeriod} onChange={onCheckPeriod}>
                Период проведения
              </Checkbox>
              <Checkbox checked={checkDate} onChange={onCheckDate}>
                Дата проведения
              </Checkbox>
            </Flex>

            <Divider className={clsx("my-2")} />

            {checkPeriod && (
              <Flex justify="space-between">
                <Form.Item
                  name="start_date"
                  label="Начало периода"
                  rules={[
                    {
                      required: true,
                      message: "Это обязательное поле для заполнения",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Выберите дату"
                    style={{ width: "160px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="end_date"
                  label="Конец периода"
                  rules={[
                    {
                      required: true,
                      message: "Это обязательное поле для заполнения",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Выберите дату"
                    style={{ width: "160px" }}
                  />
                </Form.Item>
              </Flex>
            )}

            {checkDate && (
              <Form.Item
                name="event_date"
                label="Дата мероприятия"
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
            )}

            <Form.Item name="photo" valuePropName="photos">
              <Dragger
                name="file"
                multiple={true}
                accept="image/*"
                beforeUpload={() => false}
                fileList={fileList}
                onChange={(info) => setFileList(info.fileList)}
                itemRender={(originNode, file) => {
                  //   console.log(originNode, "originNode!!!");

                  const handleDelete = () => {
                    setFileList((prev) =>
                      prev.filter((f) => f.uid !== file.uid)
                    );
                  };

                  return (
                    <Flex
                      justify="space-between"
                      align="center"
                      className={clsx(styles.wrap, "mt-2")}
                    >
                      <span>{file?.name}</span>
                      <Flex gap={"small"}>
                        <Button
                          danger
                          className={styles.btn}
                          onClick={handleDelete}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Flex>
                    </Flex>
                  );
                }}
              >
                <div className="flex justify-center items-center gap-[11px] h-[30px]">
                  <p className="ant-upload-hint">
                    Перетащите файл или нажмите для выбора
                  </p>
                </div>
              </Dragger>
            </Form.Item>
            <Flex
              justify="space-between"
              gap="small"
              className={clsx(styles.wrap)}
              vertical
            >
              {localItem?.imgs?.map((img) => {
                return (
                  <Flex justify="space-between" key={img.img_url}>
                    <span>{img.original_name}</span>
                    <Flex gap={"small"}>
                      <Button
                        danger
                        className={styles.btn}
                        onClick={() => delEduImg(img?.codeid)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Col>
        </Row>

        <Form.Item>
          <Flex align="center" gap={"small"} justify="center">
            <Button type="primary" htmlType="submit">
              Обновить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
