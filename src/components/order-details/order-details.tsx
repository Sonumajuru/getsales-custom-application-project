import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { formatLocalizedString } from '@commercetools-frontend/l10n';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
  type TApiErrorNotificationOptions,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../constants';
import type { TFormValues } from '../../types';
// import { useChannelDetailsUpdater } from '../../hooks/use-orders-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import OrderDetailsForm from './order-details-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';
import { useOrderDetailsFetcher } from '../../hooks/use-orders-connector/use-orders-connector';

type TOrderDetailsProps = {
  onClose: () => void;
};

const OderDetails = (props: TOrderDetailsProps) => {
  const intl = useIntl();
  const params = useParams<{ id: string }>();
  const { loading, error, order } = useOrderDetailsFetcher(params.id);
  console.log('order', order);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  // const channelDetailsUpdater = useChannelDetailsUpdater();
  const handleSubmit = useCallback(
    async (
      formikValues: TFormValues,
      formikHelpers: FormikHelpers<TFormValues>
    ) => {
      const data = formValuesToDoc(formikValues);
      try {
        // await channelDetailsUpdater.execute({
        //   originalDraft: channel!,
        //   nextDraft: data,
        // });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
        });
      } catch (error) {
        const transformedErrors = transformErrors(error);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors:
              transformedErrors.unmappedErrors as TApiErrorNotificationOptions['errors'],
          });
        }

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [
      // channel,
      // channelDetailsUpdater,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );
  return (
    <OrderDetailsForm
      initialValues={docToFormValues(order, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        const channelName = formatLocalizedString(
          {
            name: formProps.values?.name,
          },
          {
            key: 'name',
            locale: dataLocale,
            fallbackOrder: projectLanguages,
            fallback: NO_VALUE_FALLBACK,
          }
        );
        return (
          <FormModalPage
            title={channelName}
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            onPrimaryButtonClick={() => formProps.submitForm()}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.revert}
          >
            {loading && (
              <Spacings.Stack alignItems="center">
                <LoadingSpinner />
              </Spacings.Stack>
            )}
            {error && (
              <ContentNotification type="error">
                <Text.Body>
                  {intl.formatMessage(messages.orderDetailsErrorMessage)}
                </Text.Body>
              </ContentNotification>
            )}
            {order && formProps.formElements}
            {order && <ApplicationPageTitle additionalParts={[channelName]} />}
            {order === null && <PageNotFound />}
          </FormModalPage>
        );
      }}
    </OrderDetailsForm>
  );
};
OderDetails.displayName = 'OderDetails';

export default OderDetails;
