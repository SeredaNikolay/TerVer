//---------------Проверка корректности входных данных---------------//
function isEmpty(strValue)
{
    if(strValue=="")
        return 1;
    else
        return 0;
}

function isDigit(ch)
{
    if(ch>='0'&&ch<='9')
        return 1;
    return 0;
}

function isNeg(strValue)
{
    if(!isEmpty(strValue)&&strValue[0]=='-')
        return 1;
    return 0;
}

function isPos(strValue, notAllowInsignZeros)
{
    if(!isEmpty(strValue))
    {
        var length;
        var found=0;
        if(notAllowInsignZeros)
            length=1;
        else
            length=strValue.length;           
        for(var i=0; i<length&&!found; i++)
        {
            if(strValue[i]>='1'&&strValue[i]<='9')
                found=1;
        }
        if(!found)
            return 0;
    }
    return 1;
}

function isIntZero(strValue, notAllowInsignZeros)
{
    if(isEmpty(strValue))
        return 0;
    if(notAllowInsignZeros)
    {
        if(strValue.length==1&&strValue[0]=='0')
            return 1;
        return 0;
    }
    for(var i=0; i<strValue.length; i++)
    {
        if(strValue[i]!='0')
            return 0;
    }
    return 1;
}

function isInt(strValue, notAllowInsignZeros)
{
    if(isEmpty(strValue))
        return 0;
    if(notAllowInsignZeros)
    {
        if(isIntZero(strValue[0], 1))
            return 0;    
    }
    for(var i=0; i<strValue.length; i++)
    {
        if(!isDigit(strValue[i]))
            return 0;
    }
    return 1;
}

function hasOnlyDot(strValue)
{
    var dotCounter=0;
    if(isEmpty(strValue))
        return 0;
    for(i=0; i<strValue.length&&dotCounter<2; i++)
    {
        if(!isDigit(strValue[i]))
        {
            if(strValue[i]=='.')
                dotCounter++;
            else
                return 0;
        }
    }
    if(dotCounter!=1)
        return 0;
    return 1;
}

function firstDotPos(strValue)
{
    if(isEmpty(strValue))
        return 0;
    for(var i=0; i<strValue.length; i++)
    {
        if(strValue[i]=='.')
            return i;
    }
    return -1;
}

function isFrac(strValue, notAllowInsignZeros)
{
    if(isEmpty(strValue))
        return 0;
    if(!hasOnlyDot(strValue))
        return 0;
    if(strValue.startsWith('.')||strValue.endsWith('.'))
        return 0;
    var dotPos=firstDotPos(strValue);
    var int=strValue.slice(0, dotPos);
    var frac=strValue.slice(dotPos+1);
    if(!(isInt(int, notAllowInsignZeros)&&isPos(strValue, 0)&&isInt(frac, 0)))
        return 0;
    return 1;
}

function isFracZero(strValue, notAllowInsignZeros)
{
    if(isEmpty(strValue))
        return 0;
    if(!hasOnlyDot(strValue))
        return 0;
    if(strValue.startsWith('.')||strValue.endsWith('.'))
        return 0;
    var dotPos=firstDotPos(strValue);
    var int=strValue.slice(0, dotPos);
    var frac=strValue.slice(dotPos+1);
    if(!(isIntZero(int, notAllowInsignZeros)&&isIntZero(frac, 0)))
        return 0;
    if(!(isIntZero(int, notAllowInsignZeros)&&isIntZero(frac, 0)))
        return 0; 
    return 1;
}
//----------------------Для использования-----------------------------//
function isPosFrac(strValue, notAllowInsignZeros)
{
    if(isPos(strValue, 0)&&isFrac(strValue, notAllowInsignZeros))
        return 32;
    return 0;
}

function isNegFrac(strValue, notAllowInsignZeros)
{
    if(isNeg(strValue)&&isFrac(strValue, notAllowInsignZeros))
        return 16;
    return 0;
}

function isZeroFrac(strValue, notAllowInsignZeros)
{
    if(isFracZero(strValue, notAllowInsignZeros))
        return 8;
    return 0;
}

function isPosInt(strValue, notAllowInsignZeros)
{
    if(isPos(strValue, notAllowInsignZeros)&&isInt(strValue, notAllowInsignZeros))
        return 4;
    return 0;
}

function isNegInt(strValue, notAllowInsignZeros)
{
    if(isNeg(strValue)&&isInt(strValue, notAllowInsignZeros))
        return 2;
    return 0;
}

function isZeroInt(strValue, notAllowInsignZeros)
{
    if(isIntZero(strValue, notAllowInsignZeros))
        return 1;
    return 0;
}

