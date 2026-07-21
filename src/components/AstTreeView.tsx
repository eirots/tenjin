import type { AstGraphView, AstNodeView, Diagnostic } from '../compilerApi'
import { EmptyOutput } from './EmptyOutput'
import { ParseErrors } from './ParseErrors'

type AstTreeViewProps = {
  ast: AstGraphView | null
}

type TreeNode = AstNodeView & {
  children: TreeNode[]
}

export type ParseOutputState = | {
  kind: 'ast'
  ast: AstGraphView
}
  | {
    kind: 'parse-error'
    errors: Diagnostic[]
  }
  | {
    kind: 'empty'
  }



export function AstTreeView({ ast }: AstTreeViewProps) {
  if (!ast) {
    return <EmptyOutput>Errors while parsing.</EmptyOutput>
  }
  if (ast.nodes.length === 0) {
    return <EmptyOutput>AST is not available</EmptyOutput>
  }

  const tree = buildTree(ast.nodes)

  return (
    <div className="ast-tree-output">
      <div className="output-summary">
        <span>AST</span>
        <span>{ast.nodes.length} nodes</span>
      </div>

      <div className="ast-tree">
        {tree.map((node) => (
          <AstTreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  )
}

export function ParseOutput({ state }: { state: ParseOutputState }) {
  switch (state.kind) {
    case 'parse-error':
      return <ParseErrors errors={state.errors} />

    case 'empty':
      return <EmptyOutput>parse has not run yet</EmptyOutput>

    case 'ast':
      return <AstTreeView ast={state.ast} />
  }
}

function AstTreeNode({ node }: { node: TreeNode }) {
  const childCount = node.children.length

  return (
    <details className="ast-tree-node" open={node.depth < 3}>
      <summary>
        <span className="ast-node-id">#{node.id}</span>
        <span>{node.label}</span>
        {childCount > 0 && (
          <span className="ast-child-count">{childCount}</span>
        )}
      </summary>

      {childCount > 0 && (
        <div className="ast-tree-children">
          {node.children.map((child) => (
            <AstTreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </details>
  )
}

function buildTree(nodes: AstNodeView[]): TreeNode[] {
  const byId = new Map<number, TreeNode>()
  const roots: TreeNode[] = []

  for (const node of nodes) {
    byId.set(node.id, { ...node, children: [] })
  }

  for (const node of byId.values()) {
    if (node.parent === null) {
      roots.push(node)
      continue
    }

    const parent = byId.get(node.parent)

    if (parent) {
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}
