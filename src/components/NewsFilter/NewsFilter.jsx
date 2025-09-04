import { DatePicker, Flex, Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const NewsFilter = ({ setSearchName, setSearchDate }) => {
  const onChange = (date) => {
    if (!date) {
      setSearchDate(null);
    } else {
      setSearchDate(dayjs(date).format("MM-DD-YYYY"));
    }
  };

  return (
    <Flex vertical gap={"large"}>
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
