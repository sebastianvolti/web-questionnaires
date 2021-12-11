import React from 'react';

import './index.scss';

type Props = {
  name: string;
  primary: boolean;
  onClick: () => void;
};

const CircledButton: React.FunctionComponent<Props> = ({
  name,
  primary,
  onClick,
}: Props): JSX.Element => (
  <div>
    <button
      type="button"
      className={`button1 ${primary ? 'button1__primary' : 'button1__secondary'}`}
      onClick={onClick}
    >
      <p
        className={`button1__label ${
          primary ? 'button1__label__primary' : 'button1__label__secondary'
        }`}
      >
        {name}
      </p>
    </button>
  </div>
);

export default CircledButton;
