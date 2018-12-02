function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Tram(scene, stations, begin_idx) {
    let self = new Container();

    let current_idx = begin_idx;

    const WIDTH = 80;
    const HEIGHT = 40;

    self.v = 1;

    let body_diffuse = Sprite.fromImage('images/tram_texture.png');
    body_diffuse.parentGroup = diffuseGroup;
    let body_normal = Sprite.fromImage('images/tram_normal.png');
    body_normal.parentGroup = normalGroup;
    var body = new PIXI.Container();
    body.addChild(body_diffuse, body_normal);

    body.x = -WIDTH/2;
    body.y = -HEIGHT/2;

    self.addChild(body);

    const light_t = new PIXI.lights.PointLight(0xffffff, 1, 40);
    // light.falloff = [-100, 1000, 0];
    scene.addChild(light_t);
    

    const light_b = new PIXI.lights.PointLight(0xffffff, 1, 40);
    scene.addChild(light_b);
    
    const light = new PIXI.lights.PointLight(0xffffff, 0.05, 40);
    scene.addChild(light);
    

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

        self.x = stations[current_idx].x + (
            stations[stations[current_idx].next].x - stations[current_idx].x
        ) * self.v * self.rail_t / self.track_len + getRandomArbitrary(-2, 2);

        self.y = stations[current_idx].y + (
            stations[stations[current_idx].next].y - stations[current_idx].y
        ) * self.v * self.rail_t / self.track_len + getRandomArbitrary(-2, 2);

        self.rotation = Math.atan2(
            stations[stations[current_idx].next].y - stations[current_idx].y,
            stations[stations[current_idx].next].x - stations[current_idx].x
        ) + getRandomArbitrary(-0.05, 0.05);

        const LAMP_OFFSET = 30;
        const LAMP_FORK = 0.2;

        light_t.x = self.x + (WIDTH/2 + LAMP_OFFSET) * Math.cos(self.rotation + LAMP_FORK); //  20 + * ;
        light_t.y = self.y + (WIDTH/2 + LAMP_OFFSET) * Math.sin(self.rotation + LAMP_FORK); // HEIGHT/2 + WIDTH/2 * Math.cos(self.rotation);

        light_b.x = self.x + (WIDTH/2 + LAMP_OFFSET) * Math.cos(self.rotation - LAMP_FORK); //  20 + * ;
        light_b.y = self.y + (WIDTH/2 + LAMP_OFFSET) * Math.sin(self.rotation - LAMP_FORK);

        light.x = self.x;
        light.y = self.y;

        if(self.v * self.rail_t / self.track_len > 1) {
            current_idx = stations[current_idx].next;
            self.rail_t = 0;

            self.track_len = Math.sqrt(
                Math.pow(stations[stations[current_idx].next].x - stations[current_idx].x, 2) + 
                Math.pow(stations[stations[current_idx].next].y - stations[current_idx].y, 2)
            );
        }
    }

    return self;
}