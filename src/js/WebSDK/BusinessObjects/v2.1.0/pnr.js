/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
    "SSR_ELEMENT_CODES": {
        "SEAT_CODES": ["NSST", "SMST", "RQST", "NSSA", "SMSA", "NSSB", "SMSB", "NSSW", "SMSW", "ADST", "CBBG", "EXST", "GPST"],
        "SSR": "SSR",
        "FOID": "FOID",
        "PSPT": "PSPT",
        "FQTR": "FQTR",
        "FQTS": "FQTS",
        "FQTV": "FQTV",
        "FQTU": "FQTU",
        "SEAT": "SEAT",
        "OTHER": "SSROTHER"
    },
    "CANCEL_PNR_ELEMENT": {
        "WS_API": "cancelPNR",
        "INPUT_JSON": '{"-xmlns": "http://xml.amadeus.com/PNRXCL_14_1_1A","pnrActions": {"optionCode": "<option_code>"},"cancelElements": {"entryType": "<type_cancel_entry>","element": []}}',
        "ERROR_WS_CALL": "Error deleting elements from PNR",
        "DEFAULT_OPTIONS": {
            "optionCode": 0,
            "typeCancelEntry": "E",
            "refreshPNRObject": true
        }
    },
    "ADD_PNR_ELEMENT": {
        "WS_API": "ws.addMultiElement_v14.1",
        "INPUT_JSON": '{"-xmlns":"http://webservices.amadeus.com/PNR_AddMultiElements","pnrActions":{"optionCode":"<option_code>"},"travellerInfo": [], "originDestinationDetails": [], "dataElementsMaster":{"marker1":"","dataElementsIndiv":[]}}',
        "ERROR_WS_CALL": "Error adding elements to PNR",
        "ELEMENT_WISE_JSON" : {
            "GENERAL_REMARK": '{"elementManagementData":{"segmentName":"RM"},"extendedRemark":{"structuredRemark":{"type":"RM","category":"","freetext":""}},"referenceForDataElement":{"reference":[]}}'
        },
        "DEFAULT_OPTIONS": {
            "optionCode": 0,
            "refreshPNRObject": true
        }
    },
    "RETRIEVE_PNR": {
        "WS_API": "ws.retrievePNR_v14.1",
        "ERROR_WS_CALL": "ERROR RETRIEVING PNR"
    },
    //Listed in the **alphabetical order of their command names**
    "MAILING_ADDRESS": "AM",
    "MAILING_ADDRESS_CODE_DISTRIBUTED_ADDRESS": "AM/",
    "BILLING_ADDRESS": "AB",
    "BILLING_ADDRESS_CODE_DISTRIBUTED_ADDRESS": "AB/",
    "ACCOUNTING_AI": "AI",
    "AIR": "AIR",
    "ALL_AIR": "ALL_AIR",
    "PHONE": "AP",
    "ARNK": "ARNK",
    "AUX_CAR": "CU",
    "CAR": "CCR",
    "CAR_RATE_GUARANTEE": "RG",
    "FARE_AUTO_TICKET": "FA",
    "FARE_DISCOUNT": "FD",
    "FARE_ENDO": "FE",
    "FARE_MANUALAUTOTKT": "FH",
    "FARE_MANUALAUTOTKT_AUTOMATED_TICKET": "FHA",
    "FARE_MANUALAUTOTKT_ELECTRONIC_TICKET": "FHE",
    "FARE_MANUALAUTOTKT_ELECTRONIC_MISCELLANEOUS_DOCUMENT_TICKET": "FHD",
    "FARE_MANUALAUTOTKT_MANUAL_TICKET": "FHM",
    "FARE_MANUALAUTOTKT_MISCELLANOUS_DOCUMENT_WITHOUT_EMD_TICKET": "FHP",
    "FARE_AUTO_INVOICE": "FI",
    "AIR_FLWN": "FLWN",
    "FARE_COMMISSION": "FM",
    "FARE_ORIGINAL_ISSUE": "FO",
    "FARE_FORM_PAYMENT": "FP",
    "FARE_MISC_TKT_INFO": "FS",
    "FARE_TOUR_CODE": "FT",
    "TICKETING_AIRLINE": "FV",
    "HEADER": "HEADER",
    "HOTEL": "HHL",
    "AUX_HOTEL": "HU",
    "TRAVEL_ASSISTANCE": "INS",
    "MANUAL_AUXILLARY_SERVICE": "IU",
    "GROUP_NAME": "NG",
    "NAME": "NM",
    "OPTION_QUEUE": "OP",
    "AIR_OPEN": "OPEN",
    "OTHER_SERVICE": "OS",
    "CONFIDENTIAL_REMARK": "RC",
    "RIS": "RIS",
    "RECEIVE_FROM": "RF",
    "REMARK": "RM",
    "RIA": "RIA",
    "RIB": "RIB",
    "RIC": "RIC",
    "RID": "RID",
    "RIF": "RIF",
    "RII": "RII",
    "RIM": "RIM",
    "RIO": "RIO",
    "RIP": "RIP",
    "RIR": "RIR",
    "RIT": "RIT",
    "RIZ": "RIZ",
    "MISC": "RU",
    "SPECIAL_INFORMATION_SERVICE": "SK",
    "TICKET": "TK",
    "TRAIN": "TRN",
    "CONNECTING_FLIGHT_GROUPING_CODE": "CNX",
    //Other Constants
    "INFANT_INDICATOR": "INF",
    "GROUP_NAME_BOOKED_UNIT_QUALIFIER": "BKD",
    "GET_REQUEST_API_CALL_RETREIVE_ACTIVE_PNR": '{"retrievalFacts": {"retrieve": {"type": 1}}}',
    "GET_REQUEST_API_CALL_RETREIVE_SPECIFIC_PNR": '{"retrievalFacts":{"retrieve":{"type":2},"reservationOrProfileIdentifier":{"reservation":{"controlNumber":"<recordLocator>"}}}}',
    "WS_RETRIEVE_PNR_API": "ws.retrievePNR_v14.1",
    "DEFAULT_ERROR_MESSAGE": "ERROR",
    'ERROR_WS_CALL' : 'ERROR RETRIEVING PNR',
    'ERROR_INVALID_RESPONSE' : 'INVALID RESPONSE RECEIVED',
    'SERVER_EVENT_ERROR':'genericerror'
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(2);
var Association = (function () {
    /**
     * Represents Association which will be made of a LineNumber/tatooNumber and a type (PAX/SEG).
     *
     * @constructs Association
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements Unic number in the PNR
     * @property {string} segmentType segmentType for this Segment: PT or ST or OT
     */
    function Association() {
        this.tatooNumber = '';
        this.segmentType = '';
    }
    return Association;
})();

