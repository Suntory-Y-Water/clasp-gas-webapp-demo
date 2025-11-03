import { HelloService } from '@features/hello/hello.service';
import { DriveSearchService } from '@features/drive-search/drive-search.service';

// @ts-ignore
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function main(): void {
  const hiMessage = HelloService.sayHi('CLASP');

  console.log({ hiMessage });
}

/**
 * WebアプリケーションのエントリーポイントとなるGET リクエストハンドラ
 *
 * Google Apps Script の Web アプリケーション機能により、
 * このURLにアクセスした際に app/index.html を返す。
 *
 * @returns {GoogleAppsScript.HTML.HtmlOutput} HTMLページ
 *
 * @example
 * // ブラウザから以下のようなURLでアクセスすると実行される
 * // https://script.google.com/macros/s/{SCRIPT_ID}/exec
 */
// @ts-ignore
// biome-ignore lint/correctness/noUnusedVariables: GASのエントリーポイントとして必要
function doGet(): GoogleAppsScript.HTML.HtmlOutput {
  // 実際のHTMLがあるファイル名を指定
  return HtmlService.createHtmlOutputFromFile('app/index')
    .setTitle('Drive検索ビューア')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Drive内のファイルをキーワード検索する
 *
 * google.script.run から呼び出されるグローバル関数。
 * キーワードに一致するファイル名を持つファイルをDriveから検索し、
 * ファイル名と最終更新日時を返す。
 *
 * @param keyword - 検索キーワード（ファイル名の部分一致）
 * @returns ファイル情報の配列（最大50件）
 *
 * @example
 * ```ts
 * // HTMLから呼び出す場合
 * google.script.run
 *   .withSuccessHandler(results => console.log(results))
 *   .searchFiles('report');
 * ```
 */
// @ts-ignore
// biome-ignore lint/correctness/noUnusedVariables: google.script.runから呼び出されるグローバル関数
function searchFiles(keyword: string) {
  return DriveSearchService.searchFiles({ keyword });
}
