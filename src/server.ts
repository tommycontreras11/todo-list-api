import app from "./app"
import config from "./config/"

app.listen(config.PORT, () => console.log(`The server is running on port ${config.PORT}`))