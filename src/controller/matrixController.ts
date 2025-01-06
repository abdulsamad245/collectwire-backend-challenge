import * as matrixOperations from '../utils/matrixOperations';
import handleMatrixOperation from '../utils/handleMatrixOperations';

// Controller for echo operation
export const echo = handleMatrixOperation(matrixOperations.echo);

// Controller for invert operation
export const invert = handleMatrixOperation(matrixOperations.invert);

// Controller for flatten operation
export const flatten = handleMatrixOperation(matrixOperations.flatten);

// Controller for sum operation
export const sum = handleMatrixOperation(matrixOperations.sum);

// Controller for multiply operation
export const multiply = handleMatrixOperation(matrixOperations.multiply);

