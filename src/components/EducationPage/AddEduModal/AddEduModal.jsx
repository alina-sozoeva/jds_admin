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

import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useAddEduMutation } from "../../../store";

import styles from "./AddEduModal.module.scss";
import clsx from "clsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Dragger } = Upload;

export const AddEduModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [checkPeriod, setCheckPeriod] = useState(true);
  const [checkDate, setCheckDate] = useState(false);

  const [addEdu] = useAddEduMutation();

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

    formData.append("codeid", 0);
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

    fileList.forEach((f, index) => {
      formData.append("files", f.originFileObj, f.name);
      formData.append("sort_orders", f.sort_order || index);
    });

    await addEdu(formData).unwrap();

    form.resetFields();
    setFileList();
    onCancel();
  };

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

  return (
    <Modal
      width={1000}
      centered
      open={open}
      onCancel={onClose}
      title="Добавить"
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
                      className={styles.wrap}
                    >
                      <span className={clsx(styles.hidden_name)}>
                        {file?.name}
                      </span>
                      <Flex gap={"small"} align="center">
                        <Input
                          style={{
                            width: "50px",
                            height: "26px",
                            textAlign: "center",
                          }}
                          value={file.sort_order || ""}
                          onChange={(e) => {
                            const newOrder = e.target.value;
                            setFileList((prev) =>
                              prev.map((f) =>
                                f.uid === file.uid
                                  ? { ...f, sort_order: newOrder }
                                  : f
                              )
                            );
                          }}
                        />

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
          </Col>
        </Row>

        <Form.Item>
          <Flex align="center" gap={"small"} justify="center">
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
