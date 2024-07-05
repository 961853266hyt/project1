import React from 'react';
import { useField, useFormikContext } from 'formik';

const CustomImageUrlInput: React.FC<{ label: string; name: string; type?: string; handleShowImage: () => void }> = ({ label, handleShowImage, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    setFieldValue(props.name, e.target.value);
  };

  const errorClass = meta.touched && meta.error ? 'border-error-orange' : 'border-gray-300';

  return (
    <div className="mb-4">
      <label className="block text-main-grey">{label}</label>
      <div className="flex items-center border border-gray-300 rounded mt-1">
        <input
          {...field}
          {...props}
          className={`grow px-4 py-2 rounded ${errorClass}`}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleShowImage}
          className="px-2 py-1 bg-main-purple text-white rounded mr-1 h-8"
        >
          Upload
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error-orange text-sm mt-1 text-right">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomImageUrlInput;