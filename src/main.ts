import "reflect-metadata";
import { Container, injectable, inject } from "inversify";

enum providers {
    LOGGER = "LOGGER",
    APP_SERVICE = "APP_SERVICE"
}

// Define a service
@injectable()
class Logger {
  log(message: string) {
    console.log(message);
  }
}

// Another service that depends on Logger
@injectable()
class AppService {
  constructor(@inject(providers.LOGGER) private logger: Logger) {}

  run() {
    this.logger.log('App is running');
  }
}

// Create a DI container and register services
const container = new Container();
// container.load(); /* to import modules */
container.bind(providers.LOGGER).to(Logger);
container.bind(providers.APP_SERVICE).to(AppService);

const appService: AppService = container.get(providers.APP_SERVICE);
appService.run();
