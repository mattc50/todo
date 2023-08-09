import { MdViewList, MdPerson, MdFolder } from 'react-icons/md';

const links = [
  {
    id: 1,
    text: 'sets',
    path: '/',
    icon: <MdFolder />,
  },
  {
    id: 2,
    text: 'todos',
    path: 'todos',
    icon: <MdViewList />,
  },
  {
    id: 3,
    text: 'profile',
    path: 'profile',
    icon: <MdPerson />,
  },
];

export default links;