import React from 'react';
import { useField } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CustomInput: React.FC<{ label: string; name: string; type?: string; showPassword?: boolean; toggleShowPassword?: () => void }> = ({ label, showPassword, toggleShowPassword, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.touched && meta.error ? 'border-error-orange' : 'border-gray-300';
  return (
    <div className="mb-4 relative">
      <label className="block text-main-grey">{label}</label>
      <input {...field} {...props} className={`w-full px-4 py-2 border rounded mt-1 ${errorClass}`} />
      {props.type === 'password' && (
        <div
          className="absolute right-3 top-10 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
      {meta.touched && meta.error ? (
        <div className="text-error-orange text-sm mt-1 text-right">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;