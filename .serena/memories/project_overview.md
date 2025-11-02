# プロジェクト概要

## プロジェクトの目的

このプロジェクトは **EZ CLASP** という Google Apps Script (GAS) プロジェクトのブートストラップテンプレートです。
新規の GAS プロジェクトを作成するか、既存のプロジェクトに接続して使用します。

## 主な機能

- 最新の TypeScript 機能を使用可能
- 最新の EcmaScript 機能を使用可能
- Google 関連インターフェース（SpreadsheetApp、DriveApp、DataStudioApp など）を使用したコードの単体テスト
- コードのフォーマットとリントの自動維持
- バージョン管理ツールの利用
- 環境変数の簡易使用
- ツリーシェイキングによる使用されているコードのみのデプロイ

## 技術スタック

- **言語**: TypeScript (ES2015ターゲット)
- **ビルドツール**: Rollup + Babel
- **テストフレームワーク**: Jest + ts-jest
- **リント・フォーマット**: Biome + Ultracite
- **デプロイツール**: @google/clasp
- **Git フック**: Husky + Lint-Staged
- **パッケージマネージャー**: pnpm

## デプロイターゲット

Google Apps Script (GAS) プラットフォーム
