const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serwuj pliki statyczne z folderu 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ta reguła rozwiązuje problem z 404 przy odświeżaniu
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});