import { DatePicker, Flex, Input, Select, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const NewsFilter = ({ setSearchName, setSearchDate }) => {
  const onChange = (date, dateString) => {
    setSearchDate(date);
  };

  return (
    <Flex vertical gap={"large"}>
      <Typography.Text>Фильтрация:</Typography.Text>
      <Flex gap={"large"}>
        <Input
          placeholder="Поиск по названию"
          prefix={<SearchOutlined />}
          style={{
            width: "400px",
          }}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <DatePicker
          placeholder="Выберите дату"
          style={{
            width: "400px",
          }}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};
