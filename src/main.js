const core = require('@actions/core');
const axios = require('axios');

class Client {

    constructor() {
        this.webhook = core.getInput('webhook', { required: true });
        this.icon = core.getInput('icon', { required: false });
        this.title = core.getInput('title', { required: true });
        this.projectName = core.getInput('project-name', { required: true });
        this.trigger = core.getInput('trigger', { required: true });
        this.startTime = new Date(parseInt(core.getInput('start-time', { required: true })) * 1000);
        this.endTime = new Date(parseInt(core.getInput('end-time', { required: true })) * 1000);
        this.repository = core.getInput('repository', { required: true });
        this.runId = core.getInput('run-id', { required: true });
        this.environment = core.getInput('environment', { required: true });
        this.status = core.getInput('status', { required: true });
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
            message: `${ this.projectName } ${ this.capitalizeWords(this.environment) }`,
            alertMembers: this.alertMembers ? this.alertMembers.split(',').reduce((acc, curr) => `${ acc } <at id=${ curr }></at>`, '') : '<at id=all></at>',
            date: this.dateCover(),
            duration: this.calcDuration(),
            logUrl: `https://github.com/${ this.repository }/actions/runs/${ this.runId }`,
            trigger: this.trigger,
            projectUrl: `https://github.com/${ this.repository }`,
            theme: {
                success: 'green',
                failure: 'red',
                cancelled: 'grey'
            }[this.status] || 'default'
        }
    }

    dateCover() {
        const year = this.startTime.getFullYear();
        const month = (this.startTime.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = this.startTime.getDate().toString().padStart(2, '0');
        const hours = this.startTime.getHours().toString().padStart(2, '0');
        const minutes = this.startTime.getMinutes().toString().padStart(2, '0');
        const seconds = this.startTime.getSeconds().toString().padStart(2, '0');
        return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }`;
        core.setOutput()
    }

    calcDuration() {
        return (this.endTime - this.startTime) / 1000;
    }

    capitalizeWords(str) {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

}

new Client().main().catch(e => core.setFailed(e));