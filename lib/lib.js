function calExe (a,opr,b){
    //console.log(a);
    //console.log(b);
     switch (opr) {
        case '+': 
            return a + b;
            break;
        case '-': 
            return a - b;
            break;
        case '*': 
            return a * b;
            break;
        case '/': 
            return a / b;
            break;
     
         default:
             break;
     }
 }

 function isHighOpr (opr){

    if ( (parseFloat(opr) == opr) || (parseInt(opr) == opr)){
        return "num";
    } else if (opr == "rem") return "rem";

    switch (opr) {
       case '+': 
           return "lowOpr";
           break;
       case '-': 
           return "lowOpr";
           break;
       case '*': 
           return "highOpr";
           break;
       case '/': 
           return "highOpr";
           break;
    
        default:
            return "Null";
            break;
    }
}

function makeParsArr(currValarr){
    let tmpNumber = '';
    let tmpArr = [];
    currValarr.map( function( v, i ){
        if (v != '=') {
            if( parseInt(v) == v || v == '.'){ //number & . 
                    tmpNumber = tmpNumber + v;
            }else{
                if (tmpNumber != '') {
                    tmpArr.push(tmpNumber);
                    tmpNumber = '';
                }
                tmpArr.push(v);
            }
        }else{
            tmpArr.push(tmpNumber);
        }
     });
     return tmpArr;
}


function deleteRemChar (arr){
    let rtnArr = [];
    arr.map( function( v, i ){
        if (v != 'rem') rtnArr.push(v);             
    });     
    //console.log("rtnArr--->"+rtnArr);
    return rtnArr;
}

function calProc (arr) {
    let rtnArr = [];
    let v;
    for (i=0; i<arr.length; i++){
        v = arr[i];
        if (isHighOpr(v) == 'lowOpr'){
            console.log(" LowOperator-->"+v)
            arr[i+1] = calExe( parseFloat(arr[i-1]), v, parseFloat(arr[i+1]) ) 
            arr[i] = "rem";
            arr[i-1] = "rem";
        } 
    }
    rtnArr = deleteRemChar(arr);

    return rtnArr;
}