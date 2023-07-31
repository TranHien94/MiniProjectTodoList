
import express from 'express';
const router = express.Router();

import todoApi from '../routes/api/todos';
router.use('/todos', todoApi);

export default router;