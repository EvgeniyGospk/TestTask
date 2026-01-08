import { Mood } from './ai.types';

const moodLabel: Record<Mood, string> = {
  calm: 'спокойное',
  neutral: 'нейтральное',
  stressed: 'напряжённое',
};

export function buildAffirmationPrompt(mood: Mood): string {
  return [
    'Сгенерируй короткую аффирмацию или мини‑медитацию для пользователя.',
    '',
    `Настроение: ${moodLabel[mood]}`,
    'Ограничения:',
    '- 1–3 предложения',
    '- спокойный, поддерживающий тон',
    '- без медицинских обещаний и “лечебных” формулировок',
    '',
    'Формат: только текст, без списков и заголовков.',
  ].join('\n');
}

