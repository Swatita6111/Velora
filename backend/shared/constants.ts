// Message patterns for customer service
export const CUSTOMER_PATTERNS = {
  CREATE_CUSTOMER: 'customer.create',
  GET_CUSTOMER: 'customer.get',
  UPDATE_CUSTOMER: 'customer.update',
  DELETE_CUSTOMER: 'customer.delete',
};

// Message patterns for product order service
export const ORDER_PATTERNS = {
  CREATE_ORDER: 'order.create',
  GET_ORDER: 'order.get',
  UPDATE_ORDER: 'order.update',
  CANCEL_ORDER: 'order.cancel',
  GET_CUSTOMER_ORDERS: 'order.customer.orders',
};

// Event patterns
export const EVENTS = {
  CUSTOMER_CREATED: 'customer.created',
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
};
