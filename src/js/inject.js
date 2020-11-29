import "../css/inject.scss";


import { ConfigData } from "./components/config";

import { MyFollowersModal } from "./components/myfollowers";
import { FollowersChecker } from "./components/followerschecker";

let configData = new ConfigData();
let followersModalChecker = undefined;

var onLoaded = function(){
    
    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            let pushUrl = arguments[2];
            
            try
            {
                console.log('push-state', pushUrl);   

                //Убираем проверку подписчиков
                followersModalChecker && followersModalChecker.Unbind() && (followersModalChecker = undefined);

                if (pushUrl.endsWith('/following/')){
                    //на кого подписан
                }
                if (pushUrl.endsWith('/followers/')){
                    //кто подписан
                    followersModalChecker = new FollowersChecker(configData);
                }
            }
            catch(e){
                console.error(e);
            }

            return pushState.apply(history, arguments);
        };
    })(window.history);

    (function(t) {
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener("load", function() {
                try
                {
                    if (this.status == 200 && this.responseURL.includes('graphql/query')){
                        var rsp = JSON.parse(this.response);
                        console.log('Statistic', this.responseURL, rsp)
                        if (rsp.data && rsp.data.user && rsp.data.user.edge_follow && rsp.data.user.edge_follow.edges){
                            //new MyFollowersModal().Load(rsp.data.user.edge_follow.edges);
                        }
                    }
                }
                catch(e){
                    console.error('Instagram statistic', e)
                }
            });
            t.apply(this, arguments);
        }
    })(XMLHttpRequest.prototype.open);

    // (function(t) {
    //     XMLHttpRequest.prototype.send = function(){
    //         try
    //         {
    //             let urlPath = this["__zone_symbol__xhrURL"];
    //             if (urlPath && urlPath.includes("cryptic/cryptic")){
    //                 let postData = arguments[0];
    //                 it._executeUrl = urlPath;
    //                 it._executePostData = postData;
    //                 it.sendCommand(JSON.parse(decodeURIComponent(postData.split('=')[1])));
    //             }
    //         }
    //         catch(e){
    //             console.error('MultyFare', e)
    //         }
    //         t.apply(this, arguments);
    //     }
    // })(XMLHttpRequest.prototype.send);
}

if (document.readyState !== 'loading' ) {
    //document is already ready, just execute code
    onLoaded();
} else {
    //document was not ready, wait
    document.addEventListener('DOMContentLoaded', function () {
        onLoaded();
    });
}