import { act, fireEvent, render } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import App from '../../App';

jest.useFakeTimers();

describe('Paywall → Try free → Meditations', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('navigates to Meditations after mock purchase', async () => {
    const screen = render(<App />);

    await screen.findByText('ZenPulse Premium');

    fireEvent.press(screen.getByTestId('paywall-try-free'));

    await act(async () => {
      jest.advanceTimersByTime(900);
    });

    await screen.findByText('Meditations');
  });

  it('opens AI screen from Meditations', async () => {
    const screen = render(<App />);

    await screen.findByText('ZenPulse Premium');
    fireEvent.press(screen.getByTestId('paywall-try-free'));
    await act(async () => {
      jest.advanceTimersByTime(900);
    });

    await screen.findByText('Meditations');
    fireEvent.press(screen.getByTestId('open-ai-screen'));
    await screen.findByText('AI Настрой дня');
  });
});
