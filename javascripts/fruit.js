var Fruit = Class.create(PhyCircleSprite, {
    initialize: function (gameObj) {
        var randPos = new Array(0,gameObj.width);
        var randImp = new Array(1,-1);
        var randAng = new Array(-50,50);
        var rand    = Math.floor(Math.random()*2);
        this.m_GameObj = gameObj;
        PhyCircleSprite.call(this,50, enchant.box2d.DYNAMIC_SPRITE,0.1,0.5,0.3,false);
        this.image = this.m_GameObj.assets[g_ImgFruits];
        this.frame = Math.floor(Math.random()*5);
        this.x = randPos[rand];
        this.y = this.m_GameObj.height;
        this.angularVelocity = randAng[rand];
        this.body.m_isSensor = true;
        this.m_IsAlive = true;
        this.hasEscaped = false;
        this.applyImpulse(new b2Vec2((Math.random()*3+5)*randImp[rand],(Math.random()*4+10)*-1));
        this.addEventListener(Event.TOUCH_START, this.destroy);
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    destroy: function (evt) {
        var x = this.x;
        var y = this.y;
        var splash = new Splash(this.m_GameObj,x,y,this.frame);
        this.scene.addChild(splash);
        this.m_IsAlive = false;
        this.scene.m_TempScore = this.scene.m_Score + 10;
        //this.scene.overlapFruits();
    },
    update: function (evt) {
        var vel = this.velocity.x + " " + this.velocity.y;
        if (this.y > this.m_GameObj.height && this.velocity.y > 10) {         
            //this.m_IsAlive = false;
            this.hasEscaped = true;
        }
        else if (
            (this.x > this.m_GameObj.width && this.velocity.x > 10) ||
            (this.x < 0 && this.velocity.x < -10)
            )
        { 
            //this.m_IsAlive = false;
            this.hasEscaped = true;
        }

        if (this.hasEscaped) {
            this.scene.m_Lives -= 1;
            if (this.scene.m_Lives >= 0)
                this.scene.m_LifeIcons[this.scene.m_Lives].frame = 2;
            this.m_IsAlive = false;
        }
        if (!this.m_IsAlive) {  
            this.scene.removeChild(this);
        }
    }
});