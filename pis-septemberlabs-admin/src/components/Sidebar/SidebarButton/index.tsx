import React from 'react';

import './index.scss';

type Props = {
  title: string;
  id: number;
  selected: number;
  onTap: any;
};

const SidebarButton: React.FunctionComponent<Props> = ({
  title,
  id,
  selected,
  onTap,
}: Props): JSX.Element => (
  <div
    className={`sidebar-button ${
      id === selected ? 'sidebar-button__selected' : ''
    }`}
    onClick={() => onTap(id)}
  >
    {title}
  </div>
);

export default SidebarButton;
