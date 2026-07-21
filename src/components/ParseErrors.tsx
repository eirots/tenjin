import type { Diagnostic } from '../compilerApi'

type ParseErrorsProps = {
    errors: Diagnostic[]
}

export function ParseErrors({ errors }: ParseErrorsProps) {
  return (
    <div className="parse-error-output">
      <div className="output-summary">
        <span>Parse Errors</span>
        <span>{errors.length} found</span>
      </div>

      <div className="parse-error-list">
        {errors.map((error) => (
          <article className="parse-error-card" key={error.message}>
            <div className="parse-error-meta">
              <span>{error.phase}</span>
              {error.row !== null && error.column !== null && (
                <span>
                  line {error.row}, col {error.column}
                </span>
              )}
            </div>
            <pre>{error.message}</pre>
          </article>
        ))}
      </div>
    </div>
  )
}
