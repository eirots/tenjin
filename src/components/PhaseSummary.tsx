import type { ParseView, SemanticView } from '../compilerApi'
import { EmptyOutput } from './EmptyOutput'

type PhaseSummaryProps = {
  phase: ParseView | SemanticView | null
  empty: string
}

export function PhaseSummary({ phase, empty }: PhaseSummaryProps) {
  return <EmptyOutput>{phase ? phase.summary : empty}</EmptyOutput>
}
