import { Modal } from "antd";
import { useRemoveNewsMutation } from "../../store";

export const WarningModal = ({ open, onCancel, id }) => {
  const [remove] = useRemoveNewsMutation();

  const onConfirm = () => {
    remove(id);
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
      <p>Вы уверены, что хотите удалить эту новость?</p>
    </Modal>
  );
};
