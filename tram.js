function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Tram(scene, stations, begin_idx) {
    let self = new Container();

    let current_idx = begin_idx;

    const WIDTH = 80;
    const HEIGHT = 40;

    self.v = 0.5;
    
    /*let body_diffuse = Sprite.from(pixi.renderer.generateTexture(new Graphics()
        .beginFill(0xff3b94)
        .drawRoundedRect(0, 0, WIDTH, HEIGHT, 10)
        .endFill()
    ));*/
    let body_diffuse = Sprite.fromImage('images/tram_texture.png');
    // body_diffuse.scale = 2;
    body_diffuse.parentGroup = diffuseGroup;
    /*let body_normal = Sprite.from(pixi.renderer.generateTexture(new Graphics()
        .beginFill(0x8080ff)
        .drawRoundedRect(0, 0, WIDTH, HEIGHT, 10)
        .endFill()
    ));*/
    let body_normal = Sprite.fromImage('images/tram_normal.png');
    // body_normal.scale = 2;
    body_normal.parentGroup = normalGroup;
    var body = new PIXI.Container();
    body.addChild(body_diffuse, body_normal);
    body.x = -WIDTH/2;
    body.y = -HEIGHT/2;

    // body.scale = 0.2;

    self.addChild(body);

    const light_t = new PIXI.lights.PointLight(0xffffff, 1, 30);
    // light.falloff = [-100, 1000, 0];
    scene.addChild(light_t);
    

    const light_b = new PIXI.lights.PointLight(0xffffff, 1, 30);
    scene.addChild(light_b);
    

    self.x = stations[current_idx].x;
    self.y = stations[current_idx].y;

    self.rail_t = 0;

    self.track_len = Math.sqrt(
        Math.pow(stations[stations[current_idx].next].x - stations[current_idx].x, 2) + 
        Math.pow(stations[stations[current_idx].next].y - stations[current_idx].y, 2)
    );

    scene.addChild(self);

    self.update = (delta, now) => {
        self.rail_t += delta;

        // light_b.x = self.x + 20 + WIDTH/2 * Math.sin(self.rotation);
        // light_b.y = self.y + HEIGHT/2 + WIDTH/2 * Math.cos(self.rotation);

        self.x = stations[current_idx].x + (
            stations[stations[current_idx].next].x - stations[current_idx].x
        ) * self.v * self.rail_t / self.track_len + getRandomArbitrary(-0, 0);

        self.y = stations[current_idx].y + (
            stations[stations[current_idx].next].y - stations[current_idx].y
        ) * self.v * self.rail_t / self.track_len + getRandomArbitrary(-0, 0);

        self.rotation = Math.atan2(
            stations[stations[current_idx].next].y - stations[current_idx].y,
            stations[stations[current_idx].next].x - stations[current_idx].x
        );

        light_t.x = self.x + (WIDTH/2 + 20) * Math.cos(self.rotation + 0.1); //  20 + * ;
        light_t.y = self.y + (WIDTH/2 + 20) * Math.sin(self.rotation + 0.1); // HEIGHT/2 + WIDTH/2 * Math.cos(self.rotation);

        light_b.x = self.x + (WIDTH/2 + 20) * Math.cos(self.rotation - 0.1); //  20 + * ;
        light_b.y = self.y + (WIDTH/2 + 20) * Math.sin(self.rotation - 0.1);

        if(self.v * self.rail_t / self.track_len > 1) {
            self.track_len = Math.sqrt(
                Math.pow(stations[stations[current_idx].next].x - stations[current_idx].x, 2) + 
                Math.pow(stations[stations[current_idx].next].y - stations[current_idx].y, 2)
            );

            console.log("length:", self.track_len);

            current_idx = stations[current_idx].next;
            self.rail_t = 0;
        }
    }

    return self;
}