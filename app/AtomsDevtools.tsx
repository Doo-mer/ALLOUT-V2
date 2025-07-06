'use client';
import { useAtomsDevtools } from 'jotai-devtools/utils';

export default function AtomsDevtools({ children }: { children: React.ReactNode }) {
  useAtomsDevtools('AllAtoms');
  return <>{children}</>;
} 