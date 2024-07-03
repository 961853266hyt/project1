import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from './custom/CustomInput.js';
import CustomTextarea from './custom/CustomTextarea.js';
import CustomSelect from './custom/CustomCategorySelect.js';
import CustomImageUrlInput from './custom/CustomImageUrlInput.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, getProductById } from '../redux/actions.js';

interface ProductValues {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  createdBy: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the product name!"),
  description: Yup.string().optional(),
  price: Yup.number().min(1, "The price should be more than $1!").required("Please enter the price!"),
  stock: Yup.number().min(0, "You can't create a product with negative stock!").integer('Please enter an integer number!').required(),
  category: Yup.string()
    .oneOf([
      "Computers", "Gaming", "Headset", "Mouse", "Outdoors", "Pet", "Smartphone"
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

const AddOrEditProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productID } = useParams();
  const [initialValues, setInitialValues] = useState<ProductValues>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image_url: '',
    createdBy: '',
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (productID) {
      const fetchData = async () => {
        const product = await dispatch(getProductById(productID));
        setInitialValues(product);
      };
      fetchData();
    }
  }, [dispatch, productID]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: ProductValues) => {
    const productData = {
      ...values,
      createdBy: user._id,
    };
    if (productID) {
      await dispatch(updateProduct(productID, productData));
    }
    else{
      await dispatch(addProduct(productData));
    }
    navigate('/');
  };

  return (
    <>
      <section className='w-full md:w-[660px]'>
        <h1 className="text-2xl font-bold mb-4">{ productID ? 'Edit Product' : 'Create Product'}</h1>
        <div className="mx-auto bg-white p-8 rounded w-full">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <CustomInput label="Product Name" name="name" type="text" />
              <CustomTextarea label="Product Description" name="description" />
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <span className='col-span-1 mr-1'>
                  <CustomSelect label="Category" name="category" />
                </span>
                <span className='col-span-1'>
                  <CustomInput label="Price" name="price" type="number" />
                </span>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3'>
                <span className='col-span-1 mr-1'>
                  <CustomInput label="In Stock Quantity" name="stock" type="number" />
                </span>
                <span className='col-span-2'>
                  <CustomImageUrlInput label="Upload Image" name="image_url" />
                </span>
              </div>
              <div className='flex justify-center md:justify-start'>
                <button type="submit" className="w-fit px-4 py-2 bg-main-purple text-white rounded">
                  { productID ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default AddOrEditProduct;