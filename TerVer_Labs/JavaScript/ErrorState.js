function stopSound()
{
    var audio=document.getElementById("Audio");
    if(audio.currentTime!=0)
    {
        audio.pause();
        audio.currentTime=0;
    }
}

function makeSound()
{
    var audio=document.getElementById("Audio");
    if(audio.currentTime==0)
        audio.play();
}

function resetEnabledExcept(inputIndex)
{
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    for(var i=0; i<SomeSelect.length; i++)
        SomeSelect[i].setAttribute("disabled", "");
    var SomeDiv=document.getElementsByClassName("SomeDiv");
    SomeDiv[0].innerHTML="Данные введены неверно. Проверьте корректность входных данных.";
    SomeDiv[0].style.borderColor="red";
    SomeDiv[0].style.backgroundColor="tomato";
    document.getElementsByClassName("SomeImg")[0].setAttribute("src", "Images/Monkey.png");
    var SomeInput=document.getElementsByClassName("SomeInput");
    for(var i=0; i<SomeInput.length; i++)
    {
        if(i!=inputIndex)
            SomeInput[i].setAttribute("disabled", "");
    }
    var CalculateButton=document.getElementById("CalculateButton");
    CalculateButton.setAttribute("disabled", "");
    CalculateButton.style.borderColor="brown";
    CalculateButton.style.backgroundColor="orange";
    makeSound();
    isBlocked=1;
}

function setEnabledExcept(inputIndex)
{    
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    for(var i=0; i<SomeSelect.length; i++)
        SomeSelect[i].removeAttribute("disabled");
    var SomeDiv=document.getElementsByClassName("SomeDiv");
    SomeDiv[0].style.borderColor="rgb(28, 85, 207)";
    SomeDiv[0].style.backgroundColor="rgb(188, 132, 243)";
    var SomeInput=document.getElementsByClassName("SomeInput");
    for(var i=0; i<SomeInput.length; i++)
    {
        if(i!=inputIndex)
            SomeInput[i].removeAttribute("disabled");
    }
    var CalculateButton=document.getElementById("CalculateButton");
    CalculateButton.removeAttribute("disabled");
    CalculateButton.style.borderColor="rgb(16, 139, 16)";
    CalculateButton.style.backgroundColor="lime";
    document.getElementsByClassName("SomeDiv")[0].innerHTML=getCurrentCaseValue(TextDivText);
    document.getElementsByClassName("SomeImg")[0].setAttribute("src", getCurrentCaseValue(ImgPath)[0]);
    stopSound();
    isBlocked=0;
}

function setErorrState(set, exceptInputIndex)
{
    if(set)
    {
        if(!isBlocked)
            resetEnabledExcept(exceptInputIndex)
    }
    else    
    {
        if(isBlocked)
            setEnabledExcept(exceptInputIndex);
    }
}

function isInvalid(strValue, allowedCh)
{
    var found;
    for(var j=0; j<strValue.length; j++)
    {
        found=0;
        for(var i=0; i<allowedCh.length&&!found; i++)
        {
            if(strValue[j]==allowedCh[i])
                found=1;
        }
        if(!found)
            return 1;
    }
    return 0;
}