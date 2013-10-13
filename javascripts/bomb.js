/**
 * Bomb class.
 * It's almost a clone from Fruit class but with some changes
 * in the logic when touched and updated.
 */
var Bomb = Class.create(PhyCircleSprite, {
    /**
     * Constructor
     * @param   gameObj     game object
     * @return  void
     */
    initialize: function (gameObj) {
        var randPos = new Array(0,gameObj.width);
        var randImp = new Array(1,-1);
        var randAng = new Array(-50,50);
        var rand    = Math.floor(Math.random()*2);
        this.m_GameObj = gameObj;
        PhyCircleSprite.call(this,40, enchant.box2d.DYNAMIC_SPRITE,0.1,0.5,0.3,false);
        this.image = this.m_GameObj.assets[g_ImgBomb];
        this.x = randPos[rand];
        this.y = this.m_GameObj.height;
        this.angularVelocity = randAng[rand];
        this.body.m_isSensor = true;
        this.m_IsAlive = true;
        this.m_Type = "bomb";
        this.hasEscaped = false;
        
        this.applyImpulse(new b2Vec2((Math.random()*4+1)*randImp[rand],(Math.random()*5+6)*-1));
        this.addEventListener(Event.TOUCH_START, this.destroy);
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    /**
     * Manual "desctuctor" function.
     * @param   evt     event object
     * @return  void
     */
    destroy: function (evt) {
        var x = this.x;
        var y = this.y;
        this.m_IsAlive = false;
        this.scene.m_Lives = 0;
    },
    /**
     * Executes on every frame.
     * @param   evt     event object
     * @return  void
     */
    update: function (evt) {
        var vel = this.velocity.x + " " + this.velocity.y;
        if (this.y > this.m_GameObj.height && this.velocity.y > 10) {
            this.hasEscaped = true;
        }
        else if (
            (this.x > this.m_GameObj.width && this.velocity.x > 10) ||
            (this.x < 0 && this.velocity.x < -10)
            )
        { 
            this.hasEscaped = true;
        }

        if (this.hasEscaped) {
            this.m_IsAlive = false;
        }
        if (!this.m_IsAlive) {  
            this.scene.removeChild(this);
        }
    }
});