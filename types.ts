export interface Book {
  title: string;
  author: string;
  description: string;
  saenggibuTip: string; // Tip for the Student Record (Living Record)
}

export enum Category {
  KOREAN = '국어',
  MATH = '수학',
  ENGLISH = '영어',
  SOCIAL_STUDIES = '사회/지리',
  SCIENCE = '과학',
  HISTORY = '한국사/세계사',
  ETHICS = '윤리/철학',
  ARTS_PE = '예술/체육',
  CAREER = '진로/교양'
}

export interface CategoryOption {
  id: Category;
  label: string;
  icon: string;
}