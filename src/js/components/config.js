export class ConfigData{
    constructor(){
        let data = window._sharedData;
        this.UserName = data.config.viewer.username;
    }
}