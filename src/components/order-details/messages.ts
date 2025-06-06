import { defineMessages } from 'react-intl';

export default defineMessages({
  backToOrdersList: {
    id: 'OrderDetails.backToOrdersList',
    defaultMessage: 'Back to orders',
  },
  duplicateKey: {
    id: 'OrderDetails.duplicateKey',
    defaultMessage: 'A order with this key already exists.',
  },
  orderUpdated: {
    id: 'OrderDetails.orderUpdated',
    defaultMessage: 'Order {orderName} updated',
  },
  orderIDLabel: {
    id: 'OrderDetails.orderKeyLabel',
    defaultMessage: 'Order ID',
  },
  orderNumberLabel: {
    id: 'OrderDetails.orderNumberLabel',
    defaultMessage: 'Order number',
  },
  orderRolesLabel: {
    id: 'OrderDetails.orderRolesLabel',
    defaultMessage: 'Order roles',
  },
  hint: {
    id: 'OrderDetails.hint',
    defaultMessage:
      'This page demonstrates for instance how to use forms, notifications and how to update data using GraphQL, etc.',
  },
  modalTitle: {
    id: 'OrderDetails.modalTitle',
    defaultMessage: 'Edit order',
  },
  orderDetailsErrorMessage: {
    id: 'OrderDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the order details. Please check your connection, the provided order ID and try again.',
  },
});
