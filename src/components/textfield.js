import React, { useState } from "react";
import { Form } from "react-bootstrap";

function MyFormControl(props) {
  const [textValue, setTextValue] = useState("");

  return (
    <>
    <Form.Control
      type={props.type}
      placeholder={props.placeholder}
      value={textValue}
      onChange={(e) => setTextValue(e.target.value)}
    />
    </>
  );
}

export default MyFormControl;
