import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/Global";
import { useState } from "react";
import { handleFormatMoney } from "../../utils/formatData";

export default function Header() {
  const { cartLength,carts,totalMoney,handleAddToCart,handleMinus ,handleDeleteAllQuantity} = useContext(GlobalContext);

const[open,setOpen] = useState(false)
const handleOpen = ()=>{
  setOpen(!open)
}
  return (
    <>
      <header className="h-[56px] w-full bg-orange-500 flex items-center justify-between px-12 text-white">
        <ul className="flex gap-3">
          <li>Trang chủ</li>
          <li>Danh sách sản phẩm</li>
        </ul>
        <div className="relative">
          <ShoppingCartOutlined className="text-[24px]" onClick={handleOpen} />
          <p className="bg-red-500 px-2 text-[12px] absolute top-[-10px] right-[-20px] rounded-lg hover:text-[14px] transition-all duration-75 ease-linear">
            {cartLength > 9 ? "9+" : cartLength}
          </p>
        </div>
      </header>
      <div>
{
  open&&<div className="bg-black w-[550px] text-white rounded px-5 py-4 fixed right-[1px] z-[1000]">
  <h3 className="font-semibold text-2xl mb-2">Cart</h3>
  <hr />
  <ul className="flex flex-col gap-4 mt-3 pr-5 min-h-[300px] max-h-[500px] overflow-auto">
    {
      carts.map((cart,index)=>(
        <li className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img className="h-14 border p-1 w-14 object-cover rounded-full" src={cart.product.image} alt="iPhone 14 Pro Max" />
          <div>{cart.product.productName}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <button className="h-6 leading-4 px-2 border rounded" onClick={()=>handleAddToCart(cart.product)}>+</button>
            <span>{cart.quantity}</span>
            <button className="h-6 leading-4 px-2 border rounded"   onClick={()=>handleMinus(index)} >-</button>
          </div>
          <button  onClick={()=>handleDeleteAllQuantity(index)}>xoa</button>
        </div>
      </li>
      ))
    }
  
  </ul>
  <hr className="mt-5" />
  <footer className="flex items-center gap-5 pt-5">
    <span>Tổng tiền:</span>
    <span>{handleFormatMoney(totalMoney)}</span>
  </footer>
</div>
}



</div>
    </>
  );
}
