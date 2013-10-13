
/**
 * Game over scene.
 */
var GameOverScene = Class.create(Scene, {
    /**
     * Constructor.
     * It has the event logic associated with this screen.
     * @param   gameObj     game object
     * @return  void
     */
    initialize: function (gameObj) {
        Scene.apply(this);
        this.m_GameObj = gameObj;
        this.m_LifeIcons = Array();
        this.m_Score = g_Score;
        this.m_TempScore = 0;
        this.m_Lives = 3;
        this.m_LblScore = new Label("");
        this.m_LblScore.font = "42px Caesar Dressing";
        this.m_LblScore.text = zeroFill(this.m_Score, 3);
        this.m_LblScore.x = 175;
        this.m_LblScore.color = "#ffde00";
        this.m_World = new PhysicsWorld(0.0, 9.8);
        var background = new Sprite(760,570);
        var scoreIcon = new Sprite(50,50);
        scoreIcon.x = 125;
        scoreIcon.y = 5;
        background.image = this.m_GameObj.assets[g_ImgBackgroundGameplay];
        this.addChild(background);
        scoreIcon.image = this.m_GameObj.assets[g_ImgScore];
        this.addChild(scoreIcon);
        // Updates the life's score
        for (i = 0; i < 3; i++) {
            this.m_LifeIcons[i] = new Sprite(50,50);
            this.m_LifeIcons[i].image = this.m_GameObj.assets[g_ImgScore];
            this.m_LifeIcons[i].x = 425 + 50 * (i+1);
            this.m_LifeIcons[i].y = 5
            this.m_LifeIcons[i].frame = 2;
            this.addChild(this.m_LifeIcons[i]);
        }
        this.addChild(this.m_LblScore);

        // Game over images and dark overlay
        var backgroundOverlay = new Sprite(760,570);
        backgroundOverlay.image = this.m_GameObj.assets[g_ImgBackgroundGameOver];
        backgroundOverlay.image
        backgroundOverlay.opacity = 0.6; 
        var imgGameOver = new Sprite(760,570);
        imgGameOver.image = this.m_GameObj.assets[g_ImgGameOver];
        imgGameOver.touchEnabled = false;

        // Font set-up.
        this.m_LblPlay = new Label("");
        this.m_LblPlay.font = "28px Caesar Dressing";
        this.m_LblPlay.text = "Retry";
        this.m_LblPlay.width = this.m_GameObj.width;
        this.m_LblPlay.textAlign = "center";
        this.m_LblPlay.x = 0;
        this.m_LblPlay.y = this.m_GameObj.height - 134;
        this.m_LblPlay.color = "#669900";
        this.m_LblPlay.touchEnabled = false;

        // Play Again button
        this.playIcon = new Sprite(100,100);
        this.playIcon.x = this.m_GameObj.width / 2 - 50;
        this.playIcon.y = this.m_GameObj.height / 2 + 50;
        this.playIcon.image = this.m_GameObj.assets[g_ImgFruits];
        this.playIcon.frame = 0;
        
        this.m_WantToPlay = false;

        // Play Again action when touching the icon
        this.playIcon.addEventListener(Event.TOUCH_START, function (e) {
            var x = this.x;
            var y = this.y;
            var splash = new Splash(this.scene.m_GameObj,x,y);
            this.scene.addChild(splash);
            this.scene.m_WantToPlay = true;
            this.scene.removeChild(this.scene.playIcon);
        });
        // add the objects to the scene
        this.addChild(backgroundOverlay);
        this.addChild(imgGameOver);
        this.addChild(this.m_LblPlay);
        this.addChild(this.playIcon); 

        this.lifeTimer = 0;
        this.lifeTimerLimit = this.m_GameObj.fps * 10;
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    /**
     * Executes on each frame. It's just for practical purposes and
     * not moving to the gameplay scene just right away
     * @param   evt     event object
     * @return  void
     */
    update: function (evt) {
        if (this.m_WantToPlay)
        {
            this.lifeTimer += evt.elapsed;
            if (this.lifeTimer > this.lifeTimerLimit)
            {
                goToScene("main", this.scene.m_GameObj);
            }
        }
    }
});