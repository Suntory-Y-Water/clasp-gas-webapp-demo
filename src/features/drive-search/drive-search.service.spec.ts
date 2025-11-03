import { DriveSearchService } from './drive-search.service';

describe('DriveSearchService', () => {
  describe('searchFiles', () => {
    it('複数ファイルが見つかった場合、ファイル情報の配列を返す', () => {
      const mockFiles = [
        {
          getName: () => 'report.pdf',
          getLastUpdated: () => new Date('2025-11-03T10:30:00Z'),
        },
        {
          getName: () => 'report_summary.docx',
          getLastUpdated: () => new Date('2025-11-02T15:20:00Z'),
        },
      ];

      let index = 0;
      const mockIterator = {
        hasNext: () => index < mockFiles.length,
        next: () => mockFiles[index++],
      };

      global.DriveApp = {
        searchFiles: () => mockIterator,
      } as unknown as GoogleAppsScript.Drive.DriveApp;

      const result = DriveSearchService.searchFiles({ keyword: 'report' });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: 'report.pdf',
        lastUpdated: '2025-11-03T10:30:00.000Z',
      });
      expect(result[1]).toEqual({
        name: 'report_summary.docx',
        lastUpdated: '2025-11-02T15:20:00.000Z',
      });
    });

    it('ファイルが見つからない場合、空配列を返す', () => {
      const mockIterator = {
        hasNext: () => false,
        next: () => {
          throw new Error('No more files');
        },
      };

      global.DriveApp = {
        searchFiles: () => mockIterator,
      } as unknown as GoogleAppsScript.Drive.DriveApp;

      const result = DriveSearchService.searchFiles({ keyword: 'nonexistent' });

      expect(result).toEqual([]);
    });

    it('50件を超えるファイルがある場合、最初の50件のみ返す', () => {
      const createMockFile = (index: number) => ({
        getName: () => `file${index}.txt`,
        getLastUpdated: () => new Date('2025-11-03T10:00:00Z'),
      });

      let index = 0;
      const mockIterator = {
        hasNext: () => true,
        next: () => createMockFile(index++),
      };

      global.DriveApp = {
        searchFiles: () => mockIterator,
      } as unknown as GoogleAppsScript.Drive.DriveApp;

      const result = DriveSearchService.searchFiles({ keyword: 'file' });

      expect(result).toHaveLength(50);
      expect(result[0].name).toBe('file0.txt');
      expect(result[49].name).toBe('file49.txt');
    });

    it('キーワードにシングルクォートが含まれる場合、エスケープする', () => {
      const mockIterator = {
        hasNext: () => false,
        next: () => {
          throw new Error('No more files');
        },
      };

      let capturedQuery = '';
      global.DriveApp = {
        searchFiles: (query: string) => {
          capturedQuery = query;
          return mockIterator;
        },
      } as unknown as GoogleAppsScript.Drive.DriveApp;

      DriveSearchService.searchFiles({ keyword: "test'file" });

      expect(capturedQuery).toBe("title contains 'test\\'file'");
    });
  });
});
