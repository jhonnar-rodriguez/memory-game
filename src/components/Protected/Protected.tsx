import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getItem } from '../../helpers';

type ProtectedProps = {
  children: ReactElement;
};

export function Protected({ children }: ProtectedProps): ReactElement {
  const navigation = useNavigate();

  const playerName = getItem<string>('name');

  useEffect(() => {
    if (!playerName) {
      navigation('/');
    }
  }, [navigation, playerName]);

  return children;
}
