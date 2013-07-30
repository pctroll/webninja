var Splash = Class.create(Sprite, {
    initialize: function (gameObj, x, y) {
        Sprite.call(this, 233, 206);
        this.m_GameObj = gameObj;
        this.touchEnabled = false;
        this.image = this.m_GameObj.assets[g_ImgSplash];
        this.x = x - this.width/2;
        this.y = y - this.height/4;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.lifeTimer = 0;
        this.lifeTimerLimit = this.m_GameObj.fps * 10;
    },

    update: function (evt) {
        this.lifeTimer += evt.elapsed;
        if (this.lifeTimer > this.lifeTimerLimit)
        {
            this.scene.removeChild(this);
        }

    }
});