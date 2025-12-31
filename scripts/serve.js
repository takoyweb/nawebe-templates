const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname, '../public');

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  next();
});

// Serve static files
app.use('/api', express.static(path.join(PUBLIC_DIR, 'api')));

// Root endpoint
app.get('/', (req, res) => {
  const apiDir = path.join(PUBLIC_DIR, 'api');
  
  if (!fs.existsSync(apiDir)) {
    return res.json({
      error: 'API files not built yet',
      message: 'Run "npm run build" first'
    });
  }
  
  const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.json'));
  
  res.json({
    name: 'Nawebe Templates Registry',
    version: '1.0.0',
    endpoints: files.map(f => `/api/${f}`),
    available_files: files
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    available_endpoints: ['/api/templates.json', '/api/blocks.json', '/api/version.json']
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Nawebe Templates Registry Server`);
  console.log(`=====================================`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`\n📚 Available endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/templates.json`);
  console.log(`   - http://localhost:${PORT}/api/blocks.json`);
  console.log(`   - http://localhost:${PORT}/api/version.json`);
  console.log(`\n✨ Ready to serve templates!\n`);
});

