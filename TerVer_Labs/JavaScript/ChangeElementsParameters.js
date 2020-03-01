//---------------Инициализация и изменение значений свойств элементов---------------//
function setStartValues()
{
    currentRecord=1;
    isBlocked=0;
    document.getElementById("FormulaBox").options[currentRecord-1].setAttribute("selected", "");
    document.getElementById("FormulaImg").setAttribute("src", ImagePathArr[currentRecord]);
    document.getElementById("MInput").value=1;
    document.getElementById("NInput").value=1;
    document.getElementById("DefinitionDiv").innerHTML=DefenitionArr[currentRecord];
}

function setTxtDivHeight()
{
    var MiddleCellHeight=document.getElementById("MiddleCell").offsetHeight;
    var ComboBoxesHeight=0;
    for(var i=0; i<document.getElementsByTagName("select").length; i++)
        ComboBoxesHeight+=document.getElementsByTagName("select")[i].offsetHeight;
    var FormulaImgHeight=document.getElementById("FormulaImg").offsetHeight;
    var LabelsHeight=0;
    for(var i=0; i<document.getElementsByTagName("label").length; i++)
        LabelsHeight+=document.getElementsByTagName("label")[i].offsetHeight;
    var InputsHeight=0;
    for(var i=0; i<document.getElementsByTagName("input").length; i++)
        InputsHeight+=document.getElementsByTagName("input")[i].offsetHeight;
    var CalculateButtonHeight=document.getElementById("CalculateButton").offsetHeight;
    var Height=MiddleCellHeight-(ComboBoxesHeight+FormulaImgHeight+LabelsHeight+InputsHeight+CalculateButtonHeight);
    var DefinitionDivHeight=Height/2;
    var AnswerDivHeight=Height-DefinitionDivHeight;
    document.getElementById("DefinitionDiv").style.height=DefinitionDivHeight+"px";
    document.getElementById("AnswerDiv").style.height=AnswerDivHeight+"px";
}

function setParameters()
{
    setStartValues();
    MinHeight=document.getElementsByTagName("label")[0].offsetHeight;
    document.getElementById("DefinitionDiv").style.minHeight=(MinHeight*2)+"px";
    document.getElementById("AnswerDiv").style.minHeight=(MinHeight*2)+"px";
}
//Здесь также настраивается доступность
function changeFormulaAndDefinition()
{
    var currentRecord=document.getElementById("FormulaBox").value;
    var elemDisabled=document.getElementById("MInput").hasAttribute("disabled");
    var LBL=document.getElementById("MLabel");
    var AnswerDiv=document.getElementById("AnswerDiv");
    if(AnswerDiv.innerHTML!="")
        AnswerDiv.innerHTML="";
    document.getElementById("FormulaImg").setAttribute("src", ImagePathArr[currentRecord]);
    document.getElementById("DefinitionDiv").innerHTML=DefenitionArr[currentRecord];
    if(currentRecord=="5"&&!elemDisabled)
        document.getElementById("MInput").setAttribute("disabled", "");
    else if(currentRecord!="5"&&elemDisabled)
        document.getElementById("MInput").removeAttribute("disabled");
    if(currentRecord=="6"&&LBL.innerHTML=="Введите натуральное число m")
    {
        LBL.innerHTML="Введите натуральные числа n<sub>i</sub> через пробел";
    }
    else if(currentRecord!="6"&&LBL.innerHTML!="Введите натуральное число m")
    {
        LBL.innerHTML="Введите натуральное число m";
    }
}