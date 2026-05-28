import { describe, expect, it } from 'vitest';
import { content, ContentSchema } from '../src/types/content';

describe('content', () => {
  it('validates against schema', () => {
    expect(() => ContentSchema.parse(content)).not.toThrow();
  });

  it('has 2 methodik slides', () => {
    expect(content.methodikSlides).toHaveLength(2);
  });

  it('has 5 befaehigung slides', () => {
    expect(content.befaehigungSlides).toHaveLength(5);
  });

  it('has 4 zielgruppe roles', () => {
    expect(content.zielgruppeRoles).toHaveLength(4);
  });

  it('has 5 outcomes with unique ids', () => {
    expect(content.outcomes).toHaveLength(5);
    const ids = content.outcomes.map((o) => o.id);
    expect(new Set(ids).size).toBe(5);
  });

  it('has 4 values', () => {
    expect(content.values).toHaveLength(4);
  });

  it('contains required trust strip items', () => {
    expect(content.trustStrip).toContain('EU AI ACT');
    expect(content.trustStrip).toContain('DSGVO');
    expect(content.trustStrip).toContain('ISO 27001');
  });

  it('uses no forbidden hype words', () => {
    const forbidden = ['revolutionär', 'disruptiv', 'bahnbrechend', 'Game Changer'];
    const allText = JSON.stringify(content).toLowerCase();
    forbidden.forEach((word) => {
      expect(allText).not.toContain(word.toLowerCase());
    });
  });
});
