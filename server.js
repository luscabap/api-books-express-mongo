import "dotenv/config";
import app from "./src/routes/app.js";

const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://localhost:${PORT}`);
});