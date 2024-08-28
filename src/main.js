const core = require('@actions/core');
const axios = require('axios');

class Client {

    constructor() {
        this.webhook = core.getInput('webhook', { required: true });
        this.icon = core.getInput('icon', { required: false });
        this.title = core.getInput('title', { required: true });
        this.changes = core.getInput('changes', { required: true });
        this.trigger = core.getInput('trigger', { required: true });
        this.duration = core.getInput('duration', { required: true });
        this.repository = core.getInput('repository', { required: true });
        this.runId = core.getInput('run-id', { required: true });
        this.environment = core.getInput('environment', { required: true });
        this.status = core.getInput('status', { required: true });
        this.timestamp = core.getInput('timestamp', { required: true });
        this.alertMembers = core.getInput('alert-members', { required: false });
    }


    async main() {
        if (!this.webhook) {
            throw Error('webhook is required');
        }
        await axios.post(this.webhook, this.createRequestBody())
            // await axios.post(this.webhook, this.createRequestBody())
            .then(response => {
                // 处理成功响应
                console.log('Response data:', response.data);
            })
            .catch(error => {
                // 处理错误响应
                console.error('Error occurred:', error.message);
                core.setFailed(error.message)
            });
    }

    createRequestBody() {
        return {
            title: this.title,
            icon: this.icon,
            message: this.message,
            alertMembers: this.alertMembers ? this.alertMembers.split(',').reduce((acc, curr) => `${ acc } <at id=${ curr }></at>`) : '<at id=all></at>',
            date: this.dateCover(),
            duration: this.duration,
            changes: this.changes,
            logUrl: this.logUrl,
            trigger: this.trigger,
            projectUrl: this.projectUrl,
            theme: {
                success: 'green',
                failure: 'red',
                cancelled: 'grey'
            }[this.status] || 'default'
        }
    }

    dateCover() {
        let date = new Date(this.timestamp);
        const year = date.getFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }`;
    }
}

new Client().main().catch(e => core.setFailed(e));