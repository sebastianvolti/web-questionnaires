import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import SidebarButton from './SidebarButton';
import SidebarLogout from './SidebarLogout';

import './index.scss';

type Props = {
  username: string;
  logOutFunction: any;
};

const Sidebar: React.FunctionComponent<Props> = ({
  username,
  logOutFunction,
}: Props): JSX.Element => {
  const [buttonSelected, setSelected] = useState(0);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
    case '/':
      setSelected(0);
      break;
    case '/dashboard':
      setSelected(0);
      break;
    case '/active-surveys':
      setSelected(1);
      break;
    case '/closed-surveys':
      setSelected(2);
      break;
    case '/all-surveys':
      setSelected(3);
      break;
    case '/drafts':
      setSelected(4);
      break;
    default:
    }
  }, [location]);

  const buttons = [
    {
      name: 'Dashboard',
      route: '/dashboard',
    },
    {
      name: 'Active Surveys',
      route: '/active-surveys',
    },
    {
      name: 'Closed Surveys',
      route: '/closed-surveys',
    },
    {
      name: 'All Surveys',
      route: '/all-surveys',
    },
    {
      name: 'Drafts',
      route: '/drafts',
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container__icon" />
        <div className="sidebar__container__subtitle">SURVEYS</div>
      </div>
      {buttons.map((item, index) => (
        <Link key={index.toString()} className="sidebar__link" to={item.route}>
          <SidebarButton
            key={item.name}
            title={item.name}
            id={index}
            selected={buttonSelected}
            onTap={setSelected}
          />
        </Link>
      ))}
      <SidebarLogout username={username} onTap={logOutFunction} />
    </div>
  );
};

export default Sidebar;
