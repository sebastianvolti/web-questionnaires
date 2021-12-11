import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

type Props = {
  handlePress(): void,
  label: string,
  icon: any,
}

const Logout: React.FunctionComponent<Props> = ({
  handlePress,
  label,
  icon,
}: Props): JSX.Element => (
  <div
    className="logout"
    onClick={handlePress}
  >
    <FontAwesomeIcon
      icon={icon}
      color="rgba(45, 63, 80, 0.5)"
      size="1x"
    />
    <div className="logout__label">{label}</div>
  </div>
);

export default Logout;
