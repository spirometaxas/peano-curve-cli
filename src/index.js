const getWidth = function(n) {
  if (n < 1) {
    return 0;
  }
  return (6 * Math.pow(3, n - 1)) - 1;
}

const getHeight = function(n) {
  if (n < 1) {
    return 0;
  }
  return Math.pow(3, n);
}

const LINES = {
  '─': {
    STANDARD: '─',
    BOLD: '━',
    DOUBLE: '═',
  },
  '│': {
    STANDARD: '│',
    BOLD: '┃',
    DOUBLE: '║',
  },
  '┌': {
    STANDARD: '┌',
    BOLD: '┏',
    DOUBLE: '╔',
  },
  '┐': {
    STANDARD: '┐',
    BOLD: '┓',
    DOUBLE: '╗',
  },
  '┘': {
    STANDARD: '┘',
    BOLD: '┛',
    DOUBLE: '╝',
  },
  '└': {
    STANDARD: '└',
    BOLD: '┗',
    DOUBLE: '╚',
  },
};

const getLine = function(lineId, lineType) {
  if (LINES[lineId] !== undefined && lineType !== undefined) {
    return LINES[lineId][lineType.toUpperCase()];
  } else if (LINES[lineId] !== undefined) {
    return LINES[lineId].STANDARD;
  } else {
    return ' ';
  }
}

const getLineType = function(line) {
  if (line !== undefined && (line.toLowerCase() === 'standard' || line.toLowerCase() === 'double' || line.toLowerCase() === 'bold')) {
    return line.toLowerCase();
  }
  return 'standard';
}

const isValidRotation = function(rotation) {
  return rotation !== undefined && (rotation.toLowerCase() === 'left' || rotation.toLowerCase() === 'right' || rotation.toLowerCase() === 'flip' || rotation.toLowerCase() === 'standard');
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const drawCurve = function(board, pos, standard, params) {
  if (standard) {
    board[pos.y + 1][pos.x] = '│';
    board[pos.y + 2][pos.x] = '┌';
    board[pos.y + 2][pos.x + 1] = '─';
    board[pos.y + 2][pos.x + 2] = '┐';
    board[pos.y + 1][pos.x + 2] = '│';
    board[pos.y][pos.x + 2] = '└';
    board[pos.y][pos.x + 3] = '─';
    board[pos.y][pos.x + 4] = '┘';
    board[pos.y + 1][pos.x + 4] = '│';

    if (params && params.end1 === 'left') {
      board[pos.y][pos.x] = '┘';
    }
    if (params && params.end1 === 'down') {
      board[pos.y][pos.x] = '│';
    }
    if (params && params.end2 === 'right') {
      board[pos.y + 2][pos.x + 4] = '┌';
      board[pos.y + 2][pos.x + 5] = '─';
    }
    if (params && params.end2 === 'up') {
      board[pos.y + 2][pos.x + 4] = '│';
    }
  } else {
    board[pos.y + 1][pos.x] = '│';
    board[pos.y][pos.x] = '└';
    board[pos.y][pos.x + 1] = '─';
    board[pos.y][pos.x + 2] = '┘';
    board[pos.y + 1][pos.x + 2] = '│';
    board[pos.y + 2][pos.x + 2] = '┌';
    board[pos.y + 2][pos.x + 3] = '─';
    board[pos.y + 2][pos.x + 4] = '┐';
    board[pos.y + 1][pos.x + 4] = '│';

    if (params && params.end1 === 'left') {
      board[pos.y + 2][pos.x] = '┐';
    }
    if (params && params.end1 === 'up') {
      board[pos.y + 2][pos.x] = '│';
    }
    if (params && params.end2 === 'right') {
      board[pos.y][pos.x + 4] = '└';
      board[pos.y][pos.x + 5] = '─';
    }
    if (params && params.end2 === 'down') {
      board[pos.y][pos.x + 4] = '│';
    }
  }
}

const drawCurveLR = function(board, pos, standard, params) {
  if (standard) {
    board[pos.y + 2][pos.x + 1] = '─';
    board[pos.y + 2][pos.x + 2] = '─';
    board[pos.y + 2][pos.x + 3] = '─';
    board[pos.y + 2][pos.x + 4] = '┐';
    board[pos.y + 1][pos.x + 4] = '┘';
    board[pos.y + 1][pos.x + 3] = '─';
    board[pos.y + 1][pos.x + 2] = '─';
    board[pos.y + 1][pos.x + 1] = '─';
    board[pos.y + 1][pos.x] = '┌';
    board[pos.y][pos.x] = '└';
    board[pos.y][pos.x + 1] = '─';
    board[pos.y][pos.x + 2] = '─';
    board[pos.y][pos.x + 3] = '─';
    board[pos.y][pos.x + 4] = '─';

    if (params && params.end1 === 'left') {
      board[pos.y + 2][pos.x] = '─';
    }
    if (params && params.end1 === 'up') {
      board[pos.y + 2][pos.x] = '└';
    }
    if (params && params.end2 === 'right') {
      board[pos.y][pos.x + 4] = '─';
      board[pos.y][pos.x + 5] = '─';
    }
    if (params && params.end2 === 'down') {
      board[pos.y][pos.x + 4] = '┐';
    }
  } else {
    board[pos.y][pos.x + 1] = '─';
    board[pos.y][pos.x + 2] = '─';
    board[pos.y][pos.x + 3] = '─';
    board[pos.y][pos.x + 4] = '┘';
    board[pos.y + 1][pos.x + 4] = '┐';
    board[pos.y + 1][pos.x + 3] = '─';
    board[pos.y + 1][pos.x + 2] = '─';
    board[pos.y + 1][pos.x + 1] = '─';
    board[pos.y + 1][pos.x] = '└';
    board[pos.y + 2][pos.x] = '┌';
    board[pos.y + 2][pos.x + 1] = '─';
    board[pos.y + 2][pos.x + 2] = '─';
    board[pos.y + 2][pos.x + 3] = '─';
    board[pos.y + 2][pos.x + 4] = '─';

    if (params && params.end1 === 'left') {
      board[pos.y][pos.x] = '─';
    }
    if (params && params.end1 === 'down') {
      board[pos.y][pos.x] = '┌';
    }
    if (params && params.end2 === 'right') {
      board[pos.y + 2][pos.x + 4] = '─';
      board[pos.y + 2][pos.x + 5] = '─';
    }
    if (params && params.end2 === 'up') {
      board[pos.y + 2][pos.x + 4] = '┘';
    }
  }
}

const peanoSF = function(n, board, pos, standard, params) {
  if (n <= 1) {
    drawCurve(board, pos, standard, params);
  } else {
    if (standard) {
      peanoSF(n - 1, board, { x: pos.x, y: pos.y }, true, { end1: params.end1, end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, false, { end1: 'up', end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: 'down', end2: 'right' });

      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: 'left', end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, true, { end1: 'down', end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, false, { end1: 'up', end2: 'right' });

      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y }, true, { end1: 'left', end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + getHeight(n - 1) }, false, { end1: 'up', end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: 'down', end2: params.end2 });
    } else {
      peanoSF(n - 1, board, { x: pos.x, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: params.end1, end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, true, { end1: 'down', end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x, y: pos.y }, false, { end1: 'up', end2: 'right' });

      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, true, { end1: 'left', end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, false, { end1: 'up', end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: 'down', end2: 'right' });

      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: 'left', end2: 'down' });
      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + getHeight(n - 1) }, true, { end1: 'down', end2: 'up' });
      peanoSF(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y }, false, { end1: 'up', end2: params.end2 });
    }
  }
}

