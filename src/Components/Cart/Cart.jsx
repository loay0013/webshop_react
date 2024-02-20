import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip } from "@material-tailwind/react";
import { removeFromCart, updateCartItemQuantity } from "../../features/slices/cartSlice"; // Update the path accordingly

const Cart = ({ openModal, setOpen }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.amount + delta;
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ ...item, amount: newQuantity }));
    } else {
      dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }));
    }
  };

  return (
      <div>
        {cart.length > 0 ? (
            <Fragment>
              <Dialog open={openModal} handler={() => setOpen(false)}>
                <DialogHeader>Shopping Bag</DialogHeader>
                <DialogBody divider>
                  {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <img src={item.img} alt={item.name} style={{ width: "100px", height: "100px" }} />
                          <p>{item.name}</p>
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                          <p>Price: {item.price}$</p>
                        </div>
                        <div>
                          <Button onClick={() => handleQuantityChange(item, -1)} color="red">-</Button>
                          <span> {item.amount} </span>
                          <Button onClick={() => handleQuantityChange(item, 1)} color="green">+</Button>
                        </div>
                        <div>
                          <Tooltip content="Remove from the Cart" placement="bottom">
                            <Button onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))} color="red">
                              Remove
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                  ))}
                </DialogBody>
                <DialogFooter>
                  <p>Total Price: {totalPrice}$</p>
                </DialogFooter>
              </Dialog>
            </Fragment>
        ) : (
            <Fragment>
              <Dialog open={openModal} handler={() => setOpen(false)}>
                <DialogHeader>Shopping Bag</DialogHeader>
                <DialogBody>
                  <p>Your cart is empty.</p>
                </DialogBody>
              </Dialog>
            </Fragment>
        )}
      </div>
  );
};

export default Cart;
