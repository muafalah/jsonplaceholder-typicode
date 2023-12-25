import { Form, FormInstance, Input } from "antd";
import { CommentType } from "../../utils/type";

const styleFormItem = { marginBottom: 12, fontWeight: 600 };

interface CommentFormProps {
  form: FormInstance<CommentType>;
  data: CommentType | undefined;
  onSubmit: (values: CommentType) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ form, data, onSubmit }) => {
  return (
    <Form
      key={data?.id || "new"}
      form={form}
      layout="vertical"
      style={{ maxWidth: 600, marginTop: 16, marginBottom: 24 }}
      onFinish={onSubmit}
    >
      <Form.Item<CommentType>
        label="Name"
        name="name"
        style={styleFormItem}
        initialValue={data?.name}
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<CommentType>
        label="Email"
        name="email"
        style={styleFormItem}
        initialValue={data?.email}
        rules={[{ required: true, message: "Please input email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<CommentType>
        label="Comment"
        name="body"
        style={styleFormItem}
        initialValue={data?.body}
        rules={[{ required: true, message: "Please input comment!" }]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
