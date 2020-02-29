//----------------------------------Данные------------------------------//
FormBoxFullText=[   "Ошибка выбора", 
                    "Посчитать количество сочетаний без повторений", 
                    "Посчитать количество сочетаний с повторениями",
                    "Посчитать количество размещений без повторений", 
                    "Посчитать количество размещений с повторениями",
                    "Посчитать количество перестановок без повторений", 
                    "Посчитать количество перестановок c повторениями"
                    ];
DefenitionArr=[ "Данные введены неверно",
                "Сочетание без повторений из n элементов по m – неупорядоченная (n,m)-выборка без повторений.",
                "Сочетание с повторениями из n элементов по m – неупорядоченная (n,m)-выборка с повторениями.",
                "Размещение без повторений из n элементов по m – упорядоченная (n,m)-выборка без повторений.",
                "Размещение с повторениями из n элементов по m – упорядоченная (n,m)-выборка с повторениями.",
                "Перестановка без повторений из n элементов – упорядоченная (n,n)-выборка без повторений.",
                "Перестановка с повторениями – упорядоченная (n,m)-выборка с повторениями, в которой элемент a<sub>1</sub> повторяется m<sub>1</sub> раз, a<sub>2</sub> повторяется m<sub>2</sub> раза так далее, до последнего элемента a<sub>r</sub>, который повторяется m<sub>r</sub> раз. При этом m<sub>1</sub>+m<sub>2</sub>+…+m<sub>r</sub>=m."];
ImagePathArr=[  "Images/Monkey.png", 
                "Images/NotRepCombinations.png",
                "Images/RepCombinations.png",
                "Images/NotRepPlacement.png",     
                "Images/RepPlacements.png", 
                "Images/NotRepPermutations.png",
                "Images/RepPermutations.png"];
var isBlocked;
//------------------------------------Вычисления-----------------------------//
function errorPrint(errorCode)
{
    errorMessage={};
    errorMessage[0]="Неверный код ошибки";
    errorMessage[1]="Первое число произведения должно быть положительным";
    errorMessage[2]="Последнее число произведения должно быть не меньше первого";
    errorMessage[3]="Незначащие нули недопустимы";
    errorMessage[4]="Число введено неправильно";
    errorMessage[5]="Ошибка ввода положительного числа";
    errorMessage[6]="m натуральное число";
    errorMessage[7]="n натуральное число";
    errorMessage[8]="m не может быть больше n";
    errorMessage[9]="Основание степени должно быть положительным числом";
    errorMessage[10]="Показатель степени должен быть положительным числом";
    errorMessage[11]="Неизвесный тип выражения";
    errorMessage[21]="Положительное число не может начинаться с нуля\/быть им";
    errorMessage[22]="Положительное число введено неверно";
    errorMessage[23]="Как минимум одно из чисел введено неправильно или лишний пробел в конце";
    errorMessage[24]="Сумма ni элементов должна равняться n";
    errorMessage[25]="Должно присутствовать хотя бы одно ni";
    alert(errorMessage[errorCode]);
}

function product(firstValue, lastValue)
{
    var value=1n;
    if(firstValue<0)
    {
        errorPrint(1);
        return -1;
    }
    if(firstValue>lastValue)
    {
        errorPrint(2);
        return -1;
    }
    if(!lastValue)
        return BigInt(1);
    for(i=BigInt(firstValue); i<=BigInt(lastValue); i++)
        value*=i;
    return value;
}

function calc(m, n, combination=1)
{    
    var min=m;
    var max=n-m;
    var numerator=BigInt(1);
    if(m<1)
    {
        errorPrint(6);
        return -1;
    }
    if(n<1)
    {
        errorPrint(7);
        return -1;
    }
    if(m>n)
    {
        errorPrint(8);
        return -1;
    }
    if(combination)
    {
        if(m<m-n)
        {
            max=m;
            min=n-m;
        }
    }
    else
    {
        min=1;
    }
    if(max+1<=n)
       numerator=product(max+1, n);
    return numerator/product(1, min);
}

function bigNatPow(n, m)
{
    var value=1n;
    var N=BigInt(n);
   if(m<1)
    {
        errorPrint(9);
        return -1;
    }
    if(n<1)
    {
        errorPrint(10);
        return -1;
    }
    for(i=0; i<m; i++)
        value*=N;
    return value;
}

function permWithRep(ni, n)
{
    var numerator=1n;
    if(n<1)
    {
        errorPrint(7);
        return -1;
    }
    amount=0n;
    for(i=0; i<ni.length; i++)
    {
        if(ni[i]>0)
            amount+=BigInt(ni[i]);
        else
        {
            errorPrint(23);
            return -1;
        }
    }
    if(n!=amount)
    {
        errorPrint(24);
        return -1
    }
    var IndOfmax=0;
    for(var i=1; i<ni.length; i++)
    {
        if(ni[i]>ni[IndOfmax])
            IndOfmax=i;
    }
    if(ni[IndOfmax]+1<=n)
        numerator=product(ni[IndOfmax]+1, n);
    var denominator=1n;
    for(var i=0; i<ni.length; i++)
        if(IndOfmax!=i)
            denominator*=product(1n, ni[i]);
    return numerator/denominator;

}

