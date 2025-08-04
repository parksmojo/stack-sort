import { testFunc } from './test-utils.ts';

const testCases: string[][][] = [
  [['A','B'],['B','B'],['A','B']],
  [['Y','Y','B','B'],['B','A','Y','Y'],['A','A','A','B'],[],[]],
  [['B', 'Y', 'B', 'Y'], ['Y', 'B', 'Y', 'B'], []],
  [['G', 'B', 'Y'], ['A', 'A', 'R'], ['B', 'B', 'G'], ['R', 'G', 'R'], ['Y', 'Y', 'A'], ['Y', 'G', 'A', 'B'], ['R']],
];

testCases.forEach(testFunc);
