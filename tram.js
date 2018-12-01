function Tram(scene, stations, begin_idx) {
    let self = new Container();

    let current_idx = begin_idx;

    const WIDTH = 80;
    const HEIGHT = 40;
    
    let body_diffuse = Sprite.from(pixi.renderer.generateTexture(new Graphics()
        .beginFill(0xff3b94)
        .drawRoundedRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT, 10)
        .endFill()
    ));
    body_diffuse.parentGroup = diffuseGroup;
    let body_normal = Sprite.from(pixi.renderer.generateTexture(new Graphics()
        .beginFill(0x8080ff)
        .drawRoundedRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT, 10)
        .endFill()
    ));
    body_normal.parentGroup = normalGroup;
    var body = new PIXI.Container();
    body.addChild(body_diffuse, body_normal);

    self.addChild(body);

    const light_t = new PIXI.lights.PointLight(0xffffff, 1, 50);
    // light.falloff = [-100, 1000, 0];
    scene.addChild(light_t);
    

    const light_b = new PIXI.lights.PointLight(0xffffff, 1, 50);
    scene.addChild(light_b);
    

    self.x = 200;
    self.y = 200;

    scene.addChild(self);

    self.update = (delta, now) => {
        light_t.x = self.x + WIDTH + 20;
        light_t.y = self.y + HEIGHT/4;

        light_b.x = self.x + WIDTH + 20;
        light_b.y = self.y + HEIGHT*3/4;
    }

    return self;
}