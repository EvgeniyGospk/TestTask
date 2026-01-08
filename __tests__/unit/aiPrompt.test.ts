import { buildAffirmationPrompt } from '../../src/services/ai/prompts';

describe('buildAffirmationPrompt', () => {
  it('includes mood label and constraints', () => {
    const prompt = buildAffirmationPrompt('stressed');
    expect(prompt).toContain('Настроение');
    expect(prompt).toContain('напряж');
    expect(prompt).toContain('1–3 предложения');
    expect(prompt).toContain('без медицинских');
  });
});

