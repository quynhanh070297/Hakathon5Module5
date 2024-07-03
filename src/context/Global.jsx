import React, { createContext, useState } from "react";
import Header from "../layouts/header/Header";
import ListProduct from "../components/product/ListProduct";
import ProductJson from "../data.json";

// Tạo ngữ cảnh
export const GlobalContext = createContext();

export default function Global() {
  // Lấy dữ liệu carts trên localStorage
  const [carts, setCarts] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });

  // Ham tru so luong
  const handleMinus = (index)=>{
    console.log(1111);
      carts[index].quantity=carts[index].quantity-1
      const newCarts = [...carts]
      setCarts(newCarts);
      setTotalMoney(()=>(
        carts.reduce((pre,cart)=>pre+cart.product.price*cart.quantity,0)
      ))
      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(newCarts));
  }

  //Ham tinh tong tien
  const [totalMoney, setTotalMoney] = useState(()=>(
    carts.reduce((pre,cart)=>pre+cart.product.price*cart.quantity,0)
  ))
  /**
   * Hàm lưu và cập nhật dữ liệu
   * @param {*} key Key của dữ liệu trên local
   * @param {*} data Dữ liệu cần lưu
   */
  const handleSaveData = (key, data) => {
    // Cập nhật vào state
    setCarts(data);

    // Lưu vào local
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const findIndexProduct = carts.findIndex(
      (cart) => cart.product.id === product.id

    );


    if (findIndexProduct === -1) {
      const newCart = {
        id: Math.ceil(Math.random() * 10000000),
        product: product,
        quantity: 1,
      };
      // Thêm sản phẩm vào trong giỏ hàng
      const updateCart = [...carts, newCart];

      // Cập nhật vào state
      setCarts(updateCart);

      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(updateCart));
    } else {
      const newCartUpdate = [...carts];
      // Tăng số lượng
      newCartUpdate[findIndexProduct].quantity =
        newCartUpdate[findIndexProduct].quantity + 1;

      // Cập nhật vào state
      setCarts(newCartUpdate);

      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(newCartUpdate));
    }


    setTotalMoney(()=>(
      carts.reduce((pre,cart)=>pre+cart.product.price*cart.quantity,0)
    ))
  };
 const handleDeleteAllQuantity =(index)=>{
    carts.splice(index,1)
    const newCarts= [...carts]
      // Cập nhật vào state
      setCarts(newCarts);
      setTotalMoney(()=>(
        carts.reduce((pre,cart)=>pre+cart.product.price*cart.quantity,0)
      ))
      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(newCarts));

 }
  const dataGlobal = {
    products: ProductJson.products,
    carts,
    handleAddToCart,
    handleMinus,
    totalMoney,
    cartLength: carts.length,
    handleDeleteAllQuantity
  
  };
    

  return (
    <>
      <GlobalContext.Provider value={dataGlobal}>
        <Header />
        <ListProduct />
      </GlobalContext.Provider>
    </>
  );
}
