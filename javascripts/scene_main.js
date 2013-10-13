/**
 * Converts number to string adding zeroes to the left
 * if necessary.
 * @param   number  integer
 * @param   width   string size
 * @return  string
 */
function zeroFill ( number, width ) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

var g_Score = 0;

/**
 * Gameplay scene
 */
var MainScene = Class.create(Scene, {
    /**
     * Constructor
     * @param   gameObj     game object.
     * @return  void
     */
    initialize: function (gameObj) {
        Scene.apply(this);
        this.m_GameObj = gameObj;
        this.m_LifeIcons = Array();
        this.m_Score = 0;
        this.m_TempScore = 0;
        this.m_Lives = 3;
        this.m_LblScore = new Label("");
        this.m_LblScore.font = "42px Caesar Dressing";
        this.m_LblScore.text = zeroFill(this.m_Score,3);
        this.m_LblScore.x = 175;
        this.m_LblScore.color = "#ffde00";
        this.m_World = new PhysicsWorld(0.0, 9.8);
        this.m_FruitsList = new Array();
        var background = new Sprite(760,570);
        var scoreIcon = new Sprite(50,50);
        scoreIcon.x = 125;
        scoreIcon.y = 5;
        background.image = this.m_GameObj.assets[g_ImgBackgroundGameplay];
        this.addChild(background);
        scoreIcon.image = this.m_GameObj.assets[g_ImgScore];
        this.addChild(scoreIcon);
        for (i = 0; i < 3; i++) {
            this.m_LifeIcons[i] = new Sprite(50,50);
            this.m_LifeIcons[i].image = this.m_GameObj.assets[g_ImgScore];
            this.m_LifeIcons[i].x = 425 + 50 * (i+1);
            this.m_LifeIcons[i].y = 5
            this.m_LifeIcons[i].frame = 1;
            this.addChild(this.m_LifeIcons[i]);
        }
        this.addChild(this.m_LblScore);
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    /**
     * Executes on each frame. Implements the gameplay's logic.
     * @param   evt     event object
     * @return  void
     */
    update: function (evt) {

        if (this.m_Lives == 0)
        {
            //GameOver
            g_Score = this.m_Score;
            goToScene("over", this.m_GameObj);
        }
        else
        {
            if (this.m_GameObj.frame % this.m_GameObj.fps == 0) {
                // each second we randomize a fruit, a bomb or nothing
                var selection = Math.floor(Math.random()*10);
                var timer = Math.floor(Math.random()*700+200);
                switch (selection) {
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                    case 8:
                        this.createElement("fruit");
                        break;
                    case 0:
                    case 6:
                        this.createElement("fruit");
                        setTimeout(this.createElement("bomb"), timer);
                }
            }
            this.m_World.step(this.m_GameObj.fps);
            //We avoid the calling of zeroFill if the score hasn't changed
            if (this.m_Score != this.m_TempScore)
            {
                this.m_Score = this.m_TempScore;
                this.m_LblScore.text = zeroFill(this.m_Score,3);
            }
        }
    },
    /**
     * Updates the order of the objects in the scene, so
     * the fruits are moved over the fruits' stains.
     * @param   evt     event object
     * @return  void
     */
    overlapFruits: function (evt) {
        var tmpList = new Array();
        for (i = 0; i < this.m_FruitsList.length; i++) {
            if (this.m_FruitsList[i] != null) {
                this.removeChild(this.m_FruitsList[i]);
                if (this.m_FruitsList[i].m_IsAlive) {
                    this.addChild(this.m_FruitsList[i]);
                    tmpList.push(this.m_FruitsList[i]);
                }    
            }
        }
        this.m_FruitsList = tmpList;
    },
    /**
     * Creates a fruit or a bomb.
     * @param   type    string (fruit or bomb), fruit is default
     * @return  void
     */
    createElement: function (type) {
        if (type === undefined)
            type = "fruit"
        var element;
        if (type == "bomb")
            element = new Bomb(this.m_GameObj);
        else
            element = new Fruit(this.m_GameObj)
        this.addChild(element);
        this.m_FruitsList.push(element);
    }
});