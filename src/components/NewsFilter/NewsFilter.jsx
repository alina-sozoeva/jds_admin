import { DatePicker, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const NewsFilter = () => {
  return (
    <Flex gap={'large'}>
      <Input
        placeholder="Поиск по названию"
        prefix={<SearchOutlined />}
        style={{
          width: "400px",
        }}
      />
      <DatePicker
        placeholder="Выберите дату"
        style={{
          width: "400px",
        }}
      />
    </Flex>
  );
};
