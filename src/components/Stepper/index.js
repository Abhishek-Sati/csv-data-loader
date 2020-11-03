import React, { useState, useCallback, memo } from "react";
import { Steps, Button } from "antd";
import Buttons from "./Buttons";
import Form from "./Form";
import Upload from "./Upload";

const { Step } = Steps;

export default memo(function FormWrapper() {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(undefined);

  const changeCurrent = useCallback(
    (type) => {
      switch (type) {
        case "prev": {
          setCurrent((current) => current - 1);
          return;
        }
        case "next": {
          setCurrent((current) => current + 1);
          return;
        }
        default:
          return;
      }
    },
    [current]
  );

  return (
    <div className="form_wrapper container">
      <Steps
        className="form_wrapper__stepper"
        current={current}
        status="error"
        onChange={(value) => setCurrent(value)}
      >
        <Step
          title="Fill Form"
          description="How you want to fill the form"
          disabled={current < 0}
        />
        <Step
          title="House Details"
          description="Enter complete house details here"
          disabled={current < 1}
        />
        <Step title="Upload Images" description="Upload house images" disabled={current < 2} />
      </Steps>
      {current === 2 ? (
        <Upload formData={formData} />
      ) : current === 1 ? (
        <Form data={formData} setFormData={setFormData} changeCurrentCallback={changeCurrent} />
      ) : (
        <Buttons setFormData={setFormData} changeCurrentCallback={changeCurrent} />
      )}
      <Button
        className="form_wrapper__prev_btn"
        onClick={() => changeCurrent("prev")}
        disabled={current === 0}
      >
        Previous
      </Button>
      <Button
        className="form_wrapper__next_btn"
        onClick={() => changeCurrent("next")}
        disabled={current === 2 || !formData}
      >
        Next
      </Button>
    </div>
  );
});
