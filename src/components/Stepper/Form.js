import React, { memo } from "react";
import { Form, Input, InputNumber, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default memo(function HomeDetail({ data, changeCurrentCallback, setFormData }) {
  const onFinish = (values) => {
    setFormData(values);
    changeCurrentCallback("next");
  };

  return (
    <Form
      className="form_wrapper__form"
      {...layout}
      name="nest-messages"
      initialValues={data ?? {}}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="address"
        label="Address"
        hasFeedback
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="bedroom"
        label="Bedroom"
        hasFeedback
        rules={[
          {
            required: true,
            type: "number",
            max: 10,
            min: 0,
          },
        ]}
      >
        <InputNumber size="large" />
      </Form.Item>
      <Form.Item
        name="bathroom"
        hasFeedback
        label="Bathroom"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
            max: 5,
          },
        ]}
      >
        <InputNumber size="large" />
      </Form.Item>
      <Form.Item name="description" label="Description" hasFeedback>
        <Input.TextArea size="large" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
});
