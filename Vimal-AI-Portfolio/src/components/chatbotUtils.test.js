import test from 'node:test';
import assert from 'node:assert/strict';
import { getFallbackReply } from './chatbotUtils.js';

test('returns a helpful fallback for skills questions', () => {
  const reply = getFallbackReply('What skills do you have?');
  assert.match(reply, /Python|JavaScript|React/i);
});

test('returns a portfolio-specific fallback for education questions', () => {
  const reply = getFallbackReply('Tell me about your education');
  assert.match(reply, /SRM|CGPA/i);
});
