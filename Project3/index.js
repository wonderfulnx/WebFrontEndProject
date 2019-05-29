class ProgressBar {
    constructor(info) {
        this.currentProgress = 0
        this.type = info.type
        this.container = info.container
        this.background = info.background
        this.foreground = info.foreground
        this.complete = info.complete

        //增加节点
        if (this.type === 'ring')
            this.initCircleProgress()
        else if (this.type === 'bar')
            this.initBarProgress()
        else if (this.type === 'hourglass')
            this.initGlassProgress()

        this.set_progress(0)
    }

    //设置进度 
    set_progress(progress) {
        if (this.currentProgress >= 100) {
            this.complete()
            return
        }
        if (this.type === 'ring')
            this.updateCircleProgress(progress)
        else if (this.type === 'bar')
            this.updateBarProgerss(progress)
        else if (this.type === 'hourglass')
            this.updateGlassProgress(progress)
    }

    // 环形
    initCircleProgress() {
        let box = document.getElementById(this.container.substr(1))
        this.canvas = document.createElement('canvas')
        box.appendChild(this.canvas)
    }
    updateCircleProgress(targetProgress) {
        //环境准备
        let centerX = this.canvas.width / 2
        let centerY = this.canvas.height / 2
        let unitAngle = Math.PI * 2 / 100
        let context = this.canvas.getContext('2d')
        this.currentProgress = targetProgress

        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let drawcir = function (color, begin, end) {
            context.strokeStyle = color
            context.beginPath()
            context.arc(centerX, centerY, 60, begin, end)
            context.stroke()
            context.closePath()
        }

        //绘制进度
        context.save()

        context.font = "20px Arial"
        context.beginPath()
        context.fillText(this.currentProgress.toFixed(0) + "%", centerX - 20, centerY + 5);
        context.stroke()
        context.closePath()

        context.lineWidth = 20
        drawcir(this.background, -Math.PI / 2, 3 * Math.PI / 2)
        drawcir(this.foreground, -Math.PI / 2, this.currentProgress * unitAngle - Math.PI / 2)

        context.restore()
    }

    //条形
    initBarProgress() {
        let box = document.getElementById(this.container.substr(1))
        this.progressBarBack = document.createElement('div')
        this.progressBarFront = document.createElement('span')
        box.appendChild(this.progressBarBack)
        this.progressBarBack.appendChild(this.progressBarFront)

        this.progressBarBack.className = 'BarProgress'
        this.progressBarBack.style.width = '200px'
        this.progressBarBack.style.backgroundColor = this.background

        this.progressBarFront.style.width = (this.currentProgress * 2).toFixed(0) + 'px'
        this.progressBarFront.style.backgroundColor = this.foreground
    }
    updateBarProgerss(targetProgress) {
        this.currentProgress = targetProgress
        this.progressBarFront.style.width = (this.currentProgress * 2).toFixed(0) + 'px'
        if (this.currentProgress > 0){
            this.progressBarFront.innerHTML = this.currentProgress.toFixed(0) + '%'
            this.progressBarFront.style.border = "1px solid"
        }
    }

    //沙漏
    initGlassProgress(){
        let box = document.getElementById(this.container.substr(1))
        this.canvas = document.createElement('canvas')
        this.para = document.createElement('div')
        box.appendChild(this.canvas)
        box.appendChild(this.para)
        this.para.style.width = this.canvas.width
        this.para.style.height = this.canvas.height
        this.para.className = 'GlassHint'
    }
    updateGlassProgress(targetProgress){
        //环境准备
        this.currentProgress = targetProgress
        let centerX = this.canvas.width / 2
        let centerY = this.canvas.height / 2
        let halfWid = 50
        let halfHei = 100
        let context = this.canvas.getContext('2d')
        this.currentProgress = targetProgress

        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let triangle = function(height, color, up){
            context.fillStyle = color;
            context.beginPath()
            context.moveTo(centerX, centerY)
            //左右偏移量
            let bias = halfWid * height / halfHei
            if (up){
                context.lineTo(centerX - bias, centerY - height)
                context.lineTo(centerX + bias, centerY - height)
            }
            else {
                context.lineTo(centerX - bias, centerY + height)
                context.lineTo(centerX + bias, centerY + height)
            }
            context.fill()
            context.closePath()
        }

        //此处按照面积比来设置大小，如果按照高度比则为(1-c%)*halfHei，按照面积比为sqrt(1-c%)*halfHei
        //PS:其实看起来沙漏并没有什么大区别，不过能看出来使用面积比初期会更慢，后期会更快。。。
        //上方三角形：底部为back
        //let sandTriHei = (1 - this.currentProgress/100) * halfHei
        let sandTriHei = Math.sqrt(1-this.currentProgress/100) * halfHei
        triangle(halfHei, this.background, true)
        triangle(sandTriHei, this.foreground, true)

        //下方三角形：底为fore
        triangle(halfHei, this.foreground, false)
        triangle(sandTriHei, this.background, false)

        //百分比
        this.para.innerHTML = this.currentProgress.toFixed(0) + '%'
    }
}