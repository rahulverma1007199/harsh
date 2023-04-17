import React from "react";

const CustomButton = ({ type, btnRole, btnTitle }) => {
  return (
    <>
      {btnRole === "save" ? (
        <button
          type={type}
          className="px-3 w-full py-2 text-primaryWhite bg-primaryBlue mt-4"
        >
          {btnTitle}
        </button>
      ) : (
        <button className="px-3 w-full py-2 bg-primaryWhite drop-shadow-md mt-4">
          {btnTitle}
        </button>
      )}
    </>
  );
};
export default CustomButton;
