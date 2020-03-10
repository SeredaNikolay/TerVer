function updateSelectOptions(index)
{
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    for(var i=index+1; i<SomeSelect.length; i++)
        setSelectOptionCount(i, getCurrentSelectOptionTextArr(OptionText, i));
}

function OnSelectValueChange()
{
    var index=0;
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    while(event.target!=SomeSelect[index])
        index++;
    if(!index)
    {
        var ind=document.getElementsByClassName("SomeSelect")[0].value;
        var count=SelectBoxCount[ind];
        setSelectCount(count);
    }
    updateSelectOptions(index);
    setCaseParametrs();
}

function OnInputValueChange()
{
    var index=0;
    var SomeInput=document.getElementsByClassName("SomeInput");
    var allowedCh=getCurrentCaseValue(AllowedCharacters);
    while(event.target!=SomeInput[index])
        index++;
    var strValue=SomeInput[index].value;
    setErorrState(isInvalid(strValue, allowedCh[index]), index);
    document.getElementById("AnswerDiv").innerHTML="";
}

function OnCalculateButtonClick()
{
    var SomeValues=[[], [], [], [], [], []];
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