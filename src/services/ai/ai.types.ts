export type Mood = 'calm' | 'neutral' | 'stressed';

export type AiProvider = 'mock';

export type AiResult = {
  provider: AiProvider;
  text: string;
  prompt: string;
};

