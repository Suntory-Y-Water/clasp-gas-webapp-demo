# コードスタイルと規約

## TypeScript 設定

### コンパイラオプション（tsconfig.json）

- **ターゲット**: ES2015
- **モジュール**: ESNext
- **厳格モード**: 有効（strict: true）
- **厳格な設定**:
  - `noImplicitAny: true`
  - `noImplicitThis: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `exactOptionalPropertyTypes: true`
  - `useUnknownInCatchVariables: true`
- **その他**:
  - コメントの削除: 有効（removeComments: true）
  - 一貫したケーシング: 有効（forceConsistentCasingInFileNames: true）

## リント・フォーマット

### Biome + Ultracite

- 設定ファイル: `biome.jsonc`
- ベース設定: `ultracite` を継承
- カスタムルール:
  - `correctness.noUndeclaredVariables: off`（Google Apps Script のグローバル変数使用のため）

### Lint-Staged

コミット時に以下のファイルに対して自動フォーマット：
- `*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}`
- コマンド: `pnpm dlx ultracite fix`

## 命名規則

### ファイル命名

- サービスクラス: `*.service.ts`
- テストファイル: `*.service.spec.ts`
- 型定義: `*.type.ts`

### クラス・定数命名

- サービス: PascalCase（例: `HelloService`, `EnvironmentService`）
- const オブジェクト: PascalCase + `as const` 使用（例: `HelloService = { ... } as const`）

## テストスタイル

### テスト構造

- `describe` のネスト構造を使用
- テストケース名は明確に記述
  - "should ..." パターンを使用
  - "when ..." パターンで条件を記述

### モッキング

- `@golevelup/ts-jest` の `createMock` を使用
- Google Apps Script のグローバル変数は `global` オブジェクトでモック

### カバレッジ対象

- `**/*.(service|controller|handler|util).ts` のファイルのみ
  - 設定: `jest.config.js` の `collectCoverageFrom`

## その他の規約

- Google Apps Script の関数は `// @ts-expect-error` コメントを使用（GAS の制約のため）
- 環境変数は `process.env.YOUR_SECRET_KEY` で参照
- 非同期処理は Promise と async/await を使用
