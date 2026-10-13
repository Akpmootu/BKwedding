/**
 * ==============================================================================
 * LOCAL DEV SERVER (ZERO-DEPENDENCY)
 * ==============================================================================
 * รันด้วยคำสั่ง: npm run dev หรือ node server.js
 * - ไม่ต้องติดตั้งไลบรารีภายนอก (ใช้ Core Node.js Modules 100%)
 * - รองรับ Audio HTTP 206 Partial Content (Streaming mp3 บนมือถือได้ลื่นไหล)
 * - แสดงทั้ง Local URL และ Network IP สำหรับทดสอบบนมือถือผ่าน Wi-Fi เดียวกัน
 * - เปิดเบราว์เซอร์ให้อัตโนมัติ
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ics': 'text/calendar; charset=utf-8'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address);
      }
    }
  }
  return addresses;
}

const server = http.createServer((req, res) => {
  // CORS & No-Cache for dev server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL & Query params
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(ROOT_DIR, safePath);

  // Check file existence
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqUrl}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle HTTP Range Requests for Audio/Video (.mp3 seeking & streaming)
    const range = req.headers.range;
    if (range && (ext === '.mp3' || ext === '.mp4')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });

      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
      return;
    }

    // Normal streaming
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddresses();
  const localUrl = `http://localhost:${PORT}/?to=คุณสมชาย`;

  console.log('\n🌸 ========================================================');
  console.log('   E-Wedding Card Dev Server is Running!');
  console.log('   The Wedding of Beau & Kim (#BeauKimEverAfter)');
  console.log('========================================================\n');
  console.log(`   💻 Local:   http://localhost:${PORT}/`);
  console.log(`   💌 With To: ${localUrl}`);

  if (localIps.length > 0) {
    console.log('\n   📱 เปิดบนมือถือผ่าน Wi-Fi เดียวกัน:');
    localIps.forEach(ip => {
      console.log(`      http://${ip}:${PORT}/`);
    });
  }

  console.log('\n   กด Ctrl+C เพื่อหยุดการทำงานของเซิร์ฟเวอร์\n');

  // Auto open browser on Windows
  const startCmd = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
  exec(`${startCmd} ${localUrl}`);
});
