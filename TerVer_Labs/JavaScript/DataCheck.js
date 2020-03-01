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