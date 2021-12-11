import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

type Props = {
  username: string;
  onTap: any;
};

const SidebarLogout: React.FunctionComponent<Props> = ({
  username,
  onTap,
}: Props): JSX.Element => (
  <div className="sidebar-logout" onClick={onTap}>
    <div className="sidebar-logout__username">{username}</div>
    <div className="sidebar-logout__icon">
      <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
      &nbsp;&nbsp; Cerrar Sesión
    </div>
  </div>
);

export default SidebarLogout;
