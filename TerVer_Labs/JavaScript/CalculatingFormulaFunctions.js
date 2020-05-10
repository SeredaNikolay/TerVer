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