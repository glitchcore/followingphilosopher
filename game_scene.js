const stations = [
    {x:10, y:20, type:"bend", next:1},
    {x:210, y:20, type:"bend", next:2},
    {x:210, y:220, type:"bend", next:3},
    {x:330, y:330, type:"bend", next:4},
    {x:220, y:330, type:"bend", next:5},
    {x:110, y:50, type:"bend", next:6},
    {x:10, y:20, type:"bend", next:0},
];

/*
const stations = [
    {x:10, y:20, type:"bend", next:1},
    {x:210, y:20, type:"bend", next:2},
    {x:210, y:220, type:"bend", next:3},
    {x:100, y:220, type:"bend", next:false},
];
*/


function Game_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;

    for (let x = 0; x < pixi.screen.width; x += 30) {
        for (let y = 0; y < pixi.screen.height; y += 30) {
            let sq = new Graphics()
                .beginFill(0x333333)
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

    let player = Player(scene, 0x55ffe1);
    player.x = 300;
    player.y = 200;

    let tram = Tram(scene, stations, 0);

    stations.forEach(station => {
        if(station.next !== false) {
            let g_diffuse = Sprite.from(pixi.renderer.generateTexture(new Graphics()
                .lineStyle(5, 0xFFFFFF, 1)
                .moveTo(0, 0)
                .lineTo(
                    Math.abs(stations[station.next].x - station.x),
                    Math.abs(stations[station.next].y - station.y)
                )
            ));
            g_diffuse.parentGroup = diffuseGroup;
            let g_normal = Sprite.from(pixi.renderer.generateTexture(new Graphics()
                .lineStyle(5, 0x8080ff, 1)
                .moveTo(0, 0)
                .lineTo(
                    Math.abs(stations[station.next].x - station.x),
                    Math.abs(stations[station.next].y - station.y)
                )
            ));
            g_normal.parentGroup = normalGroup;

            var g = new PIXI.Container();
            g.addChild(g_diffuse, g_normal);
            if(stations[station.next].x - station.x >= 0) {
                g.x = station.x;
            } else {
                g.x = stations[station.next].x;
            }

            if(stations[station.next].y - station.y >= 0) {
                g.y = station.y;
            } else {
                g.y = stations[station.next].y;
            }

            scene.addChild(g);
        }

        let s_diffuse = Sprite.from(pixi.renderer.generateTexture(new Graphics()
            .beginFill(0xa6fd29)
            .drawCircle(0, 0, 10)
            .endFill()
        ));
        s_diffuse.parentGroup = diffuseGroup;
        let s_normal = Sprite.from(pixi.renderer.generateTexture(new Graphics()
            .beginFill(0x8080ff)
            .drawCircle(0, 0, 10)
            .endFill()
        ));
        s_normal.parentGroup = normalGroup;

        var s = new PIXI.Container();
        s.addChild(s_diffuse, s_normal);
        scene.addChild(s);
        s.x = station.x - 7.5;
        s.y = station.y - 7.5;
        scene.addChild(s);
    });

    /*
    {
        let message = new Text("Game", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }
    */

    scene.update = (delta, now) => {
        player.update(delta, now);
        tram.update(delta, now);
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