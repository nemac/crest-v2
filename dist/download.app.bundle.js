/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "8b4b47903b17fc13f5f6"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "download";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/scripts/download.js")(__webpack_require__.s = "./src/scripts/download.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/navConfig.js":
/*!*********************************!*\
  !*** ./src/config/navConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar navConfig = exports.navConfig = {\n  navs: [{\n    name: \"home\",\n    ref: \"main-nav-map\",\n    text: \"Home\",\n    id: \"main-nav-map\",\n    href: \"./#Home\"\n  }, {\n    name: \"download\",\n    ref: \"main-nav-download\",\n    text: \"Download Data\",\n    id: \"main-nav-download\",\n    href: \"./#Download\"\n  }, {\n    name: \"about\",\n    ref: \"main-nav-about\",\n    text: \"About\",\n    id: \"main-nav-about\",\n    href: \"./#About\"\n  }]\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcz8zOWExIl0sIm5hbWVzIjpbIm5hdkNvbmZpZyIsIm5hdnMiLCJuYW1lIiwicmVmIiwidGV4dCIsImlkIiwiaHJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFJQSxnQ0FBWTtBQUNyQkMsUUFBSyxDQUFDO0FBQ0pDLFVBQU0sTUFERjtBQUVKQyxTQUFLLGNBRkQ7QUFHSkMsVUFBTSxNQUhGO0FBSUpDLFFBQUksY0FKQTtBQUtKQyxVQUFNO0FBTEYsR0FBRCxFQU9MO0FBQ0VKLFVBQU0sVUFEUjtBQUVFQyxTQUFLLG1CQUZQO0FBR0VDLFVBQU0sZUFIUjtBQUlFQyxRQUFJLG1CQUpOO0FBS0VDLFVBQU07QUFMUixHQVBLLEVBY0w7QUFDRUosVUFBTSxPQURSO0FBRUVDLFNBQUssZ0JBRlA7QUFHRUMsVUFBTSxPQUhSO0FBSUVDLFFBQUksZ0JBSk47QUFLRUMsVUFBTTtBQUxSLEdBZEs7QUFEZ0IsQ0FBaEIiLCJmaWxlIjoiLi9zcmMvY29uZmlnL25hdkNvbmZpZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgbmF2Q29uZmlnID0ge1xuICBuYXZzOlt7XG4gICAgbmFtZTogXCJob21lXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LW1hcFwiLFxuICAgIHRleHQ6IFwiSG9tZVwiLFxuICAgIGlkOiBcIm1haW4tbmF2LW1hcFwiLFxuICAgIGhyZWY6IFwiLi8jSG9tZVwiXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRvd25sb2FkXCIsXG4gICAgcmVmOiBcIm1haW4tbmF2LWRvd25sb2FkXCIsXG4gICAgdGV4dDogXCJEb3dubG9hZCBEYXRhXCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtZG93bmxvYWRcIixcbiAgICBocmVmOiBcIi4vI0Rvd25sb2FkXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWJvdXRcIixcbiAgICByZWY6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICB0ZXh0OiBcIkFib3V0XCIsXG4gICAgaWQ6IFwibWFpbi1uYXYtYWJvdXRcIixcbiAgICBocmVmOiBcIi4vI0Fib3V0XCJcbiAgfV1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/navConfig.js\n");

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base component class to provide view ref binding, template insertion, and event listener setup\n */\nvar Component = exports.Component = function () {\n  /**\n   * Component Constructor\n   * @param { String } placeholderId - Element ID to inflate the component into\n   * @param { Object } props - Component properties\n   * @param { Object } props.events - Component event listeners\n   * @param { Object } props.data - Component data properties\n   * @param { String } template - HTML template to inflate into placeholder id\n   */\n  function Component(placeholderId) {\n    var _this = this;\n\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var template = arguments[2];\n\n    _classCallCheck(this, Component);\n\n    this.componentElem = document.getElementById(placeholderId);\n\n    this.refs = {};\n\n    if (template) {\n      if (this.componentElem != null) {\n        this.componentElem.addEventListener('load', function () {\n          // placeholder for future use\n        });\n\n        this.componentElem.addEventListener('unload', function () {\n          // placeholder for future use\n        });\n\n        // Load template into placeholder element\n        this.componentElem.innerHTML = template;\n\n        // Find all refs in component\n        var refElems = this.componentElem.querySelectorAll('[ref]');\n        refElems.forEach(function (elem) {\n          _this.refs[elem.getAttribute('ref')] = elem;\n        });\n      }\n    }\n\n    if (props.events) {\n      this.createEvents(props.events);\n    }\n  }\n\n  /** Read \"event\" component parameters, and attach event listeners for each */\n\n\n  _createClass(Component, [{\n    key: 'createEvents',\n    value: function createEvents(events) {\n      var _this2 = this;\n\n      Object.keys(events).forEach(function (eventName) {\n        _this2.componentElem.addEventListener(eventName, events[eventName], false);\n      });\n    }\n\n    /** Trigger a component event with the provided \"detail\" payload */\n\n  }, {\n    key: 'triggerEvent',\n    value: function triggerEvent(eventName, detail) {\n      var event = new window.CustomEvent(eventName, { detail: detail });\n      this.componentElem.dispatchEvent(event);\n    }\n  }]);\n\n  return Component;\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzLmpzP2VhOTUiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwicGxhY2Vob2xkZXJJZCIsInByb3BzIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlZnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwicmVmRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJldmVudHMiLCJjcmVhdGVFdmVudHMiLCJPYmplY3QiLCJrZXlzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR2FBLFMsV0FBQUEsUztBQUNYOzs7Ozs7OztBQVFBLHFCQUFZQyxhQUFaLEVBQWlEO0FBQUE7O0FBQUEsUUFBdEJDLEtBQXNCLHVFQUFkLEVBQWM7QUFBQSxRQUFWQyxRQUFVOztBQUFBOztBQUMvQyxTQUFLQyxhQUFMLEdBQXFCQyxTQUFTQyxjQUFULENBQXdCTCxhQUF4QixDQUFyQjs7QUFHQSxTQUFLTSxJQUFMLEdBQVksRUFBWjs7QUFFQSxRQUFJSixRQUFKLEVBQWM7QUFDWixVQUFJLEtBQUtDLGFBQUwsSUFBc0IsSUFBMUIsRUFBZ0M7QUFDOUIsYUFBS0EsYUFBTCxDQUFtQkksZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLFlBQU07QUFDaEQ7QUFDRCxTQUZEOztBQUlBLGFBQUtKLGFBQUwsQ0FBbUJJLGdCQUFuQixDQUFvQyxRQUFwQyxFQUE4QyxZQUFNO0FBQ2xEO0FBQ0QsU0FGRDs7QUFJQTtBQUNBLGFBQUtKLGFBQUwsQ0FBbUJLLFNBQW5CLEdBQStCTixRQUEvQjs7QUFFQTtBQUNBLFlBQU1PLFdBQVcsS0FBS04sYUFBTCxDQUFtQk8sZ0JBQW5CLENBQW9DLE9BQXBDLENBQWpCO0FBQ0FELGlCQUFTRSxPQUFULENBQWlCLFVBQUNDLElBQUQsRUFBVTtBQUFFLGdCQUFLTixJQUFMLENBQVVNLEtBQUtDLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVixJQUFzQ0QsSUFBdEM7QUFBNkMsU0FBMUU7QUFDRDtBQUNGOztBQUVELFFBQUlYLE1BQU1hLE1BQVYsRUFBa0I7QUFBRSxXQUFLQyxZQUFMLENBQWtCZCxNQUFNYSxNQUF4QjtBQUFrQztBQUN2RDs7QUFFRDs7Ozs7aUNBQ2FBLE0sRUFBUTtBQUFBOztBQUNuQkUsYUFBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSCxPQUFwQixDQUE0QixVQUFDTyxTQUFELEVBQWU7QUFDekMsZUFBS2YsYUFBTCxDQUFtQkksZ0JBQW5CLENBQW9DVyxTQUFwQyxFQUErQ0osT0FBT0ksU0FBUCxDQUEvQyxFQUFrRSxLQUFsRTtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7OztpQ0FDYUEsUyxFQUFXQyxNLEVBQVE7QUFDOUIsVUFBTUMsUUFBUSxJQUFJQyxPQUFPQyxXQUFYLENBQXVCSixTQUF2QixFQUFrQyxFQUFFQyxjQUFGLEVBQWxDLENBQWQ7QUFDQSxXQUFLaEIsYUFBTCxDQUFtQm9CLGFBQW5CLENBQWlDSCxLQUFqQztBQUNEIiwiZmlsZSI6Ii4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQmFzZSBjb21wb25lbnQgY2xhc3MgdG8gcHJvdmlkZSB2aWV3IHJlZiBiaW5kaW5nLCB0ZW1wbGF0ZSBpbnNlcnRpb24sIGFuZCBldmVudCBsaXN0ZW5lciBzZXR1cFxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbXBvbmVudCBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwbGFjZWhvbGRlcklkIC0gRWxlbWVudCBJRCB0byBpbmZsYXRlIHRoZSBjb21wb25lbnQgaW50b1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSBwcm9wcyAtIENvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHByb3BzLmV2ZW50cyAtIENvbXBvbmVudCBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcHJvcHMuZGF0YSAtIENvbXBvbmVudCBkYXRhIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdGVtcGxhdGUgLSBIVE1MIHRlbXBsYXRlIHRvIGluZmxhdGUgaW50byBwbGFjZWhvbGRlciBpZFxuICAgKi9cbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXJJZCwgcHJvcHMgPSB7fSwgdGVtcGxhdGUpIHtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZWhvbGRlcklkKTtcblxuXG4gICAgdGhpcy5yZWZzID0ge307XG5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBwbGFjZWhvbGRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIHRoaXMuY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcblxuICAgICAgICAvLyBGaW5kIGFsbCByZWZzIGluIGNvbXBvbmVudFxuICAgICAgICBjb25zdCByZWZFbGVtcyA9IHRoaXMuY29tcG9uZW50RWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcmVmXScpO1xuICAgICAgICByZWZFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7IHRoaXMucmVmc1tlbGVtLmdldEF0dHJpYnV0ZSgncmVmJyldID0gZWxlbTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmV2ZW50cykgeyB0aGlzLmNyZWF0ZUV2ZW50cyhwcm9wcy5ldmVudHMpOyB9XG4gIH1cblxuICAvKiogUmVhZCBcImV2ZW50XCIgY29tcG9uZW50IHBhcmFtZXRlcnMsIGFuZCBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoICovXG4gIGNyZWF0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudHNbZXZlbnROYW1lXSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyaWdnZXIgYSBjb21wb25lbnQgZXZlbnQgd2l0aCB0aGUgcHJvdmlkZWQgXCJkZXRhaWxcIiBwYXlsb2FkICovXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIHRoaXMuY29tcG9uZW50RWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/components.js\n");

/***/ }),

/***/ "./src/scripts/download.js":
/*!*********************************!*\
  !*** ./src/scripts/download.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _navBar = __webpack_require__(/*! ./navBar */ \"./src/scripts/navBar.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// console.log(count);\nvar ViewController = function () {\n  // Initialize Application\n  function ViewController() {\n    _classCallCheck(this, ViewController);\n\n    this.initializeComponents();\n  }\n\n  _createClass(ViewController, [{\n    key: 'initializeComponents',\n    value: function initializeComponents() {\n      // Initialize Nav Bar\n      this.navComponent = new _navBar.NavBar('nav-holder');\n    }\n  }]);\n\n  return ViewController;\n}();\n\nwindow.ctrl = new ViewController();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9kb3dubG9hZC5qcz9mYzNmIl0sIm5hbWVzIjpbIlZpZXdDb250cm9sbGVyIiwiaW5pdGlhbGl6ZUNvbXBvbmVudHMiLCJuYXZDb21wb25lbnQiLCJOYXZCYXIiLCJ3aW5kb3ciLCJjdHJsIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFFQTtJQUNNQSxjO0FBQ0o7QUFDQSw0QkFBYztBQUFBOztBQUNaLFNBQUtDLG9CQUFMO0FBQ0Q7Ozs7MkNBRXNCO0FBQ3JCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixJQUFJQyxjQUFKLENBQVcsWUFBWCxDQUFwQjtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsSUFBUCxHQUFjLElBQUlMLGNBQUosRUFBZCIsImZpbGUiOiIuL3NyYy9zY3JpcHRzL2Rvd25sb2FkLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF2QmFyIH0gZnJvbSAnLi9uYXZCYXInO1xuXG4vLyBjb25zb2xlLmxvZyhjb3VudCk7XG5jbGFzcyBWaWV3Q29udHJvbGxlciB7XG4gIC8vIEluaXRpYWxpemUgQXBwbGljYXRpb25cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50cygpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUNvbXBvbmVudHMoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBOYXYgQmFyXG4gICAgdGhpcy5uYXZDb21wb25lbnQgPSBuZXcgTmF2QmFyKCduYXYtaG9sZGVyJyk7XG4gIH1cbn1cblxud2luZG93LmN0cmwgPSBuZXcgVmlld0NvbnRyb2xsZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/download.js\n");

/***/ }),

/***/ "./src/scripts/navBar.js":
/*!*******************************!*\
  !*** ./src/scripts/navBar.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.NavBar = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _nav_bar = __webpack_require__(/*! ../templates/nav_bar.html */ \"./src/templates/nav_bar.html\");\n\nvar _nav_bar2 = _interopRequireDefault(_nav_bar);\n\nvar _nav_bar_nav = __webpack_require__(/*! ../templates/nav_bar_nav.html */ \"./src/templates/nav_bar_nav.html\");\n\nvar _nav_bar_nav2 = _interopRequireDefault(_nav_bar_nav);\n\nvar _components = __webpack_require__(/*! ./components */ \"./src/scripts/components.js\");\n\nvar _navConfig = __webpack_require__(/*! ../config/navConfig */ \"./src/config/navConfig.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // default map template\n\n\n/**\n * NavBar Component\n * Render and control map layer control\n */\nvar NavBar = exports.NavBar = function (_Component) {\n  _inherits(NavBar, _Component);\n\n  function NavBar(placeholderId, props) {\n    _classCallCheck(this, NavBar);\n\n    /**\n     * get nav configuration\n     */\n    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, placeholderId, props, _nav_bar2.default));\n\n    _this.navConfig = _navConfig.navConfig;\n\n    _this.activeNav = '';\n\n    // get the main nav element\n    var navHeaderElement = document.getElementById('main-nav');\n\n    /**\n     *  iterate each nav and add it to the ui\n     */\n    var cnt = 1;\n    _navConfig.navConfig.navs.forEach(function (nav) {\n      var navInnerHTML = navHeaderElement.innerHTML;\n      navHeaderElement.innerHTML = navInnerHTML + _nav_bar_nav2.default;\n\n      var navElement = document.getElementById('main-nav-page');\n\n      // first tab is always active\n      if (cnt === 1) {\n        navElement.className += ' active';\n      }\n\n      navElement.setAttribute('ref', nav.ref); // nav ref\n      navElement.setAttribute('href', nav.href); // nav href\n      navElement.setAttribute('id', nav.id); // nav id\n      navElement.setAttribute('aria-label', nav.text); // aria-label\n      navElement.setAttribute('title', nav.text); // title\n      navElement.textContent = nav.text; // nav text\n\n      cnt += 1;\n    });\n\n    // add click event for active toggle\n    _this.addTabClick();\n    return _this;\n  }\n\n  _createClass(NavBar, [{\n    key: 'addTabClick',\n    value: function addTabClick() {\n      var _this2 = this;\n\n      _navConfig.navConfig.navs.forEach(function (nav) {\n        var el = document.getElementById(nav.id);\n        el.addEventListener('click', function (e) {\n          NavBar.deactivateAllNavs();\n          NavBar.toggleTabContent(e.target.id);\n          var ele = e.target;\n          ele.className += ' active';\n\n          // add to store later\n          _this2.activeNav = nav.id;\n        });\n      });\n    }\n  }], [{\n    key: 'tabUpdate',\n    value: function tabUpdate(id) {\n      NavBar.deactivateAllNavs();\n      var el = document.getElementById(id);\n      el.className = el.className + ' active';\n    }\n  }, {\n    key: 'deactivateAllNavs',\n    value: function deactivateAllNavs() {\n      _navConfig.navConfig.navs.forEach(function (nav) {\n        var el = document.getElementById(nav.id);\n        el.className = el.className.replace(' active', '');\n      });\n    }\n  }, {\n    key: 'toggleTabContent',\n    value: function toggleTabContent(id) {\n      NavBar.resetTabContent();\n      var el = document.getElementById('tab-' + id);\n      el.className = el.className.replace(' d-none', '');\n    }\n  }, {\n    key: 'resetTabContent',\n    value: function resetTabContent() {\n      _navConfig.navConfig.navs.forEach(function (nav) {\n        var el = document.getElementById('tab-' + nav.id);\n        el.className = el.className.replace(' d-none', '');\n        el.className += ' d-none';\n      });\n\n      // not found in case it was revealed.\n      var el = document.getElementById('tab-main-nav-notfound');\n      el.className = el.className.replace(' d-none', '');\n      el.className += ' d-none';\n    }\n  }]);\n\n  return NavBar;\n}(_components.Component);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9uYXZCYXIuanM/MmIxOSJdLCJuYW1lcyI6WyJOYXZCYXIiLCJwbGFjZWhvbGRlcklkIiwicHJvcHMiLCJuYXZUZW1wbGF0ZSIsIm5hdkNvbmZpZyIsImFjdGl2ZU5hdiIsIm5hdkhlYWRlckVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY250IiwibmF2cyIsImZvckVhY2giLCJuYXYiLCJuYXZJbm5lckhUTUwiLCJpbm5lckhUTUwiLCJuYXZCYXJzVGVtcGxhdGUiLCJuYXZFbGVtZW50IiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwicmVmIiwiaHJlZiIsImlkIiwidGV4dCIsInRleHRDb250ZW50IiwiYWRkVGFiQ2xpY2siLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZGVhY3RpdmF0ZUFsbE5hdnMiLCJ0b2dnbGVUYWJDb250ZW50IiwidGFyZ2V0IiwiZWxlIiwicmVwbGFjZSIsInJlc2V0VGFiQ29udGVudCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7OzsrZUFMQTs7O0FBT0E7Ozs7SUFJYUEsTSxXQUFBQSxNOzs7QUFDWCxrQkFBWUMsYUFBWixFQUEyQkMsS0FBM0IsRUFBa0M7QUFBQTs7QUFHaEM7OztBQUhnQyxnSEFDMUJELGFBRDBCLEVBQ1hDLEtBRFcsRUFDSkMsaUJBREk7O0FBTWhDLFVBQUtDLFNBQUwsR0FBaUJBLG9CQUFqQjs7QUFFQSxVQUFLQyxTQUFMLEdBQWlCLEVBQWpCOztBQUVBO0FBQ0EsUUFBTUMsbUJBQW1CQyxTQUFTQyxjQUFULENBQXdCLFVBQXhCLENBQXpCOztBQUVBOzs7QUFHQSxRQUFJQyxNQUFNLENBQVY7QUFDQUwseUJBQVVNLElBQVYsQ0FBZUMsT0FBZixDQUF1QixVQUFDQyxHQUFELEVBQVM7QUFDOUIsVUFBTUMsZUFBZVAsaUJBQWlCUSxTQUF0QztBQUNBUix1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UixTQUFILElBQWdCLFNBQWhCO0FBQ0Q7Ozs7RUF4RnlCaUIscUIiLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9uYXZCYXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkZWZhdWx0IG1hcCB0ZW1wbGF0ZVxuaW1wb3J0IG5hdlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9uYXZfYmFyLmh0bWwnO1xuaW1wb3J0IG5hdkJhcnNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvbmF2X2Jhcl9uYXYuaHRtbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBuYXZDb25maWcgfSBmcm9tICcuLi9jb25maWcvbmF2Q29uZmlnJztcblxuLyoqXG4gKiBOYXZCYXIgQ29tcG9uZW50XG4gKiBSZW5kZXIgYW5kIGNvbnRyb2wgbWFwIGxheWVyIGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdkJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHBsYWNlaG9sZGVySWQsIHByb3BzKSB7XG4gICAgc3VwZXIocGxhY2Vob2xkZXJJZCwgcHJvcHMsIG5hdlRlbXBsYXRlKTtcblxuICAgIC8qKlxuICAgICAqIGdldCBuYXYgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIHRoaXMubmF2Q29uZmlnID0gbmF2Q29uZmlnO1xuXG4gICAgdGhpcy5hY3RpdmVOYXYgPSAnJztcblxuICAgIC8vIGdldCB0aGUgbWFpbiBuYXYgZWxlbWVudFxuICAgIGNvbnN0IG5hdkhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1uYXYnKTtcblxuICAgIC8qKlxuICAgICAqICBpdGVyYXRlIGVhY2ggbmF2IGFuZCBhZGQgaXQgdG8gdGhlIHVpXG4gICAgICovXG4gICAgbGV0IGNudCA9IDE7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBuYXZJbm5lckhUTUwgPSBuYXZIZWFkZXJFbGVtZW50LmlubmVySFRNTDtcbiAgICAgIG5hdkhlYWRlckVsZW1lbnQuaW5uZXJIVE1MID0gbmF2SW5uZXJIVE1MICsgbmF2QmFyc1RlbXBsYXRlO1xuXG4gICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbmF2LXBhZ2UnKTtcblxuICAgICAgLy8gZmlyc3QgdGFiIGlzIGFsd2F5cyBhY3RpdmVcbiAgICAgIGlmIChjbnQgPT09IDEpIHtcbiAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgfVxuXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVmJywgbmF2LnJlZik7IC8vIG5hdiByZWZcbiAgICAgIG5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbmF2LmhyZWYpOyAvLyBuYXYgaHJlZlxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmF2LmlkKTsgLy8gbmF2IGlkXG4gICAgICBuYXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIG5hdi50ZXh0KTsgLy8gYXJpYS1sYWJlbFxuICAgICAgbmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgbmF2LnRleHQpOyAvLyB0aXRsZVxuICAgICAgbmF2RWxlbWVudC50ZXh0Q29udGVudCA9IG5hdi50ZXh0OyAvLyBuYXYgdGV4dFxuXG4gICAgICBjbnQgKz0gMTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudCBmb3IgYWN0aXZlIHRvZ2dsZVxuICAgIHRoaXMuYWRkVGFiQ2xpY2soKTtcbiAgfVxuXG4gIGFkZFRhYkNsaWNrKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBOYXZCYXIuZGVhY3RpdmF0ZUFsbE5hdnMoKTtcbiAgICAgICAgTmF2QmFyLnRvZ2dsZVRhYkNvbnRlbnQoZS50YXJnZXQuaWQpO1xuICAgICAgICBjb25zdCBlbGUgPSBlLnRhcmdldDtcbiAgICAgICAgZWxlLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG5cbiAgICAgICAgLy8gYWRkIHRvIHN0b3JlIGxhdGVyXG4gICAgICAgIHRoaXMuYWN0aXZlTmF2ID0gbmF2LmlkO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdGFiVXBkYXRlKGlkKSB7XG4gICAgTmF2QmFyLmRlYWN0aXZhdGVBbGxOYXZzKCk7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSBhY3RpdmVgO1xuICB9XG5cbiAgc3RhdGljIGRlYWN0aXZhdGVBbGxOYXZzKCkge1xuICAgIG5hdkNvbmZpZy5uYXZzLmZvckVhY2goKG5hdikgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXYuaWQpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlVGFiQ29udGVudChpZCkge1xuICAgIE5hdkJhci5yZXNldFRhYkNvbnRlbnQoKTtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtpZH1gKTtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgfVxuXG4gIHN0YXRpYyByZXNldFRhYkNvbnRlbnQoKSB7XG4gICAgbmF2Q29uZmlnLm5hdnMuZm9yRWFjaCgobmF2KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YWItJHtuYXYuaWR9YCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgnIGQtbm9uZScsICcnKTtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgfSk7XG5cbiAgICAvLyBub3QgZm91bmQgaW4gY2FzZSBpdCB3YXMgcmV2ZWFsZWQuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLW1haW4tbmF2LW5vdGZvdW5kJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJyBkLW5vbmUnLCAnJyk7XG4gICAgZWwuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/navBar.js\n");

