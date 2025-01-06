import { Request, Response, NextFunction } from 'express';
import { MatrixOperation } from '../types/matrixOperation';

/**
 * Handle matrix operations and send appropriate response
 * @param operation - Function to perform on the matrix
 */
const handleMatrixOperation = (operation: MatrixOperation) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.file) {
      return next(new Error('No file uploaded'));
    }
    
    try {
      const result = operation(req.file.path);
      res.send(result.toString());
    } catch (error) {
      next(error);
    }
  };
};

export default handleMatrixOperation;