export const sections = [
   {
      title: 'Events',
      links: [
         { path: '/events/view-all', label: 'View All Events' },
         { path: '/events/create', label: 'Create New Event' },
         // { path: '/events/details/:id', label: 'Event Details' },
      ],
   },
   {
      title: 'Users',
      links: [
         { path: '/users/view-all', label: 'View All Users' },
         { path: '/users/manage-roles', label: 'Manage Roles' },
         { path: '/users/manage-profiles', label: 'Manage Profiles' },
      ],
   },
   {
      title: 'Participation',
      links: [
         { path: '/participation/view', label: 'View Participation' },
         { path: '/participation/download-list', label: 'Download List' },
      ],
   },
   {
      title: 'Tickets',
      links: [
         { path: '/tickets/active', label: 'Active Tickets' },
         { path: '/tickets/manage', label: 'Manage Tickets' },
         { path: '/tickets/refunds', label: 'Refund Requests' },
      ],
   },
   {
      title: 'Reports',
      links: [
         { path: '/reports/export', label: 'Export Data' },
      ],
   },
   {
      title: 'Content',
      links: [
         { path: '/content/manage', label: 'Manage Content' },
      ],
   },
   {
      title: 'Settings',
      links: [
         { path: '/settings/general', label: 'General Settings' },
         { path: '/settings/assets-update', label: 'Assets Update' },
      ],
   },
];
