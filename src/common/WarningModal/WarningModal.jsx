import React, { useState } from "react";
import { Modal, Button } from "antd";

export const WarningModal = ({ open, onCancel, onConfirm }) => {
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