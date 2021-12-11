import React from 'react';
import { render } from '@testing-library/react';

import Login from './index';
import store from '../../redux/store';

test('renders learn react link', () => {
  const { getByText } = render(<Login store={store} />);
  const linkElement = getByText(/Login Page/i);

  expect(linkElement).toBeInTheDocument();
});
