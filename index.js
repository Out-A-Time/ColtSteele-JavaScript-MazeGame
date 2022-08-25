const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } =
  Matter;

const canvasWidth = 800;
const canvasHeight = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: canvasWidth,
    height: canvasHeight,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

//WALLS
const walls = [
  Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 600, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, 300, 40, 600, {
    isStatic: true,
  }),
  Bodies.rectangle(800, 300, 40, 600, {
    isStatic: true,
  }),
];

World.add(world, walls);

//RANDOM SHAPES
for (let i = 0; i < 20; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        100,
        10,
        {
          isStatic: false,
        }
      )
    );
  } else {
    World.add(
      world,
      Bodies.circle(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        10,
        {
          render: {
            fillStyle: "red",
          },
          isStatic: false,
        }
      )
    );
  }
}
