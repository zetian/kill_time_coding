const inputNumbers = [1, 3, 5, 7];
console.log(inputNumbers);

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
            for(var i = n; i < num; i++) {  
                swap(arr, i, n);  
                if(n + 1 < arr.length - 1)
                    fn(n + 1);
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


