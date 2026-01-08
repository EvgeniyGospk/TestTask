import { delay } from '../../utils/delay';
import { AiResult, Mood } from './ai.types';
import { buildAffirmationPrompt } from './prompts';

const variants: Record<Mood, string[]> = {
  calm: [
    'Сохрани это спокойствие: сделай мягкий вдох и выдох и позволь тишине быть рядом. Ты уже в правильном темпе.',
    'Пусть день будет простым: один вдох, один выдох, и внимание возвращается к тебе. Спокойствие — это навык, и он уже с тобой.',
  ],
  neutral: [
    'Сделай паузу на три дыхания и отметь: сейчас всё достаточно. Ты можешь выбирать следующий шаг без спешки.',
    'Пусть сегодня будет ровно: почувствуй опору под ногами и позволь мыслям пройти мимо. Ты в порядке здесь и сейчас.',
  ],
  stressed: [
    'Сейчас можно упростить: вдох — и плечи чуть ниже, выдох — и напряжение отпускает на один процент. Этого достаточно для начала.',
    'Положи ладонь на грудь, сделай медленный выдох и скажи себе: “Я справляюсь шаг за шагом”. Пусть мягкость будет твоей силой.',
  ],
};

function pickVariant(mood: Mood): string {
  const list = variants[mood];
  return list[Math.floor(Math.random() * list.length)] ?? list[0]!;
}

export async function generateAffirmation(mood: Mood): Promise<AiResult> {
  const prompt = buildAffirmationPrompt(mood);
  await delay(900);
  return { provider: 'mock', text: pickVariant(mood), prompt };
}

