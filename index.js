const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

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

const shape = Bodies.rectangle(200, 200, 100, 10, {
  isStatic: false,
});
World.add(world, shape);
