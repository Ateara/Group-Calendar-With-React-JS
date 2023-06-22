import { BiAlignLeft } from 'react-icons/bi';

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      // {
      //   id: 'page-1',
      //   title: 'Page 1',
      //   messageId: 'sidebar.sample.page1',
      //   type: 'item',
      //   icon: <BiAlignLeft />,
      //   url: '/sample/page-1',
      // },
      // {
      //   id: 'page-2',
      //   title: 'Page 2',
      //   messageId: 'sidebar.sample.page2',
      //   type: 'item',
      //   icon: <BiAlignLeft />,
      //   url: '/sample/page-2',
      // },
      // {
      //   id: 'page-3',
      //   title: 'Page 3',
      //   messageId: 'sidebar.sample.page3',
      //   type: 'item',
      //   icon: <BiAlignLeft />,
      //   url: '/sample/page-3',
      // },
      {
        id: 'page-4',
        title: 'GroupCalender',
        messageId: 'sidebar.sample.GroupCalender',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/GroupCalender',
      },
    ],
  },
];
export default routesConfig;
