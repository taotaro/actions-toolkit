const core = require('@actions/core');

// This file is auto-generated, don't edit it
// Dependent modules can be viewed by downloading the module dependency file in the project or obtaining SDK dependency information in the upper right corner
const SAEClient = require('@alicloud/sae20190506');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');

class Client {

    constructor() {
        this.accessKeyId = core.getInput('access-key-id', { required: false });
        this.accessKeySecret = core.getInput('access-key-secret', { required: false });
        this.regionId = core.getInput('region-id', { required: false });
        this.configMapId = core.getInput('sae-config-map-id', { required: false });
    }

    /**
     * Initialize the Client with the AccessKey of the account
     * @return Client
     * @throws Exception
     */
    createClient() {
        // The project code leakage may result in the leakage of AccessKey, posing a threat to the security of all resources under the account. The following code examples are for reference only.
        // It is recommended to use the more secure STS credential. For more credentials, please refer to: https://www.alibabacloud.com/help/en/alibaba-cloud-sdk-262060/latest/credentials-settings-5.
        let config = new OpenApi.Config({
            // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID is set.
            accessKeyId: this.accessKeyId, // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_SECRET is set.
            accessKeySecret: this.accessKeySecret,
        });
        config.readTimeout = 10000;
        // See https://api.alibabacloud.com/product/sae.
        config.regionId = this.regionId;
        return new SAEClient.default(config);
    }

    createRequest() {
        let describeConfigMapRequest = new SAEClient.DescribeConfigMapRequest({});
        describeConfigMapRequest.configMapId = parseInt(this.configMapId);
        return describeConfigMapRequest;
    }

    async doRequest(request) {
        try {
            // Copy the code to run, please print the return value of the API by yourself.
            const response = await this.createClient().describeConfigMap(request);
            if (response.statusCode !== 200 || !response.Success) {
                new Error("DescribeConfigMap failed");
            }
            const { data: configMap } = response.body.data;
            // Set environment variables in GitHub Actions
            for (const [key, value] of Object.entries(configMap)) {
                core.exportVariable(`CONFIG_MAP_${ key }`, value);
            }
        } catch (error) {
            // Only a printing example. Please be careful about exception handling and do not ignore exceptions directly in engineering projects.
            // print error message
            console.log(error.message);
            // Please click on the link below for diagnosis.
            console.log(error.data);
            Util.default.assertAsString(error.message);
        }
    }

    async main() {
        console.log(`SAE ConfigMap ID: ${ this.configMapId }`);
        if (!this.configMapId) {
            return;
        }
        let request = this.createRequest();
        await this.doRequest(request);
    }
}

new Client().main().catch(e => core.setFailed(e));