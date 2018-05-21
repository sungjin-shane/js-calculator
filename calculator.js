//Waiting for event by clicking-------------
document.addEventListener('click', evtClick);
var preVal = '';
var currValarr = [];

function evtClick(evt) {
    //console.log(evt.target.className);
    
    let className = evt.target.className;
    let newVal = evt.target.id;  
    
    //Step 1: pre-validation /////////////////////////////////////////////////////////////////////////////////////
    if (className.substring(0,7) != 'cal-btn') return;  //only button click
    
    screenVal = document.getElementById("outPuts").innerHTML;   

    if (newVal == 'AC'){ //Clear all
        document.getElementById("outPuts").innerHTML = '';
        currValarr = [];
        screenVal = '';
        preVal = '';
        console.log('AC button Click');
        return;
    }

    if (newVal == 'CE'){ //backspace <----------------- 백스페이스 했는데 *,+ 가 마지막이 되버리면?
        document.getElementById("outPuts").innerHTML = screenVal.substring (0,screenVal.length-1);
        currValarr.pop();
        console.log('CE button Click' );
        return;
    }

    if (screenVal.length == 1 && preVal == 0 && (parseInt(newVal) == newVal) ){ 
        console.log("no start with 02,03,04...");        
        return;        
    }

    
    if ( (parseInt(preVal) != preVal) && (parseInt(newVal) != newVal) ){ 
        console.log("no repeat operator");
        console.log("currValarr--->"+currValarr);
        return;        
    }

    if (preVal == newVal) {
        
        if (screenVal.length == 1 && newVal == 0) {
            console.log("no start double 0");
        }
        
        if (parseInt(newVal) != newVal) {
        console.log("No repeat same string");
        return;
        }
    }

    if ((screenVal.length == 0) && (parseInt(newVal) != newVal) && newVal != '-') {
        console.log("no start with operator");
        return;
    }

    currValarr.push(newVal); //Insert new value into currValarr.

    //Step 2: Calculation /////////////////////////////////////////////////////////////////////////////////////
    var tmpArr = [];
    if (newVal == '='){//Click '='button ---------------------------
        
        // = 눌렀는데 *,+ 가 마지막인 경우?

        //1) create array for parsing
        tmpArr = makeParsArr(currValarr);
        console.log ("makeParsArr--->"+tmpArr);

        //2) 1st Calculation (Hihg priority arithmetic * /)
        let v;
        for (i=0; i<tmpArr.length; i++){
            v = tmpArr[i];
            if ((v != "rem") && (isHighOpr(v) == 'highOpr')){
                console.log("High operator-->"+v)
                tmpArr[i+1] = calExe( parseFloat(tmpArr[i-1]), v, parseFloat(tmpArr[i+1]) ) 
                tmpArr[i] = "rem";
                tmpArr[i-1] = "rem";
            }
        }     
        
        //3) 2nd Calculation (Low priority arithmetic +, -)
        let lastArr = [];    
        lastArr = deleteRemChar(tmpArr); //'rem' remove   
        console.log("lastArr--->"+lastArr);  
   
        let resultVal =  calProc(lastArr);
        screenVal = resultVal;
        lastVal = resultVal;
        preVal = resultVal;
        currValarr = [];
        currValarr.push(resultVal);
        document.getElementById("outPuts").innerHTML = resultVal; // final calculation

        console.log("lastVal-->"+lastVal);
        console.log("newVal-->"+newVal);
        console.log("screenVal-->"+screenVal);


        return;


    }//end '=' btn click procedure////////////////////////////////////////
    


    lastVal = screenVal+newVal;
    document.getElementById("outPuts").innerHTML = lastVal;

    preVal = newVal;
    console.log('currValarr--->'+currValarr );
} 