/***/ }),

/***/ "./src/templates/nav_bar.html":
/*!************************************!*\
  !*** ./src/templates/nav_bar.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<nav class=\\\"nav flex-column flex-sm-row\\\" id=\\\"main-nav\\\" >\\n</nav>\\n\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXIuaHRtbD80OGRmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vc3JjL3RlbXBsYXRlcy9uYXZfYmFyLmh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdiBjbGFzcz1cXFwibmF2IGZsZXgtY29sdW1uIGZsZXgtc20tcm93XFxcIiBpZD1cXFwibWFpbi1uYXZcXFwiID5cXG48L25hdj5cXG5cIjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/templates/nav_bar.html\n");

/***/ }),

/***/ "./src/templates/nav_bar_nav.html":
/*!****************************************!*\
  !*** ./src/templates/nav_bar_nav.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<a ref=\\\"main-nav-page\\\" id=\\\"main-nav-page\\\" class=\\\"nav-link main-nav\\\" href=\\\"\\\"></a>\\n\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL25hdl9iYXJfbmF2Lmh0bWw/Yjc5MSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuL3NyYy90ZW1wbGF0ZXMvbmF2X2Jhcl9uYXYuaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8YSByZWY9XFxcIm1haW4tbmF2LXBhZ2VcXFwiIGlkPVxcXCJtYWluLW5hdi1wYWdlXFxcIiBjbGFzcz1cXFwibmF2LWxpbmsgbWFpbi1uYXZcXFwiIGhyZWY9XFxcIlxcXCI+PC9hPlxcblwiOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/templates/nav_bar_nav.html\n");

/***/ })

/******/ });