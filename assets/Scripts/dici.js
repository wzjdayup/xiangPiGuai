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
       dieAudio:{
           default:null,
           url:cc.AudioClip
       }
    },
    setInputControl:function(){
        var self = this;
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                var move = cc.moveBy(0.2,cc.p(0,140));
                self.node.runAction(move);
            }
        };
        cc.eventManager.addListener(listener,self.node);
    },
    // LIFE-CYCLE CALLBACKS:
    noteBox:function(){
        return this.node.getBoundingBox();
    },
    onLoad: function() {
        cc.director.preloadScene('gameover');
        this.setInputControl();
    },

    // start () {

    // },

    update (dt) {
        var player = cc.find("Canvas/player");
        if(cc.rectIntersectsRect(player.getBoundingBox(),this.noteBox())){
            cc.audioEngine.playEffect(this.dieAudio,false);
            cc.audioEngine.pauseMusic();
            cc.director.loadScene('gameover');
           //cc.log('碰撞');
        }
    },
});
