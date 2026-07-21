Tenjin compiler visualizer
==========================

Frontend: React + TypeScript + Vite

Compiler core: Rust workspace crate at `crates/compiler_core`

Browser bridge: `wasm-pack` + `wasm-bindgen` crate at `crates/compiler_wasm`

Heavy compiler execution: Web Worker, planned

Editor: CodeMirror, planned

Later graph views: React Flow / @xyflow/react

Local development:

```sh
npm run dev
```

Build:

```sh
npm run build
```

Rust verification:

```sh
cargo test -p compiler_core
cargo test -p compiler_wasm
```

Compiler code cannot be made public because of degree requirements. Please contact me directly for access to the repo. 