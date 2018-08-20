const inputNumbers = [1, 3, 5, 7];

const inputs = d3.select('#input-numbers').selectAll('.form-group')
    .data(inputNumbers).enter()
    .append('div')
    .attr('class', 'form-group');
inputs.append('label').text((d, i) => `Number ${i+1}: `);
inputs.append('input').attr('placeholder', d => d);

function swap(arr, i, j) {  
    if (i != j) {  
        var temp = arr[i];  
        arr[i] = arr[j];  
        arr[j] = temp;  
    }  
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
            for(var i = n; i < arr.length ; i++) {  
                swap(arr, i, n);  
                if((n + 1) < num) {
                    fn(n + 1);
                }
                else {
                    var clonedNodesArray = arr.slice(0, num);
                    perm.push(clonedNodesArray);
                }
                swap(arr, i, n);  
            }  
        })(0);
        return perm;
    }
}  


var test = Permutation(inputNumbers, 3);

console.log(test);

// permutate numbers


// permutate signs


