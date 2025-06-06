export type TFormValues = {
  orderId: string;
  orderNumber: string;
};

export type TOrderFormValues = {
  orderId: string;
  orderNumber: string;
};

export type TSyncAction = { action: string; [x: string]: unknown };

export type TGraphqlUpdateAction = Record<string, Record<string, unknown>>;

export type TChangeNameActionPayload = {
  name: Record<string, string>;
};
