import express from 'express'
import pg from 'pg'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.get('/api/joke', async (req, res) => {
  const result = await pool.query('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1')
  res.json(result.rows[0])
})

app.listen(port, () => {
  console.log(`Server keyrir á http://localhost:${port}`)
})
