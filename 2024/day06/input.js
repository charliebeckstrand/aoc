import path from 'path'
import { readFileSync } from 'fs'

// Use `import.meta.url` for `__dirname` equivalent in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim()

export default input
