# コードベース構造

## ディレクトリ構成

```
.
├── .husky/              # Git フック設定
├── app/                 # HTML や非 TypeScript ファイル（GAS にプッシュするアセット）
│   └── assets/          # アセットファイル
├── assets/              # プロジェクトドキュメント用の画像等
├── src/                 # ソースコード
│   ├── core/            # コア機能
│   │   └── environment/ # 環境変数関連サービス
│   ├── features/        # 機能別モジュール
│   │   └── hello/       # Hello 機能サンプル
│   └── index.ts         # エントリーポイント
├── test/                # テスト関連設定
│   └── env.setup.js     # テスト用環境変数設定
└── build/               # ビルド出力先（.gitignore に含まれる）
```

## モジュール構成

- **core/**: 共通のコア機能（環境変数サービスなど）
- **features/**: 機能単位でモジュールを分割
  - 各機能は `.service.ts` と `.service.spec.ts` のペアで構成
  - HelloService がサンプル実装として存在

## パスエイリアス

tsconfig.json で以下のパスエイリアスが定義されています：

- `@core/*` → `src/core/*`
- `@features/*` → `src/features/*`

## エントリーポイント

- `src/index.ts`: メインエントリーポイント
  - GAS の `main()` 関数を定義
  - ビルド後に `build/` ディレクトリに出力される
