//------------------------------------Вычисления-----------------------------//
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
    if(checkMInputData(0))
    {
        if(checkNInputData(0))
        {
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
                }
        }
    }
    return -1;
}