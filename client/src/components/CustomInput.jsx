import React from "react";

const CustomInput = ({ id, label, type, name, onChangeProp }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChangeProp}
        className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full "
        type={type}
        name={name}
        id={id}
      />
    </div>
  );
};
export default CustomInput;
