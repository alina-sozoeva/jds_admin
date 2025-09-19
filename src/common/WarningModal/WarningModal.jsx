import { Modal } from "antd";
import { useRemoveNewsMutation } from "../../store";

export const WarningModal = ({ open, onCancel, title, onConfirm }) => {
  const onFinish = () => {
    onConfirm();
    onCancel();
  };

  return (
    <Modal
      title="Подтвердите удаление"
      centered
      open={open}
      onCancel={onCancel}
      onOk={onFinish}
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
    >
      <p>Вы действительно хотите удалить {title}?</p>
    </Modal>
  );
};
