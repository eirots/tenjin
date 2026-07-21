#!/bin/sh

set -eu

cd "$(dirname "$0")/crates/compiler_wasm"
wasm-pack build --target web --out-dir ../../src/wasm/compiler_wasm
