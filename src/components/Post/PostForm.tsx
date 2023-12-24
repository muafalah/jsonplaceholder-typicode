import { Form, FormInstance, Input, Select } from "antd";

import { PostType } from "../../utils/type";

const styleFormItem = { marginBottom: 12, fontWeight: 600 };

interface PostFormProps {
  form: FormInstance<PostType>;
  data: PostType | undefined;
  users: {
    value: number;
    label: string;
  }[];
  onSubmit: (values: PostType) => void;
}

const PostForm: React.FC<PostFormProps> = ({ form, data, users, onSubmit }) => {
  return (
    <Form
      key={data ? data.id : "new"}
      form={form}
      layout="vertical"
      style={{ maxWidth: 600, marginTop: 16, marginBottom: 24 }}
      onFinish={onSubmit}
    >
      <Form.Item<PostType>
        label="Title"
        name="title"
        style={styleFormItem}
        rules={[{ required: true, message: "Please input title!" }]}
        initialValue={data?.title}
      >
        <Input />
      </Form.Item>

      <Form.Item<PostType>
        label="Description"
        name="body"
        style={styleFormItem}
        rules={[{ required: true, message: "Please input description!" }]}
        initialValue={data?.body}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item<PostType>
        label="User ID"
        name="userId"
        style={styleFormItem}
        rules={[{ required: true, message: "Please select one user!" }]}
        initialValue={data?.userId}
      >
        <Select
          placeholder="Select a user"
          style={{ minWidth: "100%" }}
          options={users}
        />
      </Form.Item>
    </Form>
  );
};

export default PostForm;
