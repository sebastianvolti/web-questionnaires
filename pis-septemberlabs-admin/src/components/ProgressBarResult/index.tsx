import React from 'react';

import './index.scss';

type Props = {
  label: string;
  progress: number;
};

const ProgressBarResult: React.FunctionComponent<Props> = ({ label, progress }: Props) => {
  const cssWidth = `${progress * 100}%`;

  return (
    <div className="progress-bar-item" data-label={label}>
      <span className="progress-bar-value" style={{ width: cssWidth }} />
    </div>
  );
};

export default ProgressBarResult;
