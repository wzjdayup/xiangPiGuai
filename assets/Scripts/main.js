

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
        player:{
            default:null,
            type:cc.Node
        },
        wallWidth:80,
        jumpHeight:30,
        dici:{
            default:null,
            type:cc.Prefab
        },
        diciDistance:140,
        gameTime:0,
        textLabel:{
            default:null,
            type:cc.Label
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        score:0,
        jump:{
            default:null,
            url:cc.AudioClip
        },
        bgAudio:{
            default:null,
            url:cc.AudioClip
        }
    },
    setInputControl:function(){
        var self = this;
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                cc.audioEngine.playEffect(self.jump,false);
                var target = event.getCurrentTarget();
                var position= target.convertToNodeSpace(touches.getLocation());
                if(position.x>self.node.width/2){
                   self.moveRight();
                }
                else{
                    self.moveLeft();
                }
                self.makeNewDici();
                self.score++;
                self.scoreLabel.string = self.score;
                cc.sys.localStorage.setItem('score',self.score);
            },
            onTouchMoved:function(touches,event){

            },
            onTouchEnded:function(touches,event){

            }
        };
        cc.eventManager.addListener(listener,self.node);
    },
    moveRight:function(){
        var goRight = cc.moveTo(0.2,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY()));
        var goR1 = cc.moveTo(0.1,cc.p(this.node.width/2-this.wallWidth-this.jumpHeight,this.player.getPositionY()));
        var goR2 = cc.moveTo(0.1,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY()));
        var sequence = cc.sequence(goR1,goR2);
        if(this.player.rotation == 0){
            this.player.runAction(goRight);
            this.player.rotation = 180
        }
        else if(this.player.rotation == 180){
            this.player.runAction(sequence);
        }
       
    },
    moveLeft:function(){
        var goLeft = cc.moveTo(0.2,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY()));
        var goL1 = cc.moveTo(0.1,cc.p(-this.node.width/2+this.wallWidth+this.jumpHeight,this.player.getPositionY()));
        var goL2 = cc.moveTo(0.1,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY()));
        var sequence = cc.sequence(goL1,goL2);
        if(this.player.rotation == 0){
            this.player.runAction(sequence);
        }
        else if(this.player.rotation == 180){
            this.player.runAction(goLeft);
            this.player.rotation = 0
        }
    },
    makeNewDici:function(){
        this.diciCount +=1;
        var newDici = cc.instantiate(this.dici);
        this.node.addChild(newDici);
        var randD = cc.random0To1();
        if(randD>0.5){
            newDici.rotation = 0;
        }else{
            newDici.rotation = 180;
        }
        newDici.setPosition(this.setNewDiciPosition(randD));
    },
    setNewDiciPosition:function(randD){
        var newDiciX = 0;
        var newDiciY = 0;
        if(randD>0.5){
            newDiciX = this.node.width/2 - this.wallWidth;
        }
        else {
            newDiciX = -this.node.width/2 + this.wallWidth;
        }
        if(this.diciCount<=8){
            newDiciY = this.node.height/2 -(this.diciCount+1)*this.diciDistance;
        }
        else{
            newDiciY = this.node.height/2 - 9*this.diciDistance;
        }
        return cc.p(newDiciX,newDiciY);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        cc.audioEngine.playMusic(this.bgAudio,true);
        cc.audioEngine.setEffectsVolume(0.5);
        cc.director.preloadScene('gameover');
        this.setInputControl();
        this.player.setPosition(-this.node.width/2+this.wallWidth,this.node.height/2-175);
        this.diciCount = 0
        for(var i=0;i<=8;i++){
            this.makeNewDici();
        }
        this.schedule(function(){
            this.gameTime--;
            this.textLabel.string = '倒计时:'+this.gameTime;
            if(this.gameTime<=0){
                cc.audioEngine.pauseMusic();
                cc.director.loadScene('gameover');
            }
        },1)
    },

    // start () {

    // },

    // update (dt) {},
});
