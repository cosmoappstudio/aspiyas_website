/** Animasyon varyantları - tüm sayfalarda kullanılabilir */

export const spring = { type: 'spring' as const, stiffness: 300, damping: 25 };
export const springBouncy = { type: 'spring' as const, stiffness: 400, damping: 20 };
export const springSmooth = { type: 'spring' as const, stiffness: 120, damping: 20 };
export const tween = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

export const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { ...springSmooth },
};

export const fadeInUpView = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { ...springSmooth },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { ...springSmooth },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { ...springSmooth },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { ...springBouncy },
};

export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.1 },
  transition: { staggerChildren: 0.08, delayChildren: 0.15 },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { ...springSmooth },
};

export const cardHover = {
  scale: 1.02,
  transition: { ...spring },
};

export const buttonTap = { scale: 0.97 };
