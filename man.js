function Man(scene, color) {
    const HEAD_RADIUS = 10/2;
    const SHOULDER_Y = 35/2;
    const ARM_LENGTH = 25/2;
    const LEG_LENGTH = 30/2;
    const ASS_Y = 30/2;

    const LINE_WIDTH = 8/2;

    const LEG_ANGLE = Math.PI/4;

    const ARM_ANGLE = Math.PI/3;

    const center_x = LEG_LENGTH;

    let self = new Container();

    self.grounded = false;

    self.vx = 0;
    self.vy = 0;

    self.fx = 0;

    self.right_leg = create_geometry(
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, color, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        ),
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, 0x8080ff, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        )
    );
        
    self.right_leg.x = center_x;
    self.right_leg.y = ASS_Y + SHOULDER_Y;
    self.right_leg.rotation = ARM_ANGLE;
    self.addChild(self.right_leg);

    self.left_leg = create_geometry(
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, color, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        ),
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, 0x8080ff, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        )
    );

    self.left_leg.x = center_x + LINE_WIDTH/2;
    self.left_leg.y = ASS_Y + SHOULDER_Y + LINE_WIDTH/2;
    self.left_leg.rotation = -ARM_ANGLE + Math.PI;
    self.addChild(self.left_leg);



    /* ARMS */

    self.right_arm = create_geometry(
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, color, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        ),
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, 0x8080ff, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        )
    );
        
    self.right_arm.x = center_x;
    self.right_arm.y = SHOULDER_Y;
    self.right_arm.rotation = ARM_ANGLE;
    self.addChild(self.right_arm);

    self.left_arm = create_geometry(
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, color, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        ),
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, 0x8080ff, 1)
            .moveTo(0, 0)
            .lineTo(LEG_LENGTH, 0)
        )
    );

    self.left_arm.x = center_x + LINE_WIDTH/2;
    self.left_arm.y = SHOULDER_Y + LINE_WIDTH/2;
    self.left_arm.rotation = -ARM_ANGLE + Math.PI;
    self.addChild(self.left_arm);

    self.head = create_geometry(
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, color, 1)
            .drawCircle(0, 0, HEAD_RADIUS)
        ),
        pixi.renderer.generateTexture(
            new Graphics()
            .lineStyle(LINE_WIDTH, 0x8080ff, 1)
            .drawCircle(0, 0, HEAD_RADIUS)
        )
    );
    self.head.x = center_x - HEAD_RADIUS*4/3;
    self.head.y = SHOULDER_Y/2 - HEAD_RADIUS*4/3;

    self.addChild(self.head);

    self.arm_scale = 1;

    self.update = (delta, now) => {

        /*
        if(self.vx !== 0 && Math.abs(self.vy) < 0.5) {
            self.right_leg.rotation = LEG_ANGLE + Math.sin(now/200 * self.vx) * 0.3;
            self.left_leg.rotation = -LEG_ANGLE + Math.sin(now/200 * self.vx + Math.PI/5) * 0.3;
        } else {
            self.right_leg.rotation = LEG_ANGLE;
            self.left_leg.rotation = -LEG_ANGLE;
        }

        self.x += self.vx;
        self.y += self.vy;
        */
    };

    scene.addChild(self);

    return self;
}
