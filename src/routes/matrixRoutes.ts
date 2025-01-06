import express from 'express';
import * as matrixController from '../controllers/matrixController';

export const matrixRouter = express.Router();

// Echo endpoint
matrixRouter.post('/echo', matrixController.echo);

// Invert endpoint
matrixRouter.post('/invert', matrixController.invert);

// Flatten endpoint
matrixRouter.post('/flatten', matrixController.flatten);

// Sum endpoint
matrixRouter.post('/sum', matrixController.sum);

// Multiply endpoint
matrixRouter.post('/multiply', matrixController.multiply);