module.exports = (function () {
    /**
     * Represents AssociationBuilder.
     *
     * @private
     * @constructs AssociationBuilder
     */
    function AssociationBuilder() {

    }

    /**
     * Get Array of Association Objects
     *
     * @private
     * @memberof AssociationBuilder
     * @instance
     * @param {Object} references of the element from PNR Response
     * @returns {Array.<Association>} Array of Association Objects
     */
    AssociationBuilder.prototype.getAssociations = function (references) {
        var associations = [];
        var referencesArray = new Utils().ifObjectConvertItIntoArray(references);
        for (var i = 0; i < referencesArray.length; i++) {
            associations.push(createAssociationobj(referencesArray[i]));
        }
        return associations;
    };

    /**
     * Creates Associationobj
     *
     * @private
     * @memberof AssociationBuilder
     * @inner
     * @param {Object} reference Object from PNR response
     * @returns {Association} Association Obj after setting Tatoo Number and segmentType
     */
    function createAssociationobj(reference) {
        var associationsObj = new Association();
        associationsObj.segmentType = reference.qualifier;
        associationsObj.tatooNumber = reference.number;
        return associationsObj;
    };

    return AssociationBuilder;

})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = (function () {
    /**
     * Represents Utils.
     *
     * @constructs Utils
     */
    function Utils() {

    }
    /**
     * Converts the parameter into an Array of one object if given anything other than an object, and returns an empty array if receiving an undefined value.
     * So, it essentially normalize the argument type by returning an Array in all cases.
     * @private
     * @param {Object|Array} objectOrArray content to normalize as an array
     * @returns {Array}
     */
    Utils.prototype.ifObjectConvertItIntoArray = function (objectOrArray) {
        var array = [];
        if (Array.isArray(objectOrArray)) {
            array = objectOrArray;
        } else {
            array.push(objectOrArray);
        }
        return array;
    };
    return Utils;
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @file Loads all required JS scripts and constructs PNR Object
 * @license
 * Copyright 2014 - Amadeus Development Company S.A.
 * Copyright of this program is the property of AMADEUS,
 * without whose written permission reproduction in whole
 * or in part is prohibited. All rights reserved.
 * Amadeus S.A. B.P. 69 06902 SOPHIA ANTIPOLIS CEDEX
 * http://www.amadeus.com
 */

var PNRJSONMapperBuilder = __webpack_require__(38);
var PNRObjectBuilder = __webpack_require__(39);
var CONSTANTS = __webpack_require__(0);
var Utils = __webpack_require__(2);
module.exports = PNR = (function () {

    var pnrObjectBuilder;

    /**
     * Represents a PNR.
     *
     * @constructs PNR
     * @property {List.<ABElement>} abElements List of ABElements present in the PNR
     * @property {List.<AIElement>} aiElements List of AIElements present in the PNR
     * @property {List.<AirARNKSegment>} airARNKSegments List of AirARNKSegments present in the PNR
     * @property {List.<AirFlownSegment>} airFlownSegments List of AirFlownSegments present in the PNR
     * @property {List.<AirOpenSegment>} airOpenSegments List of AirOpenSegments present in the PNR
     * @property {List.<AirSegment>} airSegments List of AirSegments present in the PNR
     * @property {List.<AllAirSegment>} allAirSegments List of AllAirSegments present in the PNR
     * @property {List.<AMElement>} amElements List of AMElements present in the PNR
     * @property {List.<APElement>} apElements List of APElements present in the PNR
     * @property {List.<AuxCarSegment>} auxCarSegments List of AuxCarSegments present in the PNR
     * @property {List.<AuxHotelSegment>} auxHotelSegments List of AuxHotelSegments present in the PNR
     * @property {List.<CarSegment>} carSegments List of CarSegments present in the PNR
     * @property {List.<FAElement>} faElements List of FAElements present in the PNR
     * @property {List.<FDElement>} fdElements List of FDElements present in the PNR
     * @property {List.<FEElement>} feElements List of FEElements present in the PNR
     * @property {List.<FHElement>} fhElements List of FHElements present in the PNR
     * @property {List.<FIElement>} fiElements List of FIElements present in the PNR
     * @property {List.<FMElement>} fmElements List of FMElements present in the PNR
     * @property {List.<FOElement>} foElements List of FOElements present in the PNR
     * @property {List.<FPElement>} fpElements List of FPElements present in the PNR
     * @property {List.<FSElement>} fsElements List of FSElements present in the PNR
     * @property {List.<FTElement>} ftElements List of FTElements present in the PNR
     * @property {List.<FVElement>} fvElements List of FVElements present in the PNR
     * @property {GroupNameElement} groupNameElement GroupNameElement Object if present in the PNR
     * @property {Header} header Header Object present in the PNR
     * @property {List.<HotelSegment>} hotelSegments List of HotelSegments present in the PNR
     * @property {List.<INSSegment>} insSegments List of INSSegments present in the PNR
     * @property {List.<MiscSegment>} miscSegments List of MiscSegments present in the PNR
     * @property {List.<NameElement>} nameElements List of NameElements present in the PNR
     * @property {List.<OPElement>} opElements List of OPElements present in the PNR
     * @property {List.<OSIElement>} osiElements List of OSIElements present in the PNR
     * @property {ReceiveFromElement} receiveFromElement ReceiveFromElement Object if present in the PNR
     * @property {List.<RCElement>} rcElements List of RCElements present in the PNR
     * @property {List.<RIElement>} riaElements #RIA List of RIAElements present in the PNR
     * @property {List.<RIElement>} ribElements #RIB List of RIBElements present in the PNR
     * @property {List.<RIElement>} ricElements #RIC List of RICElements present in the PNR
     * @property {List.<RIElement>} ridElements #RID List of RIDElements present in the PNR
     * @property {List.<RIElement>} rifElements #RIF List of RIFElements present in the PNR
     * @property {List.<RIElement>} riiElements #RII List of RIIElements present in the PNR
     * @property {List.<RIElement>} rimElements #RIM List of RIMElements present in the PNR
     * @property {List.<RIElement>} rioElements #RIO List of RIOElements present in the PNR
     * @property {List.<RIElement>} ripElements #RIP List of RIPElements present in the PNR
     * @property {List.<RIElement>} rirElements #RIR List of RIRElements present in the PNR
     * @property {List.<RIElement>} risElements #RIS List of RISElements present in the PNR
     * @property {List.<RIElement>} ritElements #RIT List of RITElements present in the PNR
     * @property {List.<RIElement>} rizElements #RIZ List of RIZElements present in the PNR
     * @property {List.<RMElement>} rmElements List of RMElements present in the PNR
     * @property {List.<List.<SSRElement>>} ssrElements List Containing Lists of SSRElements present in the PNR
     * @property {List.<SSRElement>} ssrFOIDElements List of SSRFOIDElements present in the PNR
     * @property {List.<SSRElement>} ssrFQTRElements List of SSRFQTRElements present in the PNR
     * @property {List.<SSRElement>} ssrFQTSElements List of SSRFQTSElements present in the PNR
     * @property {List.<SSRElement>} ssrFQTUElements List of SSRFQTUElements present in the PNR
     * @property {List.<SSRElement>} ssrFQTVElements List of SSRFQTVElements present in the PNR
     * @property {List.<SSRElement>} ssrOthers List of SSROtherElements present in the PNR
     * @property {List.<SSRElement>} ssrSeats List of SSRSeatElements present in the PNR
     * @property {List.<TKElement>} tkElements List of TKElements present in the PNR
     * @property {List.<TrainSegment>} trainSegments List of TrainSegments present in the PNR
     * @property {Object} fullNode Complete Full PNR WebService Response in JSON Format.
     * @property {string} error If any error occured during the retrieval of PNR, then this value stores the error message.
     */
    function PNR() {
        this.abElements = [];
        this.aiElements = [];
        this.airARNKSegments = [];
        this.airFlownSegments = [];
        this.airOpenSegments = [];
        this.airSegments = [];
        this.allAirSegments = [];
        this.amElements = [];
        this.apElements = [];
        this.auxCarSegments = [];
        this.auxHotelSegments = [];
        this.carSegments = [];
        this.faElements = [];
        this.fdElements = [];
        this.feElements = [];
        this.fhElements = [];
        this.fiElements = [];
        this.fmElements = [];
        this.foElements = [];
        this.fpElements = [];
        this.fsElements = [];
        this.ftElements = [];
        this.fvElements = [];
        this.hotelSegments = [];
        this.insSegments = [];
        this.miscSegments = [];
        this.nameElements = [];
        this.opElements = [];
        this.osiElements = [];
        this.rcElements = [];
        this.riaElements = [];
        this.ribElements = [];
        this.ricElements = [];
        this.ridElements = [];
        this.rifElements = [];
        this.riiElements = [];
        this.rimElements = [];
        this.rioElements = [];
        this.ripElements = [];
        this.rirElements = [];
        this.risElements = [];
        this.ritElements = [];
        this.rizElements = [];
        this.rmElements = [];
        this.ssrElements = [];
        this.ssrFOIDElements = [];
        this.ssrFQTRElements = [];
        this.ssrFQTSElements = [];
        this.ssrFQTUElements = [];
        this.ssrFQTVElements = [];
        this.ssrSeats = [];
        this.ssrOthers = [];
        this.tkElements = [];
        this.trainSegments = [];
        this.addPTQueue = [];
        this.addSTQueue = [];
        this.addOTQueue = [];
        this.cancelElementsQueue = [];
        this.fullNode = null;
        this.groupNameElement = null;
        this.connexions = null;
        this.header = null;
        this.receiveFromElement = null;
        this.error = "";
    }
    var SmartScriptPromise = function() {
        this.fulfill = function() {};
        this.reject = function() {};
    };
    SmartScriptPromise.prototype.getPromise = function() {
        var self = this;
        return new Promise(function (fulfill, reject) {
            self.fulfill = fulfill;
            self.reject = reject;
        });
    };
    /**
    check if a given property is defined in an object, but also all the path given along the way
    @private
    @param {Object} obj an object in which we want to test if a certain property is defined
    @param {string} path the path we want to check for definition (standard dot '.' separated properties)
    @returns {boolean} return true if there is a defined value at the given path in the object
    */
    function isDeepDefined(obj, path) {
        var returnValue = true;
        var aPath = path.split('.');
        var definedObj = obj;
        for (var i = 0; i < aPath.length; i++) {
            if (typeof definedObj[aPath[i]] === 'undefined') {
                returnValue = false;
                break;
            }
            definedObj = definedObj[aPath[i]];
        }
        return returnValue;
    };

    /**
     * Checks for error in PNR web service response.
     *
     * @private
     * @memberOf PNR
     * @inner
     * @returns {boolean} boolean value 'true' if response has error or 'false' if there is no error
     */
    function checkError(self) {
        var isError = false;
        if (isDeepDefined(self.fullNode, 'response.model')) {
            var model = self.fullNode.response.model;
            if (typeof model.serverEvent !== 'undefined' && model.serverEvent === CONSTANTS.SERVER_EVENT_ERROR) {
                self.error = model.serverEvent;
                isError = true;
            } else if (isDeepDefined(model, 'output.response')) {
                var response = model.output.response;
                if (typeof response.MessagesOnly_Reply !== 'undefined') {
                    self.error = isDeepDefined(response, 'MessagesOnly_Reply.CAPI_Messages.Text') ? response.MessagesOnly_Reply.CAPI_Messages.Text : CONSTANTS.DEFAULT_ERROR_MESSAGE;
                    isError = true;
                }
            } else {
                //no serverEvent but undefined response
                self.error = CONSTANTS.ERROR_INVALID_RESPONSE;
                isError = true;
            }
        } else {
            // badly formed response
            self.error = CONSTANTS.ERROR_INVALID_RESPONSE;
            isError = true;
        }
        return isError;
    }

    /**
     * Parses PNR webservice response.
     *
     * @private
     * @memberOf PNR
     * @inner
     */
    var parsePNRResponse = function (self) {
        var serviceCallback = new SmartScriptPromise();
        var promise = serviceCallback.getPromise();
        var errorCheckResponse = checkError(self);
        // If there is an error at this stage, don't parse
        if (errorCheckResponse === true) {
            self.error = self.error.length > 0 ? self.error : CONSTANTS.DEFAULT_ERROR_MESSAGE;
            serviceCallback.reject(self.error);
            return promise;
        } else {
            return mapProperties(self);
        }
    };

    /**
     * Clears all the data set to the all the properties of the PNR Object
     *
     * @private
     * @param {Object.<PNR>} self PNR Object passed to clear all it's properties
     */
    var clearAllProperties = function (self) {
        self.abElements = [];
        self.aiElements = [];
        self.airARNKSegments = [];
        self.airFlownSegments = [];
        self.airOpenSegments = [];
        self.airSegments = [];
        self.allAirSegments = [];
        self.amElements = [];
        self.apElements = [];
        self.auxCarSegments = [];
        self.auxHotelSegments = [];
        self.carSegments = [];
        self.faElements = [];
        self.fdElements = [];
        self.feElements = [];
        self.fhElements = [];
        self.fiElements = [];
        self.fmElements = [];
        self.foElements = [];
        self.fpElements = [];
        self.fsElements = [];
        self.ftElements = [];
        self.fvElements = [];
        self.hotelSegments = [];
        self.insSegments = [];
        self.miscSegments = [];
        self.nameElements = [];
        self.opElements = [];
        self.osiElements = [];
        self.rcElements = [];
        self.riaElements = [];
        self.ribElements = [];
        self.ricElements = [];
        self.ridElements = [];
        self.rifElements = [];
        self.riiElements = [];
        self.rimElements = [];
        self.rioElements = [];
        self.ripElements = [];
        self.rirElements = [];
        self.risElements = [];
        self.ritElements = [];
        self.rizElements = [];
        self.rmElements = [];
        self.ssrElements = [];
        self.ssrFOIDElements = [];
        self.ssrFQTRElements = [];
        self.ssrFQTSElements = [];
        self.ssrFQTUElements = [];
        self.ssrFQTVElements = [];
        self.ssrSeats = [];
        self.ssrOthers = [];
        self.tkElements = [];
        self.trainSegments = [];
        self.addPTQueue = [];
        self.addSTQueue = [];
        self.addOTQueue = [];
        self.cancelElementsQueue = [];
        self.fullNode = null;
        self.groupNameElement = null;
        self.connexions = null;
        self.header = null;
        self.receiveFromElement = null;
        self.error = "";
    };
    /**
     * Retrieve all PNR properties.
     *
     * @memberof PNR
     * @instance
     * @param {string} recordLocator - record locator
     * @returns {Promise<Object>} Promise will set all properties of PNR object on fulfillment
     */
    PNR.prototype.retrievePNR = function (recordLocator) {
        /**
         * The below statement makes sure, the values are reset to default values. If we don't write this statement,
         * the code would fail when some script calls retreivePNR from the second time onwards, because the pnrObj's
         * properties would already contain the values which were set to them earlier during first call.
         */
        clearAllProperties(this);

        var self = this;
        //Calling the BackEnd WebService API to retreive the JSON of this particular PNR.
        var retrieveJSONCommand;
        // When recordLocator which is passed as imput is either null(i.e. not passed at all) or empty string
        if ((!recordLocator) || recordLocator.length === 0) {
            retrieveJSONCommand = CONSTANTS.GET_REQUEST_API_CALL_RETREIVE_ACTIVE_PNR;
        }
        //when some string is passed as recordLocator (may or maynot be a valid PNR recordLocator)
        else {
            retrieveJSONCommand = CONSTANTS.GET_REQUEST_API_CALL_RETREIVE_SPECIFIC_PNR.replace("<recordLocator>", recordLocator);
        }
        var getAPIcall = JSON.parse(retrieveJSONCommand);
        return callWebservice(true, "RETRIEVE_PNR", getAPIcall, self);
    };
    /**
     * Clears PT Queue.
     *
     * @memberof PNR
     * @instance
     */
    PNR.prototype.clearPT = function () {
        this.addPTQueue = [];
    };
    /**
     * Clears ST Queue.
     *
     * @memberof PNR
     * @instance
     */
    PNR.prototype.clearST = function () {
        this.addSTQueue = [];
    };
    /**
     * Clears OT Queue.
     *
     * @memberof PNR
     * @instance
     */
    PNR.prototype.clearOT = function () {
        this.addOTQueue = [];
    };
    /**
     * Clears cancelElementsQueue.
     * @memberof PNR
     * @instance
     */
    PNR.prototype.clearCancel = function () {
        this.cancelElementsQueue = [];
    };
    /**
     * Pushes name element to Queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} elementJson - JSON containing name element
     */
    PNR.prototype.addPT = function (elementJson) {
        addToQueue("addPTQueue", elementJson, this);
    };
    /**
     * Pushes segment element to Queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} elementJson - JSON containing segment element
     */
    PNR.prototype.addST = function (elementJson) {
        addToQueue("addSTQueue", elementJson, this);
    };
    /**
     * Pushes other element to Queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} elementJson - JSON containing other element
     */
    PNR.prototype.addOT = function (elementJson) {
        addToQueue("addOTQueue", elementJson, this);
    };

    /**
     * Pushes cancel element to Queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} elementJson - JSON containing other element
     */
    PNR.prototype.addCancel = function (elementJson) {
        var elements = new Utils().ifObjectConvertItIntoArray(elementJson);
        var inputs = [];
        for (var i = 0; i < elements.length; i++) {
            if (typeof elements[i].tatooNumber !== 'undefined' && typeof elements[i].segmentType !== 'undefined' ) {
                inputs.push({ "identifier" : elements[i].segmentType, "number" : elements[i].tatooNumber });
            }
        }
        addToQueue("cancelElementsQueue", inputs, this);
    };

    /**
     * Pushes element to desired Queue
     *
     * @memberof PNR
     * @instance
     * @param {string} queueName - Name of the desired queue to add element
     * @param {Object} elementJson - JSON containing other element
     */
    function addToQueue(queueName, elementJson, self){
        elementArray =  new Utils().ifObjectConvertItIntoArray(elementJson);
        self[queueName] = self[queueName].concat(elementArray);
    }

    /**
     * Pushes remark element to Queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} elementJson - JSON containing other element
     */
    PNR.prototype.addRemark = function (elementJson) {
        this.addOTQueue = this.addOTQueue.concat((new Utils().ifObjectConvertItIntoArray(elementJson)).map(function(rm) { return formatRMElement(rm); }));
    };
    /**
     * Sends the request to add elements present in the queues
     *
     * @memberof PNR
     * @instance
     * @param {Object} options - request modifiers like optionCode and refreshPNRObject
     */
    PNR.prototype.sendAddElements = function (options) {
        var self = this;
        var requestModifiers = buildRequestModifiers(options, "ADD");
        wsInput = buildWsInputs(requestModifiers, "ADD", self);
        return callWebservice(requestModifiers.refreshPNRObject, "ADD_PNR_ELEMENT", wsInput, self);
    };
    /**
     * Sends the request to cancel elements present in the cancel queue
     *
     * @memberof PNR
     * @instance
     * @param {Object} options - request modifiers like optionCode and refreshPNRObject
     */
    PNR.prototype.sendCancelElements = function (options) {
        var self = this;
        var requestModifiers = buildRequestModifiers(options, "CANCEL");
        wsInput = buildWsInputs(requestModifiers, "CANCEL", self);
        return callWebservice(requestModifiers.refreshPNRObject, "CANCEL_PNR_ELEMENT", wsInput, self);
    };
    /**
     * buildRequestModifiers
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {Object} options user input
     * @param {string} operation to be performed
     * @returns {Object} requestModifiers user input ? user input : default options
     */
    function buildRequestModifiers(options, operation){
        var requestModifiers = {};
        var defaultOptions = CONSTANTS[operation + "_PNR_ELEMENT"].DEFAULT_OPTIONS;
        var requestModifiers = smartScriptUtils.simpleCopy(defaultOptions);
        if (typeof options === 'object') {
            smartScriptUtils.overrideProperties(requestModifiers, options, {'strictType' : true});
        }
        return requestModifiers;
    }
    /**
     * buildWsInputs
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {Object} requestModifiers for the web service request
     * @param {string} operation to be performed
     * @returns {Object} input object with requestmodiers set
     */
    function buildWsInputs(requestModifiers, operation, self){
        var input = JSON.parse(CONSTANTS[operation + "_PNR_ELEMENT"].INPUT_JSON);
        input = addElementsToInput(input, operation, self);
        input.pnrActions.optionCode = String(requestModifiers.optionCode);
        if(operation.toUpperCase() === "CANCEL"){
            input.cancelElements.entryType = String(requestModifiers.typeCancelEntry);
        }
        return input;
    }
    /**
     * callWebservice
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {boolean} doRefreshPNRObject option representing whether to refresh the PNR on success
     * @param {string} serviceName Name of the service to be called
     * @param {Object} wsInput The input object to be sent in the reques
     * @returns {Promise<Object>} Promise will set all properties of PNR object on fulfillment if doRerfreshPNRObject is true otherwise
     * returns the webservice response.
     */
    function callWebservice(doRefreshPNRObject, serviceName, wsInput, self){
        if (doRefreshPNRObject) {
            var serviceCallback = new SmartScriptPromise();
            var promise = serviceCallback.getPromise();
            clearAllProperties(self);
            return smartScriptSession.sendWS(CONSTANTS[serviceName].WS_API, wsInput).then(function(data) {
                self.fullNode = data;
                if(serviceName.toUpperCase() === "CANCEL_PNR_ELEMENT"){
                    var result = {
                        "response": {
                            "model": {
                                "output": {
                                    "response" : {
                                    }
                                }
                            }
                        }
                    };
                    result.response.model.output.response = isDeepDefined(data, "response.model.output.response.PNR_Reply") ? data.response.model.output.response.PNR_Reply : data.response.model.output.response;
                    self.fullNode = result;
                }
                return parsePNRResponse(self);
            }, function(errResponse) {
                var response = errResponse || CONSTANTS[serviceName].ERROR_WS_CALL;
                serviceCallback.reject(response);
            });
        } else {
            return smartScriptSession.sendWS(CONSTANTS[serviceName].WS_API, wsInput);
        }
    }
    /**
     * addElementsToInput
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {Object} input the input object for web service call in making
     * @param {string} operation the operation being performed
     * @returns {Object} input An input object for the we service call
     */
    function addElementsToInput(input, operation, self){
        if(operation.toUpperCase() === "ADD"){
            input.travellerInfo = self.addPTQueue;
            input.originDestinationDetails = self.addSTQueue;
            input.dataElementsMaster.dataElementsIndiv = self.addOTQueue;
        }else if(operation.toUpperCase() === "CANCEL"){
            input.cancelElements.element = self.cancelElementsQueue;
        }
        return input;
    }

    /**
     * formatRMElement
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {Object} elementJson rmElement input by the user
     * @returns {Object} An object formatted for adding a general remark
     */
    function formatRMElement(elementJson){
        var rmElement = JSON.parse(CONSTANTS.ADD_PNR_ELEMENT.ELEMENT_WISE_JSON.GENERAL_REMARK);
        if(elementJson.freeFlowText){
            rmElement.extendedRemark.structuredRemark.freetext = elementJson.freeFlowText;
        }
        if(elementJson.segmentName){
            rmElement.elementManagementData.segmentName = String(elementJson.segmentName);
        }
        if(elementJson.remarkType){
            rmElement.extendedRemark.structuredRemark.type = String(elementJson.remarkType);
        }
        if(elementJson.category){
            rmElement.extendedRemark.structuredRemark.category = elementJson.category;
        }else {
            delete rmElement.extendedRemark.structuredRemark.category;
        }
        if(elementJson.associations && elementJson.associations.length > 0){
            rmElement.referenceForDataElement.reference = parseAssociations("ADD", elementJson.associations);
        }else {
            delete rmElement.referenceForDataElement;
        }
        return rmElement;
    }
    /**
     * parseAssociations
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {List.<Association>} association array to be formatted
     * @returns {Array} Formatted association array for the specified type of operation
     */
    function parseAssociations (associationArray){
        var associationArrayLength = associationArray.length;
        var formattedAssociationsArray = [];
        for(var j = 0; j < associationArrayLength; j++){
            var formattedAssociation = {};
            formattedAssociation.qualifier= associationArray[j].segmentType;
            formattedAssociation.number= associationArray[j].tatooNumber;
            formattedAssociationsArray.push(formattedAssociation);
        }
        return formattedAssociationsArray;
    }

    /**
     * mapProperties
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {PNR<Object>} self PNR Object
     */
    function mapProperties(self) {
        var serviceCallback = new SmartScriptPromise();
        var promise = serviceCallback.getPromise();
        var jsonElementsMap = new PNRJSONMapperBuilder().getJsonElementsMap(self.fullNode).jsonElementsMap;
        pnrObjectBuilder = new PNRObjectBuilder(jsonElementsMap);
        setJSONDataToProperties(self);
        serviceCallback.fulfill(self.fullNode);
        return promise;
    }

    /**
     * Safely encapsulate the call to the passed method in a "try" statement to prevent an error in the parsing of one element type from blocking the entire process
     * by default, returns an empty Array [] if an error is encountered, but this can be overridden by the optional argument ifErrorReturn
     * @private
     * @memberOf PNRsss
     * @param {string} getMethod the name of the "get" method to encapsulate and call. It is a method of PNRObjectBuilder class.
     * @param {object} ifErrorReturn optional : the value to return if an error is caught during the execution of getMethod
     * @returns {Array} by default if no exception arises.
     */
    function safeGet(getMethod, ifErrorReturn) {
        try {
            return pnrObjectBuilder[getMethod]();
        } catch (error) {
            console.error("Error " + error.name + ", message : " + error.message);
            if (typeof (pnrObjectBuilder[getMethod]()) === 'function') {
                console.error("\tTrying to call : " + getMethod);
            }
            if (typeof (ifErrorReturn) === 'undefined') {
                return [];
            } else {
                return ifErrorReturn;
            }
        }
    }

    /**
     * Sets the properties to all Elements/Segments of the PNR.
     *
     * @private
     * @memberOf PNR
     * @inner
     * @param {Object} self PNR Object.
     */
    function setJSONDataToProperties(self) {
        self.abElements = safeGet("getABElements");
        self.aiElements = safeGet("getAIElements");
        self.airARNKSegments = safeGet("getAirARNKSegments");
        self.airFlownSegments = safeGet("getAirFlownSegments");
        self.airOpenSegments = safeGet("getAirOpenSegments");
        self.airSegments = safeGet("getAirSegments");
        self.allAirSegments = safeGet("getAllAirSegments");
        self.amElements = safeGet("getAMElements");
        self.apElements = safeGet("getAPElements");
        self.auxCarSegments = safeGet("getAuxCarSegments");
        self.auxHotelSegments = safeGet("getAuxHotelSegments");
        self.carSegments = safeGet("getCarSegments");
        self.connexions = safeGet("getConnexionElements");
        self.faElements = safeGet("getFAElements");
        self.fdElements = safeGet("getFDElements");
        self.feElements = safeGet("getFEElements");
        self.fhElements = safeGet("getFHElements");
        self.fiElements = safeGet("getFIElements");
        self.fmElements = safeGet("getFMElements");
        self.foElements = safeGet("getFOElements");
        self.fpElements = safeGet("getFPElements");
        self.fsElements = safeGet("getFSElements");
        self.ftElements = safeGet("getFTElements");
        self.fvElements = safeGet("getFVElements");
        self.groupNameElement = safeGet("getGroupNameElement", null);
        self.header = safeGet("getHeader", null);
        self.hotelSegments = safeGet("getHotelSegments");
        self.insSegments = safeGet("getINSSegments");
        self.miscSegments = safeGet("getMISCSegments");
        self.nameElements = safeGet("getNameElements");
        self.opElements = safeGet("getOPElements");
        self.osiElements = safeGet("getOSIElements");
        self.rcElements = safeGet("getRCElements");
        self.receiveFromElement = safeGet("getReceiveFromElement", null);
        var riElements = safeGet("getRIElements");
        self.riaElements = riElements.riaElements;
        self.ribElements = riElements.ribElements;
        self.ricElements = riElements.ricElements;
        self.ridElements = riElements.ridElements;
        self.rifElements = riElements.rifElements;
        self.riiElements = riElements.riiElements;
        self.rimElements = riElements.rimElements;
        self.rioElements = riElements.rioElements;
        self.ripElements = riElements.ripElements;
        self.rirElements = riElements.rirElements;
        self.risElements = riElements.risElements;
        self.ritElements = riElements.ritElements;
        self.rizElements = riElements.rizElements;
        self.rmElements = safeGet("getRMElements");
        var objSSRElements = safeGet("getSSRElements");
        self.ssrFOIDElements = objSSRElements.FOIDElements;
        self.ssrFQTRElements = objSSRElements.FQTRElements;
        self.ssrFQTSElements = objSSRElements.FQTSElements;
        self.ssrFQTUElements = objSSRElements.FQTUElements;
        self.ssrFQTVElements = objSSRElements.FQTVElements;
        self.ssrSeats = objSSRElements.SeatElements;
        self.ssrOthers = objSSRElements.OtherElements;
        self.ssrElements = objSSRElements.orderedSSRArr;
        self.tkElements = safeGet("getTKElements");
        self.trainSegments = safeGet("getTrainSegments");
    };

    return PNR;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var ABElement = (function () {
    /**
     * Represents ABElement.
     *
     * @constructs ABElement BillingAddress Element
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} numberOfLines number Of Lines of the address in the cryptic face
     * @property {string} addressData actual adress typed in by the user
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function ABElement() {
        this.elementNumber = "";
        this.numberOfLines = "";
        this.addressData = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.associations = null;
        this.fullNode = null;
    }
    return ABElement;
})();

module.exports = (function () {
    /**
     * Represents ABElementBuilder.
     *
     * @private
     * @constructs ABElementBuilder. Builder to build the list of ABElements.
     */
    function ABElementBuilder() {}

    /**
     * Builds the list of ABElements by setting the values from the input parameter pnrJSONMap.
     *
     * @private
     * @memberof ABElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<ABElement>} Array of ABElement objects
     */
    ABElementBuilder.prototype.parseABElements = function (pnrJSONMap) {
        var abJSONElements = pnrJSONMap.get(CONSTANTS.BILLING_ADDRESS);
        var abElements = [];
        //loop through each dataElementsIndiv
        for (var index = 0; index < abJSONElements.length; index++) {
            var objABElement = new ABElement();
            objABElement.elementNumber = abJSONElements[index].elementManagementData.lineNumber;
            objABElement.fullNode = abJSONElements[index];
            objABElement.segmentType = abJSONElements[index].elementManagementData.reference.qualifier;
            objABElement.tatooNumber = abJSONElements[index].elementManagementData.reference.number;
            objABElement.associations = abJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(abJSONElements[index].referenceForDataElement.reference) : null;
            getAddressData(objABElement, abJSONElements[index]);
            /**
             * Sample data which matches the regex :
             * objABElement.addressData = "A1-12 LONG STREET,ZP-BS7890/CI-NEWTOWN/CO-US"
             * numberOfcommas matched = 1. Therefore, numberOfLines = 2.
             */
            var numberOfcommas = (objABElement.addressData.match(/,/g) || []).length;
            objABElement.numberOfLines = numberOfcommas + 1;
            abElements.push(objABElement);
        }
        return abElements;
    };
    /**
     * Gets addressData by handling two scenarios
     *
     * @private
     * @internal function
     * @param  {Object} objABElement
     * @param  {Object} JSONObject elementJSONObject
     */
    function getAddressData(objABElement, elementJSONObject) {
        //Scenario 1 : SegmentName = "AB/"
        if (elementJSONObject.structuredAddress && elementJSONObject.structuredAddress.address) {
            var addressArray = new Utils().ifObjectConvertItIntoArray(elementJSONObject.structuredAddress.address);
            var addressIDList = [];
            for (var i = 0; i < addressArray.length; i++) {
                addressIDList.push(addressArray[i].option + "-" + addressArray[i].optionText);
            }
            objABElement.addressData = addressIDList.join("/");
        }
        //Scenario2 : SegmentName = "AB"
        var otherDataFreetext = elementJSONObject.otherDataFreetext;
        if (otherDataFreetext != null) {
            var longFreetext = otherDataFreetext.longFreetext;
            if (longFreetext != null) {
                objABElement.addressData = longFreetext;
            }
        }
    }
    return ABElementBuilder;
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AIElement = (function () {
    /**
     * Represents AIElement.
     *
     * @constructs AIElement
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function AIElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }

    return AIElement;
})();

module.exports = (function () {
    /**
     * Represents AIElementBuilder.
     *
     * @private
     * @constructs AIElementBuilder
     */
    function AIElementBuilder() {}
    /**
     * Parse PNR response to get AIElements
     *
     * @private
     * @memberof AIElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AIElement>} Array of AIElement objects
     */
    AIElementBuilder.prototype.parseAIElements = function (pnrJSONMap) {
        var aiJSONElements = pnrJSONMap.get(CONSTANTS.ACCOUNTING_AI);
        var aiElements = [];
        for (var index = 0; index < aiJSONElements.length; index++) {
            var objAIElement = new AIElement();
            objAIElement.elementNumber = aiJSONElements[index].elementManagementData.lineNumber;
            objAIElement.fullNode = aiJSONElements[index];
            objAIElement.tatooNumber = aiJSONElements[index].elementManagementData.reference.number;
            objAIElement.segmentType = aiJSONElements[index].elementManagementData.reference.qualifier;
            objAIElement.associations = aiJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(aiJSONElements[index].referenceForDataElement.reference) : null;
            aiElements.push(objAIElement);
        }
        return aiElements;
    };
    return AIElementBuilder;
})();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AirARNKSegment = (function () {
    /**
     * Represents ARNKSegment.
     *
     * @constructs ARNKSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} departureDate departureDate
     * @property {Object} fullNode The Complete JSON Object of this particular segment
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    function AirARNKSegment() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.departureDate = "";
        this.fullNode = null;
        this.associations = null;
    }

    return AirARNKSegment;
})();

module.exports = (function () {
    /**
     * Represents AirARNKSegmentBuilder.
     *
     * @private
     * @constructs AirARNKSegmentBuilder
     */
    function AirARNKSegmentBuilder() {}

    /**
     * Parses PNR response to get AirARNKSegments
     *
     * @private
     * @memberof AirARNKSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AirARNKSegment>} Array of AirARNKSegment objects
     */
    AirARNKSegmentBuilder.prototype.parseAirARNKSegments = function (pnrJSONMap) {
        var arnkJSONElements = pnrJSONMap.get(CONSTANTS.ARNK);
        var arnkElements = [];
        for (var index = 0; index < arnkJSONElements.length; index += 1) {
            var objAir = new AirARNKSegment();
            objAir.elementNumber = arnkJSONElements[index].elementManagementItinerary.lineNumber;
            if (arnkJSONElements[index].travelProduct.product !== undefined) {
                objAir.departureDate = arnkJSONElements[index].travelProduct.product.depDate;
            }
            objAir.tatooNumber = arnkJSONElements[index].elementManagementItinerary.reference.number;
            objAir.fullNode = arnkJSONElements[index];
            objAir.segmentType = arnkJSONElements[index].elementManagementItinerary.reference.qualifier;
            objAir.associations = arnkJSONElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(arnkJSONElements[index].referenceForSegment.reference) : null;
            arnkElements[index] = objAir;
        }
        return arnkElements;
    };

    return AirARNKSegmentBuilder;
})();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AirFlownSegment = (function () {
    /**
     * Represents AirFlownSegment.
     *
     * @constructs AirFlownSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} departureDate Departure Date of the AirSegment
     * @property {string} class Class of the seat booked
     * @property {string} departureAirport departureAirport City Code
     * @property {string} arrivalAirport arrivalAirport City Code
     * @property {string} airlineCode airlineCode of the airLine
     * @property {string} flightNumber flightNumber of the airLine
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode The Complete JSON Object of this particular segment
     */
    function AirFlownSegment() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.departureDate = "";
        this.flightNumber = "";
        this.airlineCode = "";
        this.class = "";
        this.departureAirport = "";
        this.arrivalAirport = "";
        this.associations = null;
        this.fullNode = null;
    }

    return AirFlownSegment;
})();

module.exports = (function () {
    /**
     * Represents AirFlownSegmentBuilder.
     *
     * @private
     * @constructs AirFlownSegmentBuilder
     */
    function AirFlownSegmentBuilder() {}

    /**
     * Parses PNR response to get AirARNKSegments
     *
     * @private
     * @memberof AirFlownSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AirFlownSegment>} Array of AirFlownSegment objects
     */
    AirFlownSegmentBuilder.prototype.parseAirFlownSegments = function (pnrJSONMap) {
        var airFlownSegmentsJTokenElements = pnrJSONMap.get(CONSTANTS.AIR_FLWN);
        var airFlownSegmentsList = [];
        for (var index = 0; index < airFlownSegmentsJTokenElements.length; index++) {
            var objAirFlownSegment = new AirFlownSegment();
            objAirFlownSegment.elementNumber = airFlownSegmentsJTokenElements[index].elementManagementItinerary.lineNumber;
            objAirFlownSegment.tatooNumber = airFlownSegmentsJTokenElements[index].elementManagementItinerary.reference.number;
            objAirFlownSegment.segmentType = airFlownSegmentsJTokenElements[index].elementManagementItinerary.reference.qualifier;
            objAirFlownSegment.associations = airFlownSegmentsJTokenElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(airFlownSegmentsJTokenElements[index].referenceForSegment.reference) : null;
            if (airFlownSegmentsJTokenElements[index].travelProduct) {
                objAirFlownSegment.airlineCode = airFlownSegmentsJTokenElements[index].travelProduct.companyDetail ? airFlownSegmentsJTokenElements[index].travelProduct.companyDetail.identification : "";
                if (airFlownSegmentsJTokenElements[index].travelProduct.productDetails) {
                    objAirFlownSegment.flightNumber = airFlownSegmentsJTokenElements[index].travelProduct.productDetails.identification;
                    objAirFlownSegment.class = airFlownSegmentsJTokenElements[index].travelProduct.productDetails.classOfService;
                }
                objAirFlownSegment.departureDate = airFlownSegmentsJTokenElements[index].travelProduct.product ? airFlownSegmentsJTokenElements[index].travelProduct.product.depDate : "";
                objAirFlownSegment.departureAirport = airFlownSegmentsJTokenElements[index].travelProduct.boardpointDetail ? airFlownSegmentsJTokenElements[index].travelProduct.boardpointDetail.cityCode : "";
                objAirFlownSegment.arrivalAirport = airFlownSegmentsJTokenElements[index].travelProduct.offpointDetail ? airFlownSegmentsJTokenElements[index].travelProduct.offpointDetail.cityCode : "";
            }
            objAirFlownSegment.fullNode = airFlownSegmentsJTokenElements[index];
            // We add the air Segment to the collection
            airFlownSegmentsList.push(objAirFlownSegment);
        }
        return airFlownSegmentsList;
    };

    return AirFlownSegmentBuilder;
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AirOpenSegment = (function () {
    /**
     * Represents AirOpenSegment.
     *
     * @constructs AirOpenSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} departureDate departureDate
     * @property {string} departureAirport departureAirport city code
     * @property {string} arrivalAirport arrivalAirport city code
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} airlineCode airLineCode of the Segment
     * @property {string} class class of the seat that were booked
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    function AirOpenSegment() {
        this.elementNumber = "";
        this.departureDate = "";
        this.departureAirport = "";
        this.arrivalAirport = "";
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
        this.airlineCode = "";
        this.class = "";
        this.associations = null;
    }
    return AirOpenSegment;
})();


module.exports = (function () {
    /**
     * Represents AirOpenSegmentBuilder.
     *
     * @private
     * @constructs AirOpenSegmentBuilder
     */
    function AirOpenSegmentBuilder() {}

    /**
     * Parsing AirOpenSegment.
     *
     * @private
     * @memberof AirOpenSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AirOpenSegment>} Array of AirOpenSegment objects
     */
    AirOpenSegmentBuilder.prototype.parseAirOpenSegments = function (pnrJSONMap) {
        var airOpenSegmentsJTokenElements = pnrJSONMap.get(CONSTANTS.AIR_OPEN);
        var airOpenSegmentsList = [];
        for (var index = 0; index < airOpenSegmentsJTokenElements.length; index++) {
            var objAirOpenSegment = new AirOpenSegment();
            objAirOpenSegment.elementNumber = airOpenSegmentsJTokenElements[index].elementManagementItinerary.lineNumber;
            var travelProduct = airOpenSegmentsJTokenElements[index].travelProduct;
            if (travelProduct) {
                objAirOpenSegment.departureDate = (travelProduct.product) ? travelProduct.product.depDate : "";
                objAirOpenSegment.departureAirport = travelProduct.boardpointDetail ? travelProduct.boardpointDetail.cityCode : "";
                objAirOpenSegment.arrivalAirport = travelProduct.offpointDetail ? travelProduct.offpointDetail.cityCode : "";
                objAirOpenSegment.airlineCode = travelProduct.companyDetail.identification;
                objAirOpenSegment.class = travelProduct.productDetails.classOfService;
            }
            objAirOpenSegment.tatooNumber = airOpenSegmentsJTokenElements[index].elementManagementItinerary.reference.number;
            objAirOpenSegment.segmentType = airOpenSegmentsJTokenElements[index].elementManagementItinerary.reference.qualifier;
            objAirOpenSegment.associations = airOpenSegmentsJTokenElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(airOpenSegmentsJTokenElements[index].referenceForSegment.reference) : null;
            objAirOpenSegment.fullNode = airOpenSegmentsJTokenElements[index];
            // We add the Open air Segment to the collection
            airOpenSegmentsList.push(objAirOpenSegment);
        }
        return airOpenSegmentsList;
    };

    return AirOpenSegmentBuilder;
})();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var AirSegment = (function () {
    /**
     * Represents AirSegment.
     *
     * @constructs AirSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} bookedQuantity Number of passengers booked for that particular AirSegment
     * @property {string} airlineReference Represents the PNR record Locator associated with the air segment. It is usually the same PNR record locator but when an NHP PNR is created, the PNR will split on the basis of it's airsegments creating new PNR record locators, then the airlineReference will again be associated with their respective new PNR record locator numbers.
     * @property {string} airlineCode Represents the airline code of that respective airsegment
     * @property {string} flightNumber Represents the flight number of that respective airsegment
     * @property {string} class Represents the class of the seat booked in that respective airsegment
     * @property {string} departureAirport Arrival Airport City Code
     * @property {string} arrivalAirport Departure Airport City Code
     * @property {string} departureTime Departure Time
     * @property {string} departureDate Departure Date
     * @property {string} arrivalTime Arrival Time
     * @property {string} arrivalDate Arrival Date
     * @property {string} status Represents the status code of the segment whether it is open, arnk, flown or still active
     * @property {Array.<string>} additionalInformation This is related to all information that could be requested by sending a specific command such as 'SEE RTSVC'
     * @property {Object} fullNode JSON Object containing the complete information about this Segment
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function AirSegment() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.bookedQuantity = "";
        this.airlineReference = "";
        this.airlineCode = "";
        this.flightNumber = "";
        this.class = "";
        this.departureAirport = "";
        this.arrivalAirport = "";
        this.departureTime = "";
        this.departureDate = "";
        this.arrivalTime = "";
        this.arrivalDate = "";
        this.status = "";
        this.additionalInformation = [];
        this.associations = null;
        this.fullNode = null;
    }

    return AirSegment;
})();

module.exports = (function () {
    /**
     * Represents AirSegmentBuilder.
     *
     * @private
     * @constructs AirSegmentBuilder
     */
    function AirSegmentBuilder() {}
    /**
     * Parses PNR repsponse to get AirSegments
     *
     * @private
     * @memberof AirSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AirSegment>} Array of AirSegment objects
     */
    AirSegmentBuilder.prototype.parseAirSegments = function (pnrJSONMap) {
        var airSegmentsJTokenElements = pnrJSONMap.get(CONSTANTS.AIR);
        var airSegmentsList = [];
        // The following variables will be used everytime in loop. As they will never be pushed into any list, they can be declared outisde.
        var product, travelProduct, productDetails, relatedProduct;
        for (var index = 0; index < airSegmentsJTokenElements.length; index++) {
            var airSegment = new AirSegment();
            // Here a new object of airsegment is created instead of defining airSegment outside for loop,
            // as if we define outside and push it in list, it will push the object by reference and not by value.
            airSegment.elementNumber = airSegmentsJTokenElements[index].elementManagementItinerary.lineNumber;
            airSegment.tatooNumber = airSegmentsJTokenElements[index].elementManagementItinerary.reference.number;
            airSegment.segmentType = airSegmentsJTokenElements[index].elementManagementItinerary.reference.qualifier;
            travelProduct = airSegmentsJTokenElements[index].travelProduct;
            if (travelProduct) {
                productDetails = travelProduct.productDetails;
                if (productDetails) {
                    airSegment.flightNumber = productDetails.identification;
                    airSegment.class = productDetails.classOfService;
                }
                product = travelProduct.product;
                if (product) {
                    airSegment.departureDate = product.depDate ? product.depDate : "";
                    airSegment.arrivalDate = product.arrDate ? product.arrDate : "";
                    airSegment.departureTime = product.depTime ? product.depTime : "";
                    airSegment.arrivalTime = product.arrTime ? product.arrTime : "";
                }
                airSegment.arrivalAirport = travelProduct.offpointDetail ? travelProduct.offpointDetail.cityCode : "";
                airSegment.airlineCode = travelProduct.companyDetail ? travelProduct.companyDetail.identification : "";
                airSegment.departureAirport = travelProduct.boardpointDetail ? travelProduct.boardpointDetail.cityCode : "";
            }
            airSegment.associations = airSegmentsJTokenElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(airSegmentsJTokenElements[index].referenceForSegment.reference) : null;
            if (airSegmentsJTokenElements[index].itineraryfreeFormText) {
                airSegment.additionalInformation  = new Utils().ifObjectConvertItIntoArray(airSegmentsJTokenElements[index].itineraryfreeFormText.freeText);
            }
            airSegment.airlineReference = airSegmentsJTokenElements[index].itineraryReservationInfo ? airSegmentsJTokenElements[index].itineraryReservationInfo.reservation.controlNumber : null;
            relatedProduct = airSegmentsJTokenElements[index].relatedProduct;
            if (relatedProduct) {
                airSegment.status = relatedProduct.status;
                airSegment.bookedQuantity = relatedProduct.quantity ? relatedProduct.quantity : "0";
            }
            airSegment.fullNode = airSegmentsJTokenElements[index];
            airSegmentsList.push(airSegment);
        }
        return airSegmentsList;
    };

    return AirSegmentBuilder;
})();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AllAirSegment = (function () {
    /**
     * Represents AllAirSegment.
     *
     * @constructs AllAirSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} airSegmentType Type of airsegment. Ex : ARNK, OPEN, etc
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {Object} fullNode JSON Object containing the complete information about this Segment
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     */
    function AllAirSegment() {
        this.elementNumber = "";
        this.airSegmentType = "";
        this.associations = null;
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
    }

    return AllAirSegment;
})();

module.exports = (function () {
    /**
     * Represents AllAirSegmentBuilder.
     *
     * @private
     * @constructs AllAirSegmentBuilder
     */
    function AllAirSegmentBuilder() {}
    /**
     * Parses PNR repsponse to get AllAirSegments
     *
     * @private
     * @memberof AllAirSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AllAirSegment>} Array of AllAirSegment objects
     */
    AllAirSegmentBuilder.prototype.parseAllAirSegments = function (pnrJSONMap) {
        var allAirSegmentsJTokenElements = pnrJSONMap.get(CONSTANTS.ALL_AIR);
        var allAirSegmentsList = [];
        for (var index = 0; index < allAirSegmentsJTokenElements.length; index++) {
            var allAirSegment = new AllAirSegment();
            allAirSegment.elementNumber = allAirSegmentsJTokenElements[index].elementManagementItinerary.lineNumber;
            allAirSegment.tatooNumber = allAirSegmentsJTokenElements[index].elementManagementItinerary.reference.number;
            allAirSegment.segmentType = allAirSegmentsJTokenElements[index].elementManagementItinerary.reference.qualifier;
            if (allAirSegmentsJTokenElements[index].travelProduct && allAirSegmentsJTokenElements[index].travelProduct.productDetails) {
                var identification = allAirSegmentsJTokenElements[index].travelProduct.productDetails.identification;
                if (identification === CONSTANTS.ARNK) {
                    allAirSegment.airSegmentType = CONSTANTS.ARNK;
                } else if (identification === CONSTANTS.AIR_OPEN) {
                    allAirSegment.airSegmentType = CONSTANTS.AIR_OPEN;
                } else {
                    allAirSegment.airSegmentType = CONSTANTS.AIR;
                }
            }
            allAirSegment.associations = allAirSegmentsJTokenElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(allAirSegmentsJTokenElements[index].referenceForSegment.reference) : null;
            allAirSegment.fullNode = allAirSegmentsJTokenElements[index];
            allAirSegmentsList.push(allAirSegment);
        }
        return allAirSegmentsList;
    };

    return AllAirSegmentBuilder;
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var AMElement = (function () {
    /**
     * Represents AMElement.
     *
     * @constructs AMElement
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} numberOfLines number Of Lines of the address in the cryptic face
     * @property {string} addressData actual adress typed in by the user
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function AMElement() {
        this.elementNumber = "";
        this.numberOfLines = "";
        this.addressData = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.associations = null;
        this.fullNode = null;
    }
    return AMElement;
})();

module.exports = (function () {
    /**
     * Represents AMElementBuilder.
     *
     * @constructs AMElementBuilder
     */
    function AMElementBuilder() {}

    /**
     * Builds the list of AMElements by setting the values from the input parameter pnrJSONMap.
     *
     * @memberof AMElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AMElement>} Array of AMElement objects
     */
    AMElementBuilder.prototype.parseAMElements = function (pnrJSONMap) {
        var amJSONElements = pnrJSONMap.get(CONSTANTS.MAILING_ADDRESS);
        var amElements = [];
        for (var index = 0; index < amJSONElements.length; index++) {
            var objAMElement = new AMElement();
            objAMElement.elementNumber = amJSONElements[index].elementManagementData.lineNumber;
            objAMElement.fullNode = amJSONElements[index];
            objAMElement.tatooNumber = amJSONElements[index].elementManagementData.reference.number;
            objAMElement.segmentType = amJSONElements[index].elementManagementData.reference.qualifier;
            objAMElement.associations = amJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(amJSONElements[index].referenceForDataElement.reference) : null;
            getAddressData(objAMElement, amJSONElements[index]);
            /**
             * Sample data which matches the regex :
             * objABElement.addressData = "A1-12 LONG STREET,ZP-BS7890/CI-NEWTOWN/CO-US"
             * numberOfcommas matched = 1. Therefore, numberOfLines = 2.
             */
            var numberOfcommas = (objAMElement.addressData.match(/,/g) || []).length;
            objAMElement.numberOfLines = numberOfcommas + 1;
            amElements.push(objAMElement);
        }
        return amElements;
    };

    /**
     * Gets addressData by handling two scenarios
     *
     * @private
     * @internal function
     * @param  {Object} objAMElement AMElement Object
     * @param  {Object} elementJSONObject element's JSONObject
     */
    function getAddressData(objAMElement, elementJSONObject) {
        //Scenario 1 : SegmentName = "AM/"
        if (elementJSONObject.structuredAddress && elementJSONObject.structuredAddress.address) {
            var addressArray = new Utils().ifObjectConvertItIntoArray(elementJSONObject.structuredAddress.address);
            var addressIDList = [];
            for (var i = 0; i < addressArray.length; i++) {
                addressIDList.push(addressArray[i].option + "-" + addressArray[i].optionText);
            }
            objAMElement.addressData = addressIDList.join("/");
        }
        //Scenario2 : SegmentName = "AM"
        var otherDataFreetext = elementJSONObject.otherDataFreetext;
        if (otherDataFreetext != null) {
            var longFreetext = otherDataFreetext.longFreetext;
            if (longFreetext != null) {
                objAMElement.addressData = longFreetext;
            }
        }
    }
    return AMElementBuilder;
})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var APElement = (function () {
    /**
     * Represents APElement.
     *
     * @constructs APElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} typeCode code to identify the type of the contact element.
     * @property {Object} fullNode JSON Object containing the complete information about this element
     * @property {string} type type of Contact Element. i.e. Phone, Fax, House, Email, etc.
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function APElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.typeCode = "";
        this.fullNode = null;
        this.type = "";
        this.freeFlowText = "";
        this.associations = null;
    }

    return APElement;
})();

module.exports = (function () {
    /**
     * Represents APElementBuilder.
     *
     * @private
     * @constructs APElementBuilder
     */
    function APElementBuilder() {}
    /**
     * Sets Type, TypeCode and FreeFlowText for a given APElement
     *
     * @private Private @memberof APElementBuilder
     * @param{Object} apElementsJTokenElement
     * @param{Object.<APElement>} objAPElement
     */
    function setTypeTypeCodeandFreeFlowText(apElementsJTokenElement, objAPElement) {
        objAPElement.typeCode = apElementsJTokenElement.otherDataFreetext.freetextDetail.type;
        switch (objAPElement.typeCode) {
            case "3":
                objAPElement.type = "B";
                break;
            case "4":
                objAPElement.type = "H";
                break;
            case "5":
                objAPElement.type = "";
                break;
            case "6":
                objAPElement.type = "A";
                break;
            case "7":
                objAPElement.type = "M";
                break;
            case "P01":
                objAPElement.type = "F";
                break;
            case "P02":
                objAPElement.type = "E";
                break;
            default:
                objAPElement.type = "";
        }
        objAPElement.freeFlowText = apElementsJTokenElement.otherDataFreetext.longFreetext;
    }

    /**
     * Parsing APElement.
     *
     * @private
     * @memberof APElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<APElement>} apElementsList
     */
    APElementBuilder.prototype.parseAPElements = function (pnrJSONMap) {
        var apElementsJTokenElements = pnrJSONMap.get(CONSTANTS.PHONE);
        var apElementsList = [];
        for (var i = 0; i < apElementsJTokenElements.length; i++) {
            var objAPElement = new APElement();
            objAPElement.elementNumber = apElementsJTokenElements[i].elementManagementData.lineNumber;
            objAPElement.tatooNumber = apElementsJTokenElements[i].elementManagementData.reference.number;
            objAPElement.segmentType = apElementsJTokenElements[i].elementManagementData.reference.qualifier;
            objAPElement.fullNode = apElementsJTokenElements[i];
            setTypeTypeCodeandFreeFlowText(apElementsJTokenElements[i], objAPElement);
            objAPElement.associations = apElementsJTokenElements[i].referenceForDataElement  ? new AssociationBuilder().getAssociations(apElementsJTokenElements[i].referenceForDataElement.reference) : null;
            apElementsList.push(objAPElement);
        }
        return apElementsList;
    };

    return APElementBuilder;
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AuxCarSegment = (function () {
    /**
     * Represents AuxCarSegment.
     *
     * @constructs AuxCarSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Array.<Association>} associations  Passenger and Segment Associations
     * @property {Object} fullNode JSON Object associated with this segment
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     */
    function AuxCarSegment() {
        this.elementNumber = "";
        this.associations = null;
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
    }

    return AuxCarSegment;
})();

module.exports = (function () {
    /**
     * Represents AuxCarSegmentBuilder.
     *
     * @private
     * @constructs AuxCarSegmentBuilder
     */
    function AuxCarSegmentBuilder() {}

    /**
     * Parses PNR response and gets AuxCarSegments
     *
     * @private
     * @memberof AuxCarSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AuxCarSegment>} Array of AuxCarSegment objects
     */
    AuxCarSegmentBuilder.prototype.parseAuxCarSegments = function (pnrJSONMap) {
        var auxCarElements = [];
        var auxCarJSONElements = pnrJSONMap.get(CONSTANTS.AUX_CAR);
        if (auxCarJSONElements != null) {
            for (var index = 0; index < auxCarJSONElements.length; index++) {
                var objAuxCarSegment = new AuxCarSegment();
                objAuxCarSegment.elementNumber = auxCarJSONElements[index].elementManagementItinerary.lineNumber;
                objAuxCarSegment.tatooNumber = auxCarJSONElements[index].elementManagementItinerary.reference.number;
                objAuxCarSegment.segmentType = auxCarJSONElements[index].elementManagementItinerary.reference.qualifier;
                objAuxCarSegment.associations = auxCarJSONElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(auxCarJSONElements[index].referenceForSegment.reference) : null;
                objAuxCarSegment.fullNode = auxCarJSONElements[index];
                auxCarElements.push(objAuxCarSegment);
            }
        }
        return auxCarElements;
    };


    return AuxCarSegmentBuilder;
})();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var AuxHotelSegment = (function () {
    /**
     * Represents AuxHotelSegment.
     *
     * @constructs AuxHotelSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Segment
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     */
    function AuxHotelSegment() {
        this.elementNumber = "";
        this.associations = null;
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
    }
    return AuxHotelSegment;
})();

module.exports = (function () {
    /**
     * Represents AuxHotelSegmentBuilder.
     *
     * @private
     * @constructs AuxHotelSegmentBuilder
     */
    function AuxHotelSegmentBuilder() {}

    /**
     * Parsing AuxHotelSegment.
     *
     * @private
     * @memberof AuxHotelSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<AuxHotelSegment>} Array of AuxHotelSegment objects
     */
    AuxHotelSegmentBuilder.prototype.parseAuxHotelSegments = function (pnrJSONMap) {
        var auxHotelElements = [];
        var auxHotelJSONElements = pnrJSONMap.get(CONSTANTS.AUX_HOTEL);
        for (var i = 0; i < auxHotelJSONElements.length; i++) {
            var objHotel = new AuxHotelSegment();
            objHotel.elementNumber = auxHotelJSONElements[i].elementManagementItinerary.lineNumber;
            objHotel.tatooNumber = auxHotelJSONElements[i].elementManagementItinerary.reference.number;
            objHotel.segmentType = auxHotelJSONElements[i].elementManagementItinerary.reference.qualifier;
            objHotel.fullNode = auxHotelJSONElements[i];
            objHotel.associations = auxHotelJSONElements[i].referenceForSegment ? new AssociationBuilder().getAssociations(auxHotelJSONElements[i].referenceForSegment.reference) : null;
            auxHotelElements.push(objHotel);
        }
        return auxHotelElements;
    };


    return AuxHotelSegmentBuilder;
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var CarSegment = (function () {
    /**
     * Represents CarSegment.
     *
     * @constructs CarSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Array.<string>} carType Type of the Car
     * @property {Array.<string>} carModel Model of the Car
     * @property {string} carCompanyCode Code of the Car Company
     * @property {string} carCompanyName Name of the Car Company
     * @property {string} confirmationNumber Confirmation Number
     * @property {string} dropoffDate DropOffDate
     * @property {string} pickupDate PickUpDate
     * @property {string} dropoffTime DropOffTime
     * @property {string} pickupTime PickUpTime
     * @property {string} location The location from where the car will be picked up
     * @property {string} guarantee Represents the guarantee used for the car booking
     * @property {string} rateCodeInfo Represents the rate code
     * @property {string} status Represents the status of the car booking
     * @property {string} quantity Represents the number of parties for that booking
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function CarSegment() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.carType = [];
        this.carModel = [];
        this.carCompanyCode = "";
        this.carCompanyName = "";
        this.confirmationNumber = "";
        this.dropoffDate = "";
        this.pickupDate = "";
        this.dropoffTime = "";
        this.pickupTime = "";
        this.location = "";
        this.guarantee = "";
        this.rateCodeInfo = "";
        this.status = "";
        this.quantity = "";
        this.associations = null;
        this.fullNode = null;
    }
    return CarSegment;
})();

module.exports = (function () {
    /**
     * Represents CarSegmentBuilder.
     *
     * @private
     * @constructs CarSegmentBuilder
     */
    function CarSegmentBuilder() {}

    /**
     * Parses PNR response to get CarSegments
     *
     * @private
     * @memberof CarSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<CarSegment>} Array of CarSegment objects
     */
    CarSegmentBuilder.prototype.parseCarSegments = function (pnrJSONMap) {
        var carSegments = [];
        var carSegmentJSONElements = pnrJSONMap.get(CONSTANTS.CAR);
        //loop through each car segment
        for (var index = 0; index < carSegmentJSONElements.length; index++) {
            var objCarSegment = new CarSegment();
            if (carSegmentJSONElements[index].elementManagementItinerary) {
                objCarSegment.tatooNumber = carSegmentJSONElements[index].elementManagementItinerary.reference.number;
                objCarSegment.segmentType = carSegmentJSONElements[index].elementManagementItinerary.reference.qualifier;
                objCarSegment.elementNumber = carSegmentJSONElements[index].elementManagementItinerary.lineNumber;
                objCarSegment.associations = carSegmentJSONElements[index].referenceForSegment  ? new AssociationBuilder().getAssociations(carSegmentJSONElements[index].referenceForSegment.reference) : null;
            }
            var typicalCarData = carSegmentJSONElements[index].typicalCarData;
            if (typicalCarData) {
                getCarTypeAndModel(typicalCarData.vehicleInformation, objCarSegment);
                if (typicalCarData.companyIdentification) {
                    objCarSegment.carCompanyCode = typicalCarData.companyIdentification.companyCode;
                    objCarSegment.carCompanyName = typicalCarData.companyIdentification.companyName;
                }
                if (typicalCarData.pickupDropoffTimes) {
                    if (typicalCarData.pickupDropoffTimes.beginDateTime) {
                        objCarSegment.pickupTime = typicalCarData.pickupDropoffTimes.beginDateTime.hour + ":" + typicalCarData.pickupDropoffTimes.beginDateTime.minutes;
                    }
                    if (typicalCarData.pickupDropoffTimes.endDateTime) {
                        objCarSegment.dropoffTime = typicalCarData.pickupDropoffTimes.endDateTime.hour + ":" + typicalCarData.pickupDropoffTimes.endDateTime.minutes;
                    }
                }
                objCarSegment.confirmationNumber = typicalCarData.cancelOrConfirmNbr.reservation ? typicalCarData.cancelOrConfirmNbr.reservation.controlNumber : null;
                objCarSegment.rateCodeInfo = typicalCarData.rateCodeGroup ? (typicalCarData.rateCodeGroup.rateCodeInfo ? (typicalCarData.rateCodeGroup.rateCodeInfo.fareCategories ? typicalCarData.rateCodeGroup.rateCodeInfo.fareCategories.fareType : null) : null) : null;
                objCarSegment.guarantee = rateGuarantee(typicalCarData.rateInfo);
            }
            var travelProduct = carSegmentJSONElements[index].travelProduct;
            if (travelProduct) {
                objCarSegment.location = travelProduct.boardpointDetail ? travelProduct.boardpointDetail.cityCode : null;
                if (travelProduct.product) {
                    objCarSegment.pickupDate = carSegmentJSONElements[index].travelProduct.product.depDate;
                    objCarSegment.dropoffDate = carSegmentJSONElements[index].travelProduct.product.arrDate;
                }
            }
            if (carSegmentJSONElements[index].relatedProduct) {
                objCarSegment.status = carSegmentJSONElements[index].relatedProduct.status;
                objCarSegment.quantity = carSegmentJSONElements[index].relatedProduct.quantity;
            }
            objCarSegment.fullNode = carSegmentJSONElements[index];

            carSegments.push(objCarSegment);
        }
        return carSegments;
    };

    /**
     * Caluclates guarantee property and returns it's value
     *
     * @private @memberOf CarSegmentBuilder
     * @param {Object} rateInfo
     * @returns {string} rateValue
     */
    function rateGuarantee(rateInfo) {
        var rateValue;
        var rateInfoArr = new Utils().ifObjectConvertItIntoArray(rateInfo);
        for (var i = 0; i < rateInfoArr.length; i++) {
            if (rateInfoArr[i].chargeDetails) {
                var chargeDetailsArray = new Utils().ifObjectConvertItIntoArray(rateInfoArr[i].chargeDetails);
                for (var k = 0; k < chargeDetailsArray.length; k++) {
                    if (chargeDetailsArray[k].type === CONSTANTS.CAR_RATE_GUARANTEE) {
                        rateValue = chargeDetailsArray[k].comment;
                        break;
                    }
                }
            }
        }
        return rateValue;
    }


    /**
     * Sets carType Array and carModel Array
     *
     * @private @memberOf CarSegmentBuilder
     * @param {Object} vehicleInformation JToken containing the vehicleInformation
     * @param {Object.<CarSegment>} objCarSegment CarSegment Object, called via Call-by-sharing Evaluation startegy
     */
    function getCarTypeAndModel(vehicleInformation, objCarSegment) {
        if (vehicleInformation) {
            if (vehicleInformation.vehicleCharacteristic && vehicleInformation.vehicleCharacteristic.vehicleRentalPrefType) {
                objCarSegment.carType = new Utils().ifObjectConvertItIntoArray(vehicleInformation.vehicleCharacteristic.vehicleRentalPrefType);
            }
            if (vehicleInformation.carModel) {
                objCarSegment.carModel = new Utils().ifObjectConvertItIntoArray(vehicleInformation.carModel);
            }
        }
    }

    return CarSegmentBuilder;
})();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var Connexion = (function () {
    /**
     * Represents Connexion.
     *
     * @constructs Connexion
     * @property {Array<string>} tatooNumberList Element Number
     */
    function Connexion() {
        this.tatooNumberList = [];
    }

    return Connexion;
})();

module.exports = (function () {
    /**
     * Represents ConnexionElementBuilder.
     *
     * @private
     * @constructs ConnexionElementBuilder
     */
    function ConnexionElementBuilder() {}

    /**
     * Parses PNR response to get Connexions
     *
     * @private
     * @memberof ConnexionElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<Connexion>} Array of Connexion objects
     */
    ConnexionElementBuilder.prototype.parseConnexionElements = function (pnrJSONMap) {
        var connexionJSONElements = pnrJSONMap.get(CONSTANTS.CONNECTING_FLIGHT_GROUPING_CODE);
        var connexionElements = [];
        for (var index = 0; index < connexionJSONElements.length; index++) {
            var connexion = new Connexion();
            for (var j = 0; j < connexionJSONElements[index].marriageDetail.length; j++) {
                connexion.tatooNumberList.push(connexionJSONElements[index].marriageDetail[j].tatooNum);
            }
            connexionElements.push(connexion);
        }
        return connexionElements;
    };

    return ConnexionElementBuilder;
})();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FAElement = (function () {
    /**
     * Represents FAElement.
     *
     * @constructs FAElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} freeFlowText Represents the Ticket Data
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    function FAElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.freeFlowText = "";
        this.fullNode = null;
        this.associations = null;
    }

    return FAElement;
})();

module.exports = (function () {
    /**
     * Represents FAElementBuilder.
     *
     * @private
     * @constructs FAElementBuilder
     */
    function FAElementBuilder() {

    }

    /**
     * Parses PNR response to get FAElements
     *
     * @private
     * @memberof FAElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FAElement>} Array of FAElement objects
     */
    FAElementBuilder.prototype.parseFAElements = function (pnrJSONMap) {
        var fareAutoTktJTokenElements = pnrJSONMap.get(CONSTANTS.FARE_AUTO_TICKET);
        var fareAutoTkElements = [];
        for (var index = 0; index < fareAutoTktJTokenElements.length; index++) {
            var objFareAutoTktElement = new FAElement();
            objFareAutoTktElement.fullNode = fareAutoTktJTokenElements[index];
            objFareAutoTktElement.elementNumber = fareAutoTktJTokenElements[index].elementManagementData.lineNumber;
            objFareAutoTktElement.tatooNumber = fareAutoTktJTokenElements[index].elementManagementData.reference.number;
            objFareAutoTktElement.freeFlowText = fareAutoTktJTokenElements[index].otherDataFreetext? fareAutoTktJTokenElements[index].otherDataFreetext.longFreetext : "";
            objFareAutoTktElement.segmentType = fareAutoTktJTokenElements[index].elementManagementData.reference.qualifier;
            objFareAutoTktElement.associations = fareAutoTktJTokenElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fareAutoTktJTokenElements[index].referenceForDataElement.reference) : null;
            fareAutoTkElements.push(objFareAutoTktElement);
        }
        return fareAutoTkElements;
    };

    return FAElementBuilder;

})();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FDElement = (function () {
    /**
     * Represents FDElement.
     *
     * @constructs FDElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     */
    function FDElement() {
        this.elementNumber = "";
        this.associations = null;
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
    }
    return FDElement;
})();

module.exports = (function () {
    /**
     * Represents FDElementBuilder.
     *
     * @private
     * @constructs FDElementBuilder
     */
    function FDElementBuilder() {}

    /**
     * Parses PNR response to get FDElements
     *
     * @private
     * @memberof FDElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FDElement>} Array of FDElement objects
     */
    FDElementBuilder.prototype.parseFDElements = function (pnrJSONMap) {
        var fdJTokenElements = pnrJSONMap.get(CONSTANTS.FARE_DISCOUNT);
        var fdElements = [];
        for (var i = 0; i < fdJTokenElements.length; i++) {
            var objFDElement = new FDElement();
            objFDElement.elementNumber = fdJTokenElements[i].elementManagementData.lineNumber;
            objFDElement.tatooNumber = fdJTokenElements[i].elementManagementData.reference.number;
            objFDElement.segmentType = fdJTokenElements[i].elementManagementData.reference.qualifier;
            objFDElement.fullNode = fdJTokenElements[i];
            objFDElement.associations = fdJTokenElements[i].referenceForDataElement ? new AssociationBuilder().getAssociations(fdJTokenElements[i].referenceForDataElement.reference) : null;
            fdElements.push(objFDElement);
        }
        return fdElements;
    };

    return FDElementBuilder;
})();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FEElement = (function() {
    /**
     * Represents FEElement.
     *
     * @constructs FEElement FareEndo Element
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FEElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }
    return FEElement;
})();

module.exports = (function() {
    /**
     * Represents FEElementBuilder.
     *
     * @constructs FEElementBuilder
     */
    function FEElementBuilder() {}

    /**
     * Builds the list of FEElements by setting the values from the input parameter pnrJSONMap.
     *
     * @private
     * @memberof FEElementBuilder
     * @instance
     * @param {Object} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FEElement>} Array of FEElement objects
     */
    FEElementBuilder.prototype.parseFEElements = function(pnrJSONMap) {
        var feJSONElements = pnrJSONMap.get(CONSTANTS.FARE_ENDO);
        var feElements = [];
        for (var index = 0; index < feJSONElements.length; index++) {
            var objFEElem = new FEElement();
            objFEElem.elementNumber = feJSONElements[index].elementManagementData.lineNumber;
            objFEElem.tatooNumber = feJSONElements[index].elementManagementData.reference.number;
            objFEElem.segmentType = feJSONElements[index].elementManagementData.reference.qualifier;
            objFEElem.fullNode = feJSONElements[index];
            objFEElem.associations = (feJSONElements[index].referenceForDataElement != null) ? new AssociationBuilder().getAssociations(feJSONElements[index].referenceForDataElement.reference) : null;
            feElements.push(objFEElem);
        }
        return feElements;
    };
    return FEElementBuilder;
})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FHElement = (function() {
    /**
     * Represents FHElement.
     *
     * @constructs FHElement FareManual Element
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FHElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }
    return FHElement;
})();

module.exports = (function() {
    /**
     * Represents FHElementBuilder.
     *
     * @constructs FHElementBuilder
     */
    function FHElementBuilder() {}

    /**
     * Parses PNR response to get FHElements
     *
     * @memberof FHElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FHElement>} Array of FHElement objects
     */
    FHElementBuilder.prototype.parseFHElements = function(pnrJSONMap) {
        var fhElements = [];
        var fhJSONElements = pnrJSONMap.get(CONSTANTS.FARE_MANUALAUTOTKT);
        //loop through Fare ManualTkt Element Element
        for (var index = 0; index < fhJSONElements.length; index++) {
            var objFHElement = new FHElement();
            objFHElement.associations = fhJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fhJSONElements[index].referenceForDataElement.reference) : null;
            objFHElement.elementNumber = fhJSONElements[index].elementManagementData.lineNumber;
            objFHElement.tatooNumber = fhJSONElements[index].elementManagementData.reference.number;
            objFHElement.segmentType = fhJSONElements[index].elementManagementData.reference.qualifier;
            objFHElement.fullNode = fhJSONElements[index];
            fhElements.push(objFHElement);
        }

        return fhElements;
    };

    return FHElementBuilder;
})();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FIElement = (function () {
    /**
     * Represents FIElement.
     *
     * @constructs FIElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function FIElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }
    return FIElement;
})();

module.exports = (function () {
    /**
     * Represents FIElementBuilder.
     *
     * @private
     * @constructs FIElementBuilder
     */
    function FIElementBuilder() {}

    /**
     * Parsing FIElement.
     *
     * @private
     * @memberof FIElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FIElement>} Array of FIElement objects
     */
    FIElementBuilder.prototype.parseFIElements = function (pnrJSONMap) {
        var fiJSONElements = pnrJSONMap.get(CONSTANTS.FARE_AUTO_INVOICE);
        var fiElements = [];
        for (var index = 0; index < fiJSONElements.length; index++) {
            var objFIElement = new FIElement();
            objFIElement.elementNumber = fiJSONElements[index].elementManagementData.lineNumber;
            objFIElement.fullNode = fiJSONElements[index];
            objFIElement.tatooNumber = fiJSONElements[index].elementManagementData.reference.number;
            objFIElement.segmentType = fiJSONElements[index].elementManagementData.reference.qualifier;
            objFIElement.associations = fiJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fiJSONElements[index].referenceForDataElement.reference) : null;
            fiElements.push(objFIElement);
        }
        return fiElements;
    };
    return FIElementBuilder;
})();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FMElement = (function () {
    /**
     * Represents FMElement.
     *
     * @constructs FMElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} commission Commission to apply. Can be a percentage or an amount
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function FMElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.fullNode = null;
        this.commission = "";
        this.associations = null;
    }
    return FMElement;
})();

module.exports = (function () {
    /**
     * Represents FMElementBuilder.
     *
     * @private
     * @constructs FMElementBuilder
     */
    function FMElementBuilder() {}

    /**
     * Parsing FMElement.
     *
     * @private
     * @memberof FMElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FMElement>} Array of FMElement objects
     */
    FMElementBuilder.prototype.parseFMElements = function (pnrJSONMap) {
        var fareCommmissionJSONElements = pnrJSONMap.get(CONSTANTS.FARE_COMMISSION);
        var fmElements = [];
        for (var index = 0; index < fareCommmissionJSONElements.length; index++) {
            var objFMElement = new FMElement();
            objFMElement.elementNumber = fareCommmissionJSONElements[index].elementManagementData.lineNumber;
            objFMElement.fullNode = fareCommmissionJSONElements[index];
            objFMElement.tatooNumber = fareCommmissionJSONElements[index].elementManagementData.reference.number;
            objFMElement.segmentType = fareCommmissionJSONElements[index].elementManagementData.reference.qualifier;
            objFMElement.commission = fareCommmissionJSONElements[index].otherDataFreetext ? fareCommmissionJSONElements[index].otherDataFreetext.longFreetext : "";
            objFMElement.associations = fareCommmissionJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fareCommmissionJSONElements[index].referenceForDataElement.reference) : null;
            fmElements.push(objFMElement);
        }
        return fmElements;
    };
    return FMElementBuilder;
})();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FOElement = (function() {
    /**
     * Represents FOElement.
     *
     * @constructs FOElement Fare Original Element
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FOElement() {
        this.associations = null;
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
    }
    return FOElement;
})();

module.exports = (function() {
    /**
     * Represents FOElementBuilder.
     *
     * @constructs FOElementBuilder
     */
    function FOElementBuilder() {}

    /**
     * Parses PNR response to get FOElements
     *
     * @memberof FOElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FOElement>} Array of FOElement objects
     */
    FOElementBuilder.prototype.parseFOElements = function(pnrJSONMap) {
        var foElements = [];
        var foJSONElements = pnrJSONMap.get(CONSTANTS.FARE_ORIGINAL_ISSUE);
        //loop through Fare OriginalIssue Element
        for (var index = 0; index < foJSONElements.length; index++) {
            var objFOElement = new FOElement();
            objFOElement.elementNumber = foJSONElements[index].elementManagementData.lineNumber;
            objFOElement.associations = foJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(foJSONElements[index].referenceForDataElement.reference) : null;
            objFOElement.fullNode = foJSONElements[index];
            objFOElement.tatooNumber = foJSONElements[index].elementManagementData.reference.number;
            objFOElement.segmentType = foJSONElements[index].elementManagementData.reference.qualifier;
            foElements.push(objFOElement);
        }
        return foElements;
    };
    return FOElementBuilder;
})();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FPElement = (function () {
    /**
     * Represents FormOfPayment.
     * @constructs FPElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function FPElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }
    return FPElement;
})();

module.exports = (function () {
    /**
     * Represents FPElementBuilder.
     *
     * @private
     * @constructs FPElementBuilder
     */
    function FPElementBuilder() {}
    /**
     * Parse PNR response to get fpElements
     *
     * @private
     * @memberof FPElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Mapper from PNRJSONMapper.js
     * @returns {Array<FPElement>} Array of FPElement objects
     */
    FPElementBuilder.prototype.parseFPElements = function (pnrJSONMap) {
        var fpJSONElements = pnrJSONMap.get(CONSTANTS.FARE_FORM_PAYMENT);
        var fpElements = [];
        for (var index = 0; index < fpJSONElements.length; index++) {
            var objFPElement = new FPElement();
            objFPElement.elementNumber = fpJSONElements[index].elementManagementData.lineNumber;
            objFPElement.tatooNumber = fpJSONElements[index].elementManagementData.reference.number;
            objFPElement.segmentType = fpJSONElements[index].elementManagementData.reference.qualifier;
            objFPElement.fullNode = fpJSONElements[index];
            objFPElement.associations = fpJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fpJSONElements[index].referenceForDataElement.reference) : null;
            fpElements.push(objFPElement);
        }
        return fpElements;
    };
    return FPElementBuilder;
})();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FSElement = (function () {
    /**
     * Represents FSElement.
     *
     * @constructs FSElement
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FSElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.associations = null;
        this.fullNode = null;
    }

    return FSElement;
})();

module.exports = (function () {
    /**
     * Represents FSElementBuilder.
     *
     * @constructs FSElementBuilder
     */
    function FSElementBuilder() {}

    /**
     * Parses PNR response to get FSElements
     *
     * @memberof FSElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FSElement>} Array of FSElement objects
     */
    FSElementBuilder.prototype.parseFSElements = function (pnrJSONMap) {
        var fsElements = [];
        var fsJSONElements = pnrJSONMap.get(CONSTANTS.FARE_MISC_TKT_INFO);
        for (var index = 0; index < fsJSONElements.length; index++) {
            var objFSElement = new FSElement();
            objFSElement.elementNumber = fsJSONElements[index].elementManagementData.lineNumber;
            objFSElement.tatooNumber = fsJSONElements[index].elementManagementData.reference.number;
            objFSElement.segmentType = fsJSONElements[index].elementManagementData.reference.qualifier;
            objFSElement.associations = fsJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fsJSONElements[index].referenceForDataElement.reference) : null;
            objFSElement.fullNode = fsJSONElements[index];
            fsElements.push(objFSElement);
        }

        return fsElements;
    };

    return FSElementBuilder;
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FTElement = (function() {
    /**
     * Represents FTElement.
     *
     * @constructs FTElement Fare Tour Code Element
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FTElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.fullNode = null;
        this.associations = null;
    }
    return FTElement;
})();

module.exports = (function() {
    /**
     * Represents FTElementBuilder.
     *
     * @constructs FTElementBuilder
     */
    function FTElementBuilder() {}

    /**
     * Parsing FTElement.
     *
     * @memberof FTElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FTElement>} Array of FTElement objects
     */
    FTElementBuilder.prototype.parseFTElements = function(pnrJSONMap) {
        var ftJSONElements = pnrJSONMap.get(CONSTANTS.FARE_TOUR_CODE);
        var ftElements = [];
        for (var index = 0; index < ftJSONElements.length; index++) {
            var objFTElement = new FTElement();
            objFTElement.elementNumber = ftJSONElements[index].elementManagementData.lineNumber;
            objFTElement.tatooNumber = ftJSONElements[index].elementManagementData.reference.number;
            objFTElement.segmentType = ftJSONElements[index].elementManagementData.reference.qualifier;
            objFTElement.associations = ftJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(ftJSONElements[index].referenceForDataElement.reference) : null;
            objFTElement.fullNode = ftJSONElements[index];
            ftElements.push(objFTElement);
        }
        return ftElements;
    };
    return FTElementBuilder;
})();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var FVElement = (function() {
    /**
     * Represents FVElement.
     *
     * @constructs FVElement
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function FVElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.fullNode = null;
        this.associations = null;
    }

    return FVElement;
})();

module.exports = (function() {
    /**
     * Represents FVElementBuilder.
     *
     * @constructs FVElementBuilder
     */
    function FVElementBuilder() {}

    /**
     * Parses PNR response to get FVElements
     *
     * @memberof FVElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<FVElement>} Array of FVElement objects
     */
    FVElementBuilder.prototype.parseFVElements = function(pnrJSONMap) {
        var fvElements = [];
        var fvJSONElements = pnrJSONMap.get(CONSTANTS.TICKETING_AIRLINE);
        for (var index = 0; index < fvJSONElements.length; index++) {
            var objFVElement = new FVElement();
            objFVElement.elementNumber = fvJSONElements[index].elementManagementData.lineNumber;
            objFVElement.tatooNumber = fvJSONElements[index].elementManagementData.reference.number;
            objFVElement.segmentType = fvJSONElements[index].elementManagementData.reference.qualifier;
            objFVElement.associations = fvJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(fvJSONElements[index].referenceForDataElement.reference) : null;
            objFVElement.fullNode = fvJSONElements[index];
            fvElements.push(objFVElement);
        }
        return fvElements;
    };

    return FVElementBuilder;
})();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var GroupNameElement = (function () {
    /**
     * Represents GroupNameElement.
     *
     * @constructs GroupNameElement
     * @property {string} elementNumber The Cryptic Line Number of this Element in the PNR
     * @property {string} numberOfMissingPAX No. of names misssing
     * @property {string} numberOfBookedPax No. of assigned names
     * @property {string} groupName Name of the group.
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function GroupNameElement() {
        this.elementNumber = "";
        this.numberOfMissingPAX = "";
        this.numberOfBookedPax = "";
        this.groupSize = "";
        this.groupName = "";
        this.fullNode = null;
    }

    return GroupNameElement;
})();

module.exports = (function () {
    /**
     * Represents GroupNameElementBuilder.
     *
     * @private
     * @constructs GroupNameElementBuilder
     */
    function GroupNameElementBuilder() {}

    /**
     * Parses PNR response to get GroupNameElements
     *
     * @private
     * @memberof GroupNameElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Object.<GroupNameElement>} GroupNameElement object.
     */
    GroupNameElementBuilder.prototype.parseGroupNameElement = function (pnrJSONMap) {
        var groupNameSegmentsJTokenElement = pnrJSONMap.get(CONSTANTS.GROUP_NAME);
        if (groupNameSegmentsJTokenElement) {
            var utilsObj = new Utils();
            var objGroupElement = new GroupNameElement();
            objGroupElement.elementNumber = groupNameSegmentsJTokenElement.elementManagementPassenger.lineNumber;
            objGroupElement.groupName = groupNameSegmentsJTokenElement.passengerData.travellerInformation.traveller.surname;
            objGroupElement.groupSize = groupNameSegmentsJTokenElement.passengerData.travellerInformation.traveller.quantity;
            objGroupElement.fullNode = groupNameSegmentsJTokenElement;
            var quantityDetails = groupNameSegmentsJTokenElement.passengerData.groupCounters.quantityDetails;
            var quantityDetailsArray = utilsObj.ifObjectConvertItIntoArray(quantityDetails);
            var nameElements = pnrJSONMap.get(CONSTANTS.NAME);
            var nameElementsArray = utilsObj.ifObjectConvertItIntoArray(nameElements);
            objGroupElement.numberOfMissingPAX = objGroupElement.groupSize - nameElementsArray.length;
            for (var i = 0; i < quantityDetailsArray.length; i++) {
                if (quantityDetailsArray[i].unitQualifier === CONSTANTS.GROUP_NAME_BOOKED_UNIT_QUALIFIER) {
                    objGroupElement.numberOfBookedPax = quantityDetailsArray[i].numberOfUnit;
                    break;
                }
            }
            return objGroupElement;
        }
    };

    return GroupNameElementBuilder;
})();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var PNRHeaderTagBuilder = __webpack_require__(37);
var Utils = __webpack_require__(2);
var Header = (function () {
    /**
     * Represents Header.
     *
     * @constructs Header
     * @property {string} recordLocator PNR recordLocator
     * @property {string} agentIdCreated Represents the User Id (TPF user), that created the PNR
     * @property {string} dateOfCreation Represents the PNR’s date of creation
     * @property {string} timeOfCreation Represents the PNR’s time of creation
     * @property {string} agentIdResponsible Represents the agentId (TPF user), that changed the PNR
     * @property {string} officeOfCreation Represents the office in which the PNR was created
     * @property {string} officeOfResponsibility Represents which office is responsible of PNR management
     * @property {Array.<PNRHeaderTag>} pnrHeaderTags is a list of all pnr level tags, such as **NHP** for example
     */
    function Header() {
        this.recordLocator = "";
        this.officeOfResponsibility = "";
        this.agentIdCreated = "";
        this.dateOfCreation = "";
        this.timeOfCreation = "";
        this.agentIdResponsible = "";
        this.officeOfCreation = "";
        this.pnrHeaderTags = null;
    }

    return Header;
})();

module.exports = (function () {
    /**
     * Represents HeaderBuilder.
     *
     * @private
     * @constructs HeaderBuilder
     */
    function HeaderBuilder() {}

    /**
     * @private @memberof HeaderBuilder
     * @param{Object} response
     * @param{Object} objHeader
     */
    function setRecordLocatorandCompanyID(response, objHeader) {
        var reservation;
        if (response.pnrHeader) {
            var pnrHeaderArray = new Utils().ifObjectConvertItIntoArray(response.pnrHeader);
            reservation = pnrHeaderArray[0].reservationInfo.reservation || null;
        }
        if (reservation) {
            objHeader.recordLocator = reservation.controlNumber;
        }
    }
    /**
     * Parsing Header.
     *
     * @private
     * @memberof HeaderBuilder
     * @instance
     * @param {pnrJSONMap} pnrJSONMap from PNRJSONMapper.js
     * @returns {Header} Header element object
     */
    HeaderBuilder.prototype.parseHeader = function (pnrJSONMap) {
        var response = pnrJSONMap.get(CONSTANTS.HEADER);
        var objHeader = new Header();
        if (response) {
            setRecordLocatorandCompanyID(response, objHeader);
            var securityInformation = response.securityInformation;
            if (securityInformation) {
                var secondRpInformation = securityInformation.secondRpInformation;
                if (secondRpInformation) {
                    objHeader.officeOfCreation = secondRpInformation.creationOfficeId;
                    objHeader.dateOfCreation = secondRpInformation.creationDate;
                    objHeader.timeOfCreation = secondRpInformation.creationTime;
                    objHeader.agentIdCreated = secondRpInformation.agentSignature;
                }
                var responsibilityInformation = securityInformation.responsibilityInformation;
                if (responsibilityInformation != null) {
                    objHeader.officeOfResponsibility = responsibilityInformation.officeId;
                    objHeader.agentIdResponsible = responsibilityInformation.agentId;
                }
            }
            objHeader.pnrHeaderTags = new PNRHeaderTagBuilder().parsePNRHeaderTag(pnrJSONMap);
        }
        return objHeader;
    };
    return HeaderBuilder;
})();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var HotelSegment = (function () {
    /**
     * Represents HotelSegment.
     *
     * @constructs HotelSegment
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} chainCode Chain Code of the Hotel Chain, Ex. : RT for Accor, HD for HCorpo, SJ for SunHotels
     * @property {string} chainName Represents the chainName of the hotel. Ex. Accor, FAIRMONT HOTELS, HCorpo, SunHotels
     * @property {string} hotelName Represents the name of the hotel, Ex. EM  MARRIOTT INTL, HOLIDAY INN, CANDLEWOOD SUITES.
     * @property {string} city city name in which the Hotel is present
     * @property {string} checkInDate Check In Date of the room booked
     * @property {string} checkOutDate Check Out Date of the room booked
     * @property {string} status Represents the status of the room booking
     * @property {string} quantity Represents the number of parties for that booking
     * @property {string} numberOfBookedRooms Represents the number of rooms booked
     * @property {string} location Represents the location city of the Hotel
     * @property {string} roomRate Represents the rate of the room
     * @property {string} ratePrice Represents the total price of the booking
     * @property {string} ratePlanIndicator Represents the plan indicator if any applied
     * @property {string} currency Represents the currency in which the amount is paid
     * @property {string} confirmationNumber Represents the confirmation number of the booking
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {Object} fullNode JSON Object containing the complete information about this Segment
     */
    function HotelSegment() {
        this.elementNumber = "";
        this.chainCode = "";
        this.chainName = "";
        this.hotelName = "";
        this.checkInDate = "";
        this.checkOutDate = "";
        this.roomRate = "";
        this.confirmationNumber = "";
        this.status = "";
        this.quantity = "";
        this.numberOfBookedRooms = "";
        this.location = "";
        this.ratePrice = "";
        this.ratePlanIndicator = "";
        this.currency = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.associations = null;
        this.fullNode = null;
    }
    return HotelSegment;
})();

module.exports = (function () {
    /**
     * Represents HotelSegmentBuilder.
     *
     * @private
     * @constructs HotelSegmentBuilder
     */
    function HotelSegmentBuilder() {}

    /**
     * Sets chainName, chainCode, hotelName, roomRate, ratePrice, ratePlanIndicator, currency, numberOfBookedRooms for a given HotelSegmentObject
     * @private @memberof HotelSegmentBuilder
     * @param{Object} hotelReservationInfo JToken containing HotelReservation Details
     * @param{Object.<HotelSegment>} objHotel HotelClass instance Object
     */
    function setHotelReservationProperties(hotelReservationInfo, objHotel) {
        if (hotelReservationInfo) {
            var cancelOrConfirmNbrArray = new Utils().ifObjectConvertItIntoArray(hotelReservationInfo.cancelOrConfirmNbr);
            objHotel.confirmationNumber = cancelOrConfirmNbrArray[0].reservation.controlNumber;
            if (hotelReservationInfo.companyIdentification) {
                objHotel.chainName = hotelReservationInfo.companyIdentification.companyName;
                objHotel.chainCode = hotelReservationInfo.companyIdentification.companyCode;
            }
            objHotel.hotelName = hotelReservationInfo.hotelPropertyInfo.hotelName;
            var roomRateDetails = hotelReservationInfo.roomRateDetails;
            if (roomRateDetails) {
                objHotel.roomRate = roomRateDetails.roomInformation.bookingCode;
                if (roomRateDetails.tariffDetails) {
                    objHotel.ratePrice = roomRateDetails.tariffDetails.tariffInfo.amount;
                    objHotel.ratePlanIndicator = roomRateDetails.tariffDetails.tariffInfo.ratePlanIndicator;
                    objHotel.currency = roomRateDetails.tariffDetails.tariffInfo.currency;
                }
                objHotel.numberOfBookedRooms = roomRateDetails.roomInformation.guestCountDetails.numberOfUnit;
            }
            if (hotelReservationInfo.requestedDates) {
                var beginDateTime = hotelReservationInfo.requestedDates.beginDateTime;
                if (beginDateTime) {
                    objHotel.checkInDate = ((beginDateTime.day.length > 1) ? beginDateTime.day : "0" + beginDateTime.day) + ((beginDateTime.month.length > 1) ? beginDateTime.month : "0" + beginDateTime.month) + beginDateTime.year.substr(2, 2);
                }
                var endDateTime = hotelReservationInfo.requestedDates.endDateTime;
                if (endDateTime) {
                    objHotel.checkOutDate = ((endDateTime.day.length > 1) ? endDateTime.day : "0" + endDateTime.day) + ((endDateTime.month.length > 1) ? endDateTime.month : "0" + endDateTime.month) + endDateTime.year.substr(2, 2);
                }
            }
        }
    }
    /**
     * Parses PNR respone to get HotelSegments
     *
     * @private
     * @memberof HotelSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<HotelSegment>} Array of HotelSegment objects
     */
    HotelSegmentBuilder.prototype.parseHotelSegments = function (pnrJSONMap) {
        var hotelSegments = [];
        var hotelSegmentsJSONElements = pnrJSONMap.get(CONSTANTS.HOTEL);
        //loop through each hotel segment
        for (var index = 0; index < hotelSegmentsJSONElements.length; index++) {
            var objHotel = new HotelSegment();
            objHotel.elementNumber = hotelSegmentsJSONElements[index].elementManagementItinerary.lineNumber;
            var hotelReservationInfo = hotelSegmentsJSONElements[index].hotelReservationInfo;
            setHotelReservationProperties(hotelReservationInfo, objHotel);
            objHotel.tatooNumber = hotelSegmentsJSONElements[index].elementManagementItinerary.reference.number;
            objHotel.segmentType = hotelSegmentsJSONElements[index].elementManagementItinerary.reference.qualifier;
            var travelProduct = hotelSegmentsJSONElements[index].travelProduct;
            if (travelProduct) {
                objHotel.location = travelProduct.boardpointDetail ? travelProduct.boardpointDetail.cityCode : "";
            }
            if (hotelSegmentsJSONElements[index].relatedProduct) {
                objHotel.status = hotelSegmentsJSONElements[index].relatedProduct.status;
                objHotel.quantity = hotelSegmentsJSONElements[index].relatedProduct.quantity;
            }
            objHotel.associations = hotelSegmentsJSONElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(hotelSegmentsJSONElements[index].referenceForSegment.reference) : null;
            objHotel.fullNode = hotelSegmentsJSONElements[index];
            hotelSegments.push(objHotel);
        }
        return hotelSegments;
    };
    return HotelSegmentBuilder;
})();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var INSSegment = (function () {
    /**
     * Represents INSSegment.
     *
     * @constructs INSSegment
     * @property {string} elementNumber The Line Number of this element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this element
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     */
    function INSSegment() {
        this.elementNumber = "";
        this.fullNode = null;
        this.associations = null;
        this.segmentType = "";
        this.tatooNumber = "";
    }
    return INSSegment;
})();

module.exports = (function () {
    /**
     * Represents INSSegmentBuilder.
     *
     * @private
     * @constructs INSSegmentBuilder
     */
    function INSSegmentBuilder() {

    }

    /**
     * Parses PNR response to get INSSegments.
     *
     * @private
     * @memberof INSSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<INSSegment>} Array of INSSegment objects
     */
    INSSegmentBuilder.prototype.parseINSSegments = function (pnrJSONMap) {
        var insJTokenElements = pnrJSONMap.get(CONSTANTS.TRAVEL_ASSISTANCE);
        var insSegments = [];
        for (var i = 0; i < insJTokenElements.length; i++) {
            var objINSElement = new INSSegment();
            objINSElement.elementNumber = insJTokenElements[i].elementManagementItinerary.lineNumber;
            objINSElement.fullNode = insJTokenElements[i];
            objINSElement.segmentType = insJTokenElements[i].elementManagementItinerary.reference.qualifier;
            objINSElement.tatooNumber = insJTokenElements[i].elementManagementItinerary.reference.number;
            objINSElement.associations = insJTokenElements[i].referenceForSegment ? new AssociationBuilder().getAssociations(insJTokenElements[i].referenceForSegment.reference) : null;
            insSegments.push(objINSElement);
        }
        return insSegments;
    };
    return INSSegmentBuilder;
})();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var MISCSegment = (function () {
    /**
     * Represents MISCSegment.
     *
     * @constructs MISCSegment
     * @property {string} elementNumber The Line Number of this element in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this element
     * @property {string} associations Passenger or Segment associations
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     */
    function MISCSegment() {
        this.elementNumber = "";
        this.fullNode = null;
        this.associations = null;
        this.tatooNumber = "";
        this.segmentType = "";
    }

    return MISCSegment;
})();

module.exports = (function () {
    /**
     * Represents MISCSegmentBuilder.
     *
     * @private
     * @constructs MISCSegmentBuilder
     */
    function MISCSegmentBuilder() {}


    /**
     * Parsing MISCSegment.
     *
     * @private
     * @memberof MISCSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<MISCSegment>} Array of MISCSegment objects
     */
    MISCSegmentBuilder.prototype.parseMISCSegments = function (pnrJSONMap) {
        var miscSegmentsJSONElements = pnrJSONMap.get(CONSTANTS.MISC);
        var miscSegments = [];
        for (var index = 0; index < miscSegmentsJSONElements.length; index++) {
            var objMISC = new MISCSegment();
            objMISC.elementNumber = miscSegmentsJSONElements[index].elementManagementItinerary.lineNumber;
            objMISC.fullNode = miscSegmentsJSONElements[index];
            objMISC.associations = miscSegmentsJSONElements[index].referenceForSegment ? new AssociationBuilder().getAssociations(miscSegmentsJSONElements[index].referenceForSegment.reference) : null;
            objMISC.tatooNumber = miscSegmentsJSONElements[index].elementManagementItinerary.reference.number;
            objMISC.segmentType = miscSegmentsJSONElements[index].elementManagementItinerary.reference.qualifier;
            miscSegments.push(objMISC);
        }
        return miscSegments;
    };
    return MISCSegmentBuilder;
})();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var NameElement = (function () {
    /**
     * Represents NameElement.
     *
     * @constructs NameElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} firstName Passenger first name
     * @property {string} lastName Passenger last name
     * @property {string} type Passenger type. Example : ADT | CHD | PAX | INF | etc..
     * @property {string} dateOfBirth Date of Birth in format 02AUG16
     * @property {string} id
     * @property {Object.<InfantElement>} infant infant Object
     */
    function NameElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.firstName = "";
        this.lastName = "";
        this.type = "";
        this.dateOfBirth = "";
        this.id = "";
        this.infant = null;
    }

    return NameElement;
})();

var Infant = (function () {
    /**
     * Represents Infant.
     *
     * @constructs Infant
     * @property {Object} fullNode Cryptic text line of Infant
     * @property {string} firstName Infant's first name
     * @property {string} lastName Infant's last name
     * @property {string} type Passenger type
     * @property {string} dateOfBirth Date of Birth in format 02AUG16
     * @property {string} id
     */
    function Infant() {
        //Full JSON element passengerData
        this.firstName = "";
        this.lastName = "";
        this.type = "";
        this.dateOfBirth = "";
        this.id = "";
    }

    return Infant;
})();

module.exports = (function () {
    /**
     * Represents NameElementBuilder.
     *
     * @private
     * @constructs NameElementBuilder
     */
    function NameElementBuilder() {}

    /**
     * Parses PNR reponse to get NameElements.
     *
     * @private
     * @memberof NameElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<NameElement>|null} Array of NameElement objects if any or else null.
     */
    NameElementBuilder.prototype.parseNameElements = function (pnrJSONMap) {
        var nameSegmentsJTokenElements = pnrJSONMap.get(CONSTANTS.NAME);
        var nameSegmentsList = [];
        for (var index = 0; index < nameSegmentsJTokenElements.length; index++) {
            var objName = new NameElement();
            objName.fullNode = nameSegmentsJTokenElements[index];
            objName.elementNumber = nameSegmentsJTokenElements[index].elementManagementPassenger.lineNumber;
            objName.tatooNumber = nameSegmentsJTokenElements[index].elementManagementPassenger.reference.number;
            objName.segmentType = nameSegmentsJTokenElements[index].elementManagementPassenger.reference.qualifier;
            // Managing the parent
            createNameElementBasicObject(objName, nameSegmentsJTokenElements[index], 0);
            //Managing the infant if present
            if (Array.isArray(nameSegmentsJTokenElements[index].passengerData) || nameSegmentsJTokenElements[index].passengerData.travellerInformation.passenger.length > 0) {
                objInfant = new Infant();
                createNameElementBasicObject(objInfant, nameSegmentsJTokenElements[index], 1);
                objName.infant = objInfant;
            }
            nameSegmentsList.push(objName);
        }
        return nameSegmentsList;
    };

    /**
     * Sets FirstName, ID and Type of the NameElement
     *
     * @private @memberOf NameElementBuilder
     * @param {Object.<NameElement|Infant>} basicObject
     * @param {any} passengerDataObject
     * @param {any} isFirst
     */
    function setFirstNameIdAndType(basicObject, passengerDataObject, isFirst) {
        basicObject.id = passengerDataObject.identificationCode ? passengerDataObject.identificationCode : "";
        basicObject.firstName = passengerDataObject.firstName ? passengerDataObject.firstName : "";
        if (passengerDataObject.type) {
            basicObject.type = passengerDataObject.type;
        } else if (typeof (isFirst) !== 'undefined' && isFirst !== true && passengerDataObject.infantIndicator) {
            basicObject.type = CONSTANTS.INFANT_INDICATOR;
        }
    }

    /**
     * Sets Date and LastName of the NameElement Object.
     *
     * @private @memberOf NameElementBuilder
     * @param {Object.<NameElement|Infant>} basicObject
     * @param {Object} rootDataObject
     */
    function setDateAndLastName(basicObject, rootDataObject) {
        if (rootDataObject.dateOfBirth && rootDataObject.dateOfBirth.dateAndTimeDetails) {
            basicObject.dateOfBirth = rootDataObject.dateOfBirth.dateAndTimeDetails.date;
        }
        basicObject.lastName = rootDataObject.travellerInformation.traveller.surname;
    }
    /**
     * Sets the properties of any given NameElement or InfantElement.
     * basicObject parameter will be called by Call-by-sharing Evaluation startegy, therefore basicObject will restore the values set to it even after returning from the function.
     * If indexOfPassenger = 0 then basicObject is a NameElement, if indexOfPassenger = 1, then basicObject is an Infant
     *
     * @private @memberOf NameElementBuilder
     * @param {Object.<NameElement|Infant>} basicObject
     * @param {Object} jsonObject
     * @param {Object.<number>} indexOfPassenger
     */
    function createNameElementBasicObject(basicObject, jsonObject, indexOfPassenger) {
        var rootBranch = Array.isArray(jsonObject.passengerData) ? jsonObject.passengerData[indexOfPassenger] : jsonObject.passengerData;
        var detailBranch = Array.isArray(rootBranch.travellerInformation.passenger) ? rootBranch.travellerInformation.passenger[indexOfPassenger] : rootBranch.travellerInformation.passenger;
        var isFirst = (indexOfPassenger === 0);
        setFirstNameIdAndType(basicObject, detailBranch, isFirst);
        setDateAndLastName(basicObject, rootBranch);
    }

    return NameElementBuilder;
})();

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var OPElement = (function() {
    /**
     * Represents OPElement.
     *
     * @constructs OPElement
     * @property {string} elementNumber Element number
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other    elements
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function OPElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.fullNode = null;
        this.associations = null;
    }
    return OPElement;
})();

module.exports = (function() {
    /**
     * Represents OPElementBuilder.
     *
     * @constructs OPElementBuilder
     */
    function OPElementBuilder() {}

    /**
     * Parsing OPElement.
     *
     * @memberof OPElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<OPElement>} Array of OPElement objects
     */
    OPElementBuilder.prototype.parseOPElements = function(pnrJSONMap) {
        var opJSONElements = pnrJSONMap.get(CONSTANTS.OPTION_QUEUE);
        var opElements = [];
        for (var index = 0; index < opJSONElements.length; index++) {
            var objOPElem = new OPElement();
            objOPElem.elementNumber = opJSONElements[index].elementManagementData.lineNumber;
            objOPElem.tatooNumber = opJSONElements[index].elementManagementData.reference.number;
            objOPElem.segmentType = opJSONElements[index].elementManagementData.reference.qualifier;
            objOPElem.fullNode = opJSONElements[index];
            objOPElem.associations = opJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(opJSONElements[index].referenceForDataElement.reference) : null;
            opElements.push(objOPElem);
        }
        return opElements;
    };
    return OPElementBuilder;
})();

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var OSIElement = (function () {
    /**
     * Represents OSIElement.
     *
     * @constructs OSIElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function OSIElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.fullNode = null;
        this.associations = null;
    }
    return OSIElement;
})();

module.exports = (function () {
    /**
     * Represents OSIElementBuilder.
     *
     * @private
     * @constructs OSIElementBuilder
     */
    function OSIElementBuilder() {}

    /**
     * Parsing OSIElement.
     *
     * @private
     * @memberof OSIElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<OSIElement>} Array of OSIElement objects
     */
    OSIElementBuilder.prototype.parseOSIElements = function (pnrJSONMap) {
        var osiElements = [];
        var osiJSONElements = pnrJSONMap.get(CONSTANTS.OTHER_SERVICE);
        //loop through each dataElementsIndiv
        for (var index = 0; index < osiJSONElements.length; index++) {
            var objOSIElement = new OSIElement();
            objOSIElement.elementNumber = osiJSONElements[index].elementManagementData.lineNumber;
            objOSIElement.tatooNumber = osiJSONElements[index].elementManagementData.reference.number;
            objOSIElement.segmentType = osiJSONElements[index].elementManagementData.reference.qualifier;
            objOSIElement.fullNode = osiJSONElements[index];
            objOSIElement.associations = osiJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(osiJSONElements[index].referenceForDataElement.reference) : null;
            osiElements.push(objOSIElement);
        }
        return osiElements;
    };

    return OSIElementBuilder;
})();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var Utils = __webpack_require__(2);
var PNRHeaderTag = (function () {
    /**
     * Represents PNRHeaderTag.
     *
     * @constructs PNRHeaderTag
     * @property {Array<string>} Tag
     */
    function PNRHeaderTag() {
        this.tag = [];
    }
    return PNRHeaderTag;
})();

module.exports = (function () {
    /**
     * Represents PNRHeaderTagBuilder.
     *
     * @private
     * @constructs PNRHeaderTagBuilder
     */
    function PNRHeaderTagBuilder() {}

    /**
     * Parsing PNRHeaderTag.
     *
     * @private
     * @memberof PNRHeaderTagBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Object.<PNRHeaderTag>} PNRHeaderTag element
     */
    PNRHeaderTagBuilder.prototype.parsePNRHeaderTag = function (pnrJSONMap) {
        var pnrHeaderTag = new PNRHeaderTag();
        var response = pnrJSONMap.get(CONSTANTS.HEADER);
        if (response.pnrHeaderTag && response.pnrHeaderTag.statusInformation) {
            var statusInformationArray = new Utils().ifObjectConvertItIntoArray(response.pnrHeaderTag.statusInformation);
            for (var i = 0; i < statusInformationArray.length; i++) {
                pnrHeaderTag.tag.push(statusInformationArray[i].indicator);
            }
        }
        return pnrHeaderTag;
    };
    return PNRHeaderTagBuilder;
})();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var Utils = __webpack_require__(2);
var PNRJSONMapper = (function () {

    /**
     * Represents PNRJSONMapper which contains pnrJSONMap of all PNR Elements and Segments
     *
     * @private
     * @constructs PNRJSONMapper
     * @property {pnrJSONMap<segment name, [segmentdata]>} jsonElementsMap with key as segmanet name and value as array of segment data
     */
    function PNRJSONMapper() {
        this.jsonElementsMap = new Map();
    }

    return PNRJSONMapper;
})();

module.exports = (function () {
    /**
     * Represents PNRJSONMapperBuilder.
     *
     * @private
     * @constructs PNRJSONMapperBuilder
     */
    function PNRJSONMapperBuilder() {

    }

    var pnrJSONMapperObj;

    var allItineraryInfoElements = [],
        allDataIndivElements = [],
        allTravellerInfoElements = [],
        allSegmentGroupingInfoElements = [],
        rmElements = [],
        rcElements = [],
        opElements = [],
        fiElements = [],
        ftElements = [],
        fmElements = [],
        feElements = [],
        amElements = [],
        abElements = [],
        tkElements = [],
        osiElements = [],
        riaElements = [],
        ribElements = [],
        ricElements = [],
        ridElements = [],
        rifElements = [],
        riiElements = [],
        rimElements = [],
        rioElements = [],
        ripElements = [],
        rirElements = [],
        risElements = [],
        ritElements = [],
        rizElements = [],
        skElements = [],
        carSegments = [],
        hotelSegments = [],
        auxHotelSegments = [],
        foElements = [],
        fvElements = [],
        fsElements = [],
        fhElements = [],
        iuElements = [],
        ssrSeatElements = [],
        ssrFOIDElements = [],
        ssrFQTRElements = [],
        ssrFQTSElements = [],
        ssrFQTUElements = [],
        ssrFQTVElements = [],
        ssrOtherElements = [],
        nameElements = [],
        miscSegments = [],
        arnkSegments = [],
        airSegments = [],
        airOpenSegments = [],
        airFlownSegments = [],
        auxCarSegments = [],
        connexionElements = [],
        apElements = [],
        faElements = [],
        insSegments = [],
        fdElements = [],
        aiElements = [],
        fpElements = [],
        allAirSegments = [],
        trainSegments = [],
        receiveFromElement = null,
        groupNameElement = null;

    /**
     * Parses through the travellerInfo JToken for just once and pushes the respective JToken
     *  to their corresponding lists which will be later stored in the map.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {Object} travellerInfo
     */
    var loadTravellerInfoElements = function (travellerInfo) {
        allTravellerInfoElements = new Utils().ifObjectConvertItIntoArray(travellerInfo);
        for (var index = 0; index < allTravellerInfoElements.length; index++) {
            var segmentName = allTravellerInfoElements[index].elementManagementPassenger.segmentName;
            if (segmentName) {
                switch (segmentName) {
                    case CONSTANTS.GROUP_NAME:
                        groupNameElement = allTravellerInfoElements[index];
                        break;
                    case CONSTANTS.NAME:
                        nameElements.push(allTravellerInfoElements[index]);
                        break;
                    default:
                        break;
                }
            }
        }
    };

    /**
     * Parses through the itineraryInfo JToken for just once and pushes the respective JToken
     *  to their corresponding lists which will be later stored in the map.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {Object} itineraryInfo
     */
    var loadItineraryInfoElements = function (itineraryInfo) {
        allItineraryInfoElements = new Utils().ifObjectConvertItIntoArray(itineraryInfo);
        for (var index = 0; index < allItineraryInfoElements.length; index++) {
            switch (allItineraryInfoElements[index].elementManagementItinerary.segmentName) {
                case CONSTANTS.AIR:
                    allAirSegments.push(allItineraryInfoElements[index]);
                    var statusCodeArray = [];
                    if (allItineraryInfoElements[index].relatedProduct) {
                        statusCodeArray = new Utils().ifObjectConvertItIntoArray(allItineraryInfoElements[index].relatedProduct.status);
                    }
                    if (allItineraryInfoElements[index].travelProduct.productDetails.identification === CONSTANTS.ARNK) {
                        arnkSegments.push(allItineraryInfoElements[index]);
                    } else if (allItineraryInfoElements[index].travelProduct.productDetails.identification === CONSTANTS.AIR_OPEN) {
                        airOpenSegments.push(allItineraryInfoElements[index]);
                    } else if (statusCodeArray.indexOf('B') > -1) {
                        airFlownSegments.push(allItineraryInfoElements[index]);
                    } else {
                        airSegments.push(allItineraryInfoElements[index]);
                    }
                    break;
                case CONSTANTS.CAR:
                    carSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.AUX_CAR:
                    auxCarSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.MANUAL_AUXILLARY_SERVICE:
                    iuElements.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.HOTEL:
                    hotelSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.AUX_HOTEL:
                    auxHotelSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.MISC:
                    miscSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.TRAVEL_ASSISTANCE:
                    insSegments.push(allItineraryInfoElements[index]);
                    break;
                case CONSTANTS.TRAIN:
                    trainSegments.push(allItineraryInfoElements[index]);
                    break;
                default:
                    break;
            }
        }
    };

    /**
     * Receives segmentName which starts with letter "R" and pushes the respective JToken
     * (which is a part of DataElementsIndiv) to their corresponding lists which will be later stored in the map.
     * As allDataIndivElements is global in scope, we need not pass it as a parameter.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {string} segmentName
     * @param {number} index
     */
    var loadDataIndivElementsStartingwithR = function (segmentName, index) {
        switch (segmentName) {
            case CONSTANTS.CONFIDENTIAL_REMARK:
                rcElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.REMARK:
                rmElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RECEIVE_FROM:
                receiveFromElement = allDataIndivElements[index];
                break;
            case CONSTANTS.RIA:
                riaElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIB:
                ribElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIC:
                ricElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RID:
                ridElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIF:
                rifElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RII:
                riiElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIM:
                rimElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIO:
                rioElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIP:
                ripElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIR:
                rirElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIS:
                risElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIT:
                ritElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.RIZ:
                rizElements.push(allDataIndivElements[index]);
                break;
            default:
                break;
        }
    };

    /**
     * Receives segmentName which starts with letter "F" and pushes the respective JToken
     * (which is a part of DataElementsIndiv) to their corresponding lists which will be later stored in the map.
     * As allDataIndivElements is global in scope, we need not pass it as a parameter.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {string} segmentName
     * @param {number} index
     */
    var loadDataIndivElementsStartingwithF = function (segmentName, index) {
        switch (segmentName) {
            case CONSTANTS.FARE_AUTO_TICKET:
                faElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_AUTO_INVOICE:
                fiElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_TOUR_CODE:
                ftElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_COMMISSION:
                fmElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_DISCOUNT:
                fdElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_ENDO:
                feElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_FORM_PAYMENT:
                fpElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_ORIGINAL_ISSUE:
                foElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MISC_TKT_INFO:
                fsElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT_AUTOMATED_TICKET:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT_ELECTRONIC_TICKET:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT_MANUAL_TICKET:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT_ELECTRONIC_MISCELLANEOUS_DOCUMENT_TICKET:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.FARE_MANUALAUTOTKT_MISCELLANOUS_DOCUMENT_WITHOUT_EMD_TICKET:
                fhElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.TICKETING_AIRLINE:
                fvElements.push(allDataIndivElements[index]);
                break;
            default:
                break;
        }
    };

    /**
     * Receives segmentName which starts with letter "S" and pushes the respective JToken
     * (which is a part of DataElementsIndiv) to their corresponding lists which will be later stored in the map.
     * As allDataIndivElements is global in scope, we need not pass it as a parameter.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {string} segmentName
     * @param {number} index
     */
    var loadDataIndivElementsStartingwithS = function (segmentName, index) {
        switch (segmentName) {
            case CONSTANTS.SSR_ELEMENT_CODES.SSR:
                var serviceType = allDataIndivElements[index].serviceRequest.ssr.type;
                if (CONSTANTS.SSR_ELEMENT_CODES.SEAT_CODES.indexOf(serviceType) > -1) {
                    ssrSeatElements.push(allDataIndivElements[index]);
                } else {
                    switch (serviceType) {
                        case CONSTANTS.SSR_ELEMENT_CODES.FOID:
                            ssrFOIDElements.push(allDataIndivElements[index]);
                            break;
                        case CONSTANTS.SSR_ELEMENT_CODES.FQTR:
                            ssrFQTRElements.push(allDataIndivElements[index]);
                            break;
                        case CONSTANTS.SSR_ELEMENT_CODES.FQTS:
                            ssrFQTSElements.push(allDataIndivElements[index]);
                            break;
                        case CONSTANTS.SSR_ELEMENT_CODES.FQTV:
                            ssrFQTVElements.push(allDataIndivElements[index]);
                            break;
                        case CONSTANTS.SSR_ELEMENT_CODES.FQTU:
                            ssrFQTUElements.push(allDataIndivElements[index]);
                            break;
                        default:
                            ssrOtherElements.push(allDataIndivElements[index]);
                            break;
                    }
                }
            case CONSTANTS.SPECIAL_INFORMATION_SERVICE:
                skElements.push(allDataIndivElements[index]);
                break;
            default:
                break;
        }
    };

    /**
     * Receives segmentName which starts with any other letter other than "R","S" and "F", and pushes the respective JToken
     * (which is a part of DataElementsIndiv) to their corresponding lists which will be later stored in the map.
     * As allDataIndivElements is global in scope, we need not pass it as a parameter.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {string} segmentName
     * @param {number} index
     */
    var loadDataIndivElementsStartingwithOtherCharacters = function (segmentName, index) {
        switch (segmentName) {
            case CONSTANTS.PHONE:
                apElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.MAILING_ADDRESS:
                amElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.MAILING_ADDRESS_CODE_DISTRIBUTED_ADDRESS:
                amElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.BILLING_ADDRESS:
                abElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.BILLING_ADDRESS_CODE_DISTRIBUTED_ADDRESS:
                abElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.TICKET:
                tkElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.OTHER_SERVICE:
                osiElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.OPTION_QUEUE:
                opElements.push(allDataIndivElements[index]);
                break;
            case CONSTANTS.ACCOUNTING_AI:
                aiElements.push(allDataIndivElements[index]);
                break;
            default:
                break;
        }
    };

    /**
     * Parses through the dataElementsIndiv JToken for just once and pushes the respective JToken
     *  to their corresponding lists which will be later stored in the map.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {Object} dataElementsIndiv
     */
    var loadDataIndivElements = function (dataElementsIndiv) {
        allDataIndivElements = new Utils().ifObjectConvertItIntoArray(dataElementsIndiv);
        for (var index = 0; index < allDataIndivElements.length; index++) {
            var segmentName = allDataIndivElements[index].elementManagementData.segmentName;
            if (segmentName) {
                var firstCharacter = segmentName[0];
                switch (firstCharacter) {
                    case 'R':
                        loadDataIndivElementsStartingwithR(segmentName, index);
                        break;
                    case 'F':
                        loadDataIndivElementsStartingwithF(segmentName, index);
                        break;
                    case 'S':
                        loadDataIndivElementsStartingwithS(segmentName, index);
                        break;
                    default:
                        loadDataIndivElementsStartingwithOtherCharacters(segmentName, index);
                        break;
                }
            }
        }
    };

    /**
     * Parses through the segmentGroupingInfo JToken for just once and pushes the respective JToken
     *  to their corresponding lists which will be later stored in the map.
     *
     * @private @memberOf PNRJSONMapperBuilder
     * @param {Object} segmentGroupingInfo
     */
    var loadConnexionElements = function (segmentGroupingInfo) {
        allSegmentGroupingInfoElements = new Utils().ifObjectConvertItIntoArray(segmentGroupingInfo);
        for (var index = 0; index < allSegmentGroupingInfoElements.length; index++) {
            var groupingCode = allSegmentGroupingInfoElements[index].groupingCode;
            if (groupingCode && groupingCode === CONSTANTS.CONNECTING_FLIGHT_GROUPING_CODE) {
                connexionElements.push(allSegmentGroupingInfoElements[index]);
            }
        }
    };

    /**
     * Clears all the global lists, so that, in case, if the retrievePNR function is called for the second
     * time, we have a map whose global lists are empty rather than filled with values which were set earlier.
     *
     * @private @memberOf PNRJSONMapperBuilder
     */
    var clearAllLists = function () {
        allItineraryInfoElements = [];
        allDataIndivElements = [];
        allTravellerInfoElements = [];
        allSegmentGroupingInfoElements = [];
        rmElements = [];
        rcElements = [];
        opElements = [];
        fiElements = [];
        risElements = [];
        ftElements = [];
        fmElements = [];
        feElements = [];
        amElements = [];
        abElements = [];
        tkElements = [];
        osiElements = [];
        riaElements = [];
        ribElements = [];
        ricElements = [];
        ridElements = [];
        rifElements = [];
        riiElements = [];
        rimElements = [];
        rioElements = [];
        ripElements = [];
        rirElements = [];
        risElements = [];
        ritElements = [];
        rizElements = [];
        skElements = [];
        carSegments = [];
        hotelSegments = [];
        auxHotelSegments = [];
        foElements = [];
        fvElements = [];
        fsElements = [];
        fhElements = [];
        iuElements = [];
        ssrSeatElements = [];
        ssrFOIDElements = [];
        ssrFQTRElements = [];
        ssrFQTSElements = [];
        ssrFQTUElements = [];
        ssrFQTVElements = [];
        ssrOtherElements = [];
        trainSegments = [];
        nameElements = [];
        miscSegments = [];
        arnkSegments = [];
        airSegments = [];
        airOpenSegments = [];
        airFlownSegments = [];
        auxCarSegments = [];
        connexionElements = [];
        apElements = [];
        faElements = [];
        insSegments = [];
        fdElements = [];
        aiElements = [];
        fpElements = [];
        allAirSegments = [];
        receiveFromElement = null;
        groupNameElement = null;
    };

    /**
     * Adds all the global lists to the map. The globals lists were filled with data with respective JToken
     * by other functions, now we add these global lists(either empty or filled) to the Map.
     *
     * @private @memberOf PNRJSONMapperBuilder
     */
    var addListstoMap = function () {
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.REMARK, rmElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.CONFIDENTIAL_REMARK, rcElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.OPTION_QUEUE, opElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_AUTO_INVOICE, fiElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_TOUR_CODE, ftElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_COMMISSION, fmElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_ENDO, feElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.MAILING_ADDRESS, amElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.BILLING_ADDRESS, abElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.TICKET, tkElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIA, riaElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIB, ribElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIC, ricElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RID, ridElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIF, rifElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RII, riiElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIM, rimElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIO, rioElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIP, ripElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIR, rirElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIS, risElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIT, ritElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RIZ, rizElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.OTHER_SERVICE, osiElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SPECIAL_INFORMATION_SERVICE, skElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.CAR, carSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.MANUAL_AUXILLARY_SERVICE, iuElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_ORIGINAL_ISSUE, foElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.TICKETING_AIRLINE, fvElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_MISC_TKT_INFO, fsElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_MANUALAUTOTKT, fhElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.AUX_HOTEL, auxHotelSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.HOTEL, hotelSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.CAR, carSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.SEAT, ssrSeatElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.FOID, ssrFOIDElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.FQTR, ssrFQTRElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.FQTV, ssrFQTVElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.FQTU, ssrFQTUElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.FQTS, ssrFQTSElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.SSR_ELEMENT_CODES.OTHER, ssrOtherElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.NAME, nameElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.MISC, miscSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.ARNK, arnkSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.AIR, airSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.AIR_OPEN, airOpenSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.AIR_FLWN, airFlownSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.AUX_CAR, auxCarSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.CONNECTING_FLIGHT_GROUPING_CODE, connexionElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_AUTO_TICKET, faElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.RECEIVE_FROM, receiveFromElement);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.GROUP_NAME, groupNameElement);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.PHONE, apElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_DISCOUNT, fdElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.TRAVEL_ASSISTANCE, insSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.ACCOUNTING_AI, aiElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.FARE_FORM_PAYMENT, fpElements);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.ALL_AIR, allAirSegments);
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.TRAIN, trainSegments);
    };
    /**
     * Get Map with key as segment name and value as array of segment data
     *
     * @private
     * @member of PNRJSONMapperBuilder
     * @instance
     * @param {Object} references of the element from PNR Response
     * @returns {pnrJSONMap<segment name, [segmentdata]>} jsonElementsMap with key as segmanet name and value as array of segment data
     */
    PNRJSONMapperBuilder.prototype.getJsonElementsMap = function (webServiceResponse) {
        pnrJSONMapperObj = new PNRJSONMapper();
        clearAllLists();
        var response = webServiceResponse.response.model.output.response;
        if (response) {

            if (response.dataElementsMaster && response.dataElementsMaster.dataElementsIndiv) {
                loadDataIndivElements(response.dataElementsMaster.dataElementsIndiv);
            }
            if (response.originDestinationDetails && response.originDestinationDetails.itineraryInfo) {
                loadItineraryInfoElements(response.originDestinationDetails.itineraryInfo);
            }
            if (response.segmentGroupingInfo) {
                loadConnexionElements(response.segmentGroupingInfo);
            }
            if (response.travellerInfo) {
                loadTravellerInfoElements(response.travellerInfo);
            }
        }
        addListstoMap();
        pnrJSONMapperObj.jsonElementsMap.set(CONSTANTS.HEADER, response);
        return pnrJSONMapperObj;
    };
    return PNRJSONMapperBuilder;

})();

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var ABElementBuilder = __webpack_require__(5);
var AIElementBuilder = __webpack_require__(6);
var AirARNKSegmentBuilder = __webpack_require__(7);
var AirFlownSegmentBuilder = __webpack_require__(8);
var AirOpenSegmentBuilder = __webpack_require__(9);
var AirSegmentBuilder = __webpack_require__(10);
var AllAirSegmentBuilder = __webpack_require__(11);
var AMElementBuilder = __webpack_require__(12);
var APElementBuilder = __webpack_require__(13);
var AuxCarSegmentBuilder = __webpack_require__(14);
var AuxHotelSegmentBuilder = __webpack_require__(15);
var CarSegmentBuilder = __webpack_require__(16);
var ConnexionElementBuilder = __webpack_require__(17);
var FAElementBuilder = __webpack_require__(18);
var FDElementBuilder = __webpack_require__(19);
var FEElementBuilder = __webpack_require__(20);
var FHElementBuilder = __webpack_require__(21);
var FIElementBuilder = __webpack_require__(22);
var FMElementBuilder = __webpack_require__(23);
var FOElementBuilder = __webpack_require__(24);
var FPElementBuilder = __webpack_require__(25);
var FSElementBuilder = __webpack_require__(26);
var FTElementBuilder = __webpack_require__(27);
var FVElementBuilder = __webpack_require__(28);
var GroupNameElementBuilder = __webpack_require__(29);
var HeaderBuilder = __webpack_require__(30);
var HotelSegmentBuilder = __webpack_require__(31);
var INSSegmentBuilder = __webpack_require__(32);
var MISCSegmentBuilder = __webpack_require__(33);
var NameElementBuilder = __webpack_require__(34);
var OPElementBuilder = __webpack_require__(35);
var OSIElementBuilder = __webpack_require__(36);
var RCElementBuilder = __webpack_require__(40);
var ReceiveFromElementBuilder = __webpack_require__(41);
var RIElementsBuilder = __webpack_require__(42);
var RMElementBuilder = __webpack_require__(43);
var SSRElementsBuilder = __webpack_require__(44);
var TKElementBuilder = __webpack_require__(45);
var TrainSegmentBuilder = __webpack_require__(46);

module.exports = (function () {
    /**
     * Represents PNRObjectBuilder which will get all properties to build PNR object.
     *
     * @private
     * @constructs PNRObjectBuilder
     * @property {Object.<Map>} jsonElementsMap Property of PNRJSONMapper. This is a Map with key as segment name and value as array of segment data.
     */
    function PNRObjectBuilder(jsonElementsMap) {
        this.jsonElementsMap = jsonElementsMap;
    }
    /**
     * Gets ABElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<ABElement>} Array of ABElement objects
     */
    PNRObjectBuilder.prototype.getABElements = function () {
        return new ABElementBuilder().parseABElements(this.jsonElementsMap);
    };
    /**
     * Gets AIElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AIElement>} Array of AIElement objects
     */
    PNRObjectBuilder.prototype.getAIElements = function () {
        return new AIElementBuilder().parseAIElements(this.jsonElementsMap);
    };
    /**
     * Gets AirSegment objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AirSegment>} Array of AirSegment objects
     */
    PNRObjectBuilder.prototype.getAirSegments = function () {
        return new AirSegmentBuilder().parseAirSegments(this.jsonElementsMap);
    };
    /**
     * Gets INSElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<INSElement>} Array of INSElement objects
     */
    PNRObjectBuilder.prototype.getINSSegments = function () {
        return new INSSegmentBuilder().parseINSSegments(this.jsonElementsMap);
    };
    /**
     * Gets AMElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AMElement>} Array of AMElement objects
     */
    PNRObjectBuilder.prototype.getAMElements = function () {
        return new AMElementBuilder().parseAMElements(this.jsonElementsMap);
    };
    /**
     * Gets APElement objects
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<APElement>} Array of APElement objects
     */
    PNRObjectBuilder.prototype.getAPElements = function () {
        return new APElementBuilder().parseAPElements(this.jsonElementsMap);
    };

    /**
     * Gets MISCSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<MISCSegment>} Array of MISCSegment objects
     */
    PNRObjectBuilder.prototype.getMISCSegments = function () {
        return new MISCSegmentBuilder().parseMISCSegments(this.jsonElementsMap);
    };

    /**
     * Gets HotelSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<HotelSegment>} Array of HotelSegment objects
     */
    PNRObjectBuilder.prototype.getHotelSegments = function () {
        return new HotelSegmentBuilder().parseHotelSegments(this.jsonElementsMap);
    };

    /**
     * Gets Header objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Object.<Header>} Header object
     */
    PNRObjectBuilder.prototype.getHeader = function () {
        return new HeaderBuilder().parseHeader(this.jsonElementsMap);
    };

    /**
     * Gets CarSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<CarSegment>} Array of CarSegment objects
     */
    PNRObjectBuilder.prototype.getCarSegments = function () {
        return new CarSegmentBuilder().parseCarSegments(this.jsonElementsMap);
    };

    /**
     * Gets AuxHotelSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AuxHotelSegment>} Array of AuxHotelSegment objects
     */
    PNRObjectBuilder.prototype.getAuxHotelSegments = function () {
        return new AuxHotelSegmentBuilder().parseAuxHotelSegments(this.jsonElementsMap);
    };

    /**
     * Gets AuxCarSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AuxCarSegment>} Array of AuxCarSegment objects
     */
    PNRObjectBuilder.prototype.getAuxCarSegments = function () {
        return new AuxCarSegmentBuilder().parseAuxCarSegments(this.jsonElementsMap);
    };

    /**
     * Gets AirOpenSegment objects
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AirOpenSegment>} Array of AirOpenSegment objects
     */
    PNRObjectBuilder.prototype.getAirOpenSegments = function () {
        return new AirOpenSegmentBuilder().parseAirOpenSegments(this.jsonElementsMap);
    };

    /**
     * Gets AirFlownSegment objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AirFlownSegment>} Array of AirFlownSegment objects
     */
    PNRObjectBuilder.prototype.getAirFlownSegments = function () {
        return new AirFlownSegmentBuilder().parseAirFlownSegments(this.jsonElementsMap);
    };

    /**
     * Gets AllAirSegments.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AllAirSegment>} Array of AllAirSegments objects
     */
    PNRObjectBuilder.prototype.getAllAirSegments = function () {
        return new AllAirSegmentBuilder().parseAllAirSegments(this.jsonElementsMap);
    };

    /**
     * Gets FDElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FDElement>} Array of FDElement objects
     */
    PNRObjectBuilder.prototype.getFDElements = function () {
        return new FDElementBuilder().parseFDElements(this.jsonElementsMap);
    };

    /**
     * Gets AirARNKSegment objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<AirARNKSegment>} Array of AirARNKSegment objects
     */
    PNRObjectBuilder.prototype.getAirARNKSegments = function () {
        return new AirARNKSegmentBuilder().parseAirARNKSegments(this.jsonElementsMap);
    };

    /**
     * Gets NameElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<NameElement>} Array of NameElement objects
     */
    PNRObjectBuilder.prototype.getNameElements = function () {
        return new NameElementBuilder().parseNameElements(this.jsonElementsMap);
    };

    /**
     * Gets RMElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<RMElement>} Array of RMElement objects
     */
    PNRObjectBuilder.prototype.getRMElements = function () {
        return new RMElementBuilder().parseRMElements(this.jsonElementsMap);
    };

    /**
     * Gets GroupNameElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Object.<GroupNameElement>} GroupNameElement object
     */
    PNRObjectBuilder.prototype.getGroupNameElement = function () {
        return new GroupNameElementBuilder().parseGroupNameElement(this.jsonElementsMap);
    };
    /**
     * Gets SSRElement object.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Object.<SSRElements>} Object of SSRElements
     */
    PNRObjectBuilder.prototype.getSSRElements = function () {
        return new SSRElementsBuilder().parseSSRElements(this.jsonElementsMap);
    };


    /**
     * Gets OSIElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<OSIElement>} Array of OSIElement objects
     */
    PNRObjectBuilder.prototype.getOSIElements = function () {
        return new OSIElementBuilder().parseOSIElements(this.jsonElementsMap);
    };

    /**
     * Gets FP objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FPElement>} Array of FP objects
     */
    PNRObjectBuilder.prototype.getFPElements = function () {
        return new FPElementBuilder().parseFPElements(this.jsonElementsMap);
    };
    /**
     * Gets RCElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<RCElement>} Array of RCElement objects
     */
    PNRObjectBuilder.prototype.getRCElements = function () {
        return new RCElementBuilder().parseRCElements(this.jsonElementsMap);
    };

    /**
     * Gets FIElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FIElement>} Array of FIElement objects
     */
    PNRObjectBuilder.prototype.getFIElements = function () {
        return new FIElementBuilder().parseFIElements(this.jsonElementsMap);
    };
    /**
     * Gets FMElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FMElement>} Array of FMElement objects
     */
    PNRObjectBuilder.prototype.getFMElements = function () {
        return new FMElementBuilder().parseFMElements(this.jsonElementsMap);
    };
    /**
     * Gets TKElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<TKElement>} Array of TKElement objects
     */
    PNRObjectBuilder.prototype.getTKElements = function () {
        return new TKElementBuilder().parseTKElements(this.jsonElementsMap);
    };

    /**
     * Gets RIElement objects.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Object.<RIElements>} Array of RIElement Arrays.
     */
    PNRObjectBuilder.prototype.getRIElements = function () {
        return new RIElementsBuilder().parseRIElements(this.jsonElementsMap);
    };

    /**
     * Gets ConnexionElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<ConnexionElement>} Array of ConnexionElement objects
     */
    PNRObjectBuilder.prototype.getConnexionElements = function () {
        return new ConnexionElementBuilder().parseConnexionElements(this.jsonElementsMap);
    };
    /**
     * Gets FAElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FAElement>} Array of FAElement objects
     */
    PNRObjectBuilder.prototype.getFAElements = function () {
        return new FAElementBuilder().parseFAElements(this.jsonElementsMap);
    };
    /**
     * Gets ReceiveFromElement.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Object.<ReceiveFromElement>} ReceiveFromElement object
     */
    PNRObjectBuilder.prototype.getReceiveFromElement = function () {
        return new ReceiveFromElementBuilder().parseReceiveFromElement(this.jsonElementsMap);
    };
    /**
     * Gets TrainSegments.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<TrainSegment>} Array of TrainSegment objects
     */
    PNRObjectBuilder.prototype.getTrainSegments = function () {
        return new TrainSegmentBuilder().parseTrainSegments(this.jsonElementsMap);
    };

    /**
     * Gets FEElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FEElement>} Array of FEElement objects
     */
    PNRObjectBuilder.prototype.getFEElements = function () {
        return new FEElementBuilder().parseFEElements(this.jsonElementsMap);
    };
    /**
     * Gets FHElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FHElement>} Array of FHElement objects
     */
    PNRObjectBuilder.prototype.getFHElements = function () {
        return new FHElementBuilder().parseFHElements(this.jsonElementsMap);
    };
    /**
     * Gets FOElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FOElement>} Array of FOElement objects
     */
    PNRObjectBuilder.prototype.getFOElements = function () {
        return new FOElementBuilder().parseFOElements(this.jsonElementsMap);
    };
    /**
     * Gets FSElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FSElement>} Array of FSElement objects
     */
    PNRObjectBuilder.prototype.getFSElements = function () {
        return new FSElementBuilder().parseFSElements(this.jsonElementsMap);
    };
    /**
     * Gets FTElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FTElement>} Array of FTElement objects
     */
    PNRObjectBuilder.prototype.getFTElements = function () {
        return new FTElementBuilder().parseFTElements(this.jsonElementsMap);
    };
    /**
     * Gets FVElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<FVElement>} Array of FVElement objects
     */
    PNRObjectBuilder.prototype.getFVElements = function () {
        return new FVElementBuilder().parseFVElements(this.jsonElementsMap);
    };
    /**
     * Gets OPElements.
     *
     * @private @memberOf PNRObjectBuilder
     * @instance
     * @returns {Array.<OPElement>} Array of OPElement objects
     */
    PNRObjectBuilder.prototype.getOPElements = function () {
        return new OPElementBuilder().parseOPElements(this.jsonElementsMap);
    };
    return PNRObjectBuilder;
})();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var Utils = __webpack_require__(2);
var RCElement = (function () {
    /**
     * Represents RCElement.
     *
     * @constructs RCElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string[]} officeIds Array containing Office IDs that are given Read or write or both access to this RC Element
     * @property {string} freeFlowText Text associated to this element
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function RCElement() {
        this.elementNumber = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.officeIds = [];
        this.freeFlowText = "";
        this.fullNode = null;
        this.associations = null;
    }
    return RCElement;
})();

module.exports = (function () {
    /**
     * Represents RCElementBuilder.
     *
     * @private
     * @constructs RCElementBuilder
     */
    function RCElementBuilder() {}

    /**
     * Parsing RCElement.
     *
     * @private
     * @memberof RCElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<RCElement>} Array of RCElement objects
     */
    RCElementBuilder.prototype.parseRCElements = function (pnrJSONMap) {
        var rcJSONElements = pnrJSONMap.get(CONSTANTS.CONFIDENTIAL_REMARK);
        var rcElements = [];
        //loop through each dataElementsIndiv
        for (var index = 0; index < rcJSONElements.length; index++) {
            var objRCElement = new RCElement();
            objRCElement.elementNumber = rcJSONElements[index].elementManagementData.lineNumber;
            objRCElement.fullNode = rcJSONElements[index];
            objRCElement.segmentType = rcJSONElements[index].elementManagementData.reference.qualifier;
            objRCElement.tatooNumber = rcJSONElements[index].elementManagementData.reference.number;
            objRCElement.associations = rcJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(rcJSONElements[index].referenceForDataElement.reference) : null;
            if (rcJSONElements[index].miscellaneousRemarks != null) {
                objRCElement = getFreeFlowAndOfficeIDs(rcJSONElements[index].miscellaneousRemarks, objRCElement);
            }
            rcElements.push(objRCElement);
        }
        return rcElements;
    };

    /**
     * Parsing getDiscountCode.
     *
     * @private
     * @memberOf RCElementBuilder
     * @inner
     * @param {Object} json object containing officeIds and FreeFlow properties
     * @param {Object.<RCElement>} RCElement object
     */
    function getFreeFlowAndOfficeIDs(miscellaneousRemarks, objRCElement) {
        if (miscellaneousRemarks.individualSecurity != null) {
            var individualSecurity = miscellaneousRemarks.individualSecurity;
            objRCElement = setOfficeIds(objRCElement, individualSecurity);
            if (miscellaneousRemarks.remarks.freetext != null) {
                objRCElement.freeFlowText = miscellaneousRemarks.remarks.freetext;
            }
        }
        return objRCElement;
    }
    /**
     * Sets Office Ids of the corresponding Confidential RemarkElement
     *
     * @private
     * @param {Object.<RCElement>} objRCElement
     * @param {Object} individualSecurity
     */
    function setOfficeIds(objRCElement, individualSecurity) {
        var individualSecurityArray = new Utils().ifObjectConvertItIntoArray(individualSecurity);
        for (var i = 0; i < individualSecurityArray.length; i++) {
            if (individualSecurityArray[i].office != null && objRCElement.officeIds.indexOf(individualSecurityArray[i].office) === -1) {
                objRCElement.officeIds.push(individualSecurityArray[i].office);
            }
        }
        return objRCElement;
    }
    return RCElementBuilder;
})();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var ReceiveFromElement = (function () {
    /**
     * Represents ReceiveFromElement.
     *
     * @constructs ReceiveFromElement
     * @property {string} receiveFrom
     */
    function ReceiveFromElement() {
        this.receiveFrom = "";
    }
    return ReceiveFromElement;
})();

module.exports = (function () {
    /**
     * Represents ReceiveFromElementBuilder.
     *
     * @private
     * @constructs ReceiveFromElementBuilder
     */
    function ReceiveFromElementBuilder() {}

    /**
     * Parses PNR response to get ReceiveFromElements
     *
     * @private
     * @memberof ReceiveFromElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Object.<ReceiveFromElement>} ReceiveFromElement object
     */
    ReceiveFromElementBuilder.prototype.parseReceiveFromElement = function (pnrJSONMap) {
        var receiveFromElementJSONElement = pnrJSONMap.get(CONSTANTS.RECEIVE_FROM);
        var objReceiveFromElement = new ReceiveFromElement();
        if (receiveFromElementJSONElement) {
            objReceiveFromElement.receiveFrom = receiveFromElementJSONElement.otherDataFreetext ? receiveFromElementJSONElement.otherDataFreetext.longFreetext : "";
        }
        return objReceiveFromElement;
    };
    return ReceiveFromElementBuilder;
})();

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var RIElements = (function () {
    /**
     * Represents RIElements.
     *
     * @constructs RIElements
     * @property {List.<RIElement>} riaElements Array of AdjRmkInvoice Element objects
     * @property {List.<RIElement>} ribElements Array of AgencyBillingDueDate Element objects
     * @property {List.<RIElement>} ricElements Array of PrintAgencyDueDate Element objects
     * @property {List.<RIElement>} ridElements Array of AgencyDueDate Element objects
     * @property {List.<RIElement>} rifElements Array of FreeflowInvRemark Element objects
     * @property {List.<RIElement>} riiElements Array of InvItineraryRmk Element objects
     * @property {List.<RIElement>} ripElements Array of InvoiceRemark Element objects
     * @property {List.<RIElement>} rimElements Array of ProfileItineraryRmk Element objects
     * @property {List.<RIElement>} rioElements Array of ItineraryInvRmk Element objects
     * @property {List.<RIElement>} rirElements Array of ItineraryRemark Element objects
     * @property {List.<RIElement>} risElements Array of ServiceFeeRemark Element objects
     * @property {List.<RIElement>} ritElements Array of OverrideInvTotal Element objects
     * @property {List.<RIElement>} rizElements Array of ATBMiniItinerary, FillerStrip, ITR Element objects
     */
    function RIElements() {
        this.riaElements = [];
        this.ribElements = [];
        this.ricElements = [];
        this.ridElements = [];
        this.rifElements = [];
        this.riiElements = [];
        this.rimElements = [];
        this.rioElements = [];
        this.ripElements = [];
        this.rirElements = [];
        this.risElements = [];
        this.ritElements = [];
        this.rizElements = [];
    }
    return RIElements;
})();

module.exports = (function () {
    /**
     * Represents RIElementsBuilder.
     *
     * @private
     * @constructs RIElementsBuilder
     */
    function RIElementsBuilder() {

    }
    /**
     * Parses PNR response to get RI elements
     *
     * @private
     * @memberof RIElementsBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Object.<RIElements>} Array of RI elements
     */
    RIElementsBuilder.prototype.parseRIElements = function (pnrJSONMap) {
        var constantsArray = [CONSTANTS.RIA, CONSTANTS.RIB, CONSTANTS.RIC, CONSTANTS.RID, CONSTANTS.RIF, CONSTANTS.RII, CONSTANTS.RIM, CONSTANTS.RIO, CONSTANTS.RIP, CONSTANTS.RIR, CONSTANTS.RIS, CONSTANTS.RIT, CONSTANTS.RIZ];
        var riElements = new RIElements();
        var riElementsPropertyNamesArray = ["riaElements", "ribElements", "ricElements", "ridElements", "rifElements", "riiElements", "rimElements", "rioElements", "ripElements", "rirElements", "risElements", "ritElements", "rizElements"];
        for (var index = 0; index < riElementsPropertyNamesArray.length; index++) {
            var jsonElements = pnrJSONMap.get(constantsArray[index]);
            if (jsonElements.length > 0) {
                assignRIPseudoElements(jsonElements, riElements[riElementsPropertyNamesArray[index]]);
            }
        }
        return riElements;
    };
    /**
     * Represents a basic RI Element.
     *
     * @constructs RIElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIElement = function () {
        this.elementNumber = "";
        this.fullNode = null;
        this.segmentType = "";
        this.tatooNumber = "";
        this.associations = null;
    };
    /**
     * Represents a RIA Element.
     *
     * @constructs RIAElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIAElement = RIElement;

    /**
     * Represents a RIB Element.
     *
     * @constructs RIBElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIBElement = RIElement;

    /**
     * Represents a RIC Element.
     *
     * @constructs RICElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RICElement = RIElement;

    /**
     * Represents a RID Element.
     *
     * @constructs RIDElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIDElement = RIElement;

    /**
     * Represents a RIF Element.
     *
     * @constructs RIFElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIFElement = RIElement;

    /**
     * Represents a RII Element.
     *
     * @constructs RIIElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIIElement = RIElement;

    /**
     * Represents a RIM Element.
     *
     * @constructs RIMElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIMElement = RIElement;

    /**
     * Represents a RIO Element.
     *
     * @constructs RIOElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIOElement = RIElement;

    /**
     * Represents a RIP Element.
     *
     * @constructs RIPElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIPElement = RIElement;

    /**
     * Represents a RIR Element.
     *
     * @constructs RIRElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIRElement = RIElement;

    /**
     * Represents a RIS Element.
     *
     * @constructs RISElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RISElement = RIElement;

    /**
     * Represents a RIT Element.
     *
     * @constructs RITElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RITElement = RIElement;

    /**
     * Represents a RIZ Element.
     *
     * @constructs RIZElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array<Association>} associations @property {Array.<Association>} associations  Passenger and Segment Associations
     */
    var RIZElement = RIElement;

    /**
     * assignRIPseudoElements.
     *
     * @private
     * @memberOf RIElementBuilder
     * @inner
     * @param {Object} riPseudoJSONElements JSON node.
     * @param {Object} elementsArray RIElements Object.
     */
    function assignRIPseudoElements(riPseudoJSONElements, elementsArray) {
        for (var i = 0; i < riPseudoJSONElements.length; i++) {
            var ri_Element = new RIElement();
            ri_Element.elementNumber = riPseudoJSONElements[i].elementManagementData.lineNumber;
            ri_Element.tatooNumber = riPseudoJSONElements[i].elementManagementData.reference.number;
            ri_Element.segmentType = riPseudoJSONElements[i].elementManagementData.reference.qualifier;
            ri_Element.fullNode = riPseudoJSONElements[i];
            var referenceForDataElement = riPseudoJSONElements[i].referenceForDataElement;
            ri_Element.associations = referenceForDataElement ? new AssociationBuilder().getAssociations(referenceForDataElement.reference) : null;
            elementsArray[elementsArray.length] = ri_Element;
        }
    }
    return RIElementsBuilder;
})();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var RMElement = (function () {
    /**
     * Represents RMElement.
     *
     * @constructs RMElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment associations
     * @property {Object} fullNode JSON Object containing the complete information about this element
     */
    function RMElement() {
        this.elementNumber = "";
        this.tatooNumber = "";
        this.segmentType = "";
        this.freeFlowText = "";
        this.category = "";
        this.associations = null;
        this.fullNode = null;
    }
    return RMElement;
})();

module.exports = (function () {
    /**
     * Represents RMElementBuilder.
     *
     * @private
     * @constructs RMElementBuilder
     */
    function RMElementBuilder() {}

    /**
     * Parsing RMElement.
     *
     * @private
     * @memberof RMElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<RMElement>} Array of RMElement objects
     */
    RMElementBuilder.prototype.parseRMElements = function (pnrJSONMap) {
        var RMElementJSONElements = pnrJSONMap.get(CONSTANTS.REMARK);
        var RMElements = [];
        //loop through each RMElement
        for (var index = 0; index < RMElementJSONElements.length; index++) {
            var objRemark = new RMElement();
            objRemark.elementNumber = RMElementJSONElements[index].elementManagementData.lineNumber;
            objRemark.fullNode = RMElementJSONElements[index];
            objRemark.associations = RMElementJSONElements[index].referenceForDataElement ? new AssociationBuilder().getAssociations(RMElementJSONElements[index].referenceForDataElement.reference) : null;
            objRemark.tatooNumber = RMElementJSONElements[index].elementManagementData.reference.number;
            objRemark.segmentType = RMElementJSONElements[index].elementManagementData.reference.qualifier;
            var structuredRemark = RMElementJSONElements[index].extendedRemark.structuredRemark;
            if(structuredRemark)
            {
                objRemark.freeFlowText = structuredRemark.freetext ? structuredRemark.freetext : "";
                objRemark.category = structuredRemark.category ? structuredRemark.category : "";
            }
            RMElements.push(objRemark);
        }
        return RMElements;
    };

    return RMElementBuilder;
})();

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var SSRElements = (function () {
    /**
     * Represents SSRElements.
     *
     * @private
     * @constructs SSRElements
     * @property {Array.<SSRElement>} SeatElements Array of SeatElement objects
     * @property {Array.<SSRElement>} FOIDElements Array of FOIDElement objects
     * @property {Array.<SSRElement>} FQTRElements Array of FQTRElement objects
     * @property {Array.<SSRElement>} FQTSElements Array of FQTSElement objects
     * @property {Array.<SSRElement>} FQTVElements Array of FQTVElement objects
     * @property {Array.<SSRElement>} FQTUElements Array of FQTUElement objects
     * @property {Array.<SSRElement>} OtherElements Array of SSROTHERElement objects
     * @property {Array.<SSRElement>} orderedSSRArr Array of all these Elements, in the order of the PNR
     */
    function SSRElements() {
        this.SeatElements = [];
        this.FOIDElements = [];
        this.FQTRElements = [];
        this.FQTVElements = [];
        this.FQTSElements = [];
        this.FQTUElements = [];
        this.OtherElements = [];
        this.orderedSSRArr = [];
    }

    return SSRElements;
})();

var SSRElement = (function () {

    /**
     * Represents basic SSRElement
     *
     * @private
     * @constructs SSRElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    function SSRElement() {
        this.elementNumber = null;
        this.fullNode = null;
        this.tatooNumber = null;
        this.segmentType = "";
        this.associations = null;
        this.freeFlowText = "";
    }
    return SSRElement;
})();

/**
     * Represents a SeatElement.
     *
     * @constructs SeatElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var SeatElement = SSRElement;

    /**
     * Represents a FOIDElement.
     *
     * @constructs FOIDElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var FOIDElement = SSRElement;

    /**
     * Represents a FQTRElement.
     *
     * @constructs FQTRElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var FQTRElement = SSRElement;

    /**
     * Represents a FQTSElement.
     *
     * @constructs FQTSElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var FQTSElement = SSRElement;

    /**
     * Represents a FQTVElement.
     *
     * @constructs FQTVElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var FQTVElement = SSRElement;

    /**
     * Represents a FQTUElement.
     *
     * @constructs FQTUElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var FQTUElement = SSRElement;

    /**
     * Represents a SSROTHERElement.
     *
     * @constructs SSROTHERElement
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT, ST or OT
     * @property {string} freeFlowText Text associated to this element
     * @property {Array.<Association>} associations Passenger and Segment Associations
     */
    var SSROTHERElement = SSRElement;

module.exports = (function () {
    /**
     * Represents SSRElementsBuilder.
     *
     * @private
     * @constructs SSRElementsBuilder
     */
    function SSRElementsBuilder() {

    }
    /**
     * Parses PNR response to get SSRElements elements
     *
     * @private
     * @memberof SSRElementsBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<SSRElements>} Array of SSRElements elements
     */
    SSRElementsBuilder.prototype.parseSSRElements = function (pnrJSONMap) {
        var constantsArray = [CONSTANTS.SSR_ELEMENT_CODES.SEAT, CONSTANTS.SSR_ELEMENT_CODES.FOID, CONSTANTS.SSR_ELEMENT_CODES.FQTR, CONSTANTS.SSR_ELEMENT_CODES.FQTS, CONSTANTS.SSR_ELEMENT_CODES.FQTU, CONSTANTS.SSR_ELEMENT_CODES.FQTV, CONSTANTS.SSR_ELEMENT_CODES.OTHER];
        var ssrElementsPropertyNamesArray = ["SeatElements", "FOIDElements", "FQTRElements", "FQTSElements", "FQTUElements", "FQTVElements", "OtherElements"];
        var ssrElements = new SSRElements();
        var unorderedFullList = [];
        for (var index = 0; index < ssrElementsPropertyNamesArray.length; index++) {
            var jsonElements = pnrJSONMap.get(constantsArray[index]);
            if (jsonElements.length > 0) {
                var elementsList = buildSSRPseudoElements(jsonElements);
                ssrElements[ssrElementsPropertyNamesArray[index]] = elementsList;
                unorderedFullList = unorderedFullList.concat(elementsList);
            }
        }
        ssrElements.orderedSSRArr = unorderedFullList.sort(compare);
        return ssrElements;
    };

    /**
     * Creates and sets the properties for each SSRPseudoElement from the data list provided, and returns an Array of SSRPseudoElements
     *
     * @private @memberOf SSRElementsBuilder
     * @param {Array.<Object>} JSONList Contains the Array of JTokens of respective SSRPseudoElements
     */
    function buildSSRPseudoElements(JSONList) {
        ssrPseudoElements = [];
        for (var i = 0; i < JSONList.length; i++) {
            var ssrPseudoElement = new SSRElement();
            ssrPseudoElement.elementNumber = JSONList[i].elementManagementData.lineNumber;
            ssrPseudoElement.fullNode = JSONList[i];
            ssrPseudoElement.tatooNumber = JSONList[i].elementManagementData.reference.number;
            ssrPseudoElement.segmentType = JSONList[i].elementManagementData.reference.qualifier;
            ssrPseudoElement.associations = JSONList[i].referenceForDataElement ? new AssociationBuilder().getAssociations(JSONList[i].referenceForDataElement.reference) : null;
            ssrPseudoElement.freeFlowText = JSONList[i].serviceRequest.ssr.freeText ? JSONList[i].serviceRequest.ssr.freeText : null;
            ssrPseudoElements.push(ssrPseudoElement);
        }
        return ssrPseudoElements;
    };
    /**
     * sort two object according to elementNumber
     *
     * @private @memberOf SSRElementsBuilder
     * @inner
     * @param {firstObj} First Object of array
     * @param {secondObj} Second Object of array
     */
    function compare(firstObj, secondObj) {
        if (firstObj.elementNumber < secondObj.elementNumber) {
            return -1;
        }
        if (firstObj.elementNumber > secondObj.elementNumber) {
            return 1;
        }
        return 0;
    }

    return SSRElementsBuilder;
})();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var TKElement = (function () {
    /**
     * Represents TKElement.
     *
     * @constructs TKElement
     * @property {string} elementNumber The Cryptic Line Number of this element in the PNR
     * @property {string} ticketingAction status
     * @property {string} freeFlowText Text associated to this element
     * @property {string} ticketingDate Ticket date
     * @property {string} queuePlacement Placement of the Ticket in the Queue
     * @property {string} ticketingOfficeID OfficeID where the ticket is issued
     * @property {string} ticketingTime Ticket time
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {Array.<Association>} associations Passenger and Segment Associations
     * @property {Object} fullNode JSON Object containing the complete information about this Element
     */
    function TKElement() {
        this.elementNumber = "";
        this.ticketingAction = "";
        this.freeFlowText = "";
        this.ticketingDate = "";
        this.ticketingOfficeID = "";
        this.queuePlacement = "";
        this.ticketingTime = "";
        this.segmentType = "";
        this.tatooNumber = "";
        this.associations = null;
        this.fullNode = null;
    }

    return TKElement;
})();

module.exports = (function () {
    /**
     * Represents TKElementBuilder.
     *
     * @private
     * @constructs TKElementBuilder
     */
    function TKElementBuilder() {}
    /**
     * Setting queuePlacement, ticketingDate and time of TKElements.
     *
     * @private
     * @memberof TKElementBuilder
     * @param {Obj} TKElement Object instance
     * @param {Map} TKElements JSON node
     * @returns {Obj} TKElement Object instance
     */
    var setQueuecategoryDateTime = function (objTkt, ticket) {
        if (ticket) {
            objTkt.ticketingDate = (ticket.date) ? ticket.date : "";
            objTkt.ticketingOfficeID = (ticket.officeId) ? ticket.officeId.trim() : "";
            if (ticket.queuePlacement && ticket.queueNumber) {
                objTkt.queuePlacement = "Q" + ticket.queueNumber + "C" + ticket.queuePlacement;
            }
            objTkt.ticketingTime = (ticket.time) ? ticket.time : "";
        }
        return objTkt;
    };

    /**
     * Parsing TKElement.
     *
     * @memberof TKElementBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<TKElement>} Array of TKElement objects
     */
    TKElementBuilder.prototype.parseTKElements = function (pnrJSONMap) {
        var tkJSONElements = pnrJSONMap.get(CONSTANTS.TICKET);
        var tkElements = [];
        for (index = 0; index < tkJSONElements.length; index++) {
            var objTkt = new TKElement();
            objTkt.ticketingAction = (tkJSONElements[index].ticketElement.ticket.indicator) ? tkJSONElements[index].ticketElement.ticket.indicator : '';
            objTkt.freeFlowText = (tkJSONElements[index].ticketElement.ticket.freetext) ? tkJSONElements[index].ticketElement.ticket.freetext : null;
            objTkt.segmentType = tkJSONElements[index].elementManagementData.reference.qualifier;
            objTkt.tatooNumber = tkJSONElements[index].elementManagementData.reference.number;
            objTkt.associations = (tkJSONElements[index].referenceForDataElement) ? new AssociationBuilder().getAssociations(tkJSONElements[index].referenceForDataElement.reference) : null;
            objTkt.elementNumber = tkJSONElements[index].elementManagementData.lineNumber;
            var ticket = tkJSONElements[index].ticketElement.ticket;
            objTkt = setQueuecategoryDateTime(objTkt, ticket);
            objTkt.fullNode = tkJSONElements[index];
            tkElements.push(objTkt);
        }
        return tkElements;
    };
    return TKElementBuilder;
})();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(0);
var AssociationBuilder = __webpack_require__(1);
var TrainSegment = (function () {
    /**
     * Represents TrainSegment.
     *
     * @constructs TrainSegment
     * @property {string} elementNumber The Cryptic Line Number of this Segment in the PNR
     * @property {string} tatooNumber A unique number to identify when this element is associated to other elements
     * @property {string} segmentType Type of this Segment : PT or ST or OT
     * @property {Object} fullNode JSON Object containing the complete information about this Segment
     * @property {Array.<Association>} associations Passenger and Segment associations
     */
    function TrainSegment() {
        this.elementNumber = "";
        this.fullNode = null;
        this.tatooNumber = "";
        this.segmentType = "";
        this.associations = null;
    }

    return TrainSegment;
})();

module.exports = (function () {
    /**
     * Represents TrainSegmentBuilder.
     *
     * @private
     * @constructs TrainSegmentBuilder
     */
    function TrainSegmentBuilder() {}
    /**
     * Parse PNR response to get TrainSegments
     *
     * @private
     * @memberof TrainSegmentBuilder
     * @instance
     * @param {Object.<Map>} pnrJSONMap Map from PNRJSONMapper.js
     * @returns {Array.<TrainSegment>} Array of TrainSegment objects
     */
    TrainSegmentBuilder.prototype.parseTrainSegments = function (pnrJSONMap) {
        var trainJSONSegments = pnrJSONMap.get(CONSTANTS.TRAIN);
        var trainSegments = [];
        for (var index = 0; index < trainJSONSegments.length; index++) {
            var objTrainSegment = new TrainSegment();
            objTrainSegment.elementNumber = trainJSONSegments[index].elementManagementItinerary.lineNumber;
            objTrainSegment.fullNode = trainJSONSegments[index];
            objTrainSegment.tatooNumber = trainJSONSegments[index].elementManagementItinerary.reference.number;
            objTrainSegment.segmentType = trainJSONSegments[index].elementManagementItinerary.reference.qualifier;
            objTrainSegment.associations = trainJSONSegments[index].referenceForDataElement ? new AssociationBuilder().getAssociations(trainJSONSegments[index].referenceForDataElement.reference) : null;
            trainSegments.push(objTrainSegment);
        }
        return trainSegments;
    };
    return TrainSegmentBuilder;
})();

/***/ })
/******/ ]);