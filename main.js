   function $(selector){
       return document.querySelector(selector)
   }


   var canvas =document.getElementById('paint');
    var context = canvas.getContext('2d');
    var using = false;
    var lastPoint = {x:undefined,y:undefined};
    sizeSet();
    window.onresize = function(){
        sizeSet();
    }

    function sizeSet(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
    
    if(window.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(a){
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            using = true;
            if(eraserEnabled){
                context.clearRect(x-5,y-5,40,40);
            }else{
                lastPoint = {x:x,y:y};
            }
        }
        canvas.ontouchmove = function(a){
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if(!using){ return }
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                var newPoint = {x:x,y:y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
            
        }
        canvas.ontouchend = function(){
            using = false;
        }
    }else{    //非触屏设备
        canvas.onmousedown = function(a){
            var x = a.clientX;
            var y = a.clientY;
            using = true;
            if(eraserEnabled){
                context.clearRect(x-5,y-5,40,40);
            }else{
                lastPoint = {x:x,y:y};
            }
        }
        canvas.onmousemove = function(a){
            var x = a.clientX;
            var y = a.clientY;
            if(!using){ return }
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                var newPoint = {x:x,y:y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
            
        }
        canvas.onmouseup = function(){
            using = false;
        }
    }

    
    function drawCircle(x,y,radius){
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(x,y,radius,0,Math.PI*2);
        context.fill();
    }
    function drawLine(x1,y1,x2,y2){
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineWidth = 5;
        context.lineTo(x2,y2);
        context.stroke();
        context.closePath();
    }

    var eraserEnabled = false;
    $('.icon-eraser').onclick = function(){
        eraserEnabled = true;
        $('.icon-eraser').classList.add('active');
        $('.icon-pen').classList.remove('active');
    
    }
    $('.icon-pen').onclick = function(){
        eraserEnabled = false;
        $('.icon-eraser').classList.remove('active');
        $('.icon-pen').classList.add('active');
    }
    $('.icon-clear').onclick = function(){
        context.clearRect(0,0,canvas.width,canvas.height)
        $('.icon-pen').classList.add('active');
        $('.icon-eraser').classList.remove('active');
        eraserEnabled = false;
    }
    $('.icon-download').onclick = function(){
        var url = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href= url
        a.download = prompt('请输入图画名')
        if(a.download !==null){
            a.click()
        }else{
            return
        }
    }


    $('.black').onclick = function(){
        context.strokeStyle = 'black'
        this.classList.add('active')
        $('.red').classList.remove('active')
        $('.green').classList.remove('active')
        $('.icon-pen').classList.add('active')
        $('.icon-eraser').classList.remove('active')
        eraserEnabled = false;             
    }
    $('.red').onclick = function(){
        context.strokeStyle = 'red'
        this.classList.add('active')
        $('.black').classList.remove('active')
        $('.green').classList.remove('active')
        $('.icon-pen').classList.add('active')
        $('.icon-eraser').classList.remove('active')   
        eraserEnabled = false;      
    }
    $('.green').onclick = function(){
        context.strokeStyle = 'green'
        this.classList.add('active')
        $('.red').classList.remove('active')
        $('.black').classList.remove('active')
        $('.icon-pen').classList.add('active')   
        $('.icon-eraser').classList.remove('active') 
        eraserEnabled = false;     
    }