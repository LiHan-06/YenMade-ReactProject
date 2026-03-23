import React from "react";

const InputGroup = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  feedback,
  ...props
}) => {
  return (
    <div className="col-12">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        required={required}
        {...props} // 接收剩餘的 props 如 onChange, minLength 等
      />
      {feedback && <div className="invalid-feedback">{feedback}</div>}
    </div>
  );
};

export default InputGroup;
