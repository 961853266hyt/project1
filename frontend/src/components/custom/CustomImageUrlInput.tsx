import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { ImageIcon } from '../icons/imageIcon';

const CustomImageUrlInput: React.FC<{ label: string; name: string; type?: string }> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
  const [preview, setPreview] = useState<string | null>(null);

  const urlSchema = Yup.string().url().required("Please enter your image URL!").transform((currentValue) => {
    const doesNotStartWithHttp =
      currentValue &&
      !(
        currentValue.startsWith('http://') ||
        currentValue.startsWith('https://')
      );

    if (doesNotStartWithHttp) {
      return `http://${currentValue}`;
    }
    return currentValue;
  });

  const handleShowImage = async () => {
    try {
      const transformedValue = urlSchema.cast(field.value);
      await urlSchema.validate(transformedValue);
      setPreview(transformedValue);
      setFieldError(props.name, undefined);
      setFieldValue(props.name, transformedValue); 
    } 
    catch (error) {
      setFieldError(props.name, error.message);
      setPreview(null); 
    }
    setFieldTouched(props.name, true);
  };

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
          className={`flex-grow px-4 py-2 focus:border-block rounded ${errorClass}`}
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
      {!preview && (
        <div className='mt-4 grid mx-auto border border-gray-200 border-dashed w-4/5 md:w-full h-[200px] rounded gap-y-0'>
          <div className='grid mx-auto mt-16 h-fit'>
            <span className='flex mx-auto mb-2'><ImageIcon /></span>
            <p className='text-main-grey font-semibold text-center text-lg'> image preview!</p>
          </div>
          
        </div>
      )}
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="grid mx-auto py-2 rounded border border-gray-200 border-dashed w-4/5 md:w-full h-[200px] object-contain" />
        </div>
      )}
    </div>
  );
};

export default CustomImageUrlInput;