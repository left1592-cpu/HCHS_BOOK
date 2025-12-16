import { Category, CategoryOption } from './types';

export const CATEGORIES: CategoryOption[] = [
  { id: Category.KOREAN, label: '국어', icon: '📖' },
  { id: Category.MATH, label: '수학', icon: '📐' },
  { id: Category.ENGLISH, label: '영어', icon: '🅰️' },
  { id: Category.SOCIAL_STUDIES, label: '사회 & 지리', icon: '🌏' },
  { id: Category.SCIENCE, label: '과학 (물화생지)', icon: '🧬' },
  { id: Category.HISTORY, label: '한국사 & 역사', icon: '🏺' },
  { id: Category.ETHICS, label: '윤리 & 철학', icon: '🤔' },
  { id: Category.ARTS_PE, label: '예술 & 체육', icon: '🎨' },
  { id: Category.CAREER, label: '진로 & 교양', icon: '🧭' },
];

export const APP_TITLE = "Cheonma Books";
export const APP_SUBTITLE = "함창고등학교 천마인을 위한 맞춤형 교과 독서 추천";