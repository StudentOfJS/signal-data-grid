export interface TestData {
  id: number;
  "Creation date": string;
  Code: number;
  "Email address": string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEmail(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charLength = characters.length;
  const nameLength = getRandomInt(3, 10);

  let name = '';
  for (let i = 0; i < nameLength; i++) {
    name += characters.charAt(Math.floor(Math.random() * charLength));
  }

  return `${name}@test.com`;
}

function getRandomDate(start: Date, end: Date): string {
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return `${
    randomDate.getMonth() + 1
  }/${randomDate.getDate()}/${randomDate.getFullYear()}`;
}

export function generateTestData(rows: number): TestData[] {
  const testData: TestData[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2025-2-21');

  for (let i = 1; i <= rows; i++) {
    testData.push({
      id: i,
      "Creation date": getRandomDate(startDate, endDate),
      Code: getRandomInt(1, 100),
      "Email address": getRandomEmail(),
    });
  }
  return testData;
}
