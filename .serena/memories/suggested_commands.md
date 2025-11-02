# 推奨コマンド

## 開発時によく使うコマンド

### ビルド

```bash
pnpm run build         # プロジェクトをビルド
pnpm run build:watch   # ウォッチモードでビルド
pnpm run build:clean   # ビルド成果物を削除
```

### テスト

```bash
pnpm test              # テストを実行
pnpm test:watch        # ウォッチモードでテスト
pnpm test:cov          # カバレッジを含めてテスト実行
```

### リント・フォーマット

```bash
pnpm lint              # Biome でリント実行
pnpm lint --write      # リント + 自動修正
```

### すべてのチェック

```bash
pnpm check:all         # リント（自動修正）+ テスト
```

### デプロイ

```bash
pnpm run deploy        # すべてのチェック + ビルド + GAS へプッシュ
pnpm run push          # GAS へプッシュ（チェックなし）
```

### CLASP コマンド

```bash
pnpm clasp:login       # Google アカウントにログイン
pnpm clasp:create      # 新しい GAS プロジェクトを作成
```

## Git 関連

### Pre-commit フロー

Husky により、コミット前に以下が自動実行されます：

1. Lint-Staged（ステージングされたファイルのみ）
   - リント問題の修正
   - フォーマット問題の修正
2. ビルド実行
3. ビルド成果物の削除

## システムユーティリティコマンド（macOS/Darwin）

このプロジェクトは macOS (Darwin) で開発されています。
標準的な Unix コマンドが使用可能です：

```bash
git status             # Git ステータス確認
ls -la                 # ファイル一覧表示
cd <directory>         # ディレクトリ移動
grep <pattern> <file>  # パターン検索
find <path> -name      # ファイル検索
```

## パッケージ管理

```bash
pnpm install           # 依存関係のインストール
pnpm prepare           # Husky のセットアップ
```
