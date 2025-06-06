import { lazy } from 'react';

const OrderDetails = lazy(
  () => import('./order-details' /* webpackChunkName: "order-details" */)
);

export default OrderDetails;
