//前端路由
; (function () {
    //首先默认为公告页面
    let announce = document.getElementById("announce_btn")
    history.replaceState({ item: announce.id }, null, '#/课程公告')

    color_refresh(announce)
    show_refresh("announces")

    click_event = function (e) {
        e.addEventListener('click', function () {
            if (e.id)
                history.pushState({ item: e.id }, null, '#/' + e.textContent)
            else console.log('error')
            color_refresh(e)

            //点击某一按键时做出的相应
            if (e.id === 'announce_btn') show_refresh("announces")
            else if (e.id === 'lecture_btn' || e.id === 'file_btn') show_refresh("lecture")
            else if (e.id === 'exper_lec_btn') show_refresh('exper_lec')
            else if (e.id === 'exper_file_btn') show_refresh('exper_file')
        })
    }

    let ul = document.getElementById('summary').childNodes
    for (i in ul) {
        if (ul[i].tagName === "LI")
            click_event(ul[i])
        else if (ul[i].tagName === "UL") {
            let ls = ul[i].childNodes
            for (j in ls) {
                if (ls[j].tagName === "LI") click_event(ls[j])
            }
        }
    }

    // 监听popstate事件，对状态进行还原
    window.addEventListener('popstate', function (e) {
        let id = e.state.item
        color_refresh(this.document.getElementById(id))
    })
})()

function color_refresh(e) {
    let ul = document.getElementById("summary").childNodes

    for (i in ul) {
        if (ul[i].tagName === "LI")
            ul[i].style.color = "#787878"
        else if (ul[i].tagName === "UL") {
            let ls = ul[i].childNodes
            for (j in ls) {
                if (ls[j].style) ls[j].style.color = "#787878"
            }
        }
    }
    e.style.color = "#76EE00"
}

function show_refresh(str) {
    let info_sec = document.getElementById("info_section")
    // console.log(info_sec)
    let ls = info_sec.childNodes
    for (i in ls)
        if (ls[i].style) ls[i].style.display = "none"
    let e = document.getElementById(str)
    // console.log(e)
    if (e)
        e.style.display = "block"
}

function enter_anno(i) {
    show_refresh("anno_content_" + i)
}

function return_anno() {
    show_refresh("announces")
}

function status(){
    this.current = null
}

function sort_by_num(e) {
    sort_by(e, 1)
}

function sort_by_title(e) {
    sort_by(e, 3)
}

function sort_by_time(e) {
    sort_by(e, 9)
}

function sort_by(e, key){

    //重制一些信息
    tablehead = e.parentNode.parentNode.parentNode.getElementsByTagName("thead")[0]
    tablebody = e.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[0]
    tablehead.childNodes[1].childNodes[1].innerText = '序号'
    tablehead.childNodes[1].childNodes[3].innerText = '标题'
    tablehead.childNodes[1].childNodes[9].innerText = '上传时间'

    //获取信息，保存在list中，met代表用于排序的键值
    ls = tablebody.childNodes
    list = []
    for (i in ls){
        if (ls[i].tagName == "TR"){
            ele = ls[i].childNodes[key].innerText
            str = ls[i].innerHTML
            if (key === 1)
                list.push({met: parseInt(ele), content: str})
            else list.push({met: ele, content: str})
        }
    }
    
    //开始排序
    if (tablebody.method){
        //原来是升序，改成降序
        if (tablebody.method === 'up'){
            list.sort(function(a, b){
                return b.met > a.met
            })
            tablebody.method = 'down'
        }
        else {
            //原来是降序
            list.sort(function(a, b){
                return a.met > b.met
            })
            tablebody.method = 'up'
        }
    }
    else {
        list.sort(function(a, b){
            return a.met > b.met
        })
        tablebody.method = 'up'
    }

    //写回信息
    if (tablebody.method === 'up')
        tablehead.childNodes[1].childNodes[key].innerText += "（升）"
    if (tablebody.method === 'down')
        tablehead.childNodes[1].childNodes[key].innerText += "（降）"

    let k = 0
    for (i in ls){
        if (ls[i].tagName === "TR"){
            ls[i].innerHTML = list[k].content
            k+=1
        }
    }
}