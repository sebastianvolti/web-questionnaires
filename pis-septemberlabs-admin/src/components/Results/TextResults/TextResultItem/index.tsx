import React from 'react';

import './index.scss';

type Props = {
  content: string;
};

const TextResultItem: React.FunctionComponent<Props> = ({ content }: Props): JSX.Element => <div className="text-result-item-content">{content}</div>;

export default TextResultItem;
