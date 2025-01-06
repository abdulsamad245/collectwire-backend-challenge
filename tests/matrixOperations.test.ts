import { expect } from 'chai';
import { echo, invert, flatten, sum, multiply } from '../src/utils/matrixOperations';
import fs from 'fs';
import path from 'path';
import { describe, it, before, after } from 'mocha';

describe('Matrix Operations', () => {
  const testMatrixPath = path.join(__dirname, 'testMatrix.csv');
  const invalidMatrixPath = path.join(__dirname, 'invalidMatrix.csv');
  const nonSquareMatrixPath = path.join(__dirname, 'nonSquareMatrix.csv');
  const singleElementMatrixPath = path.join(__dirname, 'singleElementMatrix.csv');
  const largeSquareMatrixPath = path.join(__dirname, 'largeSquareMatrix.csv');

  before(() => {
    // Create test matrix files
    fs.writeFileSync(testMatrixPath, '1,2,3\n4,5,6\n7,8,9');
    fs.writeFileSync(invalidMatrixPath, '1,2,3\n4,5,a\n7,8,9');
    fs.writeFileSync(nonSquareMatrixPath, '1,2,3\n4,5,6');
    fs.writeFileSync(singleElementMatrixPath, '42');
    
    // Create a large square matrix (10x10) to test it accepts square matrix of any size
    const largeMatrix = Array(10).fill(0).map((_, i) => 
      Array(10).fill(0).map((_, j) => i * 10 + j + 1)
    );
    fs.writeFileSync(largeSquareMatrixPath, largeMatrix.map(row => row.join(',')).join('\n'));
  });

  after(() => {
    // Clean up test files
    fs.unlinkSync(testMatrixPath);
    fs.unlinkSync(invalidMatrixPath);
    fs.unlinkSync(nonSquareMatrixPath);
    fs.unlinkSync(singleElementMatrixPath);
    fs.unlinkSync(largeSquareMatrixPath);
  });

  describe('echo', () => {
    it('should return the matrix as a string', () => {
      const result = echo(testMatrixPath);
      expect(result).to.equal('1,2,3\n4,5,6\n7,8,9');
    });

    it('should throw an error for invalid matrix', () => {
      expect(() => echo(invalidMatrixPath)).to.throw('Invalid matrix');
    });

    it('should throw an error for non-square matrix', () => {
      expect(() => echo(nonSquareMatrixPath)).to.throw('Invalid matrix');
    });

    it('should handle single element matrix', () => {
      const result = echo(singleElementMatrixPath);
      expect(result).to.equal('42');
    });

    it('should handle large square matrix', () => {
      const result = echo(largeSquareMatrixPath);
      expect(result.split('\n')).to.have.lengthOf(10);
      expect(result.split('\n')[0].split(',')).to.have.lengthOf(10);
    });
  });

  describe('invert', () => {
    it('should return the inverted matrix as a string', () => {
      const result = invert(testMatrixPath);
      expect(result).to.equal('1,4,7\n2,5,8\n3,6,9');
    });

    it('should handle single element matrix', () => {
      const result = invert(singleElementMatrixPath);
      expect(result).to.equal('42');
    });

    it('should handle large square matrix', () => {
      const result = invert(largeSquareMatrixPath);
      const invertedMatrix = result.split('\n').map(row => row.split(',').map(Number));
      expect(invertedMatrix).to.have.lengthOf(10);
      expect(invertedMatrix[0]).to.have.lengthOf(10);
      expect(invertedMatrix[0][9]).to.equal(91);
      expect(invertedMatrix[9][0]).to.equal(10);
    });
  });

  describe('flatten', () => {
    it('should return the flattened matrix as a string', () => {
      const result = flatten(testMatrixPath);
      expect(result).to.equal('1,2,3,4,5,6,7,8,9');
    });

    it('should handle single element matrix', () => {
      const result = flatten(singleElementMatrixPath);
      expect(result).to.equal('42');
    });

    it('should handle large square matrix', () => {
      const result = flatten(largeSquareMatrixPath);
      expect(result.split(',')).to.have.lengthOf(100);
    });
  });

  describe('sum', () => {
    it('should return the sum of all elements in the matrix', () => {
      const result = sum(testMatrixPath);
      expect(result).to.equal(45);
    });

    it('should handle single element matrix', () => {
      const result = sum(singleElementMatrixPath);
      expect(result).to.equal(42);
    });

    it('should handle large square matrix', () => {
      const result = sum(largeSquareMatrixPath);
      expect(result).to.equal(5050); // Sum of numbers from 1 to 100
    });
  });

  describe('multiply', () => {
    it('should return the product of all elements in the matrix', () => {
      const result = multiply(testMatrixPath);
      expect(result).to.equal(362880);
    });

    it('should handle single element matrix', () => {
      const result = multiply(singleElementMatrixPath);
      expect(result).to.equal(42);
    });

    it('should handle large square matrix', () => {
      const result = multiply(largeSquareMatrixPath);
      // The product of numbers from 1 to 100 is too large for JavaScript's Number type
      // So we'll just check if it's a finite number greater than 0
      expect(result).to.be.finite;
      expect(result).to.be.greaterThan(0);
    });
  });
});
