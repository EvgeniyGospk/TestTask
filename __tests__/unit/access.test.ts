import { getMeditationAccess } from '../../src/features/meditations/domain/access';

describe('getMeditationAccess', () => {
  it('locks premium session when not subscribed', () => {
    const access = getMeditationAccess(
      {
        id: 'x',
        title: 'Premium',
        durationMinutes: 10,
        cover: 0 as any,
        premiumOnly: true,
      },
      false,
    );
    expect(access).toEqual({ locked: true, reason: 'premium' });
  });

  it('unlocks premium session when subscribed', () => {
    const access = getMeditationAccess(
      {
        id: 'x',
        title: 'Premium',
        durationMinutes: 10,
        cover: 0 as any,
        premiumOnly: true,
      },
      true,
    );
    expect(access).toEqual({ locked: false, reason: null });
  });

  it('never locks free session', () => {
    const access = getMeditationAccess(
      {
        id: 'x',
        title: 'Free',
        durationMinutes: 5,
        cover: 0 as any,
        premiumOnly: false,
      },
      false,
    );
    expect(access).toEqual({ locked: false, reason: null });
  });
});

