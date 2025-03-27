import { Typography } from "antd";
import styles from "./Wrapper.module.scss";
import clsx from "clsx";

export const Wrapper = ({ children, className, title, header }) => {
  return (
    <div className={styles.content}>
      {header || <Typography.Title level={4}>{title}</Typography.Title>}
      <div className={clsx(styles.wrapper, className)}>{children}</div>
    </div>
  );
};
