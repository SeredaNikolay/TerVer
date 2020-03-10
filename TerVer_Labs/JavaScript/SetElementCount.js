function setElementCount(ElementDivId, className, tag, count)
{
    var i, j;
    var ElementDiv=document.getElementById(ElementDivId);
    var SomeElement=[];
    for(i=0; i<className.length; i++)   
        SomeElement[i]=document.getElementsByClassName(className[i]);
    if(SomeElement[0].length>count)
    {
        for(i=SomeElement[0].length; i>count; i--)
        {
            for(j=0; j<SomeElement.length; j++)
                ElementDiv.removeChild(SomeElement[j][i-1]);
        }
    }
    else if(SomeElement[0].length<count)
    {
        var element;
        for(i=SomeElement[0].length; i<count; i++)
        {
            for(j=0; j<SomeElement.length; j++)
            {
                element=document.createElement(tag[j]);
                element.className=className[j];
                ElementDiv.appendChild(element);
            }
        }
    }  
}

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
    updateSelectOptions(index);
    setCaseParametrs();
}

function setSelectCount(count)
{
    var oldLength=document.getElementsByClassName("SomeSelect").length;
    setElementCount("SelectDiv", ["SomeSelect"], ["select"], count);
    var SomeSelect=document.getElementsByClassName("SomeSelect");
    for(var i=oldLength; i<SomeSelect.length; i++)
    {
        SomeSelect[i].id="Select_"+i;
        SomeSelect[i].onchange=OnSelectValueChange;
    }
    if(SomeSelect[0]!=undefined)
        SomeSelect[0].focus();
}

function setSelectOptionCount(index)
{
    var ComboBox=document.getElementById("Select_"+index);
    var ComboBoxOption=ComboBox.options;
    var textArr=getCurrentSelectOptionTextArr(OptionText, index);
    var oldLength=ComboBoxOption.length;
    var count=textArr.length;
    setElementCount("Select_"+index, ["SomeOption_"+index], ["option"], count);
    for(var i=0; i<ComboBoxOption.length; i++)
        ComboBoxOption[i].text=textArr[i];
    for(var i=oldLength; i<count; i++)
        ComboBoxOption[i].setAttribute("value", String(i));
    if(ComboBox.selectedIndex!=-1)
        ComboBox.selectedIndex=0;
}

function setDivCount(count)
{
    var SomeDiv=document.getElementsByClassName("SomeDiv");
    var oldLength=SomeDiv.length;
    setElementCount("TextDiv", ["SomeDiv"], ["div"], count);
    var minHight=document.getElementsByClassName("SomeSelect")[0].offsetHeight;
    for(var i=oldLength; i<SomeDiv.length; i++)
        SomeDiv[i].style.minHeight=minHight+"px";
}

function setImgCount(count)
{
    var SomeImg=document.getElementsByClassName("SomeImg");
    var oldLength=SomeImg.length;
    setElementCount("ImgDiv", ["SomeImg"], ["img"], count);
    for(var i=oldLength; i<SomeImg.length; i++)
        SomeImg[i].onload=setTextDivHeight;
}

function setLabelAndInputCount(count)
{
    var SomeLabel=document.getElementsByClassName("SomeLabel");
    var SomeInput=document.getElementsByClassName("SomeInput");
    var i;
    var oldLength=SomeLabel.length;
    var fixedHeight=document.getElementsByClassName("SomeSelect")[0].offsetHeight+"px";
    setElementCount("InputDiv", ["SomeLabel", "SomeInput"], ["label", "input"], count);  
    for(i=oldLength; i<SomeLabel.length; i++)
    {
        SomeLabel[i].style.minHeight=fixedHeight;
        SomeLabel[i].style.maxHeight=fixedHeight;
        SomeInput[i].style.minHeight=fixedHeight;
        SomeInput[i].style.maxHeight=fixedHeight;
    }
    for(i=0; i<SomeInput.length; i++)
        SomeInput[i].value="";
}