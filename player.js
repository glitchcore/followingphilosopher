function Player(scene, color) {
    const LINE_WIDTH = 8;
    const BODY_RADIUS = 60;
    const LEG_OFFSET = 15;
    const LEG_RADIUS = 15;
    const HEAD_RADIUS = 20;

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
        .drawRect(-BODY_RADIUS/2, -BODY_RADIUS/4, BODY_RADIUS, BODY_RADIUS/2)
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

    self.head = new Graphics()
        .beginFill(color)
        .drawCircle(0, 0, HEAD_RADIUS)
        .endFill();
    self.addChild(self.head);

    const light = new PIXI.lights.PointLight(0xffffff, 0.5, 5000);
    light.x = pixi.screen.width / 2;
    light.y = pixi.screen.height / 2;
    scene.addChild(light);


    self.update = (delta, now) => {
        if(self.v){
            self.walk_t += delta;
        }

        self.right_leg.y = Math.sin(self.walk_t/5) * 20;
        self.left_leg.y = -Math.sin(self.walk_t/5) * 20;

        self.x += self.v * Math.sin(-self.rotation);
        self.y += self.v * Math.cos(-self.rotation);

        light.x = self.x;
        light.y = self.y;

        self.rotation += self.vr;
    };

    console.log("add player");

    scene.addChild(self);

    return self;
}