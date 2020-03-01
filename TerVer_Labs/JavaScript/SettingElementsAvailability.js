//---------------Настройка доступности при ошибочных входных данных---------------//
function setEnabledExept(id)
{    
    var someId=["FormulaBox", "CalculateButton", "MInput", "NInput"];
    var audio=document.getElementById("Audio");
    var currentRecord=document.getElementById("FormulaBox").value;
    document.getElementById("FormulaImg").setAttribute("src", ImagePathArr[currentRecord]);
    document.getElementById("DefinitionDiv").innerHTML=DefenitionArr[currentRecord];
    document.getElementById("DefinitionDiv").style.backgroundColor="rgb(188, 132, 243)";
    document.getElementById("CalculateButton").style.borderColor="green";
    document.getElementById("CalculateButton").style.backgroundColor="lime";
    document.getElementById("DefinitionDiv").style.borderColor="rgb(28, 85, 207)"
    for(var i=0; i<someId.length; i++)
    {
        if(id!=someId[i])
        {
            if(!(currentRecord=="5"&&someId[i]=="MInput"))
                document.getElementById(someId[i]).removeAttribute("disabled");
        }
    }
    if(audio.currentTime!=0)
    {
        audio.pause();
        audio.currentTime=0;
    }
    isBlocked=0;
}

function resetEnabledExept(id)
{
    var someId=["FormulaBox", "CalculateButton", "MInput", "NInput"];
    var audio=document.getElementById("Audio");
    var currentRecord=document.getElementById("FormulaBox").value;
    document.getElementById("FormulaImg").setAttribute("src", ImagePathArr[0]);
    document.getElementById("DefinitionDiv").innerHTML=DefenitionArr[0];
    document.getElementById("DefinitionDiv").style.backgroundColor="tomato";
    document.getElementById("CalculateButton").style.borderColor="navy";
    document.getElementById("CalculateButton").style.backgroundColor="orange";
    document.getElementById("DefinitionDiv").style.borderColor="red";
    for(var i=0; i<someId.length; i++)
    {
        if(id!=someId[i])
        {
            if(!(currentRecord=="5"&&id=="MInput"))
                document.getElementById(someId[i]).setAttribute("disabled", "");
        }
    }
    if(audio.currentTime==0)
        audio.play();
    isBlocked=1;
}

function checkInputData(id, setCondition)
{
    var AnswerDiv=document.getElementById("AnswerDiv");
    if(AnswerDiv.innerHTML!="")
        AnswerDiv.innerHTML="";
    if(setCondition)
    {
        if(isBlocked)
            setEnabledExept(id);
        return 1;
    }
    else
    {
        if(!isBlocked)
            resetEnabledExept(id);
        return 0;
    }
}

function checkNInputData(acceptEmptyStr)
{
    var strNum=document.getElementById("NInput").value;
    return checkInputData("NInput", isNatNum(strNum)||strNum==""&&acceptEmptyStr);
}

function checkMInputData(acceptEmptyStr)
{
    strNum=document.getElementById("MInput").value;
    if(document.getElementById("FormulaBox").value=="6")
        return checkInputData("MInput", areNatNums(strNum)||strNum==""&&acceptEmptyStr);
    return checkInputData("MInput", isNatNum(strNum)||strNum==""&&acceptEmptyStr);
}