import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { matrixRouter } from './routes/matrixRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { upload } from './middlewares/fileUpload';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use matrix routes with file upload middleware
app.use('/', upload.single('file'), matrixRouter);

// Error handling middleware
app.use(errorHandler);

const port = 8088;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});

export default app;

