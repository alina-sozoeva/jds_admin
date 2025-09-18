import { Modal } from "antd";
import { useRemoveNewsMutation } from "../../store";

export const WarningModal = ({ open, onCancel, id, title }) => {
  const [remove] = useRemoveNewsMutation();

  const onConfirm = () => {
    remove(id);
    onCancel();
  };

  return (
    <Modal
      title="Подтвердите удаление"
      centered
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
    >
      <p>Вы действительно хотите {title} эту новость?</p>
    </Modal>
  );
};
