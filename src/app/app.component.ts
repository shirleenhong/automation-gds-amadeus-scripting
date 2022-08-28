import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CounselorDetail } from './globals/counselor-identity';
import { StaticValuesService } from './service/static-values.services';
// import { PnrService } from './service/pnr.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { HttpParams } from '@angular/common/http';
import { MatrixReportingComponent } from 'src/app/corporate/reporting/matrix-reporting/matrix-reporting.component';
// import { CfRemarkModel } from '../models/pnr/cf-remark.model';

// declare var smartScriptUtils: any;
declare var smartScriptSession: any;
declare var PNR: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'bpg-gds-scripting-amadeus';
    cfLine: null;
    isUSOID = false;
    clientSubUnitGuid: string;
    tstObj = [];
    uid = '';
    pnrObj: any;
    errorMessage = '';
    isCorporate = false;
    isMinimize = false;
    header = 'Leisure';
    activeOID = '';
    @Input()
    counselorIdentity: string;
    @ViewChild(MatrixReportingComponent) matrixReportingComponent: MatrixReportingComponent;

    identityList: Array<SelectItem> = null;

    constructor(
        private counselorDetail: CounselorDetail,
        private staticValues: StaticValuesService,
        // private pnrService: PnrService
    ) { }

    async getPNR(): Promise<void> {
        this.cfLine = null;
        this.clientSubUnitGuid = null;
        this.pnrObj = new PNR();
        await this.pnrObj
            .retrievePNR()
            .then(
                async (res) => {
                    console.log(res);
                    await this.getTST();
                },
                (error: string) => {
                    this.errorMessage = 'Error: ' + error;
                }
            )
            .catch((err) => {
                console.log(err);
            });
        await this.getPCC();
        console.log(JSON.stringify(this.pnrObj));
    }
    async getTST(): Promise<void> {
        this.tstObj = new Array<any>();
        const attributeDetails = {
            attributeType: 'ALL'
        };

        const displayMode = {
            attributeDetails
        };

        const displayElement = {
            displayMode
        };

        await smartScriptSession
            .requestService('ws.displayTST_v14.1', displayElement)
            .then(
                (tst) => {
                    if (tst.response.model.output.response) {
                        this.tstObj = tst.response.model.output.response.fareList;
                    }
                    this.errorMessage = 'TST Loaded Successfully';
                },
                (error: string) => {
                    this.errorMessage = 'Error: ' + error;
                }
            )
            .catch((err) => {
                console.log(err);
            });
        console.log(JSON.stringify(this.tstObj));
    }

    async getPCC() {
        let listOfOID = [
            { country: 'US', oid: 'MSPWL21GC' },
            { country: 'US', oid: 'MSPWL22GC' },
            { country: 'US', oid: 'MSPWL23GC' },
            { country: 'US', oid: 'STLWL21GC' },
            { country: 'US', oid: 'DFWWL21GC' },
            { country: 'US', oid: 'STLWL22GC' },
            { country: 'US', oid: 'ORDWL21GC' },
            { country: 'CA', oid: 'YOWWL21AC' },
            { country: 'CA', oid: 'YTOWL2101' },
            { country: 'CA', oid: 'YTOWL2102' },
            { country: 'CA', oid: 'YTOWL2103' },
            { country: 'CA', oid: 'YTOWL2104' },
            { country: 'CA', oid: 'YTOWL2105' },
            { country: 'CA', oid: 'YTOWL2106' },
            { country: 'CA', oid: 'YTOWL2107' }
        ];
        await smartScriptSession.requestService('usermanagement.retrieveUser').then((x) => {
            this.activeOID = x.ACTIVE_OFFICE_ID;
            this.uid = x.USER_ALIAS;
        });
        for (let index = 0; index < listOfOID.length; index++) {
            if (listOfOID[index].oid === this.activeOID) {
                if (listOfOID[index].country === 'US') {
                    this.header = 'US Corporate';
                }
                else {
                    this.header = 'CA Corporate';
                }
            }
        }
    }

    ngOnInit(): void {
        this.getPCC();
        this.isCorporate = this.getParamValueQueryString('corporate') === 'true';
        this.counselorDetail.setCorporate(this.isCorporate);
        if (this.isCorporate) {
            // this.header = 'Corporate';
            this.loadCounselorIdentityList();
        }
    }

    resize() {
        const width = 800;
        let height = 567;
        if (!this.isMinimize) {
            height = 32;
        }
        this.isMinimize = !this.isMinimize;

        smartScriptSession.resizeSmartTool({ id: smartScriptSession.getPopupId(), width, height }).then((x) => {
            console.log(JSON.stringify(x));
        });
    }

    loadCounselorIdentityList() {
        this.identityList = this.staticValues.getCounselorIdentityList();
    }

    onChangeIdentity() {
        this.counselorDetail.updateIdentity(this.counselorIdentity);
    }

    getParamValueQueryString(paramName) {
        const url = window.location.href;
        let paramValue;
        if (url.includes('?')) {
            const httpParams = new HttpParams({ fromString: url.split('?')[1] });
            paramValue = httpParams.get(paramName);
        }
        return paramValue;
    }
}
