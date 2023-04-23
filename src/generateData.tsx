export interface TestData {
  id: number;
  date: string;
  random: number;
  email: string;
  group: number;
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
  const endDate = new Date('2023-12-31');

  for (let i = 1; i <= rows; i++) {
    testData.push({
      id: i,
      date: getRandomDate(startDate, endDate),
      random: getRandomInt(1, 100),
      email: getRandomEmail(),
      group: getRandomInt(1, 3),
    });
  }
  return testData;
}
