# デザインパターンとガイドライン

## アーキテクチャパターン

### 機能ベースの構成

プロジェクトは機能単位でモジュールを分割しています：

```
src/
  ├── core/           # 共通コア機能
  └── features/       # 機能単位のモジュール
      └── hello/      # 各機能ごとにディレクトリ
```

### サービス層パターン

- ビジネスロジックは `*.service.ts` ファイルに実装
- サービスは `as const` を使った const オブジェクトとして定義
- 例:

```typescript
export const HelloService = {
  sayHi: (name?: string): string => `Hello, ${name ?? "World"}!`,
} as const;
```

## テストパターン

### テストファイルの配置

- テストファイルはソースファイルと同じディレクトリに配置
- 命名規則: `<source-name>.spec.ts`

### テストの構造化

- `describe` のネストでコンテキストを明確化
- "when ... should ..." パターンの使用

```typescript
describe("ServiceName", () => {
  describe("methodName", () => {
    describe("when condition", () => {
      it("should expected behavior", () => {
        // test
      });
    });
  });
});
```

### Google Apps Script API のモッキング

Google の API をモックする場合、`global` オブジェクトを使用：

```typescript
const originalService = global.GoogleService;

beforeEach(() => {
  global.GoogleService = createMock<typeof GoogleService>();
});

afterEach(() => {
  global.GoogleService = originalService;
});
```

## ビルド・デプロイパターン

### Rollup による単一ファイルビルド

- エントリーポイント: `src/index.ts`
- 出力: `build/` ディレクトリ (CommonJS 形式)
- ツリーシェイキング: エントリーポイントは無効化（GAS の制約）

### 環境変数の扱い

- ローカル開発: `.env` ファイル + Rollup の dotenv プラグイン
- アクセス方法: `process.env.YOUR_SECRET_KEY`
- テスト時: `test/env.setup.js` で環境変数を設定

### デプロイ対象ファイル

- TypeScript コード: ビルド後の JavaScript（`build/` 内）
- 非コードファイル: `app/` ディレクトリ内のファイル
  - 許可される拡張子: `.html`, `.js` のみ

## コードスタイルガイドライン

### TypeScript の使用

- 厳格モード必須（`strict: true`）
- 未使用変数・パラメータは許可しない
- 暗黙の `any` 型は禁止
- オプショナルプロパティは厳密型チェック

### Google Apps Script 制約への対応

- GAS のグローバル関数（`main()` など）には `// @ts-expect-error` を付与
- GAS のグローバル変数（`SpreadsheetApp` など）は Biome で除外設定済み

### 非同期処理

- Promise と async/await を優先的に使用
- 例: `HelloService.sayHiAsync`

## ファイル管理

### 無視すべきファイル

- `.claspignore`: GAS にプッシュしないファイルを指定
- `.gitignore`: バージョン管理から除外するファイル（`build/`, `node_modules/` など）

### 静的アセット

- プロジェクトドキュメント用: `assets/`
- GAS デプロイ用: `app/assets/`

## バージョン管理

### ブランチ戦略

プロジェクトは `main` ブランチを使用しています。

### コミットフロー

Husky + Lint-Staged により、以下が自動実行されます：

1. ステージングファイルのリント・フォーマット
2. ビルド確認
3. ビルド成果物の削除

## 推奨プラクティス

- 新しい機能は `src/features/` 配下に機能単位で作成
- 共通ロジックは `src/core/` に配置
- テストは常にサービスと同じディレクトリに配置
- 環境変数を使う場合は型安全なラッパーサービスを作成推奨（EnvironmentService 参照）
