const app = getApp()
Page({
  data: {
    // 播放列表位置
    playListPos: '100vh',
    // 播放音频
    media:{},
    // 播放进度
    musicTime: {
      // 总时长
      duration: '00:00',
      // 当前播放时长
      currentTime: 0,
      // 当前播放时长文案
      currentTimeText: '00:00',
      // 当前播放进度
      process: '0'
    },
    // 当前播放序号
    playIdx: 0,
    // 播放列表
    // playList: [{
    //   poster: '音频封面',
    //   name: '音频名称',
    //   author: '歌手',
    //   duration: '总时长',
    //   src: '音频路径',
    //   customize: '自定义参数的JSON字符串'
    // }],
    playList: [{
      poster: 'https://qpic.y.qq.com/music_cover/HvzXRphXYwDIM7tpX0XM4dCF2K6tu1k38ts4H8sD5icicTtoeZPsM09g/300?n=1',
      name: '音频名称1',
      author: '歌手1',
      duration: '7:15',
      src: 'https://cdn.kaishuhezi.com/audio/story/M-1-01-20150408.mp3',
      customize: JSON.stringify({
        mediaId: 1001,
        poster: 'https://qpic.y.qq.com/music_cover/HvzXRphXYwDIM7tpX0XM4dCF2K6tu1k38ts4H8sD5icicTtoeZPsM09g/300?n=1',
        name: '音频名称1',
        author: '歌手1',
        duration: '7:15',
        src: 'https://cdn.kaishuhezi.com/audio/story/M-1-01-20150408.mp3',
        amountText: 15,
        commentText: 30
      })
    }, {
      poster: 'https://qpic.y.qq.com/music_cover/ezXpob9biaedyoUWFJDttEQc9HsqSUpIiaPVnKrwkl94QrXna9xZ5wbg/300?n=1',
      name: '音频名称2',
      author: '歌手2',
      duration: '11:20',
      src: 'https://cdn.kaishuhezi.com/audio/story/M-2-01-20150408.mp3',
      customize: JSON.stringify({
        mediaId: 1002,
        poster: 'https://qpic.y.qq.com/music_cover/ezXpob9biaedyoUWFJDttEQc9HsqSUpIiaPVnKrwkl94QrXna9xZ5wbg/300?n=1',
        name: '音频名称2',
        author: '歌手2',
        duration: '11:20',
        src: 'https://cdn.kaishuhezi.com/audio/story/M-2-01-20150408.mp3',
        amountText: 35,
        commentText: 70
      })
    }, {
      poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003nby0y2u2DpY_1.jpg?max_age=2592000',
      name: '音频名称3',
      author: '歌手3',
      duration: '9:08',
      src: 'https://cdn.kaishuhezi.com/audio/story/M-3-01-20150408.mp3',
      customize: JSON.stringify({
        mediaId: 1003,
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003nby0y2u2DpY_1.jpg?max_age=2592000',
        name: '音频名称3',
        author: '歌手3',
        duration: '9:08',
        src: 'https://cdn.kaishuhezi.com/audio/story/M-3-01-20150408.mp3',
        amountText: 24,
        commentText: 46
      })
    }],
    // 播放模式
    loopType: 'loop',
    // 播放状态
    playing: false,

  },
  // 是否支持统一播放器，先用wx.canIUse('backgroundAudioManager.onUpdateAudio')，后续会提供专门的验证方法
  useTaiAudio: wx.canIUse('backgroundAudioManager.onUpdateAudio'),
  // 播放器实例
  audioContext: null,
  
  onLoad: function () {
  },

  onShow: function () {
    this.initPlayer()
    this.myComponent = this.selectComponent('#mylog')
  },

  /**
   * 播放器初始化
   */
  initPlayer(){
    this.audioContext = wx.getBackgroundAudioManager()
    this.InitAudioState()
    this.EventListener()
    this.playProcessListener()
    if(this.useTaiAudio){
      this.taiUpdateAudioListener();
    }
  },
  
  /**
   * 播放器状态初始化
   */
  InitAudioState() {
    app.log('初始化播放器')
    if (this.useTaiAudio && wx.canIUse('getShareData')) {
      app.log('支持列表能力')
      wx.getShareData({
        mppName: 'kaishustory', // 配置在app.json中的小程序包名mossPkgName
        success: (res) => {
          app.log('getShareData成功', res)
          let media = res.data && res.data.customize ? JSON.parse(res.data.customize) : null;
          let playing = wx.getStorageSync('playing') || false;
          let playIdx = this.audioContext.playIndexOf;
          if (media) { // 获取到统一播放器中的播放数据，则直接将传入的自定义的音频数据取出渲染在界面上
            if(playing){
              this.audioContext.play()
              this.setData({
                playing:true
              })
            }
            this.setData({
              playIdx,
              media
            })
            app.log('有media初始化,playIdx=' + this.data.playIdx)
          } else { // 未获取到统一播放器中的播放数据，则重新传入播放列表进行播放
            this.setData({
              media: this.data.playList[0],
              playIdx:0
            })
            this.audioContext.playList = this.data.playList
            this.audioContext.srcType = 1
            this.audioContext.setPlayMode = 0
            this.audioContext.playIndexOf = 0
            app.log('无media初始化,playIdx=' + this.data.playIdx)
          }
        }
      });
    }
    else{
      app.log('不支持列表能力')
      wx.setStorageSync('playing', false)
      let playIdx = wx.getStorageSync('playIdx') || 0
      let loopType = wx.getStorageSync('loopType') || 'loop'
      let playing = wx.getStorageSync('playing') || false
      let media = this.data.playList[playIdx]
      this.setData({
        media,
        playIdx,
        loopType,
        playing
      })
      this.audioContext = wx.getBackgroundAudioManager();
      if(!playing){
        this.PlayHandle()
      }
  }
  },
  /**
   * 监听统一播放器切换音频事件
   */
  taiUpdateAudioListener(){
    this.audioContext.onUpdateAudio((res) => {
      app.log('onUpdateAudio成功', res)
      // 同步统一播放器播放模式
      switch (res.model) {
        case 0:
          this.taiSingleHandle();
          break;

        case 1:
          this.taiLoopHandle();
          break;

        case 2:
          this.taiRandomHandle();
          break;

        default:
          break;
      }
      // 若单纯切换模式不会回传src，此时不用更新播放音频
      if (!res.src) {
        return;
      }
      let media = JSON.parse(res.customize);
      this.setData({
        media,
        playing: res.playStatus
      })
    })
  },
  /**
   * 监听播放器事件
   */
  EventListener(){
    //播放事件
    this.audioContext.onPlay(() => {
      app.log('触发播放开始事件');
      if(!this.data.playing){
        this.playHandle();
      }
    })

    //暂停事件
    this.audioContext.onPause(() => {
      app.log('触发播放暂停事件');
      if(this.data.playing){
        this.pauseHandle();
      }
    })

    //上一首事件
    this.audioContext.onPrev(() => {
      app.log('触发上一首事件');
      this.prevHandle();
    })

    //下一首事件
    this.audioContext.onNext(() => {
      app.log('触发下一首事件');
      this.nextHandle();
    })

    //停止事件
    this.audioContext.onStop(() => {
      app.log('触发停止事件');
    })

    //播放错误事件
    this.audioContext.onError(() => {
      app.log('触发播放错误事件');
    })

    //播放完成事件
    this.audioContext.onEnded(() => {
      app.log('触发播放完成事件');
      this.nextHandle()
    })
    console.log("注册播放完成");
  },
  /**
   * 监听播放器播放进度事件
   */
  playProcessListener(){
    this.audioContext.onTimeUpdate(() => {
      let currentTime = this.audioContext.currentTime;
      let duration = this.audioContext.duration;
      //app.log('onTimeUpdate触发：currentTime='+currentTime+',duration='+duration);
      let media = this.data.media;
      let process = '0%'
      if (duration > 0) {
        process = (currentTime / duration).toFixed(8) * 100+ '%';
      }
      //console.log(process);
      let musicTime = {
                 duration: this.formatMusicTime(duration),
                 durationSecond: duration,
                 currentTimeText: this.formatMusicTime(currentTime),
                 currentTime: currentTime,
                 process: process
               };
               this.setData({
                 musicTime
               })
    })
  },
  /**
   * 播放音频
   */
  playHandle(){
    if(this.useTaiAudio){
      //支持列表
      app.log('支持列表播放，playIdx=' + playIdx)
      let playIdx = this.data.playIdx;
      this.audioContext.playIndexOf = playIdx;
    }else{
      //不支持列表
      app.log('不支持列表播放')
      this.PlayHandle();
    }
  },
  
  /**
   * 播放器播放音频
   */
  PlayHandle() {
    //app.log('播放器播放')
    let media = this.data.media
    this.audioContext.src = media.src,
    this.audioContext.title = media.name,
    this.audioContext.coverImgUrl = media.poster
    //this.audioContext.seek(650)
    this.audioContext.play()
    this.setData({
      playing: true
    })
    wx.setStorageSync('playing', true)
  },
  /**
   * 暂停音频
   */
  pauseHandle(){
    this.PauseHandle()
  },
  
  /**
   * 播放器暂停音频
   */
  PauseHandle(){
    app.log('播放暂停')
    this.audioContext.pause()
    this.setData({
      playing: false
    })
    wx.setStorageSync('playing', false)
  },
  /**
   * 上一首
   */
  prevHandle(e){

    let {playIdx,playing,playList} = this.data;
    //app.log('上一首playIdx:' + playIdx);
    playIdx--;
    if (playIdx < 0) {
      playIdx = playList.length - 1 
    }
    app.log('上一首playIdx:' + playIdx);
    if (this.useTaiAudio) {
      //支持列表
      app.log('支持列表上一首')
      this.audioContext.playIndexOf = playIdx;
      this.setData({
        playIdx
      })
    } else {
      //不支持列表
      app.log('不支持列表上一首')
      this.localPrevHandle(playIdx,playList);
    }
  },

  /**
   * 不支持列表播放器上一首
   */
  localPrevHandle(playIdx,playList){
    let media = playList[playIdx];
    this.setData({
      playIdx,
      media
    })
    this.PlayHandle()
  },
  /**
   * 下一首
   */
  nextHandle(){
    this.data.nexting = true;
    let {playIdx,playing,playList} = this.data;
    //app.log('下一首playIdx:' + playIdx);
    playIdx++;
    if (playIdx == playList.length){
      playIdx = 0
    }
    app.log('下一首playIdx:' + playIdx);
    if (this.useTaiAudio) {
      //支持列表
      app.log('支持列表下一首')
      this.audioContext.playIndexOf = playIdx;
      this.setData({
        playIdx
      })
    } else {
      //不支持列表
      app.log('不支持列表下一首')
      this.localNextHandle(playIdx,playList)
    }
  },
  /**
   * 不支持列表播放器下一首
   */
  localNextHandle(playIdx,playList){
    let media = playList[playIdx];
    this.setData({
      playIdx,
      media
    })
    this.PlayHandle()
  },
  /**
   * 单曲循环点击事件
   */
  singleHandle() {
    if (this.useTaiAudio) {
      this.taiSingleHandle()
    } else {
      this.localSingleHandle()
    }
  },
  /**
   * 统一播放器单曲循环点击事件
   */
  taiSingleHandle() {
    app.log('single触发')
    this.setData({
      loopType: 'loop'
    })
    this.audioContext.setPlayMode = 0;
  },
  /**
   * 本地播放器单曲循环点击事件
   */
  localSingleHandle(){
    this.setData({
      loopType: 'loop'
    })
    wx.setStorageSync('loopType', 'loop')
  },
  /**
   * 列表循环点击事件
   */
  loopHandle(){
    if (this.useTaiAudio) {
      this.taiLoopHandle()
    } else {
      this.localLoopHandle()
    }
  },
  /**
   * 统一播放器列表循环点击事件
   */
  taiLoopHandle() {
    app.log('loop触发')
    this.setData({
      loopType: 'random'
    })
    this.audioContext.setPlayMode = 1;
  },
  /**
   * 本地播放器列表循环点击事件
   */
  localLoopHandle(){
    this.setData({
      loopType: 'random'
    })
    wx.setStorageSync('loopType', 'random')
  },
  /**
   * 随机播放点击事件
   */
  randomHandle(){
    if (this.useTaiAudio){
      this.taiRandomHandle()
    }else{
      this.localRandomHandle()
    }
  },
  /**
   * 统一播放器随机播放点击事件
   */
  taiRandomHandle() {
    app.log('random触发')
    this.setData({
      loopType: 'single'
    })
    this.audioContext.setPlayMode = 2;
  },
  /**
   * 本地播放器随机播放点击事件
   */
  localRandomHandle(){
    this.setData({
      loopType: 'single'
    })
    wx.setStorageSync('loopType', 'single')
  },
  /**
   * 选择音频播放
   */
  mediaSelectHandle(event){
    let playIdx = event.currentTarget.dataset.idx;
    if (this.useTaiAudio) {
      this.taiMediaSelectHandle(playIdx)
    } else {
      this.localMediaSelectHandle(playIdx)
    }
    this.hidePlayList()
  },
  /**
   * 统一播放器选择音频播放
   */
  taiMediaSelectHandle(playIdx) {
    app.log('选择播放' + playIdx)
    this.audioContext.playIndexOf = playIdx;
    this.setData({
      playIdx
    })
  },
  /**
   * 播放器选择音频播放
   */
  localMediaSelectHandle(playIdx){
    let media = this.data.playList[playIdx]
    this.setData({
      media,
      playIdx
    })
    wx.setStorageSync('playIdx', playIdx)
    this.PlayHandle()
  },
  /**
   * 显示音频列表
   */
  showPlayList() {
    this.setData({
      playListPos: '0'
    })
  },
  /**
   * 隐藏音频列表
   */
  hidePlayList() {
    this.setData({
      playListPos: '100vh',
      showDownIcon: true
    })
  },
  /**
   * 播放时间格式化
   */
  formatMusicTime(time) {
    let m = parseInt(time / 60);
    let s = parseInt(time % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s
  },
  logHandle(){
    //console.log("logLongHandle")
    this.myComponent.tapLog()
  }
})
