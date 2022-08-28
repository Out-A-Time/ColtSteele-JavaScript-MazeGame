const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3;
const canvasWidth = 600;
const canvasHeight = 600;

const unitLength = canvasWidth / cells;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width: canvasWidth,
    height: canvasHeight,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

//WALLS
const walls = [
  //TOP WALL
  Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 40, {
    isStatic: true,
  }),
  //BOTTOM WALL
  Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 40, {
    isStatic: true,
  }),
  //LEFT WALL
  Bodies.rectangle(0, canvasHeight / 2, 40, canvasHeight, {
    isStatic: true,
  }),
  //RIGHT WALL
  Bodies.rectangle(canvasWidth, canvasHeight / 2, 40, canvasHeight, {
    isStatic: true,
  }),
];

World.add(world, walls);

//MAZE GENERATION

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

// const grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }
//other way to build grid
const grid = Array(cells)
  .fill(null)
  .map(function () {
    return Array(cells).fill(false);
  });

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  //If I have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }
  //Mark this cell as being visited
  grid[row][column] = true;

  //Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);

  //For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    //See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }
    //If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //Remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      // verticals[row][column + 1] = true;
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }
    stepThroughCell(startRow, startColumn);
  }
};

//Visit the next neighbor
stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      5,
      { isStatic: true }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      unitLength,
      5,
      { isStatic: true }
    );
    World.add(world, wall);
  });
});
