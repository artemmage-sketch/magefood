// Шрифти застосунку Mage Food для сторінки меню: Onest — текст, Unbounded — заголовки й ціни
import { Onest, Unbounded } from 'next/font/google';

const onest = Onest({ subsets: ['latin', 'cyrillic'], variable: '--mf-onest' });
const unbounded = Unbounded({ subsets: ['latin', 'cyrillic'], variable: '--mf-unbounded' });

export const menuFonts = `${onest.variable} ${unbounded.variable}`;
