import { act, fireEvent, render } from '@testing-library/react-native';

import App from '../../App';

jest.useFakeTimers();

describe('Paywall → Try free → Meditations', () => {
  it('navigates to Meditations after mock purchase', async () => {
    const screen = render(<App />);

    await screen.findByText('ZenPulse Premium');

    fireEvent.press(screen.getByTestId('paywall-try-free'));

    await act(async () => {
      jest.advanceTimersByTime(900);
    });

    await screen.findByText('Meditations');
  });
});

