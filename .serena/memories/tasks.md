# Drive検索ビューア 実装タスクリスト

## Phase 1: 基盤構築（最優先）

### Task 1: HTML表示基盤の構築 ✅
- [x] `doGet()` 関数を `src/index.ts` に実装
- [x] `app/index.html` にフォーム画面を作成（MOCK実装含む）
- [x] ビルドが正常に完了することを確認

**完了条件**: ブラウザでWebアプリを開いた際に、検索フォームが表示される

**実装メモ**:
- `src/index.ts:25-29` に `doGet()` 関数を実装
- `app/index.html` は検索フォーム・結果テーブル・メッセージ表示を含む
- 現在はMOCK実装（ダミーデータ表示）で、Task 2/3で実際のDrive検索に置き換え予定

---

## Phase 2: コア機能実装

### Task 2: Drive検索機能の実装 ✅
- [x] `src/features/drive-search/` ディレクトリを作成
- [x] `drive-search.service.ts` で `DriveApp.searchFiles()` を実装
- [x] `google.script.run` で呼び出せるようにする

**完了条件**: サーバー側でDrive検索が実行できる関数が完成

**実装メモ**:
- `src/features/drive-search/drive-search.type.ts` で型定義を作成
- `src/features/drive-search/drive-search.service.ts` で `DriveSearchService.searchFiles()` を実装
- `src/index.ts:53-55` にグローバル関数 `searchFiles()` を追加
- while文の代わりにfor文を使用して無限ループリスクを軽減
- 検索結果は最大50件に制限

### Task 3: フロントエンド連携 ✅
- [x] `index.html` に検索結果表示用のテーブルを実装（Task 1で完了）
- [x] MOCKデータを `google.script.run.withSuccessHandler()` による実際のサーバー呼び出しに置き換え
- [x] ローディング表示・エラーハンドリングを追加（Task 1で完了）

**完了条件**: フォームから検索を実行し、結果がテーブルに表示される

**実装メモ**:
- `app/index.html:253-262` でMOCKデータ（setTimeout）を削除
- `google.script.run.withSuccessHandler()` と `withFailureHandler()` を使用
- サーバー側の `searchFiles(keyword)` 関数を呼び出し
- 既存のエラーハンドリング機能を活用

### Task 4: テストコードの追加 ✅
- [x] `drive-search.service.spec.ts` で単体テストを作成
- [x] モック化した `DriveApp` でテスト実行
- [x] テストが正常にパスすることを確認

**完了条件**: `bun test` でテストが全てパスする

**実装メモ**:
- テストの階層を浅くし、日本語で記述
- 4つのテストケースを実装:
  - 複数ファイルが見つかった場合のテスト
  - ファイルが見つからない場合のテスト
  - 50件制限のテスト
  - シングルクォートエスケープのテスト
- DriveAppのモックイテレータを実装
- 全11テスト、15アサーションが成功

---

## Phase 3: 品質向上・デプロイ

### Task 5: UIの改善
- [x] エラーメッセージの表示機能を実装（Task 1で完了）
- [x] 検索結果なし時の表示を実装（Task 1で完了）
- [x] 基本的なスタイリング（CSS）を追加（Task 1で完了）

**完了条件**: ユーザーフレンドリーなUIになっている

### Task 6: デプロイ設定
- [ ] `.clasp.json` の確認・調整
- [ ] `appsscript.json` でOAuthスコープ設定（`https://www.googleapis.com/auth/drive.readonly`）
- [ ] `clasp push` & `clasp deploy` でWebアプリ公開
- [ ] 公開設定を「自分のドメイン内の全員」に設定

**完了条件**: Webアプリが正常にデプロイされ、ドメイン内からアクセス可能

### Task 7: ドキュメント整備
- [ ] README更新（アプリ概要・使い方）
- [ ] デプロイ手順の記載
- [ ] 環境セットアップ手順の確認

**完了条件**: 第三者が手順に従ってデプロイできるドキュメントが完成

---

## 現在のステータス

**現在のフェーズ**: Phase 3（品質向上・デプロイ）
**次のタスク**: Task 6 - デプロイ設定（Task 5のUI改善は完了済み）

---

## 更新履歴

- 2025-11-03: 初版作成
- 2025-11-03: Task 1完了、MOCK実装による段階的アプローチを明記
- 2025-11-03: Task 2完了、Drive検索機能の実装完了（while文→for文へ安全性改善）
- 2025-11-03: Task 3完了、MOCKデータをgoogle.script.run呼び出しに置き換え
- 2025-11-03: Task 4完了、テストコード追加（階層を浅く、日本語記述に変更）
