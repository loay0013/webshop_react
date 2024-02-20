import React from 'react';
import { useParams } from 'react-router-dom';
import { storeData } from '../../assets/data/dummyData';
import { Button } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/slices/cartSlice';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ProductDetails = () => {
    const { productId } = useParams(); // Get productId from URL
    const dispatch = useDispatch(); // Get dispatch to use with Redux actions
    const product = storeData.find((p) => p.id === productId); // Find the product by id

    // If product is not found, show a fallback message
    if (!product) {
        return <div>Product not found</div>;
    }

    // Simplify adding to cart by pre-defining default size and color
    const defaultSize = product.size[0];
    const defaultColor = product.color[0];

    return (
        <div className="product-details-container">
            <Navbar></Navbar>
            <h1>{product.name}</h1>
            <div className="product-details">
                <img src={product.img} alt={product.name} className="product-image" />
                <div className="product-info">
                    <p>Description: {product.text}</p>
                    <p>Price: ${product.price}</p>
                    <p>Size: {product.size.join(', ')}</p>
                    <p>Color:
                        {product.color.map((color, index) => (
                            <span key={index} style={{
                                backgroundColor: color,
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                marginLeft: '5px'
                            }}></span>
                        ))}
                    </p>
                    <Button
                        onClick={() => {
                            dispatch(addToCart({
                                ...product, // Spread operator to pass all product details
                                amount: 1,
                                size: defaultSize,
                                color: defaultColor,
                            }));
                        }}
                        size="lg"
                        color="gray"
                        variant="outlined"
                        ripple={true}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetails;
