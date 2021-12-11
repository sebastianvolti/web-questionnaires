import React from 'react';

import './index.scss';

type Props = {
  onChange(value: string): void;
  value: any;
};

const TextInput: React.FunctionComponent<Props> = ({
  onChange,
  value,
}: Props): JSX.Element => (
  <div className="text-input-title">
    <textarea
      className="text-input-title__text-area-input"
      maxLength={100}
      value={value || ''}
      onChange={(event: any) => onChange(event.target.value)}
      placeholder="Write your description here"
    />
  </div>
);

export default TextInput;
