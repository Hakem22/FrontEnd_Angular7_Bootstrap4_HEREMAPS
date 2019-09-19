interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard',
  },
  {
    title: true,
    name: 'Navigation'
  },
  {
    name: 'Maps',
    url: '/maps',
    icon: 'fa fa-map'
  },
  {
    name: 'Statistics',
    url: '/charts',
    icon: 'fa fa-line-chart',
    badge: {
      variant: 'info',
      text: 'To Complete'
    }
  },
  {
    title: true,
    name: 'Administration'
  },
  {
    name: 'Directories',
    url: '/directories',
    icon: 'fa fa-folder-open',
    children: [
      {
        name: 'Actors',
        url: '/directories/actors',
        icon: 'fa fa-user'
      },
      {
        name: 'Alerts',
        url: '/directories/alerts',
        icon: 'fa fa-exclamation-triangle '
      },
      {
        name: 'Citizens',
        url: '/directories/citizens',
        icon: 'fa fa-users'
      },
      {
        name: 'Sensors',
        url: '/directories/sensors',
        icon: 'fa fa-signal'
      },
      {
        name: 'Units',
        url: '/directories/units',
        icon: 'fa fa-building '
      }
    ]
  },
  {
    name: 'Mails',
    url: '/mails',
    icon: 'fa fa-envelope ',
    badge: {
      variant: 'danger',
      text: 'Up Comming'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'FAQ',
    url: '/faq',
    icon: 'fa fa-question-circle'
  },
  


];
