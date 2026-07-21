export type CompilerPhase = 'lexing' | 'parsing' | 'semantics' | 'lowering'

type PhaseRailProps = {
  activePhase: CompilerPhase
  onPhaseChange: (phase: CompilerPhase) => void
}

const phases = [
  { id: 'lexing', label: 'Lexing', description: 'tokens' },
  { id: 'parsing', label: 'Parsing', description: 'AST' },
  { id: 'semantics', label: 'Semantics', description: 'symbols and types' },
  { id: 'lowering', label: 'Lowering', description: 'passes and IR' },
] as const satisfies ReadonlyArray<{
  id: CompilerPhase
  label: string
  description: string
}>

export function PhaseRail({ activePhase, onPhaseChange }: PhaseRailProps) {
  return (
    <nav className="phase-rail" aria-label="Compiler phases">
      {phases.map((phase) => (
        <button
          key={phase.id}
          type="button"
          aria-current={activePhase === phase.id ? 'page' : undefined}
          className={activePhase === phase.id ? 'active' : ''}
          onClick={() => onPhaseChange(phase.id)}
        >
          <span>{phase.label}</span>
          <small>{phase.description}</small>
        </button>
      ))}
    </nav>
  )
}
