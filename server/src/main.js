import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(8000, () => {
  logger.info("App start in http://localhost:8000");
});
