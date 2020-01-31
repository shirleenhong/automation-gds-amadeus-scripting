import { DDBService } from '../service/ddb.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CounselorDetail } from '../globals/counselor-identity';
import { PnrService } from '../service/pnr.service';

@Injectable({
  providedIn: 'root'
})
export class SplunkLogger {
  constructor(private counselorDetails: CounselorDetail, private pnrService: PnrService, private ddbService: DDBService) {}

  retry = 0;
  isTokenExpired = false;
  token = '';
  public logError(ex) {
    const log = this.getDefaultLogObj();
    log.set('Exception', ex.toString());

    this.ddbService.postSplunkLog(log, this.getAppName() + '_Script_Exception').then((x) => {
      console.log(x);
    });
  }

  getAppName() {
    return this.counselorDetails.isCorporate ? 'Corporate' : 'Leisure';
  }

  public logMethod(methodName) {
    const log = this.getDefaultLogObj();
    log.set('MethodName', methodName);
    this.ddbService.postSplunkLog(log, this.getAppName() + '_Script');
  }

  public logCryptic(methodName, cryptic) {
    const log = this.getDefaultLogObj();
    log.set('MethodName', methodName);
    log.set('Cryptic', cryptic);
    this.ddbService.postSplunkLog(log, this.getAppName() + '_Script');
  }

  private getDefaultLogObj(): Map<string, string> {
    const logObj = new Map<string, string>();
    logObj.set('DateTime', new Date().toUTCString());
    logObj.set('Environment', environment.env);
    logObj.set('CounselorIdentity', this.counselorDetails.getIdentity());
    logObj.set('RecordLocator', this.pnrService.recordLocator());
    logObj.set('AgentUID', this.pnrService.agentSign);
    logObj.set('OfficeId', this.pnrService.PCC);
    logObj.set('UID', this.pnrService.uid);
    logObj.set('AgentFirstName', this.pnrService.agentFirstName);
    logObj.set('AgentLastName', this.pnrService.agentLastName);
    logObj.set('ClientSubUnitGuid', this.pnrService.clientSubUnitGuid);
    logObj.set('Application', this.getAppName());
    return logObj;
  }
}
