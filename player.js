function Player(scene, color) {
    const LINE_WIDTH = 8;
    const BODY_RADIUS = 30;
    const LEG_OFFSET = 15;
    const LEG_RADIUS = 15;

    let self = new Container();
    self.v = 0;
    self.vr = 0;

    self.walk_t = 0;

    /*
    self.right_leg = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .moveTo(0, 0)
        .lineTo(LEG_LENGTH, 0);
    self.addChild(self.right_leg);
    */

    self.body = new Graphics()
        .beginFill(color)
        .drawCircle(0, 0, BODY_RADIUS)
        .endFill();
    self.addChild(self.body);

    self.right_leg = new Graphics()
        .beginFill(color)
        .drawCircle(LEG_OFFSET, 0, LEG_RADIUS)
        .endFill();
    self.addChild(self.right_leg);

    self.left_leg = new Graphics()
        .beginFill(color)
        .drawCircle(-LEG_OFFSET, 0, LEG_RADIUS)
        .endFill();
    self.addChild(self.left_leg);


    self.update = (delta, now) => {
        if(self.v){
            self.walk_t += delta;
        }

        self.right_leg.y = Math.sin(self.walk_t/5) * 20;
        self.left_leg.y = -Math.sin(self.walk_t/5) * 20;

        self.x += self.v * Math.sin(self.rotation);
        self.y += self.v * Math.cos(self.rotation);

        self.rotation += self.vr;
    };

    console.log("add player");

    scene.addChild(self);

    return self;
}