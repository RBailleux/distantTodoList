class TodoList
{
    constructor(targetId)
    {
        this.target = document.getElementById(targetId);
        this.fetchUrl = "https://api.myjson.com/bins/9l2ez";
        this.liClassnamePrefix = "todolist-element";
        this.liClassnameClicked = "todolist-element-complete";
        this.getList();
    }
    
    
    getList()
    {
        var _this = this;
        fetch(this.fetchUrl).then(function(response) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    _this.addTodo(json);
                });
            } else {
                //console.log("Oops, nous n'avons pas du JSON!");
            }
        });
    }
    
    addTodo(json)
    {
        let todoList = json["todos"];
        if(todoList.length > 0){
            for(let i = 0; i < todoList.length; i++) {
                let className = this.liClassnamePrefix;
                if(todoList[i].complete){
                    className += " "+this.liClassnameClicked;
                }
                console.log(todoList[i]);
                this.target.innerHTML += "<li class=\""+className+"\">"+todoList[i].label+"</li>";
            }
            this.addListeners();
        }
    }
    
    addListeners()
    {
        let liTargets = document.getElementsByClassName(this.liClassnamePrefix);
        let _this = this;
        for(let i = 0; i < liTargets.length; i++){
            _this.applyClickedStyle(liTargets[i]);
        }
    }
    
    applyClickedStyle(element){
        let _this = this;
        element.addEventListener("click", function(){
            this.className += " "+_this.liClassnameClicked;
        });
    }
}

new TodoList("TODOTarget");