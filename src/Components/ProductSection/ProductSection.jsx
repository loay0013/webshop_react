import React, { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
import ProductSectionItem from "./ProductSectionItem";

const ProductSection = () => {
    const [visibleProductsCount, setVisibleProductsCount] = useState(10);

    const handleLoadMore = () => {
        setVisibleProductsCount((prevCount) => Math.min(prevCount + 10, storeData.length)); // Avoid exceeding the total number of products
    };

    // Check if all products have been loaded
    const allProductsLoaded = visibleProductsCount >= storeData.length;

    return (
        <div>
            <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
                {storeData.slice(0, visibleProductsCount).map((product, index) => (
                    <div key={index}>
                        <ProductSectionItem
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            text={product.text}
                            price={product.price}
                            totalPrice={product.totalPrice}
                            color={product.color}
                            size={product.size}
                        />
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                {!allProductsLoaded ? (
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Load More
                    </button>
                ) : (
                    <span className="text-gray-500">You've reached the end. No more products to load.</span>
                )}
            </div>
        </div>
    );
};

export default ProductSection;
