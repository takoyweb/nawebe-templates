const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '../src');

let hasErrors = false;

/**
 * Validate a template
 */
function validateTemplate(template, filename) {
  const errors = [];
  
  // Required fields
  if (!template.id) errors.push('Missing required field: id');
  if (!template.name) errors.push('Missing required field: name');
  if (!template.version) errors.push('Missing required field: version');
  if (!template.blocks || !Array.isArray(template.blocks)) {
    errors.push('Missing or invalid field: blocks (must be array)');
  }
  
  // Version format
  if (template.version && !/^\d+\.\d+\.\d+$/.test(template.version)) {
    errors.push(`Invalid version format: ${template.version} (expected: X.Y.Z)`);
  }
  
  // Price validation
  if (template.price !== undefined && typeof template.price !== 'number') {
    errors.push('Price must be a number');
  }
  
  if (errors.length > 0) {
    console.error(`\n❌ Template validation failed: ${filename}`);
    errors.forEach(err => console.error(`   - ${err}`));
    hasErrors = true;
  } else {
    console.log(`✅ Template valid: ${filename}`);
  }
}

/**
 * Validate a block
 */
function validateBlock(block, filename) {
  const errors = [];
  
  // Required fields
  if (!block.type) errors.push('Missing required field: type');
  if (!block.name) errors.push('Missing required field: name');
  if (!block.version) errors.push('Missing required field: version');
  if (!block.schema || typeof block.schema !== 'object') {
    errors.push('Missing or invalid field: schema (must be object)');
  }
  if (!block.defaults || typeof block.defaults !== 'object') {
    errors.push('Missing or invalid field: defaults (must be object)');
  }
  
  // Version format
  if (block.version && !/^\d+\.\d+\.\d+$/.test(block.version)) {
    errors.push(`Invalid version format: ${block.version} (expected: X.Y.Z)`);
  }
  
  // Schema validation
  if (block.schema && block.defaults) {
    const schemaKeys = Object.keys(block.schema);
    const defaultKeys = Object.keys(block.defaults);
    
    // Check if all schema keys have defaults
    const missingDefaults = schemaKeys.filter(key => !defaultKeys.includes(key));
    if (missingDefaults.length > 0) {
      errors.push(`Missing defaults for schema keys: ${missingDefaults.join(', ')}`);
    }
  }
  
  if (errors.length > 0) {
    console.error(`\n❌ Block validation failed: ${filename}`);
    errors.forEach(err => console.error(`   - ${err}`));
    hasErrors = true;
  } else {
    console.log(`✅ Block valid: ${filename}`);
  }
}

/**
 * Validate all files in a directory
 */
function validateDirectory(dir, validatorFn) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        const data = yaml.load(content);
        validatorFn(data, file);
      } catch (error) {
        console.error(`\n❌ YAML parsing error in ${file}:`);
        console.error(`   ${error.message}`);
        hasErrors = true;
      }
    }
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Starting validation...\n');
  console.log('=====================================');
  
  console.log('\n📋 Validating templates...');
  validateDirectory(path.join(SRC_DIR, 'templates'), validateTemplate);
  
  console.log('\n🧩 Validating blocks...');
  validateDirectory(path.join(SRC_DIR, 'blocks'), validateBlock);
  
  console.log('\n=====================================');
  
  if (hasErrors) {
    console.error('\n❌ Validation failed with errors\n');
    process.exit(1);
  } else {
    console.log('\n✅ All validations passed!\n');
  }
}

// Run validation
validate();

