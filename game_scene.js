function Game_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;

    /*
    {
        let message = new Text("Game", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }
    */

    for (let x = 0; x < pixi.screen.width; x += 30) {
        for (let y = 0; y < pixi.screen.height; y += 30) {
            let sq = new Graphics()
                .beginFill(0xFFFFFF)
                .drawRect(0, 0, 10, 10)
                .endFill();
            const sq_diffuse = Sprite.from(pixi.renderer.generateTexture(sq));
            sq_diffuse.parentGroup = diffuseGroup;

            let normal_sq = new Graphics()
                .beginFill(0x8080ff)
                .drawRect(0, 0, 10, 10)
                .endFill();
            const sq_normal = Sprite.from(pixi.renderer.generateTexture(normal_sq));
            sq_normal.parentGroup = normalGroup;

            var sq_block = new PIXI.Container();
            sq_block.addChild(sq_normal, sq_diffuse);
            scene.addChild(sq_block);

            sq_block.x = x;
            sq_block.y = y;
        }

    }

    let player = Player(scene, 0xFFFFFF);
    player.x = 300;
    player.y = 200;

    scene.update = (delta, now) => {
        player.update(delta, now);
    };

    scene.key_handler = (key, isPress) => {
        
        if(isPress && key === 39) {
            player.vr = 0.1;
        }
        if(isPress && key === 37) {
            player.vr = -0.1;
        }
        if(!isPress && (key === 39 || key === 37)) {
            player.vr = 0;
        }

        if(isPress && key === 40) {
            player.v = 4;
        }
        if(isPress && key === 38) {
            player.v = -4;
        }
        if(!isPress && (key === 38 || key === 40)) {
            player.v = 0;
        }
    };

    scene.select = () => {

    };

    return scene;
}