const peanoLR = function(n, board, pos, standard, params) {
  if (n <= 1) {
    drawCurveLR(board, pos, standard, params);
  } else {
    if (standard) {
      peanoLR(n - 1, board, { x: pos.x, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: params.end1, end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: 'left', end2: 'down' });

      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + getHeight(n - 1) }, false, { end1: 'left', end2: 'up' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, true, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, false, { end1: 'down', end2: 'right' });

      peanoLR(n - 1, board, { x: pos.x, y: pos.y }, true, { end1: 'up', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, false, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y }, true, { end1: 'left', end2: params.end2 });
    } else {
      peanoLR(n - 1, board, { x: pos.x, y: pos.y }, false, { end1: params.end1, end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, true, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y }, false, { end1: 'left', end2: 'up' });

      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + getHeight(n - 1) }, true, { end1: 'left', end2: 'down' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, false, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, true, { end1: 'up', end2: 'right' });

      peanoLR(n - 1, board, { x: pos.x, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: 'down', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + (2 * getHeight(n - 1)) }, true, { end1: 'left', end2: 'right' });
      peanoLR(n - 1, board, { x: pos.x + (2 * getWidth(n - 1)) + 2, y: pos.y + (2 * getHeight(n - 1)) }, false, { end1: 'left', end2: params.end2 });
    }
  }
}

const peano = function(n, board, rotate, inverse) {
  if (rotate === 'left' || rotate === 'right') {
    peanoLR(n, board, { x: 0, y: 0 }, !inverse, { end1: 'left', end2: 'right' });
  } else {
    peanoSF(n, board, { x: 0, y: 0 }, !inverse, inverse ? { end1: 'up', end2: 'down' } : { end1: 'down', end2: 'up' });
  }
}

const draw = function(board, lineType) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += getLine(board[board.length - i - 1][j], lineType);
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || isNaN(n) || n < 1) {
    return '';
  }

  const inverse = config !== undefined && config.inverse === true;
  const rotate = config !== undefined && isValidRotation(config.rotate) ? config.rotate.toLowerCase() : 'standard';
  const lineType = config !== undefined ? getLineType(config.line) : undefined;

  const board = createBoard(getWidth(n), getHeight(n));
  peano(n, board, rotate, inverse);
  
  return draw(board, lineType);
}

module.exports = {
  create: create,
};