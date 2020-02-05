import { Injectable, ErrorHandler } from '@angular/core';

import { SplunkLogger } from './splunk-logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(private splunkLogger: SplunkLogger) {}
  handleError(error: any): void {
    try {
      this.splunkLogger.logError(error);
    } catch (ex) {
      console.log(ex);
    }
    console.log(error);
  }
}
