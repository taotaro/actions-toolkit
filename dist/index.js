require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 406:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 634:
/***/ ((module) => {

module.exports = eval("require")("@actions/io");


/***/ }),

/***/ 866:
/***/ ((module) => {

module.exports = eval("require")("@alicloud/openapi-client");


/***/ }),

/***/ 564:
/***/ ((module) => {

module.exports = eval("require")("@alicloud/sae20190506");


/***/ }),

/***/ 413:
/***/ ((module) => {

module.exports = eval("require")("@alicloud/tea-util");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(406);
const io = __nccwpck_require__(634);

// This file is auto-generated, don't edit it
// Dependent modules can be viewed by downloading the module dependency file in the project or obtaining SDK dependency information in the upper right corner
const SAEClient = __nccwpck_require__(564);
const OpenApi = __nccwpck_require__(866);
const Util = __nccwpck_require__(413);

class Client {

    /**
     * Initialize the Client with the AccessKey of the account
     * @return Client
     * @throws Exception
     */
    static createClient() {
        // The project code leakage may result in the leakage of AccessKey, posing a threat to the security of all resources under the account. The following code examples are for reference only.
        // It is recommended to use the more secure STS credential. For more credentials, please refer to: https://www.alibabacloud.com/help/en/alibaba-cloud-sdk-262060/latest/credentials-settings-5.
        let config = new OpenApi.Config({
            // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID is set.
            accessKeyId: this.accessKeyId, // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_SECRET is set.
            accessKeySecret: this.accessKeySecret,
        });
        // See https://api.alibabacloud.com/product/sae.
        config.regionId = this.regionId;
        return new SAEClient.default(config);
    }

    static async main() {
        this.accessKeyId = core.getInput('access-key-id', { required: false });
        this.accessKeySecret = core.getInput('access-key-secret', { required: false });
        this.regionId = core.getInput('region-id', { required: false });
        this.appId = core.getInput('app-id', { required: false });
        this.imageUrl = core.getInput('image-url', { required: false });

        let client = Client.createClient();
        let deployApplicationRequest = new SAEClient.DeployApplicationRequest({});
        deployApplicationRequest.appId = this.appId;
        deployApplicationRequest.imageUrl = this.imageUrl;
        let runtime = new Util.RuntimeOptions({});
        let headers = { 'Content-Type': 'application/json' };
        console.log(JSON.stringify({ regionId, appId, imageUrl }))
        try {
            // Copy the code to run, please print the return value of the API by yourself.
            await client.deployApplicationWithOptions(deployApplicationRequest, headers, runtime);
        } catch (error) {
            // Only a printing example. Please be careful about exception handling and do not ignore exceptions directly in engineering projects.
            // print error message
            console.log(error.message);
            // Please click on the link below for diagnosis.
            console.log(error.data.Recommend);
            Util.default.assertAsString(error.message);
        }
    }

}

Client.main().catch(e => core.setFailed(e));

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map