import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string)
    console.log('database connection established')
    app.listen(config.port, () => {
      console.log(`project listening on port ${config.port as string}`)
    })
  } catch (error) {
    console.log('database connection failed', error)
  }
}

main()
