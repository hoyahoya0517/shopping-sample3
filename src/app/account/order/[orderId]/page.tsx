"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.css";
import { CartProductType, OrderType } from "@/type/type";
import { getUserOrder } from "@/actions/auth";
import { useParams } from "next/navigation";
import OrderCard from "../_components/OrderCard/OrderCard";
import dayjs from "dayjs";
import Link from "next/link";

dayjs.locale("ko");

export default function Order() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useQuery<OrderType>({
    queryKey: ["order", orderId],
    queryFn: () => getUserOrder(orderId),
  });
  return (
    <div className={styles.order}>
      <div className={styles.myOrder}>{order?.orderId}</div>
      <div className={styles.main}>
        <div className={styles.mainCenter}>
          <div>
            <label>이름</label>
            <span>{order?.name}</span>
          </div>
          <div>
            <label>휴대전화</label>
            <span>{order?.phone}</span>
          </div>
          <div>
            <label>이메일</label>
            <span>{order?.email}</span>
          </div>
          <div>
            <label>우편번호</label>
            <span>{order?.zipcode}</span>
          </div>
          <div>
            <label>주소</label>
            <span>{order?.address1}</span>
          </div>
          <div>
            <label>상세주소</label>
            <span>{order?.address2}</span>
          </div>
          <div>
            <label>주문날짜</label>
            <span>{dayjs(order?.createdAt).format("YYYY.MM.DD HH:mm")}</span>
          </div>
          <div>
            <label>주문상태</label>
            <span>{order?.orderStatus || "-"}</span>
          </div>
          <div>
            <label>배송정보</label>
            {order?.trackingNumber && order?.trackingNumber !== "-" ? (
              <Link
                href={`https://search.naver.com/search.naver?query=${encodeURIComponent(
                  order?.trackingNumber
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trackingLink}
              >
                {order?.trackingNumber}
              </Link>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.maintop}>
          <span className={styles.mainTopProduct}>Product</span>
          <span className={styles.mainTopPrice}>Price</span>
          <span className={styles.mainTopQty}>Quantity</span>
          <span className={styles.mainTopTotal}>Total</span>
        </div>
        {order &&
          order.cart.map((product: CartProductType, index: number) => (
            <OrderCard product={product} key={index} />
          ))}
      </div>
      <div className={styles.total}>
        <div className={styles.totalMain}>
          <div className={styles.totalMenu}>
            <span>Subtotal</span>
            {order && (
              <span>{`₩${order.subtotal == null ? "" : order.subtotal}`}</span>
            )}
          </div>
          <div className={styles.totalMenu}>
            <span>Shipping</span>
            {order && (
              <span>{`₩${order.shipping == null ? "" : order.shipping}`}</span>
            )}
          </div>
          <div className={styles.totalMenu}>
            <span>Total</span>
            {order && (
              <span>{`₩${order.amount == null ? "" : order.amount}`}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}