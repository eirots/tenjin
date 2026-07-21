import { useState } from 'react'

import type { CompileResult } from '../compilerApi'
import { ParseOutput, type ParseOutputState } from './AstTreeView'
import { EmptyOutput } from './EmptyOutput'
import { PhaseRail, type CompilerPhase } from './PhaseRail'
import { PhaseSummary } from './PhaseSummary'
import { TokenTable } from './TokenTable'

type OutputPanelProps = {
  result: CompileResult | null
}

export function OutputPanel({ result }: OutputPanelProps) {
  const [activePhase, setActivePhase] = useState<CompilerPhase>('lexing')

  const parseErrors = result?.diagnostics.filter(
    (diagnostic) => diagnostic.phase === 'parse',
  ) ?? []

  const parseState: ParseOutputState =
    result?.parse?.ast
      ? { kind: 'ast', ast: result?.parse.ast }
      : parseErrors.length > 0
        ? { kind: 'parse-error', errors: parseErrors }
        : { kind: 'empty' }

  return (
    <section className="output-panel">
      <h2>output</h2>

      {result ? (
        <div className="compiler-workspace">
          <PhaseRail
            activePhase={activePhase}
            onPhaseChange={setActivePhase}
          />

          <div className="phase-workspace">
            {activePhase === 'lexing' && <TokenTable result={result} />}

            {activePhase === 'parsing' && <ParseOutput state={parseState} />}

            {activePhase === 'semantics' && (
              <PhaseSummary
                phase={result.semantic}
                empty="semantics have not run yet"
              />
            )}

            {activePhase === 'lowering' && (
              <EmptyOutput>lowering is not wired yet</EmptyOutput>
            )}
          </div>
        </div>
      ) : (
        <EmptyOutput>run the compiler to see output</EmptyOutput>
      )}
    </section>
  )
}
