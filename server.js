const express = require('express');
const path = require('path');
const app = express();

// Phục vụ file tĩnh từ thư mục gốc
app.use(express.static(path.join(__dirname)));

// Redirect mọi request về index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});