function calculate(type, m, n)
{//P36 в методичке ошибка
    var N=Number(n);
    var M=Number(m);
    switch(type)
    {
        case "1":
            return calc(M, N);
        case "2":
            return calc(M, N+M-1);
        case "3":
            return calc(M, N, 0);
        case "4":
            return bigNatPow(N, M);
        case "5":
            return product(1, N);
        case "6":
            var ni=m.split(' ');
            var NI=[];
            for(var i=0; i<ni.length; i++)
                NI[i]=Number(ni[i])
            return permWithRep(NI, N);
        default:
            errorPrint(11);
            return -1;
    };
}
//---------------Проверка корректности входных данных---------------//
function isNatNum(strValue)
{
    if(strValue==""||strValue[0]=='0')
        return 0;
    for(i=0; i<strValue.length; i++)
    {
        if(!(strValue[i]>='0'&&strValue[i]<='9'))
            return 0;
    }
    return 1;
}

function areNatNums(strValue)
{
    if(strValue=="")
        return 0;
    var strNums=strValue.split(' ');
    var length=strNums.length;
    if(strNums[strNums.length-1]=="")
        length=strNums.length-1;
    for(var i=0; i<length; i++)
    {
        if(!isNatNum(strNums[i]))
            return 0;
    }
    return 1;
}
//---------------Настройка доступности при ошибочных входных данных---------------//
function setEnabledExept(id)
{    
    var someId=["FormulaBox", "CalculateButton", "MInput", "NInput"];
    var audio=document.getElementById("Audio");
    var currentRecord=document.getElementById("FormulaBox").value;
    document.getElementById("FormulaImg").setAttribute("src", ImagePathArr[currentRecord]);
    document.getElementById("DefinitionDiv").innerHTML=DefenitionArr[currentRecord];
    document.getElementById("CalculateButton").style.backgroundColor="lime";
    document.getElementById("DefinitionDiv").style.borderColor="rgb(28, 85, 207)";
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
    var element=document.getElementById(id);
    if(setCondition)
    {
        if(isBlocked)
            setEnabledExept(id);
    }
    else
    {
        if(!isBlocked)
            resetEnabledExept(id);
    }
}

function checkNInputData()
{
    var strNum=document.getElementById("NInput").value;
    checkInputData("NInput", isNatNum(strNum));
}

function checkMInputData()
{
    strNum=document.getElementById("MInput").value;
    if(document.getElementById("FormulaBox").value=="6")
        checkInputData("MInput", areNatNums(strNum));
    else
        checkInputData("MInput", isNatNum(strNum));
}
//---------------Инициализация и изменение значений---------------//
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
    var ComboBoxHeight=document.getElementById("FormulaBox").offsetHeight;
    var FormulaImgHeight=document.getElementById("FormulaImg").offsetHeight;
    var LabelsHeight=0;
    for(var i=0; i<document.getElementsByTagName("label").length; i++)
        LabelsHeight+=document.getElementsByTagName("label")[i].offsetHeight;
    var InputsHeight=0;
    for(var i=0; i<document.getElementsByTagName("input").length; i++)
        InputsHeight+=document.getElementsByTagName("input")[i].offsetHeight;
    var CalculateButtonHeight=document.getElementById("CalculateButton").offsetHeight;
    var Height=MiddleCellHeight-(ComboBoxHeight+FormulaImgHeight+LabelsHeight+InputsHeight+CalculateButtonHeight);
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

function changeFormAndDef()
{
    var currentRecord=document.getElementById("FormulaBox").value;
    var elemDisabled=document.getElementById("MInput").hasAttribute("disabled");
    var LBL=document.getElementById("MLabel");
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
//---------------end---------------//

function OnCalculateBtnClick()
{
    var type=document.getElementById("FormulaBox").value;
    var n=document.getElementById("NInput").value;
    var m=document.getElementById("MInput").value;
    document.getElementById("AnswerDiv").innerHTML=calculate(type, m, n);
}

function zadacha1()
{
    var vibor=prompt("Выберете задачу");
    switch(vibor)
    {
        case "1":  
                var k=prompt("Введите число k");
                var l=prompt("Введите число l");
                var r=prompt("Введите число r");
                var s=prompt("Введите число s");
                var A=calculate("1", s, l);
                var B=calculate("1", r-s, k-l);
                var C=Number(calculate("1", r, k));
                var AB=Number(A*B);
                answer=AB/C;
                if(!(r>s&&k>l))
                {
                    alert("Необходимо: r больше s и k больше l");
                }
                else
                {
                    alert(answer.toFixed(10));
                }
                break;
        case "2":
                var n=prompt("Введите n");
                var m=prompt("Введите m");
                var C=Number(calculate("1", m, n));
                var answer=1/C;
                if(!(n>m&&n>0&&m>0))
                {
                    alert("Необходимо: m и n натураьные числа, m больше n");
                }
                else
                {
                    alert(answer.toFixed(10));
                }
                break;
        case "3":
            var nCount=prompt("Введите количксиво членов");
            var n=[];
            var k=[];
            var B;
            var K=prompt("Введит К");
            var N=prompt("Введите N");
            var A=1n;
            B=Number(calculate("1", K, N));
            for(var i=0; i<nCount; i++)
            {
                k[i]=Number(prompt("Введите k для "+(i+1)+" члена"));
                n[i]=Number(prompt("Введите n для "+(i+1)+" члена"));
                A*=calculate("1", k[i], n[i]);
            }
            A=Number(A);
            var amountN=0;
            var amountK=0;
            for(var i=0; i<nCount; i++)
            {
                amountN+=n[i];
                amountK+=k[i];
            }
            if(amountN!=N||amountK!=K)
            {
                alert("Ошибка")
            }
            else
            {
                var answer=A/B;
                alert(answer.toFixed(10));
            }    
            break;
    }
    
}