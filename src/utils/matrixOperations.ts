import fs from 'fs';

/**
 * Reads a CSV file and returns a 2D array of numbers
 * @param filePath - Path to the CSV file
 * @returns 2D array of numbers
 * @throws Error if the file is not a valid square matrix
 */
function readMatrix(filePath: string): number[][] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = content.trim().split('\n');
  const matrix = rows.map(row => row.split(',').map(Number));

  if (!isValidMatrix(matrix)) {
    throw new Error('Invalid matrix: must be square and contain only numbers');
  }

  return matrix;
}

/**
 * Checks if the given matrix is valid (square and contains only numbers)
 * @param matrix - 2D array to check
 * @returns boolean indicating if the matrix is valid
 */
function isValidMatrix(matrix: number[][]): boolean {
  const rowCount = matrix.length;
  return matrix.every(row => 
    row.length === rowCount && row.every(cell => !isNaN(cell) && isFinite(cell))
  );
}

/**
 * Returns the matrix as a string in matrix format
 * @param filePath - Path to the CSV file
 * @returns String representation of the matrix
 */
export function echo(filePath: string): string {
  const matrix = readMatrix(filePath);
  return matrix.map(row => row.join(',')).join('\n');
}

/**
 * Returns the matrix as a string with columns and rows inverted
 * @param filePath - Path to the CSV file
 * @returns String representation of the inverted matrix
 */
export function invert(filePath: string): string {
  const matrix = readMatrix(filePath);
  const inverted = matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex])
  );
  return inverted.map(row => row.join(',')).join('\n');
}

/**
 * Returns the matrix as a 1 line string, with values separated by commas
 * @param filePath - Path to the CSV file
 * @returns Flattened string representation of the matrix
 */
export function flatten(filePath: string): string {
  const matrix = readMatrix(filePath);
  return matrix.flat().join(',');
}

/**
 * Returns the sum of the integers in the matrix
 * @param filePath - Path to the CSV file
 * @returns Sum of all elements in the matrix
 */
export function sum(filePath: string): number {
  const matrix = readMatrix(filePath);
  return matrix.flat().reduce((acc, val) => acc + val, 0);
}

/**
 * Returns the product of the integers in the matrix
 * @param filePath - Path to the CSV file
 * @returns Product of all elements in the matrix
 */
export function multiply(filePath: string): number {
  const matrix = readMatrix(filePath);
  return matrix.flat().reduce((acc, val) => acc * val, 1);
}

