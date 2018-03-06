// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        startBtn:{
            default:null,
            type:cc.Node
        },
        bgAudio:{
            default:null,
            url:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('main');
        cc.audioEngine.playMusic(this.bgAudio,true);
        cc.audioEngine.setMusicVolume(0.5);
        var small = cc.scaleTo(0.8,0.9);
        var normal = cc.scaleTo(0.8,1);
        var repeat = cc.repeatForever(cc.sequence(small,normal));
        this.startBtn.runAction(repeat);
        this.startBtn.on('touchstart',function(){
            cc.audioEngine.pauseMusic();
            cc.director.loadScene('main');
        })
    },

    // start () {

    // },

    // update (dt) {},
});
