import { Form, Input } from "antd";

import { UserType } from "../../utils/type";

const styleFormItem = { marginBottom: 12, fontWeight: 600 };

interface UserFormProps {
  data: UserType | undefined;
}

const UserForm: React.FC<UserFormProps> = ({ data }) => {
  return (
    <Form
      key={data?.id}
      layout="vertical"
      style={{ maxWidth: 600, marginTop: 16 }}
      initialValues={data}
    >
      <Form.Item<UserType> label="Name" name="name" style={styleFormItem}>
        <Input readOnly />
      </Form.Item>

      <Form.Item<UserType>
        label="Username"
        name="username"
        style={styleFormItem}
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item<UserType> label="Email" name="email" style={styleFormItem}>
        <Input readOnly />
      </Form.Item>

      <Form.Item<UserType> style={{ marginBottom: 0, fontWeight: 600 }}>
        <Form.Item<UserType>
          label="Street"
          name={["address", "street"]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px 12px 0",
          }}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item<UserType>
          label="Suite"
          name={["address", "suite"]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 0 12px 8px",
          }}
        >
          <Input readOnly />
        </Form.Item>
      </Form.Item>

      <Form.Item<UserType> style={{ marginBottom: 0, fontWeight: 600 }}>
        <Form.Item<UserType>
          label="City"
          name={["address", "city"]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px 12px 0",
          }}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item<UserType>
          label="Zip Code"
          name={["address", "zipcode"]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 0 12px 8px",
          }}
        >
          <Input readOnly />
        </Form.Item>
      </Form.Item>

      <Form.Item<UserType> label="Phone" name="phone" style={styleFormItem}>
        <Input readOnly />
      </Form.Item>

      <Form.Item<UserType> label="Website" name="website" style={styleFormItem}>
        <Input readOnly />
      </Form.Item>

      <Form.Item<UserType>
        label="Company"
        name={["company", "name"]}
        style={styleFormItem}
      >
        <Input readOnly />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
