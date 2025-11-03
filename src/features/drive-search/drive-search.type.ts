/**
 * Drive検索結果の単一ファイル情報
 *
 * @example
 * ```ts
 * const fileInfo: DriveFileInfo = {
 *   name: 'example.pdf',
 *   lastUpdated: '2025-11-03T10:30:00Z'
 * };
 * ```
 */
export type DriveFileInfo = {
  /** ファイル名 */
  name: string;
  /** 最終更新日時（ISO 8601形式） */
  lastUpdated: string;
};

/**
 * Drive検索結果のリスト
 *
 * @example
 * ```ts
 * const results: DriveSearchResult = [
 *   { name: 'document1.pdf', lastUpdated: '2025-11-03T10:30:00Z' },
 *   { name: 'document2.docx', lastUpdated: '2025-11-02T15:20:00Z' }
 * ];
 * ```
 */
export type DriveSearchResult = DriveFileInfo[];
