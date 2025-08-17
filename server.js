import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 1. Serwuj pliki statyczne z folderu 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Dla wszystkich innych zapytań, wyślij index.html
//    To middleware uruchomi się tylko, jeśli plik nie został znaleziony przez express.static
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});