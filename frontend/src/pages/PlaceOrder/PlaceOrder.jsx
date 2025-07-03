// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// export const PlaceOrder = () => {
//   const{getTotalAmount,token,food_list,cartItems,url}=useContext(StoreContext)
//   const navigate = useNavigate();
//   const[data,setData]=useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     zipcode:"",
//     phone:"",
//     country:""
//   })

//   const onChangeHandler = (event)=>{
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data=>({...data,[name]:value}))
//   }

//   const placeOrder=async(event)=>{
//     event.preventDefault();
//     let orderItems =[]
//     food_list.map((item)=>{
//       if(cartItems[item._id]>0){
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo)
//       }
//     })
    
//     console.log(orderItems[0]._id);
//     // console.log(req.userId);
    

    

    
//     let orderData = {
//       // userId: orderItems[0]._id,
//       address: data,
//       items: orderItems,
//       amount: getTotalAmount() + 2,
//     };
//     console.log(token);
//     console.log("Sending token:", token); // Check if token is printed correctly


//         const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: {
//           Authorization: `Bearer ${token}`  
//         }
//       });
    
//     if(response.data.success){
//       const{session_url}=response.data;
//       window.location.replace(session_url);
//     }
//     else{
//       alert("error")
//       console.error();
      
//     }
//     console.log(orderItems);
//   }

  
// useEffect(()=>{
//   if(!token){
//     navigate("/cart")
//   }
//   else if(getTotalAmount()===0){
//     navigate("/cart")
//   }
// },[token])
  
  
//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input  required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="first-name"
//           />
//           <input required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="last-name"
//           />
//         </div>
//         <input
//         required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="email-address"
//         />
//         <input
//         required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="street"
//         />
//         <div className="multi-fields">
//           <input required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="city"
//           />
//           <input
//           required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="state"
//           />
//         </div>
//         <div className="multi-fields">
//           <input required

//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="zip-code"
//           />
//           <input required

//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="country"
//           />
//         </div>
//         <input required

//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="number"
//           placeholder="phone"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>cart total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>total</b>
//               <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
//             </div>
//           </div>
//           <button type='submit'>proceed to Payment</button>
//         </div>
//       </div>
//     </form>
//   );
// }
















import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    country: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Order failed: " + response.data.message);
        navigate("/cart");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Unauthorized or error placing order.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (!token || getTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="number" placeholder="Phone Number" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};
