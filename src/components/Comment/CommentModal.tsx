import { Form, Modal } from "antd";
import { UseMutateFunction } from "@tanstack/react-query";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { CommentType } from "../../utils/type";
import CommentForm from "./CommentForm";

interface CommentModalProps {
  isOpen: boolean;
  data: CommentType | undefined;
  onClose: () => void;
  isPending: boolean;
  mutateCreateComment: UseMutateFunction<unknown, Error, CommentType>;
  mutateUpdateComment: UseMutateFunction<unknown, Error, CommentType>;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  data,
  onClose,
  isPending,
  mutateCreateComment,
  mutateUpdateComment,
}) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = (values: CommentType) => {
    if (data) {
      mutateUpdateComment({ ...values, id: data.id });
    } else {
      mutateCreateComment(values);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={data ? "Edit Comment" : "Create New Comment"}
      onCancel={handleClose}
      onOk={form.submit}
      okText={data ? "Save" : "Create"}
      confirmLoading={isPending}
    >
      <CommentForm form={form} data={data} onSubmit={handleSubmit} />
    </Modal>
  );
};

const { confirm } = Modal;

// eslint-disable-next-line react-refresh/only-export-components
export const modalDeleteComment = (
  onSubmit: () => void,
  isLoading: boolean
) => {
  confirm({
    title: "Delete Comment",
    icon: <ExclamationCircleFilled />,
    content: "Are you sure delete this comment?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    closable: true,
    onOk() {
      onSubmit();
      return new Promise((resolve, reject) => {
        isLoading ? resolve : reject;
      });
    },
  });
};

export default CommentModal;
