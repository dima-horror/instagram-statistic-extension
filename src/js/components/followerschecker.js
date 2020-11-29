export class FollowersChecker{
    constructor(configData){
        let it = this;

        this.dbKey = 'already-followed-db-' + configData.UserName;
        this.db = JSON.parse(localStorage.getItem(this.dbKey) || '{}');
        
        console.log('DB Loaded', this.db);

        this.interval = setInterval(function(){
            it.Loop(it);
        }, 300);
        window.AddToDb = function(name){
            it.AddToDb(name);
        };
        //$(document).on("click", 'body > [role="presentation"] > [role="dialog"] button', this.BindClick);
    }
    Loop(it){
        let modal = $('body > [role="presentation"] > [role="dialog"]');
        modal.find('button[data-binded!="True"]').attr("data-binded", "True").each(function(){
            let name = $($(this).closest('li')).find("a[title]").attr("title");
            if(name == 'whitequeen001'){
                console.warn('bind!!');
            }
            $(this).click(function(){
                if ($(this).text() === "Подписаться"){
                    it.AddToDb(name);
                }
            });
            if (it.db[name]){
                $("<small />").text("Уже в БД").insertBefore($(this));
                $(this).addClass("stat-danger-button", "danger");
            }
        });
        //console.log(modal);
    }
    Unbind(){
        this.interval && clearInterval(this.interval);
        //$(document).off("click", 'body > [role="presentation"] > [role="dialog"] button', this.BindClick);
    }
    SaveDb(){
        localStorage.setItem(this.dbKey, JSON.stringify(this.db));
    }
    AddToDb(name){
        this.db[name] = {
            FollowedAt : new Date()
        }
        console.log('Add name', name, this.db);
        this.SaveDb();
    }
    BindClick(){
        console.log('click');
    }
}