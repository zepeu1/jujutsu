export type Grade = '특급' | '탈 1급' | '1급' | '준 1급' | '2급' | '준 2급' | '3급' | '4급';

export type FactionType = 'SEOUL_HIGH' | 'ASSOCIATION' | 'FAMILIES' | 'CURSE_USERS' | 'SPIRITS';

export interface Character {
  id: string;
  name: string;
  code: string;
  gender?: string;
  age?: string | number;
  mbti?: string;
  keywords: string[];
  description: string;
  role?: string;
  technique: string;
  domainExpansion?: string;
  domainStatus?: 'O' | 'X' | '불완전' | 'N/A';
  grade: Grade | string;
  quote?: string;
  appearance?: string;
  faction: FactionType;
}

export interface WorldviewTerm {
  title: string;
  content: string;
}

export interface FactionInfo {
  id: FactionType;
  name: string;
  description: string;
  color: string;
}