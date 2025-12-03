import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const input = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim().split('\n')

export default input