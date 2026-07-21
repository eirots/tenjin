import { useState } from 'react'

import { compileSource, type CompileResult } from './compilerApi'
import { OutputPanel } from './components/OutputPanel'
import { SourcePanel } from './components/SourcePanel'
import './App.css'

function App() {
  const [source, setSource] = useState('void main(){\n\n}')
  const [result, setResult] = useState<CompileResult | null>(null)

  async function runCompiler() {
    const nextResult = await compileSource(source)
    setResult(nextResult)
  }

  return (
    <>
      <main className="compiler-layout" >
        <SourcePanel
          source={source}
          onSourceChange={setSource}
          onRun={runCompiler}
        />

        <OutputPanel result={result} />
      </main>
    </>
  )
}

export default App
