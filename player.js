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
        .drawRoundedRect(-BODY_RADIUS/2, -BODY_RADIUS/4, BODY_RADIUS, BODY_RADIUS/2, 10)
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

    const light = new PIXI.lights.PointLight(0xffffff, 2, 100);
    // light.falloff = [-100, 1000, 0];
    scene.addChild(light);

    const light_1 = new PIXI.lights.PointLight(0xffffff, 2, 50);
    scene.addChild(light_1);

    self.update = (delta, now) => {
        self.walk_t += delta * self.v;

        self.right_leg.y = Math.sin(self.walk_t/20) * 15;
        self.left_leg.y = -Math.sin(self.walk_t/20) * 15;

        self.x += self.v * Math.sin(-self.rotation);
        self.y += self.v * Math.cos(-self.rotation);

        light.x = self.x - 100 * Math.sin(-self.rotation - Math.sin(self.walk_t/20) * 0.2 + Math.sin(now/300) * 0.1);
        light.y = self.y - 100 * Math.cos(-self.rotation - Math.sin(self.walk_t/20) * 0.2 + Math.sin(now/300) * 0.1);

        light_1.x = self.x;
        light_1.y = self.y;

        self.rotation += self.vr;
    };

    console.log("add player");

    // self.scale = 0.5;

    return self;
}