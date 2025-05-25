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

// Þjóna HTML/CSS/JS úr public/
app.use(express.static('public'))

// API route: sækja brandara
app.get('/api/joke', async (req, res) => {
  const result = await pool.query('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1')
  res.json(result.rows[0])
})

// Starta servernum
app.listen(port, () => {
  console.log(`Server keyrir á http://localhost:${port}`)
})
