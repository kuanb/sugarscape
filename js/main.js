  function run () {
    initiateCells();
    initiateSugarMines();
    initiateAgents();

    clearCanvas();
    createCanvas();
    createScape();

    renderSugarMines();
    renderAgents();
  }
  run()