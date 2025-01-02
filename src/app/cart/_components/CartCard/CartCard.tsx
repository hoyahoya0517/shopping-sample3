import { CartProductType } from "@/type/type";
import styles from "./CartCard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart, updateCart } from "@/actions/auth";
import { BsXLg } from "react-icons/bs";

export default function CartCard({ product }: { product: CartProductType }) {
  const queryClient = useQueryClient();
  const [width, setWidth] = useState<number | undefined>();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    const cal = Number(product.price) * Number(product.cartStock.stock.qty);
    setTotal(cal);
  }, [product]);
  const updateCartMutate = useMutation<void, Error, number, unknown>({
    mutationFn: async (qty) => {
      await updateCart(product.cartStock, qty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (error.message === "get product size error") {
        alert("현재 존재하지 않거나 변경된 제품 사이즈입니다.");
      } else if (error.message === "sold out") {
        alert("현재 품절된 상품입니다.");
      } else if (error.message === "not enough qty") {
        alert("상품의 수량이 재고수량 보다 많습니다.");
      } else {
        alert("문제가 발생했습니다. 다시 시도하세요.");
      }
    },
  });
  const deleteCartMutate = useMutation({
    mutationFn: async () => {
      await deleteCart(product.cartStock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      alert("문제가 발생했습니다. 다시 시도하세요.");
    },
  });
  const handleQtyClick = (qty: number) => {
    updateCartMutate.mutate(qty);
  };
  const handleRemoveClick = () => {
    deleteCartMutate.mutate();
  };
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.mainCenter}>
      <Link
        href={`/collections/product/${product.id}`}
        className={styles.image}
      >
        <img src={product.img[0]} />
      </Link>
      <div className={styles.product}>
        <div className={styles.productDetail}>
          <div>
            <Link href={`/collections/product/${product.id}`}>
              {product.name}
            </Link>
          </div>
          <p>{`size: ${product.cartStock.stock.size.toUpperCase()}`}</p>
        </div>
        <div className={styles.price}>
          <span>{`₩${product?.price}`}</span>
        </div>
        <div className={styles.qtyAndRemove}>
          <div className={styles.qty}>
            <button
              onClick={() => {
                handleQtyClick(-1);
              }}
            >
              -
            </button>
            <span>{product.cartStock.stock.qty}</span>
            <button
              onClick={() => {
                handleQtyClick(1);
              }}
            >
              +
            </button>
          </div>
          {width !== undefined ? (
            width > 767 ? (
              <div className={styles.remove}>
                <span onClick={handleRemoveClick}>remove</span>
              </div>
            ) : (
              <div className={styles.remove}>
                <BsXLg size={18} color="black" onClick={handleRemoveClick} />
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        <div className={styles.total}>{`₩${total}`}</div>
      </div>
    </div>
  );
}
