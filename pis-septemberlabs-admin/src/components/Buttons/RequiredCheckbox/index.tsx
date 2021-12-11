import React from 'react';

import './index.scss';

type Props = {
  onClick: () => void;
  isRequired: boolean;
};

const RequiredCheckbox: React.FunctionComponent<Props> = ({
  onClick,
  isRequired,
}: Props): JSX.Element => (
  <div className="required-checkbox">
    <input type="checkbox" className="required-checkbox__checkbox" checked={isRequired} onChange={onClick} />
    <span className="required-checkbox__text">Required Answer</span>
  </div>
);

export default RequiredCheckbox;
