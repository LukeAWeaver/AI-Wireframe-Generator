import express from 'express'
import cors from 'cors'
import { analyzeFeature } from './services/ai'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/analyze', async (req, res) => {
  try {
    const { feature, complexity, priority } = req.body
    const analysis = await analyzeFeature({ feature, complexity, priority })
    res.json({ analysis })
  } catch (error) {
    console.error('Error analyzing feature:', error)
    res.status(500).json({ error: 'Failed to analyze feature' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
}) 