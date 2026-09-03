const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

async function build() {
  const root = path.resolve(__dirname, '..');
  console.log('🔨 Building...\n');

  // Minify CSS
  const cssPath = path.join(root, 'styles.css');
  const cssSource = fs.readFileSync(cssPath, 'utf8');
  const cssResult = new CleanCSS({ level: 2 }).minify(cssSource);
  if (cssResult.errors.length) {
    console.error('❌ CSS errors:', cssResult.errors);
    process.exit(1);
  }
  const cssOutPath = path.join(root, 'styles.min.css');
  fs.writeFileSync(cssOutPath, cssResult.styles);
  const cssReduction = ((1 - cssResult.styles.length / cssSource.length) * 100).toFixed(1);
  console.log(`✅ CSS: ${(cssSource.length / 1024).toFixed(1)} KB → ${(cssResult.styles.length / 1024).toFixed(1)} KB (${cssReduction}% reduction)`);

  // Minify JS
  const jsPath = path.join(root, 'main.js');
  const jsSource = fs.readFileSync(jsPath, 'utf8');
  const jsResult = await minify(jsSource, {
    compress: { drop_console: true },
    mangle: true,
    format: { comments: false }
  });
  if (jsResult.error) {
    console.error('❌ JS error:', jsResult.error);
    process.exit(1);
  }
  const jsOutPath = path.join(root, 'main.min.js');
  fs.writeFileSync(jsOutPath, jsResult.code);
  const jsReduction = ((1 - jsResult.code.length / jsSource.length) * 100).toFixed(1);
  console.log(`✅ JS:  ${(jsSource.length / 1024).toFixed(1)} KB → ${(jsResult.code.length / 1024).toFixed(1)} KB (${jsReduction}% reduction)`);

  // Update HTML to reference minified files
  let htmlPath = path.join(root, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/styles\.css\?v=\d+/, 'styles.min.css');
  html = html.replace(/main\.js\?v=\d+/, 'main.min.js');
  fs.writeFileSync(htmlPath, html);
  console.log('✅ HTML: updated references to minified files');

  console.log('\n🎉 Build complete!');
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
