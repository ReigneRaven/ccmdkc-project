import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const PharmModal = ({ item, onClose }) => {

  const [quantity, setQuantity] = useState(20);
  const [modeCOD, setModeCOD] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.itemPrice);
  const [UserName, setUserName] = useState('')

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Update total price whenever quantity or item price changes
    setTotalPrice(quantity * item.itemPrice);
  }, [quantity, item.itemPrice]);

   const handleQuantityChange = (e) => {
   const newQuantity = parseInt(e.target.value, 10) || 1;
     newQuantity = Math.max(newQuantity, 20);
     setQuantity(newQuantity);
   };

  const decrementQuantity = () => {
    if (quantity > 20) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleModeChange = () => {
    // Toggle the mode of payment between true and false
    setModeCOD(!modeCOD);
  };

  const calculateTotalPrice = () => {
    const rawTotalPrice = quantity * item.itemPrice;
    const formattedTotalPrice = rawTotalPrice.toFixed(2); // Round to two decimal places
    return formattedTotalPrice;
  };
  
  // ...
  
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantity, item.itemPrice]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/purchase/", {
        UserName,
        quantity,
        modeCOD,
        itemId: item.itemId,
        itemName: item.itemName,
        totalPrice: calculateTotalPrice(),
      });
  
      console.log("Purchase recorded successfully:", response.data);
  
      const updatedStock = item.stocksAvailable - quantity;
      await axios.put(`http://localhost:5000/api/inventory/${item._id}`, {
        stocksAvailable: updatedStock,
      });
  
      console.log("Inventory updated successfully");
  
      navigate(`/patient/${userId}`, { state: { userId, UserName } });
  
      onClose();
    } catch (error) {
      console.error("Error recording purchase:", error.response?.data || error.message);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };
  

  return (
    <>
      <div className="modalPharm">
        <div className="modalPharmImg">
          <img
            id="pharmModalImg"
            src={`http://localhost:5000/${item.itemImg}`}
            alt={item.itemName}
            style={{ maxWidth: "100vw", maxHeight: "250px" }}
          />
        </div>

        <form id="modal-form-pharm" >
          <div className="pharmDetailsMed">
          <p id="product-name-p">{item.itemName}</p>
            <div className="qty-group">
            <input
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder=" Username"
                className="input-username"
                id="username"
              />
              <label htmlFor="quantity-input" id="qty-modal-p">
                Quantity <span id="label-min">&nbsp;(min 20 capsules)</span>
              </label>
              <div className="qty-counter">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  id="decrement-btn"
                >
                  -
                </button>
                {/* input/view for quantity */}
                <input
                  type="number"
                  id="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="20"
                />
                <button
                  type="button"
                  onClick={incrementQuantity}
                  id="increment-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mode-section">
              <p id="mode-modal-p">
                Mode of Payment
              </p>
              <div className="mode-group">
                <input
                  type="radio"
                  id="mode-cod"
                  checked={modeCOD}
                  onChange={handleModeChange}
                />
                <label htmlFor="mode-cod" id="radio-label">
                  Cash On Delivery
                </label>
              </div>
            </div>
           <p id="total-p">
            Total:&nbsp;&nbsp;&nbsp;
                <span id="total-price-modal">₱{calculateTotalPrice()}</span>
          </p>
          </div>
          <button type="button" id="buy-now-btn" onClick={handleSubmit}>
            Buy Now
          </button>
        </form>
      </div>

      <button onClick={onClose} id="close-btn-pharm">
        X
      </button>
    </>
  );
};

export default PharmModal;
