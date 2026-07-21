import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

const tenjinHighlightStyle = HighlightStyle.define([
  {
    tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.modifier],
    color: '#F39237',
  },
  {
    tag: [tags.typeName, tags.className, tags.standard(tags.typeName)],
    color: '#FAF2A1',
  },
  {
    tag: [tags.name, tags.variableName, tags.propertyName],
    color: '#d8d3eb',
  },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: '#f6b15f',
  },
  {
    tag: [tags.number, tags.bool, tags.null],
    color: '#EE6123',
  },
  {
    tag: [tags.string, tags.character],
    color: '#f2e67f',
  },
  {
    tag: [tags.operator, tags.punctuation, tags.bracket],
    color: '#9fb8c4',
  },
  {
    tag: tags.comment,
    color: '#759AAB',
    fontStyle: 'italic',
  },
])

type SourcePanelProps = {
  source: string
  onSourceChange: (source: string) => void
  onRun: () => void
}

export function SourcePanel({
  source,
  onSourceChange,
  onRun,
}: SourcePanelProps) {
  return (
    <section className="source-panel">
      <h2>source</h2>

      <CodeMirror
        value={source}
        height="38vh"
        extensions={[cpp(), syntaxHighlighting(tenjinHighlightStyle)]}
        onChange={(value) => onSourceChange(value)}
      />

      <button type="button" className="runcompilerbutton" onClick={onRun}>
        run compiler
      </button>


    </section>
  )
}
