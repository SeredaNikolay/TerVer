function setAnswerDivHeight()
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
    {
        SomeDiv[SomeDiv.length-1].style.height=LastSomeDivHeight+"px";
        document.getElementById("AnswerDiv").style.height=AnswerDivHeight+"px";
    }
    else
        document.getElementById("AnswerDiv").style.height=Height+"px";
}

function setCanvasSize()
{
    var i;
    var SomeCanvas=document.getElementsByClassName("SomeCanvas");
    for(i=0; i<SomeCanvas.length; i++)
    {
        if(SomeCanvas[i].id=="canvas_0")
            canvasResize(SomeCanvas[i], "x", "n");
        else if(SomeCanvas[i].id=="canvas_1")
            canvasResize(SomeCanvas[i], "x", "w");
        else if(SomeCanvas[i].id=="canvas_1")
            canvasResize(SomeCanvas[i], "x", "y");
    }
}

function setSomeTextDivHeight()
{
    var i;
    var Select=document.getElementsByClassName("SomeSelect");
    var SomeDiv=document.getElementsByClassName("SomeDiv");
    for(i=0; i<SomeDiv.length&&i<2; i++)
    {
        var c=SomeDiv[i].style.height;
        if(Select[0].value=="3"&&Select[1].value=="0"&&Select[2].value=="2"&&SomeDiv[i].style.minHeight!="300px")//При появлении 4 лабораторной работы заменить 3 на 4
            SomeDiv[i].style.height="300px";
        else if(!(Select[0].value=="3"&&Select[1].value=="0"&&Select[2].value=="2")&&SomeDiv[i].style.minHeight!="auto")
            SomeDiv[i].style.height="auto";
    }
}

function setSomeSize()
{
    setAnswerDivHeight();
    setSomeTextDivHeight();
    setCanvasSize();
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

function setInputAndLabelFileDisplay()
{
    var InputFile=document.getElementById("InputFile");
    var LabelFile=document.getElementById("LabelFile");
    var Select=document.getElementsByClassName("SomeSelect");
    if(Select[0].value=="3"&&Select[1].value=="0"&&Select[2].value=="0"&&LabelFile.style.display=="none")//Если появится 4 лабораторная, то заменить на 4
    {
        LabelFile.style.display="block";
        InputFile.style.display="block";
    }
    else if(!(Select[0].value=="3"&&Select[1].value=="0"&&Select[2].value=="0")&&LabelFile.style.display!="none")//Если появится 4 лабораторная, то заменить на 4
    {
        LabelFile.style.display="none";
        InputFile.style.display="none";
    }
}

function setSelect()
{
    var index=document.getElementsByClassName("SomeSelect")[0].value;
    setSelectCount(SelectBoxCount[index]);
    setInputAndLabelFileDisplay();
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
    setAnswerDivHeight();
    CalculateValue=getCurrentCaseValue(CalculatingFormulaArr);
}

function setStartParametrs()
{
    isBlocked=0;
    FracPrecision=9;
    setSelectCount(SelectBoxCount[0]);
    setSelectOptionCount(0, getCurrentSelectOptionTextArr(OptionText, 0));
    updateSelectOptions(0);
    var minHight=document.getElementsByClassName("SomeSelect")[0].offsetHeight;
    document.getElementById("AnswerDiv").style.minHeight=minHight+"px";
    setCaseParametrs();
}