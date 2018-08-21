const input = ['#', '#', '#', '#'];

const inputs = d3.select('#input-numbers').selectAll('.form-group')
  .data(input).enter()
  .append('div')
  .attr('class', 'form-group input-number');
inputs.append('input')
  .attr('type', 'number')
  .attr('class', 'input-num')
  .attr('placeholder', d => d);

function swap(arr, i, j) {
  if (i != j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    checker = true;
    for (j = 0; j < item.length; j++) {
      if (array[i][j] != item[j]) {
        checker = false;
      }
    }
    if (checker) {
      return true;
    }
  }
  return false;
}

function Permutation(arr, num) {
  /*
Calculate the partial permutation of an input array
@param arr - the input array
@param num - num of element of partial input, num out of arr.length 
  */
  if (arr.length >= num && num > 0) {
    var perm = [];
    (function fn(n) {
      for (var i = n; i < arr.length; i++) {
        swap(arr, i, n);
        if ((n + 1) < num) {
          fn(n + 1);
        }
        else {
          var clonedNodesArray = arr.slice(0, num);
          if (!isItemInArray(perm, clonedNodesArray)) {
            perm.push(clonedNodesArray);
          }

        }
        swap(arr, i, n);
      }
    })(0);
    return perm;
  }
}

function mathSymbols() {
  const math_symbols = ["+", "-", "*", "/"]
  sym = []
  symbols = []
  for (i = 0; i < math_symbols.length; i++) {
    sym.push(math_symbols[i]);
    for (j = 0; j < math_symbols.length; j++) {
      sym.push(math_symbols[j]);
      for (k = 0; k < math_symbols.length; k++) {
        sym.push(math_symbols[k]);
        var newArray = sym.slice();
        symbols.push(newArray);
        sym.pop();
      }
      sym.pop();
    }
    sym.pop();
  }
  return symbols;
}

var solution = false;
function playGame(input_numbers) {
  solution = false;
  res = [];
  var perm = Permutation(input_numbers, 4);
  var symbols = mathSymbols();
  for (i = 0; i < perm.length; i++) {
    for (j = 0; j < symbols.length; j++) {
      var formula1 = "(" + perm[i][0] + symbols[j][0] + perm[i][1] + ")" + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3];
      var formula2 = perm[i][0] + symbols[j][0] + perm[i][1] + symbols[j][1] + "(" + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
      var formula3 = "(" + perm[i][0] + symbols[j][0] + perm[i][1] + ")" + symbols[j][1] + "(" + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
      var formula4 = "(" + perm[i][0] + symbols[j][0] + perm[i][1] + symbols[j][1] + perm[i][2] + ")" + symbols[j][2] + perm[i][3];
      var formula5 = perm[i][0] + symbols[j][0] + "(" + perm[i][1] + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
      var formula6 = perm[i][0] + symbols[j][0] + "(" + perm[i][1] + symbols[j][1] + perm[i][2] + ")" + symbols[j][2] + perm[i][3];
      var formula7 = perm[i][0] + symbols[j][0] + perm[i][1] + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3];
      formulas = [formula7, formula1, formula2, formula3, formula4, formula5, formula6];
      for (k = 0; k < formulas.length; k++) {
        if (Math.abs(24 - eval(formulas[k])) < 0.0001) {
          res.push(formulas[k]);
          solution = true;
          return;
        }
      }
    }
  }
  return res;
}

function showAnswer() {
  input_numbers = $('input[class^=input-num]').map((idx, elem) => $(elem).val()).get().map(d => (isNaN(parseInt(d)) ? 0 : parseInt(d)));
  console.log(input_numbers);

  playGame(input_numbers);

  if (solution === false) {
    res = ['Can\'t find an answer 🤪.'];
    document.getElementById('audio-fail').play();
  } else {
    document.getElementById('audio-bling').play();
  }
  const answers = d3.select('#answers')
    .selectAll('.answer')
    .data(res);
  answers
    .enter()
    .append('div')

  answers.attr('class', 'answer text-center')
    .html((d, i) => (d.includes('Can') ? d : `Solution 👉 ${d} = 24`.replace(/\//gi, '&divide').replace(/\*/gi, '&times')));
  answers.exit().remove();

}

function randomInput() {
  document.getElementById('audio-deal').play();
  d3.selectAll('.input-num').attr('value', () => Math.round(Math.random() * 15) + 1);
}

