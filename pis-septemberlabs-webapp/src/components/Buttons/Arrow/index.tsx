import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

type Props = {
  handlePress(): void;
  label: string;
  icon: any;
  reverse?: boolean;
  show: boolean;
  disabled?: boolean;
};

const Arrow: React.FunctionComponent<Props> = ({
  handlePress,
  label,
  icon,
  reverse,
  show,
  disabled,
}: Props): JSX.Element => (
  <div
    className={`arrow ${(!show || disabled) && 'arrow--disabled'}`}
    style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
    onClick={handlePress}
  >
    {show && (
      <>
        <div className="arrow__label">{label}</div>
        <FontAwesomeIcon icon={icon} color="rgba(45, 63, 80, 0.5)" />
      </>
    )}
  </div>
);

export default Arrow;
