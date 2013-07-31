var Splash = Class.create(Sprite, {
    initialize: function (gameObj, x, y, fruit) {
        Sprite.call(this, 233, 206);
        this.m_GameObj = gameObj;
        this.touchEnabled = false;
        this.image = this.m_GameObj.assets[g_ImgSplash];
        this.frame = fruit;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.m_LifeTimer = 0;
        this.lifeTimerLimit = this.m_GameObj.fps * 25;
        this.m_DropSpeedSlow = 4;
        this.m_DropSpeedFast = 2;
        this.m_DropTime = 600;
        this.rotation = Math.floor(Math.random() * 320);
    },

    update: function (evt) {
        this.m_LifeTimer += evt.elapsed;
        if (this.m_LifeTimer > this.m_DropTime)
            this.y += this.m_DropSpeedSlow * evt.elapsed / 1000;
        if (this.m_LifeTimer > this.lifeTimerLimit)
        {
            this.scene.removeChild(this);
        }

    }
});