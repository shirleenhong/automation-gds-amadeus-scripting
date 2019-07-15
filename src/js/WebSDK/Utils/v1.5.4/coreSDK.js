!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default;
        } : function getModuleExports() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
}([ function(module, exports) {
    function sendCrypticCommand() {}
    function helperCryptic() {
        this.cmdResponse;
    }
    function getSellConnectUserInfo() {}
    /*!
 * @license
 * Copyright 2016 - Amadeus Development Company S.A.
 * Copyright of this program is the property of AMADEUS,
 * without whose written permission reproduction in whole
 * or in part is prohibited. All rights reserved.
 * Amadeus S.A. B.P. 69 06902 SOPHIA ANTIPOLIS CEDEX
 * http://www.amadeus.com
 */
    var PopUp = function() {};
    PopUp.prototype.GetPopUpId = smartScriptSession.getPopupId;
    var Helper = function() {};
    Helper.prototype.getParamFromUrl = function(parameter) {
        return smartScriptSession.qsParams[parameter];
    }, Helper.prototype.$waitUntil = function(onComplete, delay, timeout, onAbort) {
        var counter = 1, intervalId = setInterval(function() {
            counter === timeout ? (onAbort(), clearInterval(intervalId)) : "undefined" != typeof catalog && (onComplete(), 
            clearInterval(intervalId)), counter++;
        }, delay);
    }, Helper.prototype.onAbort = function() {
        console.log("Catalog intial connection as timed out");
    }, sendCrypticCommand.prototype.SendCryptic = function(cmd) {
        return new Promise(function(fulfill, reject) {
            smartScriptSession.send(cmd).then(function(crypticResponse) {
                var modifiedResponse = crypticResponse;
                modifiedResponse.Response = crypticResponse.Response.toString().replace(/\s+$/, ""), 
                fulfill(modifiedResponse);
            }, function(error) {
                reject(error);
            });
        });
    }, sendCrypticCommand.prototype.SendCrypticWS = function(cmd) {
        return new Promise(function(fulfill, reject) {
            var input = JSON.parse('{"messageAction": {"messageFunctionDetails":{"messageFunction":"M"}},"longTextString":{ "textStringDetails":"' + cmd + '"}}');
            smartScriptSession.sendWS("ws.commandCryptic_v7.3.1A", input).then(function(crypticResponse) {
                var modifiedResponse = crypticResponse;
                modifiedResponse.Response = crypticResponse.Response.toString().replace(/\s+$/, ""), 
                fulfill(modifiedResponse);
            }, function(error) {
                reject(error);
            });
        });
    }, sendCrypticCommand.prototype.CrypticCallBack = function(crypticData) {
        var self = this;
        crypticData.Response = crypticData.Response.toString().replace(/\s+$/, ""), self.fulfill(crypticData);
    }, sendCrypticCommand.prototype.CrypticWSCallBack = function(crypticWSData) {
        var self = this;
        try {
            crypticWSData.longTextString.textStringDetails = crypticWSData.longTextString.textStringDetails.toString().replace(/\s+$/, ""), 
            self.fulfill(crypticWSData);
        } catch (e) {
            self.reject(e.message);
        }
    }, helperCryptic.prototype.GetCrypticResponse = smartScriptSession.getFullCryptic, 
    helperCryptic.prototype.GetMultiPageResponse = function(crypyData) {
        var self = this;
        self.cmdResponse = crypyData, new sendCrypticCommand().SendCryptic("mdr").then(function(mdData) {
            self.cmdResponse = self.cmdResponse.replace(/\s+$/, ""), self.cmdResponse = self.cmdResponse.substr(0, self.cmdResponse.length - 2) + mdData.Response.toString().replace(/\s+$/, ""), 
            ")>" === self.cmdResponse.toString().slice(-2) ? self.GetMultiPageResponse(self.cmdResponse) : self.fulfill(self.cmdResponse);
        });
    }, getSellConnectUserInfo.prototype.Register = function(type) {
        if ("userManagement" === type) return smartScriptSession.retrieveUser();
    }, module.exports = {
        PopUp: PopUp,
        Helper: Helper,
        sendCrypticCommand: sendCrypticCommand,
        helperCryptic: helperCryptic,
        getSellConnectUserInfo: getSellConnectUserInfo
    };
}, function(module, exports) {
    module.exports = smartScriptUtils = function() {
        var Utils = function() {
            this.conf = {
                alphaDictionary: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            };
        };
        return Utils.prototype.removeDuplicate = function(arrayToFilter) {
            log.debug("smartScriptUtils.removeDuplicate");
            for (var returnArray = [], i = 0; i < arrayToFilter.length; i++) returnArray.indexOf(arrayToFilter[i]) < 0 && returnArray.push(arrayToFilter[i]);
            return returnArray;
        }, Utils.prototype.simpleCopy = function(objToCopy) {
            var rsltObject;
            if ("object" != typeof objToCopy || Array.isArray(objToCopy)) if (Array.isArray(objToCopy)) {
                rsltObject = [];
                for (var i = 0; i < objToCopy.length; i++) "object" == typeof objToCopy[i] ? rsltObject.push(this.simpleCopy(objToCopy[i])) : rsltObject.push(objToCopy[i]);
            } else rsltObject = objToCopy; else {
                rsltObject = {};
                for (var prop in objToCopy) "object" == typeof objToCopy[prop] ? rsltObject[prop] = this.simpleCopy(objToCopy[prop]) : rsltObject[prop] = objToCopy[prop];
            }
            return rsltObject;
        }, Utils.prototype.overrideProperties = function(confToSet, confToCopy, options) {
            log.debug("smartScriptUtils.overrideProperties");
            var enforceType = void 0 !== options && "boolean" == typeof options.strictType && options.strictType, justInject = void 0 !== options && "boolean" == typeof options.inject && options.inject, nbrCopiedParams = 0;
            if ("object" == typeof confToCopy) for (var param in confToCopy) {
                var doInject = !1;
                doInject = justInject ? !enforceType || void 0 === confToSet[param] || typeof confToCopy[param] == typeof confToSet[param] : "undefined" !== confToSet[param] && (!enforceType || typeof confToCopy[param] == typeof confToSet[param]), 
                doInject && ("object" != typeof confToCopy[param] || Array.isArray(confToCopy[param]) ? (confToSet[param] = this.simpleCopy(confToCopy[param]), 
                nbrCopiedParams++) : (void 0 === confToSet[param] && (confToSet[param] = {}), nbrCopiedParams += this.overrideProperties(confToSet[param], confToCopy[param], options), 
                nbrCopiedParams++));
            }
            return nbrCopiedParams;
        }, Utils.prototype.copyConfiguration = Utils.prototype.overrideProperties, Utils.prototype.normalizeCallback = function(rawCallback, defaultCallback) {
            return log.debug("smartScriptUtils.normalizeCallback"), new SmartScriptCallback(rawCallback, defaultCallback);
        }, Utils.prototype.normalize = function(obj) {
            log.debug("smartScriptUtils.normalize");
            var returnArray = [];
            return void 0 === obj || null === obj || (Array.isArray(obj) ? returnArray = obj : returnArray.push(obj)), 
            returnArray;
        }, Utils.prototype.getParams = function() {
            log.debug("smartScriptUtils.getParams");
            for (var params = {}, vars = window.location.search.substring(1).split("&"), i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (void 0 === params[pair[0]]) params[pair[0]] = decodeURIComponent(pair[1]); else if ("string" == typeof params[pair[0]]) {
                    var arr = [ params[pair[0]], decodeURIComponent(pair[1]) ];
                    params[pair[0]] = arr;
                } else params[pair[0]].push(decodeURIComponent(pair[1]));
            }
            return params;
        }, Utils.prototype.toBoolean = function(value) {
            if (log.debug("smartScriptUtils.toBoolean"), value && 0 !== value.length) {
                var v = "" + value;
                v = v.toLowerCase(), value = !("f" === v || "0" === v || "false" === v || "no" === v || "n" === v);
            } else value = !1;
            return value;
        }, Utils.prototype.padNumber = function(n, width, padWith) {
            return (String(padWith || 0).repeat(width || 2) + String(n)).slice(String(n).length);
        }, Utils.prototype.getRequest = function(urlFile) {
            log.debug("smartScriptUtils.getRequest");
            var cb = new SmartScriptCallback(), promise = cb.getNewPromise(), xhttp = new XMLHttpRequest();
            return xhttp.onreadystatechange = function() {
                4 === this.readyState && (200 === this.status ? (smartScriptProfiler.end("smartScriptUtils.getRequest call"), 
                cb.fulfill(xhttp)) : (smartScriptProfiler.end("smartScriptUtils.getRequest call"), 
                cb.reject(xhttp)));
            }, xhttp.onerror = function() {
                smartScriptProfiler.end("smartScriptUtils.getRequest call"), cb.reject(xhttp);
            }, xhttp.open("GET", urlFile), smartScriptProfiler.start("smartScriptUtils.getRequest call"), 
            xhttp.send(), promise;
        }, Utils.prototype.parseDuration = function(strDuration) {
            log.debug("smartScriptUtils.parseDuration");
            for (var durationPtrn = /(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(\d+h)?(\d+m)?(\d+s)?/, unit = "", number = 0, durationInMS = 0, rslt = durationPtrn.exec(strDuration), i = 1; i <= 7; i++) if (void 0 !== rslt[i]) switch (number = rslt[i].slice(0, rslt[i].length - 1), 
            unit = rslt[i].slice(rslt[i].length - 1)) {
              case "Y":
                durationInMS += 365.25 * number * 24 * 60 * 60 * 1e3;
                break;

              case "M":
                durationInMS += 30 * number * 24 * 60 * 60 * 1e3;
                break;

              case "W":
                durationInMS += 7 * number * 24 * 60 * 60 * 1e3;
                break;

              case "D":
                durationInMS += 24 * number * 60 * 60 * 1e3;
                break;

              case "h":
                durationInMS += 60 * number * 60 * 1e3;
                break;

              case "m":
                durationInMS += 60 * number * 1e3;
                break;

              case "s":
                durationInMS += 1e3 * number;
            }
            return durationInMS;
        }, Utils.prototype.readableTime = function(milisecs) {
            log.debug("smartScriptUtils.readableTime");
            var miliseconds = milisecs % 1e3, rawSeconds = Math.floor(milisecs / 1e3), seconds = rawSeconds % 60, rawMinutes = Math.floor(rawSeconds / 60), minutes = rawMinutes % 60, rawHours = Math.floor(rawMinutes / 60), hours = rawHours % 24, rawDays = Math.floor(rawHours / 24), days = rawDays % 30, rawMonths = Math.floor(rawDays / 30), months = rawMonths % 12, rawYears = Math.floor(rawMonths / 12), years = rawYears;
            return (years > 0 ? years + "Y" : "") + (months > 0 ? months + "M" : "") + (days > 0 ? days + "D" : "") + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "") + (seconds > 0 ? seconds + "s" : "") + (miliseconds > 0 ? miliseconds : "");
        }, Utils.prototype.numToAlpha = function(num, result) {
            var len = this.conf.alphaDictionary.length, preConverted = void 0 !== result ? result : "", decNum = Math.floor(num / len);
            return decNum < 1 ? this.conf.alphaDictionary.charAt(num) + preConverted : this.numToAlpha(decNum, this.conf.alphaDictionary.charAt(num % len) + preConverted);
        }, Utils.prototype.alphaToNum = function(str, result) {
            var len = this.conf.alphaDictionary.length, preConverted = void 0 !== result ? result : 0, num = this.conf.alphaDictionary.indexOf(str.charAt(0)), remain = str.slice(1);
            return remain.length < 1 ? num + preConverted : this.alphaToNum(remain, num * Math.pow(len, str.length - 1) + preConverted);
        }, Utils.prototype.compress = function(strToCompress, param) {
            var defaultOptions = {
                useAlpha: !1
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            if ("object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "string" != typeof strToCompress) return "";
            for (var dictionary = {}, c, wc, w = "", result = [], dictSize = 256, i = 0; i < dictSize; i++) dictionary[String.fromCharCode(i)] = i;
            for (var i = 0, len = strToCompress.length; i < len; i++) c = strToCompress.charAt(i), 
            wc = w + c, dictionary.hasOwnProperty(wc) ? w = wc : (options.useAlpha ? result.push(this.numToAlpha(dictionary[w])) : result.push(dictionary[w]), 
            dictionary[wc] = dictSize++, w = String(c));
            return "" !== w && (options.useAlpha ? result.push(this.numToAlpha(dictionary[w])) : result.push(dictionary[w])), 
            JSON.stringify(result);
        }, Utils.prototype.decompress = function(strToDeCompress, param) {
            var defaultOptions = {
                useAlpha: !1
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            if ("object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "string" != typeof strToDeCompress) return "";
            for (var toDecompress = JSON.parse(strToDeCompress), dictionary = [], w, result, k, entry = "", dictSize = 256, i = 0; i < dictSize; i++) dictionary[i] = String.fromCharCode(i);
            w = options.useAlpha ? String.fromCharCode(this.alphaToNum(toDecompress[0])) : String.fromCharCode(toDecompress[0]), 
            result = w;
            for (var i = 1, len = toDecompress.length; i < len; i++) {
                if (k = options.useAlpha ? this.alphaToNum(toDecompress[i]) : toDecompress[i], dictionary[k]) entry = dictionary[k]; else {
                    if (k !== dictSize) return null;
                    entry = w + w.charAt(0);
                }
                result += entry, dictionary[dictSize++] = w + entry.charAt(0), w = entry;
            }
            return result;
        }, new Utils();
    }();
}, function(module, exports, __webpack_require__) {
    __webpack_require__(10), __webpack_require__(9), __webpack_require__(7), window.log = __webpack_require__(12);
    var SmartScriptProfiler = __webpack_require__(11).SmartScriptProfiler;
    void 0 === window.smartScriptSession && (window.localStorage.removeItem("loglevel"), 
    log.setLevel(log.levels.SILENT, !1), window.smartScriptProfiler = new SmartScriptProfiler()), 
    window.SmartScriptCallback = __webpack_require__(5).SmartScriptCallback, __webpack_require__(1), 
    __webpack_require__(8), window.getConfigUtility = window.smartScriptConfigUtility, 
    window.SmartScriptEncodeDecode = __webpack_require__(6).EncodeDecode, window.parseEncDecCommand = window.SmartScriptEncodeDecode, 
    void 0 === window.smartScriptSession && (module.exports = smartScriptSession = function() {
        var Session = function() {
            log.debug("smartScriptSession.session constructor invocation"), this.scriptSrc = "", 
            this.secoUrl = "", this.doLoadCatalog = !0, this.conf = {
                debugMode: !1,
                profileMode: !1,
                logLevelIfDebug: "TRACE",
                retryIfThrottled: !0,
                throttleDelay: 1e3,
                connectionDelay: 0,
                webSdkPlatform: "/"
            }, this.CONSTANTS = {}, this.webSdkPlatform = "/", this.qsParams = {}, this.smartToolId = "", 
            this.externalCatalogVersion = "", this.LastResponse, this.lasResponse = "", this.lastCommand = "", 
            this.LastCommand = "", sessionScope = this, this.__lastCmdCtx = {}, this.__established = !1, 
            this.__pending_response = !1, this.__pending_delayed_call = !1, this.__throttlingErrors = 0, 
            this.delayedActionsQueue = [], this.nextSteps = [], this.getConf();
        };
        Session.prototype.getConf = function() {
            log.debug("smartScriptSession.getConf"), this.conf.webSdkPlatform = void 0 !== window.webSdkPlatform ? window.webSdkPlatform : this.conf.webSdkPlatform, 
            "object" == typeof window.smartScriptConfiguration && smartScriptUtils.overrideProperties(this.conf, window.smartScriptConfiguration), 
            ("number" != typeof this.conf.connectionDelay || this.conf.connectionDelay < 0) && (this.conf.connectionDelay = 0), 
            this.webSdkPlatform = this.conf.webSdkPlatform, this.conf.debugMode && this.enableDebug(), 
            this.conf.profileMode && this.enableProfile(), smartScriptProfiler.start("from profile activation to established"), 
            this.preInit();
        }, Session.prototype.preInit = function() {
            log.debug("smartScriptSession.preInit"), smartScriptProfiler.start("preInit"), this.qsParams = smartScriptUtils.getParams(), 
            this.smartToolId = void 0 !== this.qsParams.POPUP_ID ? this.qsParams.POPUP_ID : this.smartToolId, 
            this.externalCatalogVersion = void 0 !== this.qsParams.EXTERNAL_CATALOG_VERSION ? this.qsParams.EXTERNAL_CATALOG_VERSION : this.externalCatalogVersion, 
            this.scriptSrc = "", this.secoUrl = "", "" !== document.referrer && (this.scriptSrc = "https://" + document.referrer.replace("https://", "").split("/")[0] + "/ExternalCatalog.js", 
            this.secoUrl = document.referrer), "undefined" != typeof Storage && (sessionStorage.secoSmartScriptCatalogUrl ? this.scriptSrc = sessionStorage.secoSmartScriptCatalogUrl : "" !== this.scriptSrc && (sessionStorage.secoSmartScriptCatalogUrl = this.scriptSrc), 
            sessionStorage.secoUrl ? this.secoUrl = sessionStorage.secoUrl : "" !== this.secoUrl && (sessionStorage.secoUrl = this.secoUrl)), 
            "" === this.scriptSrc && (this.doLoadCatalog = !1), smartScriptProfiler.end("preInit"), 
            this.doLoadCatalog ? this.loadCatalog() : this.postInit();
        }, Session.prototype.loadCatalog = function() {
            log.debug("smartScriptSession.loadCatalog"), smartScriptProfiler.start("loadCatalog");
            var self = this, script = document.createElement("script");
            script.src = this.scriptSrc + "?externalCatalogVersion=" + this.externalCatalogVersion, 
            script.onload = function() {
                smartScriptProfiler.end("loadCatalog"), self.connectToCatalog();
            }, document.getElementsByTagName("head")[0].appendChild(script);
        }, Session.prototype.connectToCatalog = function() {
            log.debug("smartScriptSession.connectToCatalog"), smartScriptProfiler.start("connectToCatalog");
            var self = this;
            this.__patchCatalog(), setTimeout(function() {
                catalog.connect({
                    scope: self,
                    fn: {
                        onSuccess: self.postInit,
                        onError: function(err) {
                            log.error("Error : Connection to Smart Script Catalog failed : " + JSON.stringify(err));
                        }
                    }
                }, self.secoUrl);
            }, this.conf.connectionDelay);
        }, Session.prototype.postInit = function(params) {
            smartScriptProfiler.end("connectToCatalog"), log.debug("smartScriptSession.postInit"), 
            smartScriptProfiler.start("postInit");
            var self = this;
            if (catalog.subscribe("commandpage.notifyResponse", {
                fn: this.__receivedResponse,
                scope: self
            }), void 0 !== params && (self.lastCommand = params.lastCommand, self.LastCommand = params.lastCommand, 
            self.__lastCmdCtx.__fulfill && self.__lastCmdCtx.__fulfill(self.lastCommand)), !0 === this.__pending_response) throw 'SmartSession invalid state : can not be "pending response" right now';
            this.__established = !0, this.processNextAction(), this.processNextStep(), smartScriptProfiler.end("postInit"), 
            smartScriptProfiler.end("from profile activation to established");
        }, Session.prototype.processNextStep = function() {
            if (this.__established) {
                if (this.nextSteps.length > 0) {
                    var nextStep = this.nextSteps.shift();
                    nextStep.fulfill(), this.processNextStep();
                }
            } else log.debug("smartScriptSession.processnextStep :: not established");
        }, Session.prototype.then = function(successCB) {
            var nextStep = new SmartScriptCallback(successCB);
            if (this.__established) {
                log.debug("smartscriptSession.then, established");
                var rslt = nextStep.getPromise();
                return nextStep.fulfill(), rslt;
            }
            return log.debug("smartScriptSession.then, NOT established"), this.nextSteps.push(nextStep), 
            nextStep.getPromise();
        }, Session.prototype.ready = Session.prototype.then, Session.prototype.do = Session.prototype.then, 
        Session.prototype.enableDebug = function(lvl) {
            log.debug("smartScriptSession.enableDebug");
            var level = void 0 !== lvl ? lvl : this.conf.logLevelIfDebug;
            this.conf.debugMode = !0, log.setLevel(level);
        }, Session.prototype.disableDebug = function() {
            log.debug("smartScriptSession.disableDebug"), this.conf.debugMode = !1, log.setLevel(log.levels.SILENT);
        }, Session.prototype.enableProfile = function() {
            log.debug("smartScriptSession.enableProfile"), this.conf.profileMode = !0, smartScriptProfiler.activate();
        }, Session.prototype.disableProfile = function() {
            log.debug("smartScriptSession.disableProfile"), this.conf.profileMode = !1, smartScriptProfiler.activate(!1);
        }, Session.prototype.fullDebug = function(activate) {
            log.debug("smartScriptSession.fullDebug"), "boolean" != typeof activate || activate ? (this.enableDebug(log.levels.TRACE), 
            this.enableProfile()) : (this.disableDebug(), this.disableProfile());
        };
        var HostResponse = function(data) {
            void 0 !== data && (this.Response = data.Response || data.response || data, this.lastCommand = data.Command, 
            self.LastCommand = data.Command, this.ResponseType = data.ResponseType, this.NumberOfLines = data.NbOfLines, 
            this.Lines = [], this.Response && "string" == typeof this.Response && (this.Lines = this.Response.trim().split(/\n/)), 
            this.GetLineFromBuffer = function(lineIndex) {
                var line = "";
                return lineIndex > 0 && lineIndex <= this.NumberOfLines && (line = this.Lines[lineIndex - 1]), 
                line;
            });
        };
        Session.prototype.__patchCatalog = function() {
            catalog.dest = this.secoUrl;
        }, Session.prototype.subscribeEvent = function(eventName) {
            log.debug("smartScriptSession.subscribeEvent");
            var self = this, eventSubscription = new EventSub(eventName);
            return eventSubscription.callback.fn = self.eventSubscriptionCallback, eventSubscription.callback.scope = self, 
            eventSubscription.getPromise(), this.sendOrQueue({
                type: "subscription",
                content: eventSubscription
            }), eventSubscription;
        };
        var ServiceCall = function(serviceName, inputs, callback) {
            this.serviceName = serviceName, this.inputs = inputs, this.callback = new SmartScriptCallback(callback), 
            this.promise = {
                fulfill: function() {},
                reject: function() {}
            };
        };
        ServiceCall.prototype.getPromise = function() {
            var self = this;
            return this.callback.params.action = self, new Promise(function(fulfill, reject) {
                self.promise.fulfill = fulfill, self.promise.reject = reject;
            });
        };
        var EventSub = function(eventName, eventCallback) {
            this.eventName = eventName, this.argsToTransmit = [], this.eventCallback = new SmartScriptCallback(eventCallback), 
            this.promise = {
                fulfill: function() {},
                reject: function() {}
            }, this.callback = {
                fn: function() {},
                scope: window,
                params: {}
            };
        };
        EventSub.prototype.getPromise = function() {
            var self = this;
            return this.callback.params.action = self, new Promise(function(fulfill, reject) {
                self.promise.fulfill = fulfill, self.promise.reject = reject;
            });
        }, EventSub.prototype.then = function(callback) {
            log.debug("setting callback for EventSub"), this.eventCallback.setCallback(callback);
        };
        var EventUnsub = function(eventName, context) {
            this.eventName = eventName, this.context = context, this.promise = {
                fulfill: function() {},
                reject: function() {}
            }, this.callback = {
                fn: function() {},
                scope: window,
                params: {}
            };
        };
        return EventUnsub.prototype.getPromise = function() {
            var self = this;
            return this.callback.params.action = self, new Promise(function(fulfill, reject) {
                self.promise.fulfill = fulfill, self.promise.reject = reject;
            });
        }, Session.prototype.triggerEvent = function(data, action) {
            log.debug("smartScriptSession.triggerEvent"), action.argsToTransmit = smartScriptUtils.normalize(data).concat(action.eventCallback.params), 
            action.eventCallback.fn.onSuccess.apply(action.eventCallback.scope, action.argsToTransmit);
        }, Session.prototype.eventSubscriptionCallback = function(data, params) {
            log.debug("eventSubscriptionCallback : " + JSON.stringify(data));
            var action = params.action;
            "object" == typeof data && "number" == typeof data.response && data.response > -1 ? action.promise.fulfill(data) : action.promise.reject(data), 
            this.__pending_response = !1, this.processNextAction();
        }, Session.prototype.eventUnsubscriptionCallback = function(data, params) {
            log.debug("eventUnsubscriptionCallback : " + JSON.stringify(data));
            var action = params.action;
            "object" == typeof data && !0 === data.response ? action.promise.fulfill(data) : (log.debug("unsub error !"), 
            action.promise.reject(data)), this.__pending_response = !1, this.processNextAction();
        }, Session.prototype.serviceSuccess = function(data, params) {
            log.debug("serviceSuccess");
            var action = params.action, aResponse = new HostResponse(data);
            this.LastResponse = aResponse, this.lasResponse = this.LastResponse, void 0 === aResponse.Response || aResponse.Response.error ? action.promise.reject(data) : action.promise.fulfill(data), 
            this.__pending_response = !1, this.processNextAction();
        }, Session.prototype.serviceError = function(data, params) {
            log.debug("serviceError");
            var action = params.action, self = this;
            this.__pending_response = !1, (data && data.error && data.error.msg && data.error.msg.indexOf("discarded due to over usage") > -1 || "string" == typeof data && data.indexOf("discarded due to over usage") > -1) && this.conf.retryIfThrottled ? (this.delayedActionsQueue.unshift({
                type: "service",
                content: action
            }), this.__pending_delayed_call = !0, this.__throttlingErrors++, setTimeout(this.processNextAction.bind(self), this.conf.throttleDelay)) : (action.promise.reject(data), 
            this.processNextAction());
        }, Session.prototype.subscribe = function(eventName, eventCallback) {
            log.debug("smartScriptSession.subscribe");
            var self = this, eventSubscription = new EventSub(eventName, eventCallback);
            eventSubscription.callback.fn = self.eventSubscriptionCallback, eventSubscription.callback.scope = self;
            var aPromise = eventSubscription.getPromise();
            return this.sendOrQueue({
                type: "subscription",
                content: eventSubscription
            }), aPromise;
        }, Session.prototype.unsubscribe = function(eventName, param) {
            function withContext() {
                var eventUnsubscription = new EventUnsub(eventName, options.context);
                eventUnsubscription.callback.fn = self.eventUnsubscriptionCallback, eventUnsubscription.callback.scope = self;
                var aPromise = eventUnsubscription.getPromise();
                return self.sendOrQueue({
                    type: "unsubscription",
                    content: eventUnsubscription
                }), aPromise;
            }
            log.debug("smartScriptSession.unsubscribe, unsub " + eventName);
            var self = this, defaultOptions = {
                context: ""
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "" === options.context ? self.getContext().then(function(taskId) {
                return log.debug("unsubscribing in default context : " + taskId), options.context = taskId, 
                withContext();
            }) : withContext();
        }, Session.prototype.processNextAction = function() {
            if (log.debug("processNextAction"), this.delayedActionsQueue.length > 0) {
                var action = this.delayedActionsQueue[0];
                log.debug("processNextAction, type : " + action.type), this.__pending_delayed_call = !1, 
                this.sendImmediate(action) && this.delayedActionsQueue.splice(0, 1);
            }
        }, Session.prototype.requestService = function(serviceName, inputs) {
            log.debug("requestService");
            var self = this, sCall = new ServiceCall(serviceName, inputs, {
                fn: {
                    onSuccess: self.serviceSuccess,
                    onError: self.serviceError
                },
                scope: self
            }), aPromise = sCall.getPromise();
            return this.sendOrQueue({
                type: "service",
                content: sCall
            }), aPromise;
        }, Session.prototype.sendOrQueue = function(action) {
            log.debug("sendOrQueue");
            var self = this, aResult = !0;
            return this.__established && !1 === this.__pending_response ? (this.__pending_response = !0, 
            "service" === action.type ? catalog.requestService(action.content.serviceName, action.content.inputs, action.content.callback) : "subscription" === action.type ? catalog.subscribe(action.content.eventName, {
                fn: self.triggerEvent,
                scope: self,
                params: action.content
            }, action.content.callback) : "unsubscription" === action.type && catalog.unsubscribe(action.content.eventName, action.content.context, action.content.callback)) : (aResult = !1, 
            this.delayedActionsQueue.push(action)), aResult;
        }, Session.prototype.sendImmediate = function(action) {
            log.debug("sendImmediate");
            var self = this, aResult = !0;
            return this.__established && !1 === this.__pending_response ? (this.__pending_response = !0, 
            "service" === action.type ? catalog.requestService(action.content.serviceName, action.content.inputs, action.content.callback) : "subscription" === action.type ? catalog.subscribe(action.content.eventName, {
                fn: self.triggerEvent,
                scope: self,
                params: action.content
            }, action.content.callback) : "unsubscription" === action.type && catalog.unsubscribe(action.content.eventName, action.content.context, action.content.callback)) : aResult = !1, 
            aResult;
        }, Session.prototype.sendSpecialKey = function(specialKey) {
            return this.requestService("commandpage.SendSpecialKey", {
                key: specialKey
            });
        }, Session.prototype.__receivedResponse = function(data) {
            this.LastResponse = new HostResponse(data), this.lasResponse = this.LastResponse;
        }, Session.prototype.isLastUIActive = function() {
            return !0;
        }, Session.prototype.sessionName = function() {
            return "";
        }, Session.prototype.send = function(param) {
            var defaultOptions = {
                command: "",
                transmit: !0,
                bypassGraphicHook: !1,
                bypassSmartTriggerHook: !1
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "string" == typeof param ? options.command = param : "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), this.requestService("commandpage.sendCommand", options);
        }, Session.prototype.sendMultiLine = function(param) {
            var defaultOptions = {
                command: [],
                transmit: !0,
                bypassGraphicHook: !1,
                bypassSmartTriggerHook: !1
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return void 0 !== param && Array.isArray(param) ? options.command = param : "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), this.requestService("commandpage.sendMultiLineCommand", options);
        }, Session.prototype.sendHiddenCommand = function(strCommand) {
            return this.requestService("commandpage.sendHiddenCommand", strCommand);
        }, Session.prototype.refreshBookingFileIfRequired = function(waitForRefresh) {
            log.debug("refreshBookingFileIfRequired - event implementation");
            var self = this, doWait = "boolean" != typeof waitForRefresh || waitForRefresh;
            return new Promise(function(fulfill, reject) {
                self.getActiveTask().then(function(taskData) {
                    "PNR" === taskData.subtype ? doWait ? self.subscribe("bookingfile.refreshed", {
                        fn: function() {
                            fulfill();
                        },
                        scope: self
                    }).then(function() {
                        self.refreshBooking();
                    }) : (self.refreshBooking(), fulfill()) : fulfill();
                }, function(errorData) {
                    reject(errorData);
                });
            });
        }, Session.prototype.refreshBooking = function() {
            return this.requestService("bookingfile.refresh", null);
        }, Session.prototype.refreshBookingFile = function() {
            catalog.requestService("bookingfile.refresh");
        }, Session.prototype.sendWS = function(request, input) {
            return this.requestService(request, input);
        }, Session.prototype.getLastCommand = function() {
            var self = this, aPromise;
            return aPromise = "" !== self.lastCommand ? Promise.resolve(self.lastCommand) : new Promise(function(fulfill, reject) {
                self.__lastCmdCtx.__fulfill = fulfill, self.__lastCmdCtx.__reject = reject;
            });
        }, Session.prototype.getRecordLocator = function() {
            return this.requestService("bookingfile.getRecloc", null);
        }, Session.prototype.setContext = function(param) {
            log.debug("smartScriptSession.setContext");
            var self = this, defaultOptions = {
                smartToolId: smartScriptSession.smartToolId,
                taskId: ""
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "string" == typeof param ? options.taskId = param : "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "" === options.taskId ? Promise.reject("Error : no taskID sent") : this.__established ? new Promise(function(fulfill) {
                window.catalog.setContext(options.taskId, options.smartToolId, {
                    fn: fulfill
                });
            }) : this.then(function() {
                return self.setContext(param);
            });
        }, Session.prototype.getContext = function() {
            log.debug("smartScriptSession.getContext");
            var self = this;
            return this.__established ? Promise.resolve(window.catalog.getContext()) : this.then(function() {
                return self.getContext();
            });
        }, Session.prototype.createTask = function(param) {
            var defaultOptions = {
                type: "file",
                subtype: "CMD",
                name: ""
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "INTPARTNER" === options.subtype || "SMART_CONTENT" === options.subtype && "" === options.name ? Promise.reject('Error : the "name" parameter is mandatory for subtypes "INTPARTNER" and "SMART_CONTENT"') : this.requestService("tasks.create", options);
        }, Session.prototype.goToSubTask = function(param) {
            var defaultOptions = {
                subtype: "CMD",
                name: ""
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "INTPARTNER" === options.subtype || "SMART_CONTENT" === options.subtype && "" === options.name ? Promise.reject('Error : the "name" parameter is mandatory for subtypes "INTPARTNER" and "SMART_CONTENT"') : this.requestService("tasks.goTo", options);
        }, Session.prototype.getTaskList = function() {
            return log.debug("smartScriptSession.getTaskList"), this.requestService("tasks.getList", null);
        }, Session.prototype.getActiveTask = function() {
            return log.debug("smartScriptSession.getActiveTask"), this.requestService("tasks.getActive", null);
        }, Session.prototype.switchToTask = function(param) {
            var defaultOptions = {
                smartToolId: this.smartToolId,
                taskId: "body.main.main"
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "" === options.taskId ? Promise.reject("Error : taskId is mandatory") : new Promise(function(fulfill, reject) {
                catalog.requestService("popups.switchToTask", [ options.smartToolId, options.taskId ], {
                    fn: {
                        onSuccess: fulfill,
                        onError: reject
                    },
                    scope: this
                });
            });
        }, Session.prototype.switchOffice = function(param) {
            var defaultOptions = {
                destinationOID: "file",
                subtype: "",
                contentName: "",
                launchScript: !1,
                passRecloc: !1
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "INTPARTNER" === options.subtype || "SMART_CONTENT" === options.subtype && "" === options.contentName ? Promise.reject('Error : the "contentName" parameter is mandatory for subtypes "INTPARTNER" and "SMART_CONTENT"') : this.requestService("popups.switchOffice", options);
        }, Session.prototype.launchSmartTool = function(param) {
            var defaultOptions = {
                popupId: smartScriptSession.smartToolId,
                smartToolName: ""
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), "" === options.smartToolName ? Promise.reject("Error : smartToolName is a mandatory parameter") : this.requestService("popups.launchSmartTool", options);
        }, Session.prototype.showSmartTool = function(param) {
            var defaultOptions = {
                id: smartScriptSession.smartToolId,
                giveFocus: !0
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "string" == typeof param ? options.id = param : "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), this.requestService("popups.show", {
                id: options.id,
                giveFocus: options.giveFocus
            });
        }, Session.prototype.closeSmartTool = function(param) {
            var smartToolId = "string" == typeof param ? param : smartScriptSession.smartToolId;
            return this.requestService("popups.close", {
                id: smartToolId
            });
        }, Session.prototype.hideSmartTool = function(param) {
            var smartToolId = "string" == typeof param ? param : smartScriptSession.smartToolId;
            return this.requestService("popups.hide", {
                id: smartToolId
            });
        }, Session.prototype.resizeSmartTool = function(param) {
            var defaultOptions = {
                id: smartScriptSession.smartToolId,
                width: 300,
                height: 300
            }, options = smartScriptUtils.simpleCopy(defaultOptions);
            return "object" == typeof param && smartScriptUtils.overrideProperties(options, param, {
                strictType: !0
            }), this.requestService("popups.resize", {
                popupId: options.id,
                width: options.width,
                height: options.height
            });
        }, Session.prototype.getFullCryptic = function(originalTextData) {
            var fullTextData = originalTextData.toString().replace(/\s+$/, "");
            return ")>" === fullTextData.slice(-2) ? new Promise(function(fulfill, reject) {
                smartScriptSession.send("mdr").then(function(response) {
                    fullTextData = fullTextData.slice(0, -2) + response.Response.toString().replace(/\s+$/, ""), 
                    ")>" === fullTextData.slice(-2) ? smartScriptSession.getFullCryptic(fullTextData).then(fulfill, reject) : fulfill(fullTextData);
                });
            }) : Promise.resolve(fullTextData);
        }, Session.prototype.retrieveUser = function() {
            return smartScriptSession.sendWS("usermanagement.retrieveUser");
        }, Session.prototype.ShowSmartTool = Session.prototype.showSmartTool, Session.prototype.CloseWindow = Session.prototype.closeSmartTool, 
        Session.prototype.HideSmartTool = Session.prototype.hideSmartTool, Session.prototype.getPopupId = function() {
            return smartScriptSession.smartToolId;
        }, Session.prototype.popupResize = function(popupId, width, height) {
            return this.requestService("popups.resize", {
                popupId: popupId,
                width: width,
                height: height
            });
        }, new Session();
    }());
}, function(module, exports, __webpack_require__) {
    __webpack_require__(2), window.PopUp = __webpack_require__(0).PopUp, window.Helper = __webpack_require__(0).Helper, 
    window.sendCrypticCommand = __webpack_require__(0).sendCrypticCommand, window.helperCryptic = __webpack_require__(0).helperCryptic, 
    window.getSellConnectUserInfo = __webpack_require__(0).getSellConnectUserInfo;
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || Function("return this")() || (0, eval)("this");
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
}, function(module, exports) {
    var SmartScriptCallback = function(rawCallback, defaultCallback) {
        this.fn = {
            onSuccess: function() {},
            onError: function() {}
        }, this.scope = window, this.params = [], this.setCallback(rawCallback, defaultCallback), 
        this.fulfill = function() {}, this.reject = function() {};
    };
    SmartScriptCallback.prototype.setCallback = function(rawCallback, defaultCallback) {
        void 0 !== defaultCallback && (this.fn.onSuccess = defaultCallback.fn.onSuccess, 
        this.fn.onError = defaultCallback.fn.onError, this.scope = defaultCallback.scope, 
        this.params = smartScriptUtils.normalize(defaultCallback.params)), "function" == typeof rawCallback ? this.fn.onSuccess = rawCallback : "object" == typeof rawCallback && ("function" == typeof rawCallback.fn ? this.fn.onSuccess = rawCallback.fn : "object" == typeof rawCallback.fn && ("function" == typeof rawCallback.fn.onSuccess && (this.fn.onSuccess = rawCallback.fn.onSuccess), 
        "function" == typeof rawCallback.fn.onError && (this.fn.onError = rawCallback.fn.onError)), 
        "object" == typeof rawCallback.scope && (this.scope = rawCallback.scope), void 0 !== rawCallback.params && (this.params = smartScriptUtils.normalize(rawCallback.params)));
    }, SmartScriptCallback.prototype.getNewPromise = function() {
        var self = this;
        return new Promise(function(fulfill, reject) {
            self.fulfill = fulfill, self.reject = reject;
        });
    }, SmartScriptCallback.prototype.getPromise = function() {
        var self = this;
        return new Promise(function(fulfill, reject) {
            self.fulfill = function() {
                var rslt = self.fn.onSuccess.apply(self.scope, self.params);
                "object" == typeof rslt && "function" == typeof rslt.then ? rslt.then(function(data) {
                    fulfill(data);
                }) : fulfill(rslt);
            }, self.reject = function() {
                var rslt = self.fn.onError.apply(self.scope, self.params);
                "object" == typeof rslt && "function" == typeof rslt.then ? rslt.then(function(data) {
                    reject(data);
                }) : reject(rslt);
            };
        });
    }, module.exports = {
        SmartScriptCallback: SmartScriptCallback
    };
}, function(module, exports, __webpack_require__) {
    function getCountryStateCodeFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForSingleValueRE(DACResponse, /CITY :[^\n]*\n[^\/]*\/([A-Z]{2}[A-Z]{0,2}):.*/m);
    }
    function getCountryCodeFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForSingleValueRE(DACResponse, /CITY :[^\n]*\n[^\/]*\/([A-Z]{2})[A-Z]{0,2}:.*/m);
    }
    function getCityNameFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForSingleValueRE(DACResponse, /CITY :[^\n]*\n\s*[A-Z]{3}[\s*]+C\s+([A-Z]+(?:\s+[A-Z]+)*)\s+[^\/]*\/[A-Z]{2}[A-Z]{0,2}:.*/m);
    }
    function getCityCodeFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForSingleValueRE(DACResponse, /CITY :[^\n]*\n\s*([A-Z]{3})[\s*]+C\s+/m);
    }
    function getCountryNameFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForSingleValueRE(DACResponse, /CITY :[^\n]*\n[^\/]*\/[A-Z]{2}[A-Z]{0,2}:(.*?)\s*\n/);
    }
    function getAirportsFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForListPairValuesRE(DACResponse, /\s*([A-Za-z0-9]{3})[* ]+A\s+([A-Za-z0-9 ]*?)\s*\//);
    }
    function getRailStationsFromDAC(DACResponse) {
        return EncodeDecode.prototype.parseForListPairValuesRE(DACResponse, /\s*([A-Za-z0-9]{3})[* ]+R\s+([A-Za-z0-9 ]*?)\s*\//);
    }
    window.LRUCache = __webpack_require__(13).LRUCache, __webpack_require__(1);
    var EncodeDecode = function() {
        this.initialized = !1, this.commands = {
            decode: {
                airport: "DAN",
                city: "DAC",
                nationality: "DC",
                state: "DNS",
                airline: "DNA",
                boardingPoint: "DB",
                aircraftType: "DNE",
                hotelChain: "DNH",
                carCompany: "DNC",
                hotelRate: "DNN",
                tourOrRail: "DNP",
                statesOrProvinces: "DNS",
                connectPoint: "DXS",
                specialCarEquip: "CE"
            },
            encode: {
                state: "DNS",
                airline: "DNA",
                airCraft: "DNE",
                hotel: "DNH",
                car: "DNC",
                hotelRate: "DNN",
                tourOrRail: "DNP",
                city: "DAN"
            }
        }, this.conf = {
            encodeDecode: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0
            },
            cache: "persistent",
            name: "smartScriptCodeCache",
            cacheSizeLimit: 200,
            cacheDataReadableTTL: "6M",
            cacheDataTTL: 0,
            useCacheCompression: !0
        }, this.codeCache, this.getters = {
            CountryStateCode: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "countryStateCode",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC
                },
                asMap: !1
            },
            CountryCode: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "countryCode",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC
                },
                asMap: !1
            },
            CityName: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "cityName",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC
                },
                asMap: !1
            },
            CityCode: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "cityCode",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC
                },
                asMap: !1
            },
            CountryName: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "countryName",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC
                },
                asMap: !1
            },
            DACData: {
                encodeOrDecode: "decode",
                typeToCode: "city",
                sendHidden: !0,
                return: "all",
                data: {
                    cityName: getCityNameFromDAC,
                    cityCode: getCityCodeFromDAC,
                    countryCode: getCountryCodeFromDAC,
                    countryStateCode: getCountryStateCodeFromDAC,
                    countryName: getCountryNameFromDAC,
                    airportList: getAirportsFromDAC,
                    railStationList: getRailStationsFromDAC
                },
                asMap: !0
            }
        };
    };
    EncodeDecode.prototype.init = function(cacheSize) {
        log.debug("SmartScriptEncodeDecode.init");
        var self = this;
        if (self.initialized = !0, self.conf.cacheDataTTL = smartScriptUtils.parseDuration(self.conf.cacheDataReadableTTL), 
        "number" == typeof cacheSize && (self.conf.cacheSizeLimit = cacheSize), "persistent" === self.conf.cache || "session" === self.conf.cache) {
            self.codeCache = new LRUCache(self.conf.cacheSizeLimit);
            var persistentCache;
            if (null !== (persistentCache = "persistent" === self.conf.cache ? window.localStorage.getItem(self.conf.name) : window.sessionStorage.getItem(self.conf.name)) && "null" !== persistentCache) {
                log.debug("raw cache length at retrieval : " + persistentCache.length);
                for (var uncompressedData = self.conf.useCacheCompression ? smartScriptUtils.decompress(persistentCache) : persistentCache, liveCache = JSON.parse(uncompressedData), i = 0; i < liveCache.length; i++) self.codeCache.put(liveCache[i].key, liveCache[i].value);
            }
        }
    }, EncodeDecode.prototype.reInit = function() {
        return log.debug("EncodeDecode.reInit, already initialized ? " + this.initialized), 
        !this.initialized && (this.init(), !0);
    }, EncodeDecode.prototype.clearCache = function() {
        this.reInit(), window.localStorage.setItem(this.conf.name, null), this.codeCache = new LRUCache(this.conf.cacheSizeLimit);
    }, EncodeDecode.prototype.displayCache = function(options) {
        this.reInit();
        for (var displayAge = void 0 !== options && void 0 !== options.dataAge && options.dataAge, cacheToDisplay = "object" == typeof this.codeCache ? JSON.parse(JSON.stringify(this.codeCache)) : [], str = "cache Content : {", i = 0; i < cacheToDisplay.length; i++) if (void 0 !== cacheToDisplay[i].key) {
            str += "\n\t'" + cacheToDisplay[i].key + "'", str += displayAge ? " (data age : " + smartScriptUtils.readableTime(new Date().valueOf() - cacheToDisplay[i].value.rTime) + ")" : "", 
            str += " : {";
            for (var dataName in cacheToDisplay[i].value.result) if (Array.isArray(cacheToDisplay[i].value.result[dataName])) {
                str += "\n\t\t'" + dataName + "' : [";
                for (var j = 0; j < cacheToDisplay[i].value.result[dataName].length; j++) str += "\n\t\t\t" + JSON.stringify(cacheToDisplay[i].value.result[dataName][j]) + ",";
                "[" !== str.charAt(str.length - 1) && (str = str.slice(0, -1)), str += "\n\t\t],";
            } else str += "\n\t\t'" + dataName + "' : " + JSON.stringify(cacheToDisplay[i].value.result[dataName]) + ",";
            str = str.slice(0, -1), str += "\n\t},";
        }
        return str = str.slice(0, -1), str += "\n}";
    }, EncodeDecode.prototype.displayNativeCache = function() {
        return this.initialized ? JSON.stringify(this.codeCache) : "decoder not yet initialized, cache cannot be displayed";
    }, EncodeDecode.prototype.setConfiguration = function(configuration) {
        smartScriptUtils.overrideProperties(this.conf, configuration, {
            strictType: !0
        });
    }, EncodeDecode.prototype.setGetter = function(getterName, getterConfiguration) {
        var defaultGetter = {
            encodeOrDecode: "decode",
            typeToCode: "city",
            sendHidden: !0,
            return: "all",
            data: {},
            asMap: !0
        }, newGetter = smartScriptUtils.simpleCopy(defaultGetter);
        smartScriptUtils.overrideProperties(newGetter, getterConfiguration, {
            strictType: !0
        }), smartScriptUtils.overrideProperties(newGetter.data, getterConfiguration.data, {
            inject: !0
        }), this.getters[getterName] = newGetter;
    }, EncodeDecode.prototype.setScriptName = function(name) {
        return "string" == typeof name && (this.conf.name = name, !0);
    }, EncodeDecode.prototype.setCacheTTL = function(readableTTL) {
        this.conf.cacheDataReadableTTL = readableTTL, this.conf.cacheDataTTL = smartScriptUtils.parseDuration(readableTTL);
    }, EncodeDecode.prototype.get = function(strToCode, options) {
        function returnPromise() {
            return self.send(strToCode, {
                encodeOrDecode: configuration.encodeOrDecode,
                typeToCode: configuration.typeToCode,
                sendHidden: configuration.sendHidden
            }).then(function(responseData) {
                var fullResult = self.getSructuredDataFromResponse(responseData, configuration.data), cacheToStore = "";
                return "persistent" !== self.conf.cache && "session" !== self.conf.cache || (self.codeCache.put(storeKey, {
                    result: fullResult,
                    rTime: new Date().valueOf()
                }), cacheToStore = self.conf.useCacheCompression ? smartScriptUtils.compress(JSON.stringify(self.codeCache)) : JSON.stringify(self.codeCache)), 
                log.debug("updating cache, length : " + cacheToStore.length), "persistent" === self.conf.cache ? window.localStorage.setItem(self.conf.name, cacheToStore) : "session" === self.conf.cache && window.sessionStorage.setItem(self.conf.name, cacheToStore), 
                smartScriptProfiler.end("EncodeDecode.get"), "all" !== configuration.return && void 0 !== fullResult[configuration.return] ? Promise.resolve(fullResult[configuration.return]) : Promise.resolve(fullResult);
            }, function(errorData) {
                log.error("error in send (encode/decode request) : " + JSON.stringify(errorData));
            });
        }
        log.debug("EncodeDecode.get"), smartScriptProfiler.start("EncodeDecode.get");
        var self = this, needRequest = !0;
        this.reInit();
        var configuration = smartScriptUtils.simpleCopy(self.getters.DACData), resultPromise;
        "string" == typeof options && void 0 !== self.getters[options] ? smartScriptUtils.overrideProperties(configuration, self.getters[options], {
            strictType: !0
        }) : "object" == typeof options && smartScriptUtils.overrideProperties(configuration, options, {
            strictType: !0,
            inject: !0
        });
        var storeKey = self.commands[configuration.encodeOrDecode][configuration.typeToCode] + strToCode;
        if ("persistent" !== self.conf.cache && "session" !== self.conf.cache || void 0 === self.codeCache.get(storeKey)) needRequest = !0; else {
            var storedData = self.codeCache.get(storeKey);
            if (needRequest = !1, "all" !== configuration.return && void 0 === storedData.result[configuration.return]) needRequest = !0; else for (var valueName in configuration.data) if (void 0 === storedData.result[valueName]) {
                needRequest = !0;
                break;
            }
            var now = new Date().valueOf();
            !needRequest && storedData.rTime + self.conf.cacheDataTTL < now && (self.codeCache.remove(storeKey), 
            needRequest = !0);
        }
        return needRequest ? resultPromise = returnPromise() : (resultPromise = "all" !== configuration.return ? Promise.resolve(storedData.result[configuration.return]) : Promise.resolve(storedData.result), 
        smartScriptProfiler.end("EncodeDecode.get")), resultPromise;
    }, EncodeDecode.prototype.getList = function(listToCode, options) {
        function recurseList(list, index, result) {
            var localResult;
            localResult = configuration.asMap ? void 0 !== result ? result : {} : void 0 !== result ? result : [];
            var localIndex = void 0 !== index ? index : 0;
            return localIndex === list.length ? Promise.resolve(localResult) : self.get(list[localIndex], configuration).then(function(itemResult) {
                return configuration.asMap ? localResult[list[localIndex]] = itemResult : localResult.push(itemResult), 
                recurseList(list, localIndex + 1, localResult);
            });
        }
        log.debug("getList : listToCode : " + JSON.stringify(listToCode) + ", options : " + JSON.stringify(options));
        var self = this, configuration = smartScriptUtils.simpleCopy(this.getters.DACData);
        return "string" == typeof options && void 0 !== this.getters[options] ? smartScriptUtils.overrideProperties(configuration, this.getters[options], {
            strictType: !0
        }) : "object" == typeof options && smartScriptUtils.overrideProperties(configuration, options, {
            strictType: !0
        }), this.reInit(), recurseList(listToCode);
    }, EncodeDecode.prototype.getListAsMap = function(listToCode, options) {
        var optionsToSend = smartScriptUtils.simpleCopy(this.getters.DACData);
        return "string" == typeof options && void 0 !== this.getters[options] ? smartScriptUtils.overrideProperties(optionsToSend, this.getters[options], {
            strictType: !0
        }) : "object" == typeof options && smartScriptUtils.overrideProperties(optionsToSend, options, {
            strictType: !0
        }), optionsToSend.asMap = !0, this.getList(smartScriptUtils.removeDuplicate(listToCode), optionsToSend);
    }, EncodeDecode.prototype.getListAsList = function(listToCode, options) {
        var optionsToSend = smartScriptUtils.simpleCopy(this.getters.DACData);
        return "string" == typeof options && void 0 !== this.getters[options] ? smartScriptUtils.overrideProperties(optionsToSend, this.getters[options], {
            strictType: !0
        }) : "object" == typeof options && smartScriptUtils.overrideProperties(optionsToSend, options, {
            strictType: !0
        }), optionsToSend.asMap = !1, this.getList(listToCode, optionsToSend);
    }, EncodeDecode.prototype.sendEncodeDecode = function(encDecType, searchValue, city) {
        return this.send(searchValue, {
            encodeOrDecode: encDecType,
            typeToCode: city,
            sendHidden: !1
        });
    }, EncodeDecode.prototype.send = function(strToCode, options) {
        log.debug("EncodeDecode.send, strToCode : " + strToCode + ", options : " + JSON.stringify(options)), 
        smartScriptProfiler.start("EncodeDecode.send");
        var configuration = smartScriptUtils.simpleCopy(this.conf.encodeDecode);
        smartScriptUtils.overrideProperties(configuration, options, {
            strictType: !0
        });
        var self = this;
        this.reInit();
        var commandToSend = self.commands[configuration.encodeOrDecode][configuration.typeToCode] + " " + strToCode;
        return new Promise(function(fulfill, reject) {
            configuration.sendHidden ? smartScriptSession.sendHiddenCommand(commandToSend).then(function(data) {
                smartScriptProfiler.end("EncodeDecode.send"), fulfill(data);
            }, function(data) {
                smartScriptProfiler.end("EncodeDecode.send"), reject(data);
            }) : smartScriptSession.send(commandToSend).then(function(data) {
                smartScriptProfiler.end("EncodeDecode.send"), fulfill(data);
            }, function(data) {
                smartScriptProfiler.end("EncodeDecode.send"), reject(data);
            });
        });
    }, EncodeDecode.prototype.getSructuredDataFromResponse = function(DACResponse, parsers) {
        var strToParse = "string" == typeof DACResponse.Response ? DACResponse.Response : DACResponse, result = {};
        for (var dataName in parsers) result[dataName] = parsers[dataName](strToParse);
        return result;
    }, EncodeDecode.prototype.parseForSingleValueRE = function(responseDAC, pattern) {
        var strToParse = "string" == typeof responseDAC.Response ? responseDAC.Response : responseDAC, result = pattern.exec(strToParse);
        return null !== result && void 0 !== result[1] ? result[1] : "";
    }, EncodeDecode.prototype.parseForListPairValuesRE = function(responseDAC, pattern) {
        for (var strToParse = "string" == typeof responseDAC.Response ? responseDAC.Response : responseDAC, resultList = [], strList = strToParse.split(/\n/), i = 0; i < strList.length; i++) {
            var result = pattern.exec(strList[i]);
            null !== result && void 0 !== result[1] && void 0 !== result[2] && resultList.push({
                code: result[1],
                name: result[2]
            });
        }
        return resultList;
    }, module.exports = {
        EncodeDecode: EncodeDecode
    };
}, function(module, exports) {
    String.prototype.rmSpace = function() {
        return this.replace(/\s+/g, "");
    };
}, function(module, exports) {
    void 0 === window.smartScriptConfigUtility && (module.exports = smartScriptConfigUtility = function() {
        function buildError(xhttpObj) {
            return "object" == typeof xhttpObj.response && null !== xhttpObj.response ? xhttpObj.response : {
                message: xhttpObj.response || xhttpObj.statusText || "Error while retrieving configuration"
            };
        }
        function buildResponse(xhttpObj) {
            return response = xhttpObj.response.slice(xhttpObj.response.indexOf("{"), xhttpObj.response.lastIndexOf("}") + 1), 
            JSON.parse(response);
        }
        var GetConfiguration = function() {
            this.conf = {
                baseConfigPath: "../config/",
                pathURL: "/services/sptool/scriptapi/v1/scripts/[SCRIPT_ID]?V=[VERSION_NUMBER]&OID=[OFFICE_ID]&UID=[USER_ID]",
                uatDomain: "https://uat.customsolutions.amadeus.com",
                prdDomain: "https://customsolutions.amadeus.com",
                prdSECODomainRegex: /https:\/\/www(\.([a-zA-Z]{2}\d{1}|custom))?\.sellingplatformconnect\.amadeus\.com/
            };
        };
        return GetConfiguration.prototype.setConfPath = function(configurationPath) {
            this.conf.baseConfigPath = String(configurationPath);
        }, GetConfiguration.prototype.getFileName = function(scriptId, scriptVersion, oId, userId) {
            var scriptPath = "";
            return scriptPath += scriptId || "", scriptPath += scriptVersion ? "_" + scriptVersion : "", 
            scriptPath += oId ? "_" + oId : "", (scriptPath += userId ? "_" + userId : "") + ".js?timestamp=" + Date.now();
        }, GetConfiguration.prototype.getConfig = function(scriptId, scriptVersion, oId, userId) {
            log.debug("smartScriptConfigUtility.getFileConfig");
            var baseConfigPath = this.conf.baseConfigPath, self = this, cb = new SmartScriptCallback(), promise = cb.getNewPromise();
            return void 0 !== scriptId && void 0 !== scriptVersion ? smartScriptUtils.getRequest(baseConfigPath + self.getFileName(scriptId, scriptVersion, oId, userId)).then(function(response) {
                cb.fulfill(buildResponse(response));
            }, function() {
                smartScriptUtils.getRequest(baseConfigPath + self.getFileName(scriptId, scriptVersion, oId)).then(function(response) {
                    cb.fulfill(buildResponse(response));
                }, function() {
                    smartScriptUtils.getRequest(baseConfigPath + self.getFileName(scriptId, scriptVersion)).then(function(response) {
                        cb.fulfill(buildResponse(response));
                    }, function(response) {
                        cb.reject(buildError(response));
                    });
                });
            }) : cb.reject({
                message: "Invalid Script ID or Version Number"
            }), promise;
        }, new GetConfiguration();
    }());
}, function(module, exports) {
    String.prototype.startsWith || (String.prototype.startsWith = function(searchString, position) {
        return position = position || 0, this.substr(position, searchString.length) === searchString;
    }), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    }), "function" != typeof String.prototype.trimLeft && (String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, "");
    }), "function" != typeof String.prototype.trimRight && (String.prototype.trimRight = function() {
        return this.replace(/\s+$/, "");
    }), String.prototype.repeat || (String.prototype.repeat = function(count) {
        "use strict";
        if (null == this) throw new TypeError("can't convert " + this + " to object");
        var str = "" + this;
        if (count = +count, count != count && (count = 0), count < 0) throw new RangeError("repeat count must be non-negative");
        if (count == 1 / 0) throw new RangeError("repeat count must be less than infinity");
        if (count = Math.floor(count), 0 == str.length || 0 == count) return "";
        if (str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
        for (var rpt = "", i = 0; i < count; i++) rpt += str;
        return rpt;
    });
}, function(module, exports, __webpack_require__) {
    (function(global) {
        var require, require;
        !function n(t, e, r) {
            function o(u, f) {
                if (!e[u]) {
                    if (!t[u]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return require(u, !0);
                        if (i) return i(u, !0);
                        var s = new Error("Cannot find module '" + u + "'");
                        throw s.code = "MODULE_NOT_FOUND", s;
                    }
                    var l = e[u] = {
                        exports: {}
                    };
                    t[u][0].call(l.exports, function(n) {
                        var e = t[u][1][n];
                        return o(e || n);
                    }, l, l.exports, n, t, e, r);
                }
                return e[u].exports;
            }
            for (var i = "function" == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
            return o;
        }({
            1: [ function(n, t, e) {
                "use strict";
                function r() {}
                function o(n) {
                    try {
                        return n.then;
                    } catch (t) {
                        return d = t, w;
                    }
                }
                function i(n, t) {
                    try {
                        return n(t);
                    } catch (e) {
                        return d = e, w;
                    }
                }
                function u(n, t, e) {
                    try {
                        n(t, e);
                    } catch (r) {
                        return d = r, w;
                    }
                }
                function f(n) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof n) throw new TypeError("not a function");
                    this._37 = 0, this._12 = null, this._59 = [], n !== r && v(n, this);
                }
                function c(n, t, e) {
                    return new n.constructor(function(o, i) {
                        var u = new f(r);
                        u.then(o, i), s(n, new p(t, e, u));
                    });
                }
                function s(n, t) {
                    for (;3 === n._37; ) n = n._12;
                    return 0 === n._37 ? void n._59.push(t) : void y(function() {
                        var e = 1 === n._37 ? t.onFulfilled : t.onRejected;
                        if (null === e) return void (1 === n._37 ? l(t.promise, n._12) : a(t.promise, n._12));
                        var r = i(e, n._12);
                        r === w ? a(t.promise, d) : l(t.promise, r);
                    });
                }
                function l(n, t) {
                    if (t === n) return a(n, new TypeError("A promise cannot be resolved with itself."));
                    if (t && ("object" == typeof t || "function" == typeof t)) {
                        var e = o(t);
                        if (e === w) return a(n, d);
                        if (e === n.then && t instanceof f) return n._37 = 3, n._12 = t, void h(n);
                        if ("function" == typeof e) return void v(e.bind(t), n);
                    }
                    n._37 = 1, n._12 = t, h(n);
                }
                function a(n, t) {
                    n._37 = 2, n._12 = t, h(n);
                }
                function h(n) {
                    for (var t = 0; t < n._59.length; t++) s(n, n._59[t]);
                    n._59 = null;
                }
                function p(n, t, e) {
                    this.onFulfilled = "function" == typeof n ? n : null, this.onRejected = "function" == typeof t ? t : null, 
                    this.promise = e;
                }
                function v(n, t) {
                    var e = !1, r = u(n, function(n) {
                        e || (e = !0, l(t, n));
                    }, function(n) {
                        e || (e = !0, a(t, n));
                    });
                    e || r !== w || (e = !0, a(t, d));
                }
                var y = n("asap/raw"), d = null, w = {};
                t.exports = f, f._99 = r, f.prototype.then = function(n, t) {
                    if (this.constructor !== f) return c(this, n, t);
                    var e = new f(r);
                    return s(this, new p(n, t, e)), e;
                };
            }, {
                "asap/raw": 4
            } ],
            2: [ function(n, t, e) {
                "use strict";
                function r(n) {
                    var t = new o(o._99);
                    return t._37 = 1, t._12 = n, t;
                }
                var o = n("./core.js");
                t.exports = o;
                var i = r(!0), u = r(!1), f = r(null), c = r(void 0), s = r(0), l = r("");
                o.resolve = function(n) {
                    if (n instanceof o) return n;
                    if (null === n) return f;
                    if (void 0 === n) return c;
                    if (!0 === n) return i;
                    if (!1 === n) return u;
                    if (0 === n) return s;
                    if ("" === n) return l;
                    if ("object" == typeof n || "function" == typeof n) try {
                        var t = n.then;
                        if ("function" == typeof t) return new o(t.bind(n));
                    } catch (e) {
                        return new o(function(n, t) {
                            t(e);
                        });
                    }
                    return r(n);
                }, o.all = function(n) {
                    var t = Array.prototype.slice.call(n);
                    return new o(function(n, e) {
                        function r(u, f) {
                            if (f && ("object" == typeof f || "function" == typeof f)) {
                                if (f instanceof o && f.then === o.prototype.then) {
                                    for (;3 === f._37; ) f = f._12;
                                    return 1 === f._37 ? r(u, f._12) : (2 === f._37 && e(f._12), void f.then(function(n) {
                                        r(u, n);
                                    }, e));
                                }
                                var c = f.then;
                                if ("function" == typeof c) {
                                    return void new o(c.bind(f)).then(function(n) {
                                        r(u, n);
                                    }, e);
                                }
                            }
                            t[u] = f, 0 == --i && n(t);
                        }
                        if (0 === t.length) return n([]);
                        for (var i = t.length, u = 0; u < t.length; u++) r(u, t[u]);
                    });
                }, o.reject = function(n) {
                    return new o(function(t, e) {
                        e(n);
                    });
                }, o.race = function(n) {
                    return new o(function(t, e) {
                        n.forEach(function(n) {
                            o.resolve(n).then(t, e);
                        });
                    });
                }, o.prototype.catch = function(n) {
                    return this.then(null, n);
                };
            }, {
                "./core.js": 1
            } ],
            3: [ function(n, t, e) {
                "use strict";
                function r() {
                    if (c.length) throw c.shift();
                }
                function o(n) {
                    var t;
                    t = f.length ? f.pop() : new i(), t.task = n, u(t);
                }
                function i() {
                    this.task = null;
                }
                var u = n("./raw"), f = [], c = [], s = u.makeRequestCallFromTimer(r);
                t.exports = o, i.prototype.call = function() {
                    try {
                        this.task.call();
                    } catch (n) {
                        o.onerror ? o.onerror(n) : (c.push(n), s());
                    } finally {
                        this.task = null, f[f.length] = this;
                    }
                };
            }, {
                "./raw": 4
            } ],
            4: [ function(n, t, e) {
                (function(n) {
                    "use strict";
                    function e(n) {
                        f.length || (u(), c = !0), f[f.length] = n;
                    }
                    function r() {
                        for (;s < f.length; ) {
                            var n = s;
                            if (s += 1, f[n].call(), s > l) {
                                for (var t = 0, e = f.length - s; e > t; t++) f[t] = f[t + s];
                                f.length -= s, s = 0;
                            }
                        }
                        f.length = 0, s = 0, c = !1;
                    }
                    function o(n) {
                        var t = 1, e = new a(n), r = document.createTextNode("");
                        return e.observe(r, {
                            characterData: !0
                        }), function() {
                            t = -t, r.data = t;
                        };
                    }
                    function i(n) {
                        return function() {
                            function t() {
                                clearTimeout(e), clearInterval(r), n();
                            }
                            var e = setTimeout(t, 0), r = setInterval(t, 50);
                        };
                    }
                    t.exports = e;
                    var u, f = [], c = !1, s = 0, l = 1024, a = n.MutationObserver || n.WebKitMutationObserver;
                    u = "function" == typeof a ? o(r) : i(r), e.requestFlush = u, e.makeRequestCallFromTimer = i;
                }).call(this, void 0 !== global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            }, {} ],
            5: [ function(n, t, e) {
                "function" != typeof Promise.prototype.done && (Promise.prototype.done = function(n, t) {
                    (arguments.length ? this.then.apply(this, arguments) : this).then(null, function(n) {
                        setTimeout(function() {
                            throw n;
                        }, 0);
                    });
                });
            }, {} ],
            6: [ function(n, t, e) {
                n("asap"), "undefined" == typeof Promise && (Promise = n("./lib/core.js"), n("./lib/es6-extensions.js")), 
                n("./polyfill-done.js");
            }, {
                "./lib/core.js": 1,
                "./lib/es6-extensions.js": 2,
                "./polyfill-done.js": 5,
                asap: 3
            } ]
        }, {}, [ 6 ]);
    }).call(exports, __webpack_require__(4));
}, function(module, exports, __webpack_require__) {
    __webpack_require__(1);
    var SmartScriptProfiler = function() {
        this.doProfile = !1, this.profiles = {}, this.conf = {
            displayStats: !1,
            outputToConsole: !0
        };
    };
    SmartScriptProfiler.prototype.setConf = function(param) {
        "object" == typeof param && smartScriptUtils.copyConfiguration(this.conf, param, {
            strictType: !0
        });
    }, SmartScriptProfiler.prototype.start = function(methodName) {
        this.doProfile && (void 0 === this.profiles[methodName] && (this.profiles[methodName] = []), 
        this.profiles[methodName].push({
            start: Date.now(),
            end: 0,
            duration: 0
        }));
    }, SmartScriptProfiler.prototype.end = function(methodName) {
        if (this.doProfile) if (void 0 === this.profiles[methodName]) this.profiles[methodName].push({
            start: 0,
            end: 1e5,
            duration: 1e5
        }); else {
            for (var i = 0, l = this.profiles[methodName].length; i < l && 0 !== this.profiles[methodName][i].end; i++) ;
            this.profiles[methodName][i].end = Date.now();
        }
    }, SmartScriptProfiler.prototype.display = function(param) {
        if (this.doProfile) {
            var options = smartScriptUtils.simpleCopy(this.conf);
            "object" == typeof param && smartScriptUtils.copyConfiguration(options, param, {
                strictType: !0
            });
            var str = "-------- PROFILES DISPLAY --------\n";
            for (method in this.profiles) {
                str += method + "\tprofile :\n";
                for (var totalD = 0, totalSD = 0, i = 0; i < this.profiles[method].length; i++) this.profiles[method][i].duration = this.profiles[method][i].end - this.profiles[method][i].start, 
                str += "\t\t" + method + " duration : " + this.profiles[method][i].duration + "\n", 
                totalD += this.profiles[method][i].duration, totalSD += this.profiles[method][i].duration * this.profiles[method][i].duration;
                var meanD = Math.round(totalD / this.profiles[method].length), meanSD = Math.round(totalSD / this.profiles[method].length), variance = meanSD - meanD * meanD, stdDeviation = Math.round(Math.sqrt(variance)), relStdDeviation = Math.round(stdDeviation / meanD * 100), confidence68 = [ meanD - stdDeviation, meanD + stdDeviation ], confidence95 = [ meanD - 2 * stdDeviation, meanD + 2 * stdDeviation ];
                str += this.profiles[method].length > 1 ? "\t\t" + method + " average duration (" + this.profiles[method].length + " executions) : " + meanD + " miliseconds\n" : "", 
                str += options.displayStats && this.profiles[method].length > 2 ? "\t\t" + method + " duration standard deviation (" + this.profiles[method].length + " executions) : " + stdDeviation + " miliseconds (" + relStdDeviation + "%)\n" : "", 
                str += options.displayStats && this.profiles[method].length > 2 ? "\t\t" + method + " duration 68% confidence interval  (" + this.profiles[method].length + " executions) : " + confidence68[0] + " to " + confidence68[1] + " miliseconds\n" : "", 
                str += options.displayStats && this.profiles[method].length > 2 ? "\t\t" + method + " duration 95% confidence interval  (" + this.profiles[method].length + " executions) : " + confidence95[0] + " to " + confidence95[1] + " miliseconds\n" : "", 
                str += "\n";
            }
            return options.outputToConsole && console.info(str), str;
        }
    }, SmartScriptProfiler.prototype.clear = function() {
        this.doProfile && (this.profiles = {});
    }, SmartScriptProfiler.prototype.activate = function(doActivate) {
        return log.debug("smartScriptProfiler.activate"), this.doProfile = "boolean" != typeof doActivate || doActivate, 
        this.doProfile;
    }, module.exports = {
        SmartScriptProfiler: SmartScriptProfiler
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
    /*! loglevel - v1.4.1 - https://github.com/pimterry/loglevel - (c) 2016 Tim Perry - licensed MIT */
    !function(a, b) {
        "use strict";
        __WEBPACK_AMD_DEFINE_FACTORY__ = b, void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(this, function() {
        "use strict";
        function a(a) {
            return typeof console !== h && (void 0 !== console[a] ? b(console, a) : void 0 !== console.log ? b(console, "log") : g);
        }
        function b(a, b) {
            var c = a[b];
            if ("function" == typeof c.bind) return c.bind(a);
            try {
                return Function.prototype.bind.call(c, a);
            } catch (d) {
                return function() {
                    return Function.prototype.apply.apply(c, [ a, arguments ]);
                };
            }
        }
        function c(a, b, c) {
            return function() {
                typeof console !== h && (d.call(this, b, c), this[a].apply(this, arguments));
            };
        }
        function d(a, b) {
            for (var c = 0; c < i.length; c++) {
                var d = i[c];
                this[d] = a > c ? g : this.methodFactory(d, a, b);
            }
        }
        function e(b, d, e) {
            return a(b) || c.apply(this, arguments);
        }
        function f(a, b, c) {
            function f(a) {
                var b = (i[a] || "silent").toUpperCase();
                try {
                    return void (window.localStorage[l] = b);
                } catch (c) {}
                try {
                    window.document.cookie = encodeURIComponent(l) + "=" + b + ";";
                } catch (c) {}
            }
            function g() {
                var a;
                try {
                    a = window.localStorage[l];
                } catch (b) {}
                if (typeof a === h) try {
                    var c = window.document.cookie, d = c.indexOf(encodeURIComponent(l) + "=");
                    d && (a = /^([^;]+)/.exec(c.slice(d))[1]);
                } catch (b) {}
                return void 0 === k.levels[a] && (a = void 0), a;
            }
            var j, k = this, l = "loglevel";
            a && (l += ":" + a), k.levels = {
                TRACE: 0,
                DEBUG: 1,
                INFO: 2,
                WARN: 3,
                ERROR: 4,
                SILENT: 5
            }, k.methodFactory = c || e, k.getLevel = function() {
                return j;
            }, k.setLevel = function(b, c) {
                if ("string" == typeof b && void 0 !== k.levels[b.toUpperCase()] && (b = k.levels[b.toUpperCase()]), 
                !("number" == typeof b && b >= 0 && b <= k.levels.SILENT)) throw "log.setLevel() called with invalid level: " + b;
                return j = b, !1 !== c && f(b), d.call(k, b, a), typeof console === h && b < k.levels.SILENT ? "No console available for logging" : void 0;
            }, k.setDefaultLevel = function(a) {
                g() || k.setLevel(a, !1);
            }, k.enableAll = function(a) {
                k.setLevel(k.levels.TRACE, a);
            }, k.disableAll = function(a) {
                k.setLevel(k.levels.SILENT, a);
            };
            var m = g();
            null == m && (m = null == b ? "WARN" : b), k.setLevel(m, !1);
        }
        var g = function() {}, h = "undefined", i = [ "trace", "debug", "info", "warn", "error" ], j = new f(), k = {};
        j.getLogger = function(a) {
            if ("string" != typeof a || "" === a) throw new TypeError("You must supply a name when creating a logger.");
            var b = k[a];
            return b || (b = k[a] = new f(a, j.getLevel(), j.methodFactory)), b;
        };
        var l = typeof window !== h ? window.log : void 0;
        return j.noConflict = function() {
            return typeof window !== h && window.log === j && (window.log = l), j;
        }, j;
    });
}, function(module, exports) {
    /**
* @license
* Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
* See README.md for details.
*/
    function LRUCache(limit) {
        this.size = 0, this.limit = limit, this.oldest = this.newest = void 0, this._keymap = {};
    }
    LRUCache.prototype._markEntryAsUsed = function(entry) {
        entry !== this.newest && (entry.newer && (entry === this.oldest && (this.oldest = entry.newer), 
        entry.newer.older = entry.older), entry.older && (entry.older.newer = entry.newer), 
        entry.newer = void 0, entry.older = this.newest, this.newest && (this.newest.newer = entry), 
        this.newest = entry);
    }, LRUCache.prototype.put = function(key, value) {
        var entry = this._keymap[key];
        return entry ? (entry.value = value, void this._markEntryAsUsed(entry)) : (this._keymap[key] = entry = {
            key: key,
            value: value,
            older: void 0,
            newer: void 0
        }, this.newest ? (this.newest.newer = entry, entry.older = this.newest) : this.oldest = entry, 
        this.newest = entry, this.size++, this.size > this.limit ? this.shift() : void 0);
    }, LRUCache.prototype.shift = function() {
        var entry = this.oldest;
        return entry && (this.oldest.newer ? (this.oldest = this.oldest.newer, this.oldest.older = void 0) : (this.oldest = void 0, 
        this.newest = void 0), entry.newer = entry.older = void 0, delete this._keymap[entry.key], 
        this.size--), entry;
    }, LRUCache.prototype.get = function(key, returnEntry) {
        var entry = this._keymap[key];
        if (void 0 !== entry) return this._markEntryAsUsed(entry), returnEntry ? entry : entry.value;
    }, LRUCache.prototype.find = function(key) {
        return this._keymap[key];
    }, LRUCache.prototype.set = function(key, value) {
        var oldvalue, entry = this.get(key, !0);
        return entry ? (oldvalue = entry.value, entry.value = value) : (oldvalue = this.put(key, value)) && (oldvalue = oldvalue.value), 
        oldvalue;
    }, LRUCache.prototype.remove = function(key) {
        var entry = this._keymap[key];
        if (entry) return delete this._keymap[entry.key], entry.newer && entry.older ? (entry.older.newer = entry.newer, 
        entry.newer.older = entry.older) : entry.newer ? (entry.newer.older = void 0, this.oldest = entry.newer) : entry.older ? (entry.older.newer = void 0, 
        this.newest = entry.older) : this.oldest = this.newest = void 0, this.size--, entry.value;
    }, LRUCache.prototype.removeAll = function() {
        this.oldest = this.newest = void 0, this.size = 0, this._keymap = {};
    }, "function" == typeof Object.keys ? LRUCache.prototype.keys = function() {
        return Object.keys(this._keymap);
    } : LRUCache.prototype.keys = function() {
        var keys = [];
        for (var k in this._keymap) keys.push(k);
        return keys;
    }, LRUCache.prototype.forEach = function(fun, context, desc) {
        var entry;
        if (!0 === context ? (desc = !0, context = void 0) : "object" != typeof context && (context = this), 
        desc) for (entry = this.newest; entry; ) fun.call(context, entry.key, entry.value, this), 
        entry = entry.older; else for (entry = this.oldest; entry; ) fun.call(context, entry.key, entry.value, this), 
        entry = entry.newer;
    }, LRUCache.prototype.toJSON = function() {
        for (var s = new Array(this.size), i = 0, entry = this.oldest; entry; ) s[i++] = {
            key: entry.key,
            value: entry.value
        }, entry = entry.newer;
        return s;
    }, LRUCache.prototype.toString = function() {
        for (var s = "", entry = this.oldest; entry; ) s += String(entry.key) + ":" + entry.value, 
        (entry = entry.newer) && (s += " < ");
        return s;
    }, "object" == typeof this && (this.LRUCache = LRUCache), module.exports = {
        LRUCache: LRUCache
    };
} ]);