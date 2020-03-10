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
    for(i=BigInt(firstValue); i<=BigInt(lastValue); i++)
        value*=i;
    return value;
}

function bigNatPow(n, m)
{
    var value=BigInt(1);
    var N=BigInt(n);
    if(m<1)
    {
        errorPrint(2);
        return -1;
    }
    if(n<1)
    {
        errorPrint(3);
        return -1;
    }
    for(i=0; i<m; i++)
        value*=N;
    return value;
}

function calc(m, n, combination)
{    
    var min=m;
    var max=n-m;
    var numerator=BigInt(1);
    if(m<1)
    {
        errorPrint(4);
        return -1;
    }
    if(n<1)
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
    return numerator/product(1, min);
}

function permWithRep(ni, n)
{
    var numerator=BigInt(1);
    if(n<1)
    {
        errorPrint(5);
        return -1;
    }
    var amount=0;
    for(i=0; i<ni.length; i++)
    {
        if(ni[i]>0)
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
            denominator*=product(1, ni[i]);
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
    return calc(M, N, 1)
}

function RepCombinations(Value)
{
    var N=Value[0][0];
    var M=Value[1][0];
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
    return bigNatPow(N, M);
}

function NotRepPermutations(Value)
{
    var N=Value[0][0];
    return product(1, N);
}

function RepPermutations(Value)
{
    var N=Value[0][0];
    var NI=Value[1];
    return permWithRep(NI, N);
}
//--------------------------Задачи к лабораторной №1----------------------//
function Task_1(Value)
{
    var k=Value[0][0];
    var l=Value[1][0];
    var r=Value[2][0];
    var s=Value[3][0];
    if(r-s<1)
    {
        errorPrint(9);
        return -1;
    }
    if(k-l<1)
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
    return answer.toFixed(6);
}

function Task_2(Value)
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
    return answer.toFixed(6);
}

function Task_3(Value)
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
    return answer.toFixed(6);
}