export const sideNav = [
  {
    name: 'Organization',
    id: 'organization',
    icon: 'building',
    child: [
      {
        title: 'Organization List',
        to: '/orglist',
      },
      {
        title: 'Add Organization',
        to: '/addorg',
      },
    ],
  },
  {
    name: 'Function',
    id: 'department',
    icon: 'sitemap',
    child: [
      {
        title: 'Function List',
        to: '/unitlist',
      },
      {
        title: 'Add Function',
        to: '/addunit',
      },
    ],
  },
  {
    name: 'Line Of Business',
    id: 'entity',
    icon: 'briefcase',
    child: [
      {
        title: 'Line Of Business List',
        to: '/entitylist',
      },
      {
        title: 'Add Line Of Business',
        to: '/addEntity',
      },
    ],
  },
];

export const processsideNav = [
  {
    name: 'Process',
    id: 'process',
    icon: 'cog',
    child: [
      {
        title: 'Process List',
        to: '/processlist',
      },
      {
        title: 'Add Process',
        to: '/addprocess',
      },
    ],
  },
  {
    name: 'Sub Process',
    id: 'subprocess',
    icon: 'cogs',
    child: [
      {
        title: 'SubProcess List',
        to: '/subprocesslist',
      },
      {
        title: 'Add SubProcess',
        to: '/addsubprocess',
      },
    ],
  }
];
