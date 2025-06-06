import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import type { TOrderQueryResult } from '../../types/generated/ctp';
import { useOrdersFetcher } from '../../hooks/use-orders-connector';
import { getErrorMessage } from '../../helpers';
import messages from './messages';
import OrderDetails from '../order-details';

const columns = [
  { key: 'orderNumber', label: 'Order Number', isSortable: true },
  { key: 'customerEmail', label: 'Customer Email' },
  { key: 'totalPrice', label: 'Total Price' },
  { key: 'orderState', label: 'Order State', isSortable: true },
  { key: 'paymentState', label: 'Payment State', isSortable: true },
];

type TOrdersProps = {
  linkToWelcome: string;
};

const Orders = (props: TOrdersProps) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { orders, total, error, loading } = useOrdersFetcher({
    page,
    perPage,
    tableSorting,
  });

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      {loading && <LoadingSpinner />}

      {orders ? (
        <Spacings.Stack scale="l">
          <div style={{ maxHeight: 500, overflow: 'auto' }}>
            <DataTable<NonNullable<TOrderQueryResult['results']>[0]>
              isCondensed
              columns={columns}
              rows={orders}
              itemRenderer={(item, column) => {
                switch (column.key) {
                  case 'orderNumber':
                    return item.orderNumber;
                  case 'customerEmail':
                    return item.customerEmail;
                  case 'orderState':
                    return item.orderState;
                  case 'paymentState':
                    return item.paymentState;
                  case 'totalPrice':
                    return item.totalPrice?.centAmount
                      ? `${item.totalPrice.centAmount / 100} ${
                          item.totalPrice.currencyCode
                        }`
                      : NO_VALUE_FALLBACK;
                  default:
                    return null;
                }
              }}
              sortedBy={tableSorting.value.key}
              sortDirection={tableSorting.value.order}
              onSortChange={tableSorting.onChange}
              onRowClick={(row) => push(`${match.url}/${row.id}`)}
            />
          </div>
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={total ?? 0}
            perPageRange="s"
          />
          <Switch>
            <SuspendedRoute path={`${match.url}/:id`}>
              <OrderDetails onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          </Switch>
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Orders.displayName = 'Orders';

export default Orders;
