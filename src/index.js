import { web } from "./appilcation/web.js";
import { logger } from "./appilcation/logging.js";

web.listen(3000, () => {
  logger.info("App Start");
});
