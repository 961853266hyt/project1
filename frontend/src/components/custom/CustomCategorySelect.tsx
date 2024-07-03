import React from 'react';
import { useField } from 'formik';

const CustomSelect: React.FC<{ label: string; name: string }> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.touched && meta.error ? 'border-error-orange' : 'border-gray-300';
  return (
    <div className="mb-4">
      <label className="block text-main-grey">{label}</label>
      <select {...field} {...props} className={`w-full px-4 py-2 border rounded mt-1 ${errorClass}`}>
        <option value="">Select a category</option>
        <option value="Computers">Computers</option>
        <option value="Gaming">Gaming</option>
        <option value="Headset">Headset</option>
        <option value="Mouse">Mouse</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Pet">Pet</option>
        <option value="Smartphone">Smartphone</option>
      </select>
      {meta.touched && meta.error ? (
        <div className="text-error-orange text-sm mt-1 text-right">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;