import { UseMutateFunction } from "@tanstack/react-query";
import { Form, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { PostType } from "../../utils/type";
import PostForm from "./PostForm";

interface PostModalProps {
  isOpen: boolean;
  data?: PostType | undefined;
  users: {
    value: number;
    label: string;
  }[];
  onClose: () => void;
  isPending: boolean;
  mutateCreatePost: UseMutateFunction<unknown, Error, PostType>;
  mutateUpdatePost: UseMutateFunction<unknown, Error, PostType>;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  data,
  users,
  onClose,
  isPending,
  mutateCreatePost,
  mutateUpdatePost,
}) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = (values: PostType) => {
    if (data) {
      mutateUpdatePost({ ...values, id: data.id });
    } else {
      mutateCreatePost(values);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={data ? "Edit Post" : "Create New Post"}
      onCancel={handleClose}
      onOk={form.submit}
      okText={data ? "Save" : "Create"}
      confirmLoading={isPending}
    >
      <PostForm form={form} data={data} users={users} onSubmit={handleSubmit} />
    </Modal>
  );
};

const { confirm } = Modal;

// eslint-disable-next-line react-refresh/only-export-components
export const modalDeletePost = (onSubmit: () => void, isLoading: boolean) => {
  confirm({
    title: "Delete Post",
    icon: <ExclamationCircleFilled />,
    content: "Are you sure delete this post?",
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

export default PostModal;
