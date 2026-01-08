import { act, fireEvent, render } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import App from '../../App';

jest.useFakeTimers();

describe('Navigation + subscription gating', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('opens Paywall on locked meditation when not subscribed', async () => {
    const screen = render(<App />);

    await screen.findByText('Meditations');

    fireEvent.press(screen.getByTestId('meditation-card-m3'));

    await screen.findByText('ZenPulse Premium');
  });

  it('returns to Meditations after mock purchase', async () => {
    const screen = render(<App />);

    await screen.findByText('Meditations');

    fireEvent.press(screen.getByTestId('meditation-card-m3'));

    await screen.findByText('ZenPulse Premium');

    fireEvent.press(screen.getByTestId('paywall-try-free'));

    await act(async () => {
      jest.advanceTimersByTime(900);
    });

    await screen.findByText('Meditations');
  });

  it('opens AI screen from Meditations', async () => {
    const screen = render(<App />);

    await screen.findByText('Meditations');
    fireEvent.press(screen.getByTestId('open-ai-screen'));
    await screen.findByText('AI Настрой дня');
  });
});
