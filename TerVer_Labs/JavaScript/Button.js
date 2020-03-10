function getInputStrValue(SomeInput, isArr)
{
    var strValue=[[], [], [], []];
    for(var i=0; i<SomeInput.length; i++)
    {
        if(isArr[i])
            strValue[i]=SomeInput[i].value.split(' ');
        else
            strValue[i][0]=SomeInput[i].value;
    }
    return strValue;
}

function getValues(value)
{
    var right;
    var index;
    var isArr=getCurrentCaseValue(InputFiledAllowsArray);
    var validNumInd=getCurrentCaseValue(ValidNumbersInd);
    var checkFuncArr=CheckNumFunc;
    var AllowedNumArr=AllowedNum;
    var SomeInput=document.getElementsByClassName("SomeInput");
    var strValue=getInputStrValue(SomeInput, isArr);
    for(var k=0; k<SomeInput.length; k++) //Для всех input
    {
        for(var j=0; j<strValue[k].length; j++) //Для всех значений конкретного input
        {
            right=0;
            for(var i=0; i<validNumInd[k].length&&!right; i++) //Для всех допустимых чисел конкретного input
            {
                index=validNumInd[k][i];
                if(checkFuncArr[index](strValue[k][j])&AllowedNumArr[index])
                {
                    value[k][j]=Number(strValue[k][j]);
                    right=1;
                }
            }
            if(!right)
                return k;
        }
    }
    return -1;
}

function OnCalculateButtonClick()
{
    var SomeValues=[[], [], [], []];
    var errorInputInd=getValues(SomeValues);
    if(errorInputInd!=-1)
    {       
        setErorrState(1, errorInputInd);
    }
    else
    {
        var answer=CalculateValue(SomeValues);
        if(answer!=-1)
            document.getElementById("AnswerDiv").innerHTML=answer;
    }
}