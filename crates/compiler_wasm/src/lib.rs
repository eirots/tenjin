use compiler_core::pipeline as core_pipeline;
use serde::Serialize;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct CompileResult {
    ok: bool,
    diagnostics: Vec<Diagnostic>,
    tokens: Vec<TokenView>,
    parse: Option<ParseView>,
    semantic: Option<SemanticView>,
    lowering: Option<LoweringView>,
    assembly: Option<String>,
}

#[derive(Serialize)]
struct Diagnostic {
    phase: String,
    message: String,
    row: Option<u32>,
    column: Option<u32>,
}

#[derive(Serialize)]
struct TokenView {
    tag: String,
    row: u32,
    column: u32,
    lexeme: String,
}

#[derive(Serialize)]
struct ParseView {
    ok: bool,
    summary: String,
    ast: Option<AstGraphView>,
}

#[derive(Serialize)]
struct AstGraphView {
    nodes: Vec<AstNodeView>,
}

#[derive(Serialize)]
struct AstNodeView {
    id: usize,
    label: String,
    parent: Option<usize>,
    depth: usize,
}

#[derive(Serialize)]
struct SemanticView {
    ok: bool,
    summary: String,
}

#[derive(Serialize)]
struct LoweringView {
    // todo
}

impl From<core_pipeline::CompilerPipelineResult> for CompileResult {
    fn from(result: core_pipeline::CompilerPipelineResult) -> Self {
        Self {
            ok: result.ok,
            diagnostics: result
                .diagnostics
                .iter()
                .map(|diagnostic| Diagnostic {
                    phase: diagnostic.phase.as_str().to_string(),
                    message: diagnostic.message.clone(),
                    row: diagnostic.row,
                    column: diagnostic.column,
                })
                .collect(),
            tokens: result.tokens.iter().map(TokenView::from).collect(),
            parse: result.parse.as_ref().map(ParseView::from),
            semantic: result.semantic.as_ref().map(SemanticView::from),
            lowering: None,
            assembly: None,
        }
    }
}

impl From<&compiler_core::lexer::Token> for TokenView {
    fn from(token: &compiler_core::lexer::Token) -> Self {
        let location = token.location();

        Self {
            tag: token.kind().to_string(),
            row: location.row + 1,
            column: location.column + 1,
            lexeme: token
                .lexeme()
                .map(ToString::to_string)
                .unwrap_or_else(|| token.literal().to_string()),
        }
    }
}

impl From<&core_pipeline::ParseStage> for ParseView {
    fn from(parse: &core_pipeline::ParseStage) -> Self {
        Self {
            ok: parse.ok,
            summary: if parse.ok {
                "Parsed successfully".to_string()
            } else {
                format!("Parse failed with {} errors", parse.error_count)
            },
            ast: parse.ast_graph.as_ref().map(|graph| AstGraphView {
                nodes: graph
                    .nodes
                    .iter()
                    .map(|node| AstNodeView {
                        id: node.id,
                        label: node.label.clone(),
                        parent: node.parent,
                        depth: node.depth,
                    })
                    .collect(),
            }),
        }
    }
}

impl From<&core_pipeline::SemanticStage> for SemanticView {
    fn from(semantic: &core_pipeline::SemanticStage) -> Self {
        Self {
            ok: semantic.ok,
            summary: if semantic.ok {
                "Semantic analysis passed".to_string()
            } else {
                format!(
                    "Semantic analysis failed with {} errors",
                    semantic.error_count
                )
            },
        }
    }
}

#[wasm_bindgen]
pub fn compile_source(source: &str) -> String {
    let result = CompileResult::from(core_pipeline::compile_source(source));
    serde_json::to_string_pretty(&result).unwrap()
}
