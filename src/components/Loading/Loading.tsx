import { ReactElement } from 'react';
import { Spinner, SpinnerProps } from 'react-bootstrap';

export function Loading({
  animation = 'grow',
  size = 'sm',
  variant = 'warning',
}: SpinnerProps): ReactElement {
  return (
    <div className="app-container">
      <Spinner animation={animation} size={size} variant={variant} />
    </div>
  );
}
