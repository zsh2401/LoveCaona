
/*V1.0 */
function currentIsMobile(){
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
}
function MusicPlayer(){
    this.BTN_TEXT_PLAY = "播放";
    this.BTN_TEXT_PUASE = "暂停";
    this.volume = 0.4;

    this.audioClassName = "music";
    this.btnClassName = "btnMusic";

    this.audios = null;
    this.buttons = null;

    this.playingComb = null;
    this.init = function(){
        this.buttons = document.getElementsByClassName(this.btnClassName);
        this.audios = document.getElementsByClassName(this.audioClassName); 
        for(var i =0;i<this.buttons.length;i++){
            this.buttons[i].innerText = this.BTN_TEXT_PLAY;
            this.buttons[i].onclick = function(){
                player.playByBtn(this);
            }
        }
    }
    this.playByBtn = function(btn){
        var nextId = btn.getAttribute("mid");
        if(this.playingComb != null && this.playingComb.id == nextId){
            this.playingComb.pause();
            this.playingComb = null;
            return;
        }

        if(this.playingComb != null){
            this.playingComb.pause();
        }
        var next = this.comb(nextId);
        next.play();
        this.playingComb = next;
    };
    this.findAudioById = function(id){
        for(var i=0;i<this.audios.length;i++){
            if(this.audios[i].getAttribute("mid") == id){
                return this.audios[i];
            }
        }
        return null;
    }
    this.findButtonById = function(id){
        for(var i=0;i<this.buttons.length;i++){
            if(this.buttons[i].getAttribute("mid") == id){
                return this.buttons[i];
            }
        }
        return null;
    }
    this.comb = function(id){
        var that = this;
        var comb =  {
            id:id,
            button:that.findButtonById(id),
            audio:that.findAudioById(id),
            play:function(){
                this.button.innerText = that.BTN_TEXT_PUASE;
                this.audio.volume =that.volume;
                this.audio.play();
            },
            pause:function(){
                this.button.innerText = that.BTN_TEXT_PLAY;
                this.audio.pause();
            }
        }
        if(comb.button==null || comb.audio == null){
            console.log("comb " + id + " not found!");
            return null;
        }
        return comb;
    }
}