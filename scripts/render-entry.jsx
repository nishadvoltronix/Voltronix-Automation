import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import App from '../src/App';

export function renderPage(location) {
  return new Promise((resolve, reject) => {
    let html = '';
    let renderingError;
    const output = new Writable({ write(chunk, encoding, callback) { html += chunk.toString(); callback(); } });
    const timeout = setTimeout(() => { renderer.abort(); reject(new Error(`Rendering timed out: ${location}`)); }, 30000);
    output.on('error', reject);
    output.on('finish', () => { clearTimeout(timeout); renderingError ? reject(renderingError) : resolve(html); });
    const renderer = renderToPipeableStream(<StaticRouter location={location}><App /></StaticRouter>, {
      onAllReady() { renderer.pipe(output); },
      onError(error) { renderingError = error; },
      onShellError(error) { clearTimeout(timeout); reject(error); }
    });
  });
}
