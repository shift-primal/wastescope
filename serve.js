import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from './dist/server/server.js'

const PORT = process.env.PORT || 3000
const CLIENT_DIR = join(fileURLToPath(import.meta.url), '..', 'dist', 'client')

const MIME = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname

    if (pathname.startsWith('/assets/')) {
        try {
            const file = await readFile(join(CLIENT_DIR, pathname))
            res.writeHead(200, {
                'Content-Type': MIME[extname(pathname)] || 'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable',
            })
            res.end(file)
            return
        } catch {}
    }

    const chunks = []
    for await (const chunk of req) chunks.push(chunk)

    const response = await handler.fetch(
        new Request(`http://${req.headers.host}${req.url}`, {
            method: req.method,
            headers: new Headers(req.headers),
            body: chunks.length && !['GET', 'HEAD'].includes(req.method)
                ? Buffer.concat(chunks)
                : null,
        })
    )

    res.writeHead(response.status, Object.fromEntries(response.headers))
    res.end(Buffer.from(await response.arrayBuffer()))
}).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
