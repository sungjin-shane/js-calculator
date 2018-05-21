//-Waiting for event by clicking
document.addEventListener('click', evtClick);
var preVal = '';
var lastValArr = [];

function evtClick(evt) {
    //console.log(evt.target.className);
    
    let className = evt.target.className;
    let newVal = evt.target.id;
    

    if (className.substring(0,7) != 'cal-btn') return;
    
    screenVal = document.getElementById("outPuts").innerHTML;   

    if (newVal == 'AC'){
        document.getElementById("outPuts").innerHTML = '';
        lastValArr = [];
        console.log('lastValArr--->'+lastValArr );
        return;
    }

    if (newVal == 'CE'){
        console.log (screenVal);
        let length = screenVal.length
        //console.log(screenVal.substring (0,length-1));
        document.getElementById("outPuts").innerHTML = screenVal.substring (0,length-1);
        lastValArr.pop();
        console.log('lastValArr--->'+lastValArr );
        return;
    }

    if (screenVal.length == 1 && preVal == 0 && (parseInt(newVal) == newVal) ){
        console.log("no start with 02,03,04...");
        console.log('lastValArr--->'+lastValArr );
        return;        
    }

    if ( (parseInt(preVal) != preVal) && (parseInt(newVal) != newVal) ){
        console.log("no repeat operator");
        console.log('lastValArr--->'+lastValArr );
        return;        
    }

    if (preVal == newVal) {
        
        if (screenVal.length == 1 && newVal == 0) {
            console.log("no start double 0");
            console.log('lastValArr--->'+lastValArr );
            return;
        }
        
        if (parseInt(newVal) != newVal) {
        console.log("it is the same string, ingnore it");
        console.log('lastValArr--->'+lastValArr );
        return;
        }
    }

    if ((screenVal.length == 0) && (parseInt(newVal) != newVal) && newVal != '-') {
        console.log("no start with operator");
        console.log('lastValArr--->'+lastValArr );
        return;
    }

    lastValArr.push(newVal);

     //Calculate /////////////////////////////////////////////////////
     //1) Insert number & operator into array (parsing)

     var tmpArr = []; 
     if (newVal == '='){//Click '='button ---------------------------
        
        //0) validation logic before calculation

        //1) create array for calculation
        let tmpNumber = '';
        lastValArr.map( function( v, i ){
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
         

    //2) Actual calculate from Aarray
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


     //function parsArithm (arrArg, index){
        let v;
        for (i=0; i<tmpArr.length; i++){
            v = tmpArr[i];
            if (v != "rem"){
                console.log("current Index value-->"+v);

                if ( (parseFloat(v) == v) || (parseInt(v) == v)){
                    console.log("numberer-->"+v);
                }else if (isHighOpr(v) == 'highOpr'){
                    console.log("High operator-->"+v)
                    tmpArr[i+1] = calExe( parseFloat(tmpArr[i-1]), v, parseFloat(tmpArr[i+1]) ) 
                    tmpArr[i] = "rem";
                    tmpArr[i-1] = "rem";
                    
                    //parsArithm(tmpArr, i);
                }           
            }else{
                console.log("current Index value-->"+v);
            }
             
            console.log("tmpArr-arraySrtatus--->"+tmpArr);
        }     
        
    // }

    //3) final calculation for rest of +, - operator
    let lastArr = [];
    
    lastArr = deleteRemChar(tmpArr); //'rem' remove   
    console.log("lastArr--->"+lastArr);  
    
    
   
   
    let resultVal =  calProc(lastArr);
    document.getElementById("outPuts").innerHTML = resultVal; // final calculation
    return;


    }//end = btn click procedure////////////////////////////////////////
    


    lastVal = screenVal+newVal;
    document.getElementById("outPuts").innerHTML = lastVal;

    preVal = newVal;
    console.log('lastValArr--->'+lastValArr );
} 





function btnClick(btnId) {
    var answers   = ["Saab", "Volvo", "BMW"];
    var questions = ["good", "bad", "Excellent"]
    var roundArr = [answers, questions]; 
    console.log(roundArr);

    //Dynamic create object is testing
    var board = { cells:[] }
    var boardCnt = 2 //board basic elements 3 X 3

    for (var i = 0; i < boardCnt; i++){
        for (var j =0; j < boardCnt; j++){
       // board.cells.push ({row: i ,col: j, questions: question, answers: answer})
  
      //console.log("Dynamic Object->"+board.cells.length)
      //console.log("Dynamic Object->"+board.cells.questions)

        }
    }

  /*  let set1 = [];
    let set2 = [];
    let roundArr = [
    set1 [
    one   = {question : "What is the square root of 225  ?", answer : 15},
    two   = {question : "What is the square root of 225  ?", answer : 15}
    
    ],
    set2 [
        one   = {question : "What is the square root of 225  ?", answer : 15},
        two   = {question : "What is the square root of 225  ?", answer : 15}

    ]
    ]

    console.log(roundArr);*/


}
