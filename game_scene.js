function Game_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    let player = Player(scene, 0xFFFFFF);
    player.x = 300;
    player.y = 200;

    {
        let message = new Text("Game", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }

    scene.update = (delta, now) => {
        player.update(delta, now);
    };

    scene.key_handler = (key, isPress) => {
        if(isPress && key === 39) {
            player.vr = -0.1;
        }
        if(isPress && key === 37) {
            player.vr = 0.1;
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