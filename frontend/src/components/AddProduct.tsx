import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from './custom/CustomInput';
import CustomTextarea from './custom/CustomTextarea';
import CustomSelect from './custom/CustomCategorySelect';

interface ProductValues {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  createdBy: string;
  createdAt: Date;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the product name!"),
  description: Yup.string().optional(),
  price: Yup.number().min(1, "The price should be more than $1!").required("Please enter the price!"),
  stock: Yup.number().min(1, "You can't create a product with 0 stock!").integer('Please enter an integer number!').required(),
  category: Yup.string()
    .oneOf([
      "Computers", "Gaming", "Headset", "Mouse", "Pet", "Smartphone"
    ])
    .required("Please select a category of your product!"),
  image_url: Yup.string().url().required("Please enter your image URL!").transform((currentValue) => {
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
  })
});

const AddProduct: React.FC = () => {
  const initialValues: ProductValues = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image_url: '',
    createdBy: '', // This should be set with the current user's ID
    createdAt: new Date(),
  };

  const handleSubmit = (values: ProductValues) => {
    console.log(values);
  };

  return (
    <>
      <section className='w-full md:w-[660px]'>
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>
        <div className="mx-auto bg-white p-8 rounded w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <CustomInput label="Product Name" name="name" type="text" />
              <CustomTextarea label="Product Description" name="description" />
              <CustomSelect label="Category" name="category" />
              <CustomInput label="Price" name="price" type="number" />
              <CustomInput label="In Stock Quantity" name="stock" type="number" />
              <CustomInput label="Add Image Link" name="image_url" type="text" />
              <button type="submit" className="w-full px-4 py-2 bg-main-purple text-white rounded">
                Add Product
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default AddProduct;