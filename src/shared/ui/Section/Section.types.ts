import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  action?: ReactNode;
}
