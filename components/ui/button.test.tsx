import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders provided text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
