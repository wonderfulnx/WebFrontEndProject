let express = require('express')
let multipart = require('connect-multiparty')

let app = express()
let multi = multipart()
let dic = {}
let token = '1234567890'

let token_check = function(req, res){
    if (req.headers['hw-token']){
        if (req.headers['hw-token'] !== token){
            res.status(403)
            console.log('token error')
            return false
        }
    }
    else {
        console.log('no token')
        res.status(403)
        return false
    }
    return true
}

app.get('/api/compute', function (req, res) {
    if (!token_check(req, res)){
        res.send()
        return
    }
    let data = req.query
    if (data.type === "ADD") {
        result = Number(data['firstParam']) + Number(data['secondParam'])
    } else if (data['type'] === 'SUB') {
        result = Number(data['firstParam']) - Number(data['secondParam'])
    } else if (data['type'] === 'MUL') {
        result = Number(data['firstParam']) * Number(data['secondParam'])
    } else if (data['type'] === 'DIV') {
        result = Number(data['firstParam']) / Number(data['secondParam'])
    } else {
        console.log('error with type: ' + data['type'])
    }
    // res.send({ans: result})
    res.format({
        'application/json': function () {
            res.send({
                ans: result
            });
        }
    })
})

app.post('/api/pair', multi, function (req, res) {
    if (!token_check(req, res)){
        res.send()
        return
    }
    token_check(req, res)
    dic[req.body.key] = req.body.value
    // console.log(dic)
    res.send()
})

app.get('/api/pair', function (req, res) {
    if (!token_check(req, res)){
        res.send()
        return
    }
    token_check(req, res)
    let data = req.query
    if (dic[data.key]) {
        res.format({ 'application/json': function () {
                res.send({ value: dic[data.key] });
            }
        })
    }
    else {
        console.log('get didn\' find')
        res.status(404)
        res.send()
    }
})

app.delete('/api/pair', function(req, res){
    if (!token_check(req, res)){
        res.send()
        return
    }
    token_check(req, res)
    let data = req.query

    if (dic[data.key]) {
        delete dic[data.key]
        res.send()
    }
    else {
        console.log('delete didn\' find')
        res.status(404)
        res.send()
    }
})

let sever = app.listen(3000, function () {
    let host = sever.address().address
    let port = sever.address.port

    console.log('Example app listening at http://%s:%s', host, port)
})