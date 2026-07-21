import type { CompileResult } from '../compilerApi'

type TokenTableProps = {
  result: CompileResult
}

export function TokenTable({ result }: TokenTableProps) {
  return (
    <div className="token-output">
      <div className="output-summary">
        <span>{result.tokens.length} tokens</span>
        <span>{result.ok ? 'ok' : 'errors'}</span>
      </div>

      <table className="token-table">
        <thead>
          <tr>
            <th>tag</th>
            <th>row</th>
            <th>col</th>
            <th>lexeme</th>
          </tr>
        </thead>
        <tbody>
          {result.tokens.map((token, index) => (
            <tr key={`${token.row}-${token.column}-${token.tag}-${index}`}>
              <td>{token.tag}</td>
              <td>{token.row}</td>
              <td>{token.column}</td>
              <td>
                <code>{token.lexeme}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
