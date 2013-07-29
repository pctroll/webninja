function zeroFill ( number, width ) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

var MainScene = Class.create(Scene, {
    initialize: function (gameObj) {
        Scene.apply(this);
        this.m_GameObj = gameObj;
        this.m_LifeIcons = Array();
        this.m_Score = 0;
        this.m_LblScore = new Label("");
        this.m_LblScore.font = "42px Caesar Dressing";
        this.m_LblScore.text = zeroFill(this.m_Score,3);
        this.m_LblScore.x = 57;
        this.m_LblScore.color = "#ffde00";
        this.m_World = new PhysicsWorld(0.0, 9.8);
        var background = new Sprite(760,570);
        var scoreIcon = new Sprite(50,50);
        scoreIcon.x = 5;
        scoreIcon.y = 5;
        background.image = this.m_GameObj.assets[g_ImgBackgroundGameplay];
        this.addChild(background);
        scoreIcon.image = this.m_GameObj.assets[g_ImgScore];
        this.addChild(scoreIcon);
        for (i = 0; i < 8; i++) {
            this.m_LifeIcons[i] = new Sprite(50,50);
            this.m_LifeIcons[i].image = this.m_GameObj.assets[g_ImgScore];
            this.m_LifeIcons[i].x = this.m_GameObj.width - 50 * (i+1);
            this.m_LifeIcons[i].y = 5
            this.m_LifeIcons[i].frame = 1;
            this.addChild(this.m_LifeIcons[i]);
            this.m_LifeIcons[i].addEventListener(Event.TOUCH_START, function (e) {
                console.log(this.x);
            });
        }
        this.addChild(this.m_LblScore);
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.m_GroupIndex = 0;
    },
    update: function (evt) {
        if (this.m_GameObj.frame % this.m_GameObj.fps == 0) {
            var fruit = new PhyCircleSprite(50, enchant.box2d.DYNAMIC_SPRITE,0.1,0.5,0.3,false);
            fruit.image = this.m_GameObj.assets[g_ImgFruits];
            fruit.x = this.m_GameObj.width/2 - fruit.width/2;
            fruit.y = this.m_GameObj.height/2 - fruit.height/2;
            fruit.applyImpulse(new b2Vec2(0,-5));
            fruit.body.m_isSensor = true;
            this.addChild(fruit);
            fruit.addEventListener(Event.TOUCH_START, function (evt) {
                //console.log("touch me :3");
                this.scene.removeChild(this);
            });
        }
        this.m_World.step(this.m_GameObj.fps);
    }
});