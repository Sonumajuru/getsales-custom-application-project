import type { JSX, ReactElement } from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import SelectField from '@commercetools-uikit/select-field';
import type { TFormValues } from '../../types';
import validate from './validate';
import messages from './messages';

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleReset: Formik['handleReset'];
};
type TOrderDetailsFormProps = {
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>
  ) => void | Promise<unknown>;
  initialValues: TFormValues;
  isReadOnly: boolean;
  dataLocale: string;
  children: (formProps: FormProps) => JSX.Element;
};

const OrderDetailsForm = (props: TOrderDetailsFormProps) => {
  const intl = useIntl();
  const formik = useFormik<TFormValues>({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <Text.Headline as="h1"> {formik.values.orderNumber} </Text.Headline>
      <TextField
        name="orderId"
        title={intl.formatMessage(messages.orderIDLabel)}
        value={formik.values.orderId}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).orderId}
        touched={formik.touched.orderId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isReadOnly={props.isReadOnly}
        isRequired
        horizontalConstraint={13}
      />
      <TextField
        name="orderNumber"
        title={intl.formatMessage(messages.orderNumberLabel)}
        value={formik.values.orderNumber}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).orderNumber}
        touched={formik.touched.orderNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isReadOnly={props.isReadOnly}
        isRequired
        horizontalConstraint={13}
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
OrderDetailsForm.displayName = 'OrderDetailsForm';

export default OrderDetailsForm;
