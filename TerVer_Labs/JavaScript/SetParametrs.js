function setTextDivHeight()
{
    var MiddleCellHeight=document.getElementById("MiddleCell").offsetHeight;
    var SelectDivHeight=document.getElementById("SelectDiv").offsetHeight;
    var SomeDiv=document.getElementsByClassName("SomeDiv");
    var SomeDivHeights=0;
    var i;
    for(i=0; i<SomeDiv.length-1; i++)
        SomeDivHeights+=SomeDiv[i].offsetHeight;
    var ImgDivHeight=document.getElementById("ImgDiv").offsetHeight;
    var InputDivHeight=document.getElementById("InputDiv").offsetHeight;
    var CalculateButtonHeight=document.getElementById("CalculateButton").offsetHeight;
    var AnswerLabelHeight=document.getElementById("AnswerLabel").offsetHeight;
    var Height=MiddleCellHeight-(SelectDivHeight+SomeDivHeights+ImgDivHeight+InputDivHeight+CalculateButtonHeight+AnswerLabelHeight);
    var LastSomeDivHeight=Height/2;
    var AnswerDivHeight=Height-LastSomeDivHeight;
    if(SomeDiv[SomeDiv.length-1]!=undefined)
        SomeDiv[SomeDiv.length-1].style.height=LastSomeDivHeight+"px";
    document.getElementById("AnswerDiv").style.height=AnswerDivHeight+"px";
}

function setElementsValues(className, Attribute, valueArr)
{
    var i, j, k;
    var value;
    var element=[];
    for(i=0; i<className.length; i++)
        element[i]=document.getElementsByClassName(className[i]);
    for(i=0; i<element.length; i++) 
    { 
        for(j=0; j<element[i].length; j++)
        {
            for(k=0; k<Attribute[i].length; k++)
            {
                value=getCurrentCaseValue(valueArr[i][k]);
                value=value[j];
                if(Attribute[i][k]=="innerHTML")
                    element[i][j].innerHTML=value;
                else
                    element[i][j].setAttribute(Attribute[i][k], value);
            }
        }
    }
}

function setSelect()
{
    var index=document.getElementsByClassName("SomeSelect")[0].value;
    setSelectCount(SelectBoxCount[index]);
}

function setDiv()
{
    var value=getCurrentCaseValue(TextDivCount);
    setDivCount(value);
    setElementsValues(["SomeDiv"], [["innerHTML"]], [[TextDivText]]);
}

function setImg()
{
    var value=getCurrentCaseValue(ImgCount);
    setImgCount(value);
    setElementsValues(["SomeImg"], [["src"]], [[ImgPath]]);
}

function setInput()
{
    var value=getCurrentCaseValue(LabelCount);
    var SomeInput=document.getElementsByClassName("SomeInput");
    var oldLength=SomeInput.length;
    setLabelAndInputCount(value);
    setElementsValues(["SomeLabel"], [["innerHTML"]], [[LabelText]]);
    for(var i=oldLength; i<SomeInput.length; i++)
        SomeInput[i].oninput=OnInputValueChange;
}

function setCaseParametrs()
{
    setSelect();
    setDiv();
    setImg();
    setInput();
    document.getElementById("AnswerDiv").innerHTML="";
    setTextDivHeight();
    CalculateValue=getCurrentCaseValue(CalculatingFormulaArr);
}

function setStartParametrs()
{
    isBlocked=0;
    setSelectCount(SelectBoxCount[0]);
    setSelectOptionCount(0, getCurrentSelectOptionTextArr(OptionText, 0));
    updateSelectOptions(0);
    var minHight=document.getElementsByClassName("SomeSelect")[0].offsetHeight;
    document.getElementById("AnswerDiv").style.minHeight=minHight+"px";
    setCaseParametrs();
}