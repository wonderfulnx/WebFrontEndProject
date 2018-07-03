//前端路由
;(function(){
    //首先默认为公告页面
    let announce = document.getElementById("announce_btn")
    history.replaceState({item: announce.id}, null, '#/课程公告')
    
    color_refresh(announce)

    // $("#info_section").load("Announcement.html");

    click_event = function(e){
        e.addEventListener('click', function(){
            if (e.id)
                history.pushState({item: e.id}, null, '#/' + e.textContent)
            else console.log('error')
            color_refresh(e)
            //点击某一按键时做出的相应
        })
    }

    let ul = document.getElementById('summary').childNodes
    for (i in ul){
        if (ul[i].tagName === "LI")
            click_event(ul[i])
        else if (ul[i].tagName === "UL"){
            let ls = ul[i].childNodes
            for (j in ls){
                if (ls[j].tagName === "LI") click_event(ls[j])
            }
        }
    }

    // 监听popstate事件，对状态进行还原
	window.addEventListener('popstate',function(e){
        let id = e.state.item
        color_refresh(this.document.getElementById(id))
	})
})()

function color_refresh(e){
    let ul = document.getElementById("summary").childNodes
    
    for (i in ul){
        if (ul[i].tagName === "LI")
            ul[i].style.color = "#787878"
        else if (ul[i].tagName === "UL"){
            let ls = ul[i].childNodes
            for (j in ls){
                if (ls[j].style) ls[j].style.color = "#787878"
            }
        }
    }
    e.style.color = "#76EE00"
}
