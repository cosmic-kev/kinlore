delete process.env.ELECTRON_RUN_AS_NODE;
const { spawn } = require('child_process');
const path = require('path');
const bin = path.join('node_modules', '.bin', process.platform === 'win32' ? 'electron-builder.cmd' : 'electron-builder');
const child = spawn(bin, ['--win'], { stdio: 'inherit', env: process.env, shell: process.platform === 'win32' });
child.on('close', (code) => process.exit(code ?? 0));
