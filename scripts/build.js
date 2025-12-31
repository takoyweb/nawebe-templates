const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '../src');
const OUTPUT_DIR = path.join(__dirname, '../public/api');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Load all YAML files from a directory
 */
function loadYamlFiles(dir) {
  const items = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        const data = yaml.load(content);
        items.push(data);
        console.log(`✅ Loaded: ${file}`);
      } catch (error) {
        console.error(`❌ Error loading ${file}:`, error.message);
        process.exit(1);
      }
    }
  }
  
  return items;
}

/**
 * Build templates.json
 */
function buildTemplates() {
  console.log('\n📦 Building templates...');
  const templatesDir = path.join(SRC_DIR, 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    console.log('⚠️  No templates directory found');
    return;
  }
  
  const templates = loadYamlFiles(templatesDir);
  
  const output = {
    version: '1.0.0',
    updated_at: new Date().toISOString(),
    count: templates.length,
    templates: templates
  };
  
  const outputPath = path.join(OUTPUT_DIR, 'templates.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ Generated: templates.json (${templates.length} templates)`);
}

/**
 * Build blocks.json
 */
function buildBlocks() {
  console.log('\n📦 Building blocks...');
  const blocksDir = path.join(SRC_DIR, 'blocks');
  
  if (!fs.existsSync(blocksDir)) {
    console.log('⚠️  No blocks directory found');
    return;
  }
  
  const blocks = loadYamlFiles(blocksDir);
  
  const output = {
    version: '1.0.0',
    updated_at: new Date().toISOString(),
    count: blocks.length,
    blocks: blocks
  };
  
  const outputPath = path.join(OUTPUT_DIR, 'blocks.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ Generated: blocks.json (${blocks.length} blocks)`);
}

/**
 * Build version.json
 */
function buildVersion() {
  console.log('\n📦 Building version info...');
  
  const version = {
    version: '1.0.0',
    build_date: new Date().toISOString(),
    endpoints: {
      templates: '/api/templates.json',
      blocks: '/api/blocks.json',
      version: '/api/version.json'
    }
  };
  
  const outputPath = path.join(OUTPUT_DIR, 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(version, null, 2));
  console.log('✅ Generated: version.json');
}

/**
 * Main build function
 */
function build() {
  console.log('🚀 Starting build process...\n');
  console.log('=====================================');
  
  buildTemplates();
  buildBlocks();
  buildVersion();
  
  console.log('\n=====================================');
  console.log('✅ Build completed successfully!\n');
}

// Run build
build();

