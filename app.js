let update = () => {};
let key_handler = (key, isPress) => {};

let intro_scene, game_scene;

function app(pixi) {
    var stage = pixi.stage = new Stage();

    PIXI.utils.sayHello("Drop to stack begin!");

    intro_scene = Intro_scene(pixi);
    intro_scene.visible = false;
    stage.addChild(intro_scene);

    game_scene = Game_scene(pixi);
    game_scene.visible = false;
    stage.addChild(game_scene);

    window.addEventListener(
        "keydown",
        (event) => {
            key_handler(event.keyCode, true);
            if(event.keyCode !== 116 && event.keyCode !== 122/* && event.keyCode !== 123*/) {
                event.preventDefault();
            }
        },
        false
    );

    window.addEventListener(
        "keyup",
        (event) => {
            key_handler(event.keyCode, false);
            event.preventDefault();
        },
        false
    );

    pixi.ticker.add(delta => update(delta, performance.now()));

    select_scene(game_scene);

    /*var block = new PIXI.Container();
    const block_diffuse = Sprite.fromImage('images/block.png');
    block_diffuse.parentGroup = diffuseGroup;
    const block_normal = Sprite.fromImage('images/blockNormalMap.png');
    block_normal.parentGroup = normalGroup;
    block.addChild(block_normal, block_diffuse);
    background.addChild(block);

    block.x = 200;
    block.y = 300;
    */

    stage.addChild(
        // put all layers for deferred rendering of normals
        new Layer(diffuseGroup),
        new Layer(normalGroup),
        new Layer(lightGroup),
    );
}

let current_scene = null;
let back_scene = null;

function select_scene(scene, params) {
    if(current_scene !== null) {
        current_scene.visible = false;
    }
    scene.visible = true;
    current_scene = scene;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}

function popup_scene(scene, params) {
    back_scene = current_scene;
    current_scene = scene;

    scene.visible = true;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}
