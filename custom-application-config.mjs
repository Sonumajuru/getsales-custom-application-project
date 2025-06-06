import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Starter Typescript Bd676b',
  entryPointUriPath,
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'lightexpert-dev',
    },
    production: {
      applicationId: 'TODO',
      url: 'https://your_app_hostname.com',
    },
  },
  oAuthScopes: {
    view: ['view_products', 'view_orders'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'orders',
      defaultLabel: 'Orders',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
