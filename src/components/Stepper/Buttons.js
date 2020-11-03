import React, { memo } from "react";
import Papa from "papaparse";
import { Button } from "antd";

function Buttons({ setFormData, changeCurrentCallback }) {
  const getCSVData = async () => {
    const response = await fetch("data.csv");
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);
    const { data = [] } = Papa.parse(csv);
    const generatedData = {};
    data[0].forEach((item, index) => {
      generatedData[item.toLowerCase()] = parseInt(data[1][index]) || data[1][index];
    });
    setFormData(generatedData ?? {});
    changeCurrentCallback("next");
  };

  return (
    <div className="form_wrapper__buttons">
      <Button onClick={() => changeCurrentCallback("next")}>Add from Scratch</Button>
      <Button onClick={getCSVData}>Upload as CSV</Button>
    </div>
  );
}

export default memo(Buttons);
