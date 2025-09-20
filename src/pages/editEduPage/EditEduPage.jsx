import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Typography,
  Upload,
} from "antd";

import { useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "./EditEduPage.module.scss";
import clsx from "clsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddEduMutation } from "../../store";
import { Wrapper } from "../../common";

const { Dragger } = Upload;

export const EditEduPage = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const [checkPeriod, setCheckPeriod] = useState(true);
  const [checkDate, setCheckDate] = useState(false);
  const [value, setValue] = useState("");
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

    fileList.forEach((f) => {
      formData.append("files", f.originFileObj, f.name);
    });

    await addEdu(formData).unwrap();

    form.resetFields();
    setFileList();
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
    setFileList();
    form.resetFields();
  };

  return (
    <Flex vertical className={clsx("page_wrap")}>
      <Typography.Title level={3}>Добавить в обучение</Typography.Title>
      <Wrapper>
        <Form
          onFinish={onFinish}
          form={form}
          name="newsCreateForm"
          layout="vertical"
          className={clsx(styles.form)}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Row gutter={24}>
                <Col span={12}>
                  {" "}
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
                </Col>
                <Col span={12}>
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
                    <Input.TextArea
                      rows={2}
                      placeholder="Введите место проведения"
                    />
                  </Form.Item>
                </Col>
              </Row>

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
                <div>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                  />
                  {/* <h3>Превью (HTML из базы):</h3>
                <div dangerouslySetInnerHTML={{ __html: value }} /> */}
                </div>
                {/* <Input.TextArea rows={10} placeholder="Введите описание" /> */}
              </Form.Item>

              <Form.Item name="price" label="Стоимость">
                <Input placeholder="Введите стоимость" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Flex align="center" className={clsx("mb-4")}>
                <Checkbox checked={checkPeriod} onChange={onCheckPeriod}>
                  Период проведения
                </Checkbox>
                <Checkbox checked={checkDate} onChange={onCheckDate}>
                  Дата проведения
                </Checkbox>
              </Flex>

              <Divider className={clsx("my-2")} />

              {checkPeriod && (
                <Flex>
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
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
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
      </Wrapper>
    </Flex>
  );
};
