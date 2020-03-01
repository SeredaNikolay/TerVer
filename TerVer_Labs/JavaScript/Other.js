function OnCalculateBtnClick()
{
    var type=document.getElementById("FormulaBox").value;
    var n=document.getElementById("NInput").value;
    var m=document.getElementById("MInput").value;
    var answer=calculate(type, m, n);
    if(answer!=-1)
        document.getElementById("AnswerDiv").innerHTML=answer;
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