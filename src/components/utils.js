export const roundWithPrecision = (num, digitsAfterComma = 2) =>
  Math.sign(num) *
  (Math.round(
    (Math.abs(num) + Number.EPSILON) * Math.pow(10, digitsAfterComma)
  ) /
    Math.pow(10, digitsAfterComma));

export const geometricMean = (array) => {
  const arrayMultiplication = array.reduce(
    (result, value) => result * value,
    1
  );

  return Math.pow(arrayMultiplication, 1 / array.length);
};

export const arraySum = (array) =>
  array.reduce((result, value) => result + value, 0);

const radnomConsistencyNumbers = {
  1: 0,
  2: 0,
  3: 0.58,
  4: 0.9,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49,
};

export const calculateConsistency = (matrix) => {
  const eigenvectorComponents = matrix.map((row) => geometricMean(row));
  const eigenvectorComponentsSum = arraySum(eigenvectorComponents);

  const prioritiesVector =
    eigenvectorComponentsSum > 0
      ? eigenvectorComponents.map((value) => value / eigenvectorComponentsSum)
      : [];

  if (eigenvectorComponents.some((value) => value === 0)) {
    return {
      consistencyNumber: -1,
      prioritiesVector: [],
      eigenvectorComponents: [],
    };
  }

  const columnsSum = Array.from({ length: matrix.length }).map((_, column) =>
    matrix.reduce((result, _, row) => result + matrix[row][column], 0)
  );
  const columnsSumWeighted = columnsSum.map(
    (value, index) => value * prioritiesVector[index]
  );

  const consistencyIndex =
    (arraySum(columnsSumWeighted) - matrix.length) / (matrix.length - 1);
  const consistencyNumber = roundWithPrecision(
    (consistencyIndex / radnomConsistencyNumbers[matrix.length]) * 100,
    2
  );

  return { consistencyNumber, prioritiesVector, eigenvectorComponents };
};
