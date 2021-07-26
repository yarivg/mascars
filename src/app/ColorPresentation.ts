import {COLORS} from './colors.enum';
import {ColorOption} from './entities/color-option';

export const ColorPresentation: Record<string, ColorOption> = {
  [COLORS.RED]: {
    text: 'אדום',
    rgb: '#ef8982'
  },
  [COLORS.BLUE]: {
    text: 'כחול',
    rgb: '#82aeef'
  },
  [COLORS.GREY]: {
    text: 'אפור',
    rgb: '#b3b1b1'
  },
  [COLORS.WHITE]: {
    text: 'לבן',
    rgb: '#e7e6e6'
  },
  [COLORS.BLACK]: {
    text: 'שחור',
    rgb: '#2f2f2f'
  },
  [COLORS.GREEN]: {
    text: 'ירוק',
    rgb: '#76cd6e'
  },
  [COLORS.YELLOW]: {
    text: 'צהוב',
    rgb: '#ffe66a'
  },
  [COLORS.BROWN]: {
    text: 'חום',
    rgb: '#8e4e16'
  },
  [COLORS.BRONZE]: {
    text: 'ברונזה',
    rgb: '#cd7f32 '
  },
  [COLORS.CREAM]: {
    text: 'קרם',
    rgb: '#fffdd0'
  },
  [COLORS.PINK]: {
    text: 'ורוד',
    rgb: '#e462ea'
  },
  [COLORS.SILVER]: {
    text: 'כסוף',
    rgb: '#c0c0c0'
  },
  [COLORS.BEIGE]: {
    text: 'בז\'',
    rgb: '#f5f5dc'
  },
  [COLORS.LIGHT_BLUE]: {
    text: 'תכלת',
    rgb: '#79e7c6'
  }
};
