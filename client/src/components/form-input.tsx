import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type FormInputProps = {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
};

export function FormInput({
  name,
  placeholder,
  type = "text",
  required = true
}: FormInputProps) {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      required = {required}
      rules={[{ required, message: "this field is required" }]}
    >
      <Input placeholder={placeholder} type={type} />
    </Form.Item>
  );
}

type PasswordInputProps = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export function PasswordInput({
  name,
  placeholder,
  dependencies,
}: PasswordInputProps) {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "this field is required",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Password must be at least 6 characters")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  );
}
