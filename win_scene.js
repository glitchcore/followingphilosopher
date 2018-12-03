function Win_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;


    {
        let message = new Text("YOU WIN", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }

    {
        let message = new Text("The death of dogma is the birth of morality", RED_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 200);
        scene.addChild(message);
    }

    {
        let message = new Text("[press ent3r for restart]", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 500);
        scene.addChild(message);
    }

    scene.update = (delta, now) => {

    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                select_scene(intro_scene);
            }
        }
    };

    let glitch = () => {
        if(current_scene == win_scene) {
            enable_glitch();
            setTimeout(glitch, getRandomArbitrary(400, 1500));
        }
    }

    scene.select = () => {
        glitch();
    };

    return scene;
}