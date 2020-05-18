//------------------------------Лабораторная 1:ВЫчислить по формуле------------------------------//
function product(firstValue, lastValue)
{
    var value=BigInt(1);
    if(firstValue<0)
    {
        errorPrint(0);
        return -1;
    }
    if(firstValue>lastValue)
    {
        errorPrint(1);
        return -1;
    }
    if(!lastValue)
        return BigInt(1);
    var val;
    if(!firstValue)
        val=BigInt(1);
    else   
        val=BigInt(firstValue)
    for(i=val; i<=BigInt(lastValue); i++)
        value*=i;
    return value;
}

function bigNotNegIntPow(n, m)
{
    var value=BigInt(1);
    var N=BigInt(n);
    if(m<0)
    {
        errorPrint(2);
        return -1;
    }
    if(n<1)
    {
        errorPrint(3);
        return -1;
    }
    if(!m)
        return BigInt(1);
    for(i=0; i<m; i++)
        value*=N;
    return value;
}

function calc(m, n, combination)
{    
    var min=m;
    var max=n-m;
    var numerator=BigInt(1);
    if(m<0)
    {
        errorPrint(4);
        return -1;
    }
    if(n<0)
    {
        errorPrint(5);
        return -1;
    }
    if(m>n)
    {
        errorPrint(6);
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
    return numerator/product(0, min);
}

function permWithRep(ni, n)
{
    var numerator=BigInt(1);
    if(n<0)
    {
        errorPrint(5);
        return -1;
    }
    var amount=0;
    for(i=0; i<ni.length; i++)
    {
        if(ni[i]>-1)
            amount+=ni[i];
        else
        {
            errorPrint(7);
            return -1;
        }
    }
    if(n!=amount)
    {
        errorPrint(8);
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
    var denominator=BigInt(1);
    for(var i=0; i<ni.length; i++)
        if(IndOfmax!=i)
            denominator*=product(0, ni[i]);
    return numerator/denominator;
}
function amount(arr)
{
    var sum=0;
    for(var i=0; i<arr.length; i++)
        sum+=arr[i];
    return sum;
}

//--------То, что отправится в тензор функций--------//
function NotRepCombinations(Value)
{
    var N=Value[0][0];
    var M=Value[1][0];
    return calc(M, N, 1);
}

function RepCombinations(Value)
{
    var N=Value[0][0];
    var M=Value[1][0];
    if(N<1)
    {
        errorPrint(19);
        return -1;
    }
    return calc(M, N+M-1, 1);
}

function NotRepPlacements(Value)
{
    var N=Value[0][0];
    var M=Value[1][0];
    return calc(M, N, 0);
}

function RepPlacements(Value)
{
    var N=Value[0][0];
    var M=Value[1][0];
    return bigNotNegIntPow(N, M);
}

function NotRepPermutations(Value)
{
    var N=Value[0][0];
    return product(0, N);
}

function RepPermutations(Value)
{
    var N=Value[0][0];
    var NI=Value[1];
    return permWithRep(NI, N);
}
//--------------------------Задачи к лабораторной №1----------------------//
function L1_Task_1(Value)
{
    var k=Value[0][0];
    var l=Value[1][0];
    var r=Value[2][0];
    var s=Value[3][0];
    if(r-s<0)
    {
        errorPrint(9);
        return -1;
    }
    if(k-l<0)
    {
        errorPrint(10);
        return -1;
    }
    if(s>l)
    {
        errorPrint(11);
        return -1;
    }
    if(r-s>k-l)
    {
        errorPrint(12);
        return -1;
    }
    if(r>k)
    {
        errorPrint(13);
        return -1;
    }
    var A=NotRepCombinations([[l], [s]]);
    var B=NotRepCombinations([[k-l], [r-s]]);
    var C=NotRepCombinations([[k],[r]]);
    var answer=Number(A*B)/Number(C);
    return answer.toFixed(FracPrecision);
}

function L1_Task_2(Value)
{
    var n=Value[0][0];
    var m=Value[1][0];
    if(m>n)
    {
        errorPrint(6);
        return -1;
    }
    var C=NotRepCombinations([[n],[m]]);
    var answer=1/Number(C);
    return answer.toFixed(FracPrecision);
}

function L1_Task_3(Value)
{
    var k=Value[0][0];
    var ki=Value[1];
    var n=Value[2][0];
    var ni=Value[3];
    if(k!=amount(ki))
    {
        errorPrint(14);
        return -1;
    }
    if(n!=amount(ni))
    {
        errorPrint(15);
        return -1;
    }
    if(n>k)
    {
        errorPrint(16);
        return -1;
    }
    if(ki.length!=ni.length)
    {
        errorPrint(17);
        return -1;
    }
    for(var i=0; i<ki.length; i++)
    {
        if(ni[i]>k[i])
        {
            errorPrint(18);
            return -1;
        }
    }
    var prod=BigInt(1);
    for(var i=0; i<ki.length; i++)
        prod*=NotRepCombinations([[ki[i]],[ni[i]]]);
    var denominator=NotRepCombinations([[k],[n]]);
    var answer=Number(prod)/Number(denominator);
    return answer.toFixed(FracPrecision);
}
//--------------------------Задачи к лабораторной №2----------------------//
function L2_Task_1(Value)
{
    var i;
    var Pi=[];
    for(i=0; i<Value.length; i++)
    {
        if(Value[i][0]>1)
        {
            errorPrint(20);
            return -1;
        }
        else
            Pi[i]=Value[i][0];
    }
    var P=Pi[0]*(1-(1-Pi[1])*(1-Pi[2])*(1-Pi[3]))*Pi[4];
    return P.toFixed(FracPrecision);
}

function L2_Task_2(Value)
{
    var i;
    var Pi=[];
    for(i=0; i<Value.length; i++)
    {
        if(Value[i][0]>1)
        {
            errorPrint(20);
            return -1;
        }
        else
            Pi[i]=Value[i][0];
    }
    var P=(1-Pi[0]*Pi[1])*Pi[2]*(1-Pi[3]*Pi[4]);
    return P.toFixed(FracPrecision);
}

function getPi_L2_Task_3(Value)
{
    var i;
    var N=[];
    var Pi=[];
    for(i=0; i<Value.length; i++)
        N[i]=Value[i][0];
    if(N[0]>N[2]||N[1]>N[2])
    {
        errorPrint(21);
        return -1;
    }
    Pi[0]=(Number(product(N[0]-2, N[0]))/Number(product(N[2]-2, N[2]))).toFixed(FracPrecision);
    Pi[1]=(Number(product(N[1]-2, N[1]))/Number(product(N[2]-2, N[2]))).toFixed(FracPrecision);
    return Pi;
}

function L2_Task_3_A(Value)
{
    var Pi=getPi_L2_Task_3(Value);
    var PA=[Pi[0], Pi[1], (Pi[0]*Pi[1]).toFixed(FracPrecision)];
    var answer="P(A<sub>1</sub>)="+PA[0]+"<br>P(A<sub>2</sub>)="+PA[1]+"<br>P(B)="+PA[2];
    return answer;
}

function L2_Task_3_B(Value)
{
    var Pi=getPi_L2_Task_3(Value);
    var PA=[Pi[0], (1-Pi[1]).toFixed(FracPrecision)];
    PA[2]=(PA[0]*PA[1]).toFixed(FracPrecision);
    var answer="P(A<sub>1</sub>)="+PA[0]+"<br>P(<u>A</u><sub>2</sub>)="+PA[1]+"<br>P(B)="+PA[2];
    return answer;
}

function L2_Task_3_C(Value)
{
    var Pi=getPi_L2_Task_3(Value);
    var PA=[(Pi[0]*(1-Pi[1])).toFixed(FracPrecision), ((1-Pi[0])*Pi[1]).toFixed(FracPrecision)];
    PA[2]=(Number(PA[0])+Number(PA[1])).toFixed(FracPrecision);
    var answer="P(A<sub>1</sub>)="+Pi[0]+"<br>P(A<sub>2</sub>)="+Pi[1]+"<br>P(<u>A</u><sub>1</sub>)="+(1-Pi[0]).toFixed(FracPrecision)+"<br>P(<u>A</u><sub>2</sub>)="+(1-Pi[1]).toFixed(FracPrecision)+"<br>P(B)="+PA[2];
    return answer;
}

function L2_Task_3_D(Value)
{
    var Pi=getPi_L2_Task_3(Value);
    var PA=[(1-Pi[0]).toFixed(FracPrecision), (1-Pi[1]).toFixed(FracPrecision)];
    PA[2]=(1-PA[0]*PA[1]).toFixed(FracPrecision);  
    var answer="P(<u>A</u><sub>1</sub>)="+PA[0]+"<br>P(<u>A</u><sub>2</sub>)="+PA[1]+"<br>P(B)="+PA[2];
    return answer;
}

function TotalProbability(Value)
{
    var amount=0, totProb=0, i;
    if(Value[0].length!=Value[1].length)
    {
        errorPrint(22);
        return -1;
    }
    for(i=0; i<Value[0].length; i++)
    {
        if(Value[0][i]>1||Value[1][i]>1)
        {
            errorPrint(24);
            return -1;
        }
    }
    for(i=0; i<Value[0].length; i++)
        amount+=Value[0][i];
    if(amount.toFixed(FracPrecision)!=1)
    {
        errorPrint(23);
        return -1;
    }
    for(i=0; i<Value[0].length; i++)
        totProb+=Value[0][i]*Value[1][i];
    return totProb.toFixed(FracPrecision);
}

function ConditionalProbability(Value)
{
    var answer="", i, j, totProb=Number(TotalProbability(Value));
    var PHi=Value[0], PHiA=Value[1], number=Value[2];
    if(totProb==-1)
        return -1;
    if(!totProb)
    {
        errorPrint(25);
        return -1;
    }
    for(i=0; i<number.length; i++)
    {
        if(number[i]>PHi.length)
        {
            errorPrint(26);
            return -1;
        }
    }
    for(i=0; i<number.length; i++)
    {
        j=number[i]-1;
        answer+="P<sub>A</sub>(H<sub>"+(j+1)+"</sub>)="+((PHi[j]*PHiA[j])/totProb).toFixed(FracPrecision)+"<br>";
    }
    return answer;
}
//------------------------------Лабораторная №3------------------------------//
var pi=3.131592653589793;

function BernoulliFormula(m, n, p)
{
    var C_m_n=Number(calc(m, n, 1)).toFixed(FracPrecision);
    if(C_m_n==-1)
        return -1;
    return C_m_n*p**m*(1-p)**(n-m);
}

function BernoulliAmount(p, n, firstLessMinInclusionLimitVal, firstGreaterMaxInclusionLimitVal)
{
    var i, C_m_n, amount=0;
    for(i=firstLessMinInclusionLimitVal+1; i<firstGreaterMaxInclusionLimitVal; i++)
    {
        C_m_n=BernoulliFormula(i, n, p);
        if(C_m_n.toFixed(FracPrecision)==-1)
            return -1;
        amount+=C_m_n;
    }
    return amount;
}

function PolinomialFormula(ni, pi,  n)
{
    var pInPow=1, i, P=Number(permWithRep(ni, n)).toFixed(FracPrecision);
    if(P==-1)
        return -1;
    for(i=0; i<ni.length; i++)
        pInPow*=pi[i]**ni[i];
    return P*pInPow;
}

function Local_theorem_of_de_Moivre_Laplace(p, n, m)
{
    var x0=(m-n*p)/(Math.sqrt(n*p*(1-p)));
    var fi_x=Math.exp(-(x0**2)/2)/(Math.sqrt(2*pi));
    var P_n_m=fi_x/Math.sqrt(n*p*(1-p));
    return P_n_m;
}

function L3_Task_1_Pn_k_eq_m(Value)
{
    var C_m_n;
    var p=Value[0][0], n=Value[1][0], m=Value[2][0];
    if(p<0||p>1)
    {
        errorPrint(20);
        return -1;
    }
    if(m>n)
    {
        errorPrint(6);
        return -1;
    }
    C_m_n=BernoulliFormula(m, n, p);
    if(C_m_n.toFixed(FracPrecision)==-1)
        return -1;
    return C_m_n.toFixed(FracPrecision);
}

function L3_Task_1_Pn_k_less_m(Value)
{
    var pResult;
    var p=Value[0][0], n=Value[1][0], m=Value[2][0];
    if(p<0||p>1)
    {
        errorPrint(20);
        return -1;
    }
    if(m>n)
    {
        errorPrint(6);
        return -1;
    }
    pResult=BernoulliAmount(p, n, -1, m);
    if(pResult==-1)
        return -1;
    return pResult.toFixed(FracPrecision);
}

function L3_Task_1_Pn_k_gr_or_eq_m(Value)
{
    var pResult;
    var p=Value[0][0], n=Value[1][0], m=Value[2][0];
    if(p<0||p>1)
    {
        errorPrint(20);
        return -1;
    }
    if(m>n)
    {
        errorPrint(6);
        return -1;
    }
    pResult=BernoulliAmount(p, n, m-1, n+1);
    if(pResult.toFixed(FracPrecision)==-1)
        return -1;
    return pResult.toFixed(FracPrecision);
}

function L3_Task_1_Pn_m1_less_or_eq_k_less_or_eq_m2(Value)
{
    var pResult;
    var p=Value[0][0], n=Value[1][0], m1=Value[2][0], m2=Value[3][0];
    if(p<0||p>1)
    {
        errorPrint(20);
        return -1;
    }
    if(m2>n)
    {
        errorPrint(27);
        return -1;
    }
    if(m1>m2)
    {
        errorPrint(28);
        return -1;
    }
    pResult=BernoulliAmount(p, n, m1-1, m2+1);
    if(pResult.toFixed(FracPrecision)==-1)
        return -1;
    return pResult.toFixed(FracPrecision)
}

function L3_Task_1_PolinomialFormula(Value)
{
    var i, n=Value[0][0], ni=Value[1], pi=Value[2], pResult;
    if(pi.length!=ni.length)
    {
        errorPrint(29);
        return -1;
    }
    for(i=0; i<pi.length; i++)
    {
        if(pi[i]>1)
        {
            errorPrint(20);
            return -1;
        }
    }
    pResult=PolinomialFormula(ni, pi, n).toFixed(FracPrecision);
    return pResult;
}

function L3_Task_2_Local_theorem_of_de_Moivre_Laplace(Value)
{
    var p=Value[0][0], n=Value[1][0], m=Value[2][0];
    if(p<0||p>1)
    {
        errorPrint(20);
        return -1;
    }
    if(m>n)
    {
        errorPrint(6);
        return -1;
    }
    return Local_theorem_of_de_Moivre_Laplace(p, n, m).toFixed(FracPrecision);
}
//-----------------------------Лабораторная №5----------------------------------//
/*
function getStatisticalSeriesOfFrequencies(dataFromFile, statisticalSeries)
{
    var strArr=dataFromFile.split(RegExp(" |\\r\\n"));//Разделители - пробел или перевод на новую строку
    var i, j, alreadyPresented;
    if(convertStrToNum(strArr)==-1)
        return -1;
    for(i=0; i<strArr.length; i++)
    {
        alreadyPresented=0;
        for(j=0; !alreadyPresented&&j<statisticalSeries.length; j++)
        {
            if(statisticalSeries[j][0]==strArr[i])
            {
                statisticalSeries[j][1]++;
                alreadyPresented=1;
            }
        }
        if(!alreadyPresented)
            statisticalSeries[statisticalSeries.length]=[strArr[i], 1];
    }
    return 1;
}

function getVariationalSeries(statisticalSeriesOfFrequencies)
{
    var i, j, totCount=0, varSer=[];
    var SSOfFr=statisticalSeriesOfFrequencies;
    for(i=0; i<SSOfFr.length; i++)
    {
        for(j=0; j<SSOfFr[i][1]; j++, totCount++)
            varSer[totCount]=SSOfFr[i][0];
    }
    varSer.sort((comp_1, comp_2)=>comp_1-comp_2);
    return varSer.join(' ');
}

function setDataAndFreeReader(reader)
{
    setDataFromFile(reader);
    delete reader;
    document.getElementById("InputFile").value="";
}
//getStatisticalSeriesOfFrequencies(DataFromFile, statisticalSeries)==1
//document.getElementById("AnswerDiv").innerHTML="Вариационный ряд:<br>"+getVariationalSeries(statisticalSeries);
*/
function DataFromFileAreCorrect(strArr)
{
    var i;
    for(i=0; i<strArr.length; i++)
    {
        if(!(isNumber(strArr[i], 0)&&strArr[i].length))
        {
            errorPrint(31);
            return 0;
        }
    }
    return 1;   
}

function convertStrArrToNumArr(strArr)
{
    var i;
    for(i=0; i<strArr.length; i++)
        strArr[i]=Number(strArr[i]);
}

function getVariationalSeries()
{
    VariatioalSeries=DataFromFile.slice();
    VariatioalSeries.sort((comp_1, comp_2)=>comp_1-comp_2);
}

function getSeriesOfFrequencies()
{
    var i, j, alreadyPresented;
    for(i=0; i<VariatioalSeries.length; i++)
    {
        alreadyPresented=0;
        for(j=0; !alreadyPresented&&j<SeriesOfFrequencies.length; j++)
        {
            if(SeriesOfFrequencies[j][0]==VariatioalSeries[i])
            {
                SeriesOfFrequencies[j][1]++;
                alreadyPresented=1;
            }
        }
        if(!alreadyPresented)
            SeriesOfFrequencies[SeriesOfFrequencies.length]=[VariatioalSeries[i], 1];
    }   
}

function getSeriesOfRelativeFrequencies()
{
    var i, amountFraq=0;
    for(i=0; i<SeriesOfFrequencies.length; i++)
        amountFraq+=SeriesOfFrequencies[i][1];
    for(i=0; i<SeriesOfFrequencies.length; i++)
        SeriesOfRelativeFrequencies[i]=[SeriesOfFrequencies[i][0], SeriesOfFrequencies[i][1]/amountFraq];
}

function saveAndSetDataFromFile(reader)
{
    if(!reader.error)
    {
        DataFromFile=reader.result.split(RegExp(" |\\r\\n"));
        if(DataFromFileAreCorrect(DataFromFile))
        {
            convertStrArrToNumArr(DataFromFile);
            document.getElementById("AnswerDiv").innerHTML="Данные:<br>"+DataFromFile.join(' ');
            getVariationalSeries();
            getSeriesOfFrequencies();
            getSeriesOfRelativeFrequencies();
            DataFromFileWasSaved=1;
            return 1;
        }
        else
            DataFromFile="";
    }
    else
        alert(reader.error);
    DataFromFileWasSaved=0;
    return 0;
}


/*function saveAndSetDataFromFile(reader)
{
    if(!reader.error)
    {
        DataFromFile=reader.result.split(RegExp(" |\\r\\n"));
        if(DataFromFileAreCorrect(DataFromFile))
        {
            convertStrArrToNumArr(DataFromFile);
            document.getElementById("AnswerDiv").innerHTML="Данные:<br>"+DataFromFile.join(' ');
            DataFromFileWasSaved=1;
            return 1;
        }
        else
            DataFromFile="";
    }
    else
        alert(reader.error);
    DataFromFileWasSaved=0;
    return -1;
}*/

function LoadDataAndFreeReader(reader)
{
    saveAndSetDataFromFile(reader);
    delete reader;
    document.getElementById("InputFile").value="";
}

function getDataFromFile()
{
    var file=document.getElementById("InputFile").files[0];
    var reader= new FileReader();
    if(!file)
    {
        errorPrint(30);
        return -1;
    }
    reader.readAsText(file);
    reader.onload=function()
    {
        LoadDataAndFreeReader(reader);
    }
    reader.onerror=function()
    {
        LoadDataAndFreeReader(reader)
    }   
}

function getTable(series, captUpperRow, captLowerRow)
{
    var i;
    var upperRow="<tr><td class=SomeTD>"+captUpperRow+"</td>";
    var lowerRow="<tr><td class=SomeTD>"+captLowerRow+"</td>";
    var table="";
    for(i=0; i<series.length; i++)
    {
        upperRow+="<td class=SomeTD>"+series[i][0]+"</td>";
        lowerRow+="<td class=SomeTD>"+series[i][1]+"</td>";
    }
    upperRow+="</tr>";
    lowerRow+="</tr>";
    table+="<table>"+upperRow+lowerRow+"</table>";
    return table;
}

function canvasResize(canvas, xAxisLabel, yAxisLabel)
{
    var canvContext=canvas.getContext("2d");
    var width=canvas.parentElement.offsetWidth;//300 размеры холста по умолчанию;
    var height=canvas.parentElement.offsetHeight;//150;
    canvas.width=width;//canvas.style.width=width+"px"; canvas.style.height=height+"px"; canvContext.scale(300/width, 150/height); не использовать!(не меняет размер буфера отрисовки, в результате чего все размывается после масштабирования)
    canvas.height=height;//canvas.style.width меняет размер холста, canvas.width меняет размер области для рисования, не путать
    canvContext.beginPath();
    canvContext.font="10px Arial";
    canvContext.strokeStyle="black";
    canvContext.lineCap="round";
    canvContext.lineWidth=1;
    //Ось x
    canvContext.moveTo(0, height/2); 
    canvContext.lineTo(width, height/2);
    canvContext.lineTo(width-3, (height/2)-3);
    canvContext.moveTo(width, height/2);
    canvContext.lineTo(width-3, (height/2)+3);
    canvContext.strokeText(xAxisLabel, width-10, (height/2)+10)
    //Ось y
    canvContext.moveTo(width/2, 0); 
    canvContext.lineTo(width/2, height);//canvContext.moveTo(width/2, -height); canvContext.lineTo(width/2, 0); не рисует (???)
    canvContext.moveTo(width/2, 0);
    canvContext.lineTo((width/2)-3, 3);
    canvContext.moveTo(width/2, 0);
    canvContext.lineTo((width/2)+3, 3);
    canvContext.strokeText(yAxisLabel, (width/2)+10, 10);
    canvContext.stroke();
}

function createCanvas(Div, canvasId)
{
    Div.innerHTML="<canvas class=SomeCanvas id="+canvasId+"></cavnas>";
    setSomeTextDivHeight();
    setCanvasSize();
}

/*function someDraw(canvId, xAxisLabel, yAxisLabel)
{
    var canvContext=document.getElementById(canvId).getContext("2d");
    var width=Div.clientWidth;//300;
    var height=Div.clientHeight;//150;
    canvContext.beginPath();
    canvContext.strokeStyle="black";
    canvContext.lineCap="round";
    canvContext.lineWidth=2;
    //Ось x
    canvContext.moveTo(0, height/2); 
    canvContext.lineTo(width, height/2);
    canvContext.lineTo(width-3, (height/2)-3);
    canvContext.moveTo(width, height/2);
    canvContext.lineTo(width-3, (height/2)+3);
    canvContext.strokeText(xAxisLabel, width-7, (height/2)+7)
    //Ось y
    canvContext.moveTo(width/2, 0); 
    canvContext.lineTo(width/2, height);//canvContext.moveTo(width/2, -height); canvContext.lineTo(width/2, 0); не рисует (???)
    canvContext.moveTo(width/2, 0);
    canvContext.lineTo((width/2)-3, 3);
    canvContext.moveTo(width/2, 0);
    canvContext.lineTo((width/2)+3, 3);
    canvContext.strokeText(yAxisLabel, (width/2)+7, 7);
    canvContext.stroke();
}*/

/*function Y(M,x) 
{
    if (Math.abs(F(M*x))>0.00001)
        return (M/F(M*x));
    else
    {
        if (Math.abs(M)>0.00001)
            return ((M/Math.abs(M))*Infinity);
        else return (0);
    }
}

function loadGraph()
{
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    makro.canvas = canvas;
    makro.context = ctx;
    makro["width"] = width;
    makro["height"] = height;
    ctx.fillStyle="#a0a0a0";
    ctx.fillRect(0,0,width,height);
    ctx.beginPath();
    ctx.strokeStyle="#606060";
    ctx.lineWidth = 1;
    ctx.moveTo(0,height/2); ctx.lineTo(width,height/2);
    ctx.moveTo(width/2,0); ctx.lineTo(width/2,height);
    ctx.closePath();
    ctx.stroke();
}*/

function L_5_Task_1_A()
{
    getDataFromFile();
    return "";
}

function L_5_Task_1_B()
{
    return "Вариационный ряд:<br>"+VariatioalSeries.join(' ');
}

function L_5_Task_1_C()
{
    var SomeDiv=document.getElementsByClassName("SomeDiv");

    /*var serOfFreq=[[], []];
    var serOfRelFreq=[[], []];
    if(getStatisticalSeriesOfFrequencies(serOfFreq))
    {   
        if(getStatisticalSeriesOfRelativeFrequencies(serOfRelFreq, serOfFreq))
        {
            alert(serOfFreq.join(' '));
            alert(serOfRelFreq.join(' '));
        }
    }
    return -1;*/
    createCanvas(SomeDiv[0], "canvas_0");
    //someDraw("canvas_0", "x", "n")
    createCanvas(SomeDiv[1], "canvas_1");
    //someDraw("canvas_1", "x", "n");
    return "Статистический ряд частот:<br>"+getTable(SeriesOfFrequencies, "x<sub>i</sub>", "n<sub>i</sub>")+"<br>"+"Статистический ряд относительных частот:<br>"+getTable(SeriesOfRelativeFrequencies, "x<sub>i</sub>", "w<sub>i</sub>");
}