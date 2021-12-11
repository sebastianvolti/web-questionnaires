import React, { useEffect } from 'react';

type Props = {
  location: {
    search: string,
  };
};

const WaitingGoogle: React.FunctionComponent<Props> = ({
  location: { search },
}: Props): JSX.Element => {
  const params = new URLSearchParams(search);
  const status = params.get('status');

  useEffect(() => {
    // get the URL parameters which will include the auth token
    // and send them to the opening window
    if (window.opener) {
      window.opener.postMessage(status);
      window.close();
    }
  });

  return (
    <div>Please wait...</div>
  );
};

export default WaitingGoogle;
