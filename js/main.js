// 给播放按钮绑定事件，点击播放
// 更新歌曲时间总长和现在的播放时间
// 再次点击播放按钮，歌曲暂停 动画暂停
// 上一曲和下一曲绑定事件
// 进度条跟随播放的事件走
// 全部循环模式

// 补零函数
var plusZero = function(number) {
    if (number <= 9) {
        return '0' + String(number)
    }
    return String(number)
}

// 把时间转换成可以展示的样式
var change = function(time) {
    var m1 = Math.floor(time / 60)
    var s1 = time % 60
    var m2 = plusZero(m1)
    var s2 = plusZero(s1)
    return `${m2}:${s2}`
}

var showCurrentTime = function() {
    var audio = e('#id-audio-player')
    var current = e('.timelist-start')
    var t = parseInt(audio.currentTime)
    current.innerHTML = change(t)
}

var getLength = function() {
    var audio = e('#id-audio-player')
    var l = songs.length
    audio.dataset.all = l
}

// 歌单
var songs = [
    "./mp3/1.mp3",
    "./mp3/2.mp3",
    "./mp3/3.mp3",
    ]
var musicLists = [
    '李白-李荣浩',
    '少年锦时-赵雷',
    '丑八怪-薛之谦',
    ]
var backgrounds = [
    "backgrounds/libai.jpg",
    "backgrounds/shaonianjinshi.jpg",
    "backgrounds/choubaguai.jpeg"
]

// 获取下一个需要播放的歌曲的坐标
var nextIndex = function(button) {
    var audio = e('#id-audio-player')
    var numberOfAll = parseInt(audio.dataset.all)
    var activeIndex = parseInt(audio.dataset.active)
    var offset = parseInt(button.dataset.next)
    var index = (numberOfAll + activeIndex + offset) % numberOfAll
    audio.dataset.active = index
    return index
}

// 切换作者背景
var changeBackgroundNext = function(index) {
    var circleImg = e('.circular').querySelector('img')
    var backgrundImg = e('.background').querySelector('img')
    circleImg.src = backgrounds[index]
    backgrundImg.src = backgrounds[index]
}

// 切换作者名字和歌曲名字
var changeAuthorNext = function(index) {
    var name = e('#id-div-name')
    var author = e('#id-div-author')
    var result = musicLists[index].split('-')
    name.innerHTML = result[0]
    author.innerHTML = result[1]
}

// 切换 play 和 pause
var bindEventPlayOrPause = function() {
    var audio = e('#id-audio-player')
    var control = e('.control-playOrPause')
    var play = e('#id-img-play')
    var pause = e('#id-img-pause')
    var cover = e('.music-cover')
    bindEvent(control, 'click', function(event) {
        var self = event.target
        if (self.id === 'id-img-play') {
             removeClassAll('no-showed')
             toggleClass(play, 'no-showed')
             audio.play()
             cover.style['animation-play-state'] = 'running'
        } else {
            removeClassAll('no-showed')
            toggleClass(pause, 'no-showed')
            audio.pause()
            cover.style['animation-play-state'] = 'paused'
        }
    })
}

// 获取歌曲播放现在时间和总时间
var bindEventTime = function() {
    var audio = e('#id-audio-player')
    var current = e('.timelist-start')
    var all = e('.timelist-end')
    bindEvent(audio, 'canplay', function(event) {
        var allTime = parseInt(audio.duration)
        all.innerHTML = change(allTime)
        setInterval(showCurrentTime, 1000)
    })
}

// 切换下一首或上一首
var bindEventNext = function() {
    var audio = e('#id-audio-player')
    var next = e('.music-control')
    bindEvent(next, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('next')) {
            var index = nextIndex(self)
            audio.src = songs[index]
            changeAuthorNext(index)
            changeBackgroundNext(index)
            audio.play()
        }
    })
}

// 监听播放时间 改变滑条
var bindEventSlide = function() {
    var audio = e('#id-audio-player')
    var slider = e('.timelist-slider')
    var ing = e('.timelist-ing')
    var pro = e('#id-img-process')
    var proWidth = parseInt(getComputedStyle(pro, null).width)
    var sliderWidth = parseInt(getComputedStyle(slider, null).width)
    bindEvent(audio, 'timeupdate', function(event) {
        var value = audio.currentTime / audio.duration
        var v = value * sliderWidth
        var m = v - proWidth / 2
        ing.style.width = v + 'px'
        pro.style.left = m + 'px'
    })
}

// 循环播放
var bindEventRepeat = function() {
    var repeat = e('#id-img-repeat')
    var audio = e('#id-audio-player')
    var next = e('#id-img-next')
    bindEvent(repeat, 'click', function() {
        bindEvent(audio, 'ended', function() {
            next.click()
        })
    })
}

var bindEvents = function() {
    bindEventPlayOrPause()
    bindEventTime()
    bindEventNext()
    bindEventSlide()
    bindEventRepeat()
}

var load = function() {
    getLength()
}

var __main = function() {
    load()
    bindEvents()
}

__main()
