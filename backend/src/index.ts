import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateFormSchema } from './routes/form';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/generate-form', generateFormSchema);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 