import React from 'react';

const Inputbox = ({ placeholder, type, value, onChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value} // Bind the value prop
      onChange={onChange} // Handle input changes
      className="text-black rounded-md mt-6 justify-center align-middle p-2 active:border-black"
    />
  );
};

export default Inputbox;
