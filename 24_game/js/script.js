const input = [3, 3, 8, 8];


const math_symbols = ["+", "-", "*", "/"]

const inputs = d3.select('#input-numbers').selectAll('.form-group')
    .data(input).enter()
    .append('div')
    .attr('class', 'form-group');
inputs.append('label').text((d, i) => `Number ${i+1}: `);
inputs.append('input').attr('placeholder', d => d);

const input_numbers = []
for (i = 0; i < input.length; i++) {
    input_numbers.push(input[i].toString());
}
console.log(input_numbers);

function swap(arr, i, j) {  
    if (i != j) {  
        var temp = arr[i];  
        arr[i] = arr[j];  
        arr[j] = temp;  
    }  
}

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
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
    return false;   // Not found
}

function Permutation(arr, num) {
    /*
	Calculate the partial permutation of an input array
	@param arr - the input array
	@param num - num of element of partial input, num out of arr.length 
    */
    // arr.sort();
    if (arr.length >= num && num > 0) {
        var perm = [];
        (function fn(n) {
            for(var i = n; i < arr.length ; i++) {
                // if (i != 0 && arr[i] == arr[i - 1]) {
                //     continue;
                // }  
                swap(arr, i, n);  
                if((n + 1) < num) {
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

sym = []
symbols = []
for (i = 0; i < math_symbols.length; i++) {
    sym.push(math_symbols[i]);
    for (j = 0; j < math_symbols.length; j++) {
        sym.push(math_symbols[j]);
        for (k = 0; k < math_symbols.length; k++){
            sym.push(math_symbols[k]);
            var newArray = sym.slice();
            symbols.push(newArray);
            sym.pop();
        }
        sym.pop();
    }
    sym.pop();
}

var perm = Permutation(input_numbers, 4);
var solution = false;
var res = [];
for (i = 0; i < perm.length; i++) {
    for (j = 0; j < symbols.length; j++) {
        var formula1 = "(" + perm[i][0] + symbols[j][0] + perm[i][1] + ")" + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3];
        var formula2 = perm[i][0] + symbols[j][0]+ perm[i][1] + symbols[j][1] + "(" + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
        var formula3 = "(" + perm[i][0] + symbols[j][0]+ perm[i][1] + ")" + symbols[j][1] + "(" + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
        var formula4 = "(" + perm[i][0] + symbols[j][0]+ perm[i][1] + symbols[j][1] + perm[i][2] + ")" + symbols[j][2] + perm[i][3];
        var formula5 = perm[i][0] + symbols[j][0]+ "(" + perm[i][1] + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3] + ")";
        var formula6 = perm[i][0] + symbols[j][0]+ perm[i][1] + symbols[j][1] + perm[i][2] + symbols[j][2] + perm[i][3];
        formulas = [formula1, formula2, formula3, formula4, formula5, formula6];
        for (k = 0; k < formulas.length; k++) {
            if (Math.abs(24 - eval(formulas[k])) < 0.0001) {
                res.push(formulas[k]);
                solution = true;
            }
        }
    }
}
console.log(solution);
console.log(res);


