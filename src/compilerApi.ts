import init, { compile_source } from "./wasm/compiler_wasm/compiler_wasm";

export type Diagnostic = {
    phase: string;
    message: string;
    row: number | null;
    column: number | null;
};

export type TokenView = {
    tag: string;
    row: number;
    column: number;
    lexeme: string;
};

export type SemanticView = {
    ok: boolean;
    summary: string;
};

export type AstNodeView = {
    id: number;
    label: string;
    parent: number | null;
    depth: number;
};

export type AstGraphView = {
    nodes: AstNodeView[];
};

export type ParseView = {
    ok: boolean;
    summary: string;
    ast: AstGraphView | null;
};

export type CompileResult = {
    ok: boolean;
    diagnostics: Diagnostic[];
    tokens: TokenView[];
    parse: ParseView | null;
    semantic: SemanticView | null;
    lowering: Record<string, never> | null;
    assembly: string | null;
};

let initialized = false;

export async function compileSource(source: string): Promise<CompileResult> {
    if (!initialized) {
        await init();
        initialized = true;
    }

    return JSON.parse(compile_source(source));
}
