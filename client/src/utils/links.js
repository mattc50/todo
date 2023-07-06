import { MdHome, MdViewList, MdOutlineBarChart, MdPerson } from 'react-icons/md';

const links = [
  {
    id: 1,
    text: 'todo',
    path: '/',
    icon: <MdViewList />,
  },
  {
    id: 3,
    text: 'progress',
    path: 'progress',
    icon: <MdOutlineBarChart />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <MdPerson />,
  },
];

export default links;