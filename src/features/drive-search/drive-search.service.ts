import type { DriveSearchResult } from './drive-search.type';

/**
 * Drive検索サービス
 *
 * Google DriveApp APIを使用してファイルを検索する機能を提供します。
 */
export const DriveSearchService = {
  /**
   * キーワードでDriveファイルを検索します。
   *
   * @param params - 検索パラメータ
   * @param params.keyword - 検索キーワード（ファイル名の部分一致）
   * @returns ファイル情報の配列（最大50件）
   *
   * @example
   * ```ts
   * // 'report'を含むファイルを検索
   * const results = DriveSearchService.searchFiles({ keyword: 'report' });
   * console.log(results); // [{ name: 'report.pdf', lastUpdated: '2025-11-03T10:30:00Z' }]
   * ```
   *
   * @example
   * ```ts
   * // 検索結果が0件の場合
   * const results = DriveSearchService.searchFiles({ keyword: 'nonexistent' });
   * console.log(results); // []
   * ```
   */
  searchFiles: ({ keyword }: { keyword: string }): DriveSearchResult => {
    const query = `title contains '${keyword.replace(/'/g, "\\'")}'`;
    const files = DriveApp.searchFiles(query);
    const results: DriveSearchResult = [];
    const maxResults = 50;

    for (let i = 0; i < maxResults && files.hasNext(); i++) {
      const file = files.next();
      results.push({
        name: file.getName(),
        lastUpdated: file.getLastUpdated().toISOString(),
      });
    }

    return results;
  },
} as const;
