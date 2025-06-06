import type { TOrderQueryResult } from '../../types/generated/ctp';
import type { TFormValues } from '../../types';

export const docToFormValues = (
  order: TOrderQueryResult['results'][0] | undefined,
  _languages: string[]
): TFormValues => ({
  orderId: order?.id ?? '',
  orderNumber: order?.orderNumber ?? '',
});

export const formValuesToDoc = (formValues: TFormValues) => ({
  id: formValues.orderId,
  orderNumber: formValues.orderNumber,
});
