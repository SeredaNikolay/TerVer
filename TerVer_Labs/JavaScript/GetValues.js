function getCurrentSelectOptionTextArr(textArr, index)
{
    var text=textArr[index];
    var ind;
    for(var i=index, j=0; i>0; i--, j++)
    {
        ind=Number(document.getElementsByClassName("SomeSelect")[j].value);
        text=text[ind];
    }
    return text;
}

function getCurrentCaseValue(valueArr)
{
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    var i=0;
    var value=valueArr[SomeSelect[i].value];
    for(i=1; i<SomeSelect.length; i++)
        value=value[SomeSelect[i].value];
    return value;
}

function getInputStrValue(SomeInput, isArr)
{
    var strValue=[[], [], [], [], [], []];
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