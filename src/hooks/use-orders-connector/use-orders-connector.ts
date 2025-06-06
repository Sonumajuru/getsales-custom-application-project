/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type { TDataTableSortingState } from '@commercetools-uikit/hooks';
import type { TOrderQueryResult } from '../../types/generated/ctp';
import FetchOrderQuery from './fetch-orders.ctp.graphql';
import FetchOrderByIdQuery from './fetch-order-by-id.ctp.graphql';

// export const useChannelDetailsUpdater = () => {
//   const [updateChannelDetails, { loading }] = useMcMutation<
//     TUpdateChannelDetailsMutation,
//     TUpdateChannelDetailsMutationVariables
//   >(UpdateChannelDetailsMutation);

//   const execute = async ({
//     originalDraft,
//     nextDraft,
//   }: {
//     originalDraft: NonNullable<TFetchChannelDetailsQuery['channel']>;
//     nextDraft: unknown;
//   }) => {
//     const actions = syncChannels.buildActions(
//       nextDraft,
//       convertToActionData(originalDraft)
//     );
//     try {
//       return await updateChannelDetails({
//         context: {
//           target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//         },
//         variables: {
//           channelId: originalDraft.id,
//           version: originalDraft.version,
//           actions: createGraphQlUpdateActions(actions),
//         },
//       });
//     } catch (graphQlResponse) {
//       throw extractErrorFromGraphQlResponse(graphQlResponse);
//     }
//   };

//   return {
//     loading,
//     execute,
//   };
// };

type PaginationProps = {
  page: { value: number };
  perPage: { value: number };
  tableSorting: TDataTableSortingState;
};

type TUseOrdersFetcher = (paginationProps: PaginationProps) => {
  orders?: TOrderQueryResult['results'];
  total?: number;
  error?: ApolloError;
  loading: boolean;
};

export const useOrdersFetcher: TUseOrdersFetcher = ({ page, perPage }) => {
  const { data, error, loading } = useMcQuery<{ orders: TOrderQueryResult }>(
    FetchOrderQuery,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    orders: data?.orders?.results ?? [],
    total: data?.orders?.total ?? 0,
    error,
    loading,
  };
};

type TUseOrderDetailsFetcher = (orderId: string) => {
  order?: TOrderQueryResult['results'][0];
  error?: ApolloError;
  loading: boolean;
};

export const useOrderDetailsFetcher: TUseOrderDetailsFetcher = (orderId) => {
  const { data, error, loading } = useMcQuery<{
    order: TOrderQueryResult['results'][0];
  }>(FetchOrderByIdQuery, {
    variables: {
      orderId,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    order: data?.order,
    error,
    loading,
  };
};
