import { HelloService } from '@features/hello/hello.service';

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
