import React from "react";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
    createdBy: string;
    createdAt: Date;
  };
  role: string;
  userId: string;
}

const Product: React.FC<ProductProps> = ({ role, userId, product }) => {
  return(
    <div className="col-span-1 w-full h-72 border border-gray-300 rounded flex flex-col">
      <div className="h-2/3 p-2">
        {product.image_url && <img src={product.image_url} alt={product.name} className="object-contain w-full h-full flex-grow"/>}
      </div>
      
      <div className="h-1/3 grid grid-cols-2 px-2">
        <p className="truncate text-main-grey text-md col-span-2">{product.name}</p>
        <p className="truncate text-black font-bold text-lg col-span-2">${product.price}</p>
        <button className={`bg-main-purple text-sm font-semibold text-white px-4 py-1 h-fit rounded ${userId === product.createdBy ? "col-span-1 mr-2": "col-span-2 mr-0" } `}>Add</button>
        {role === "admin" && userId === product.createdBy &&
          <button className="border border-gray-300 col-span-1 bg-white text-sm font-semibold text-main-grey px-4 py-1 h-fit rounded">Edit</button>}
      </div>
      
    </div>
  );
}

export default Product;