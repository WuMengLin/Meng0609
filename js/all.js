var ling = document.querySelector('.ling');
var san = document.querySelector('.san');
var shin = document.querySelector('.shin');
var yan = document.querySelector('.yan');
var list = document.querySelector('.list');
var photo = document.querySelector('.photo');
var dropdown = document.querySelector('.dropdown');
var areaname = document.querySelector('.areaname');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var pagenumber = document.querySelector('.pagenumber');

var data=[];
var xhr=new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/WuMengLin/kgcjson/master/kcg.json',true);
xhr.send(null);
xhr.onload=function(){
    data=JSON.parse(xhr.responseText);
    showarea('三民區');
    buildropdownlist();
}

var allitem=0,allpage=0,nowpage=0;

//建立第一頁內容與數字列
function showarea(area){
    var str = '',build = '';
    allitem = 0;
    allpage = 0;
    for(i=0;i<data.result.records.length;i++){    
        if(data.result.records[i].Zone == area){
            if(allitem<6){
                build = '<li><div class="photo" style="background-image: url('+data.result.records[i].Picture1+')"><h3>'+data.result.records[i].Name+'</h3><h4>'+data.result.records[i].Zone+'</h4></div><div class="info"><ul class="maininfo"><li><img src="images/icons_clock.png" alt="" class="clock"><h5>'+data.result.records[i].Opentime+'</h5></li><li><img src="images/icons_pin.png" alt="" class="pin"><h5>'+data.result.records[i].Add+'</h5></li><li><img src="images/icons_phone.png" alt="" class="phone"><h5>'+data.result.records[i].Tel+'</h5></li></ul><div class="freetag"><img src="images/icons_tag.png" alt="" class="tag"><h5>'+data.result.records[i].Ticketinfo+'</h5></div></div></li>';
                str = str+build;
            }
            allitem = allitem+1;
        }
    }
    list.innerHTML=str;
    areaname.textContent=area;
    str = '';
    build = '';
    if(allitem%6==0){allpage=allitem/6}else{allpage=Math.floor(allitem/6)+1}
    for(i=0;i<allpage;i++){
    build='<a href="#">'+(i+1)+'</a>';
    str=str+build;
    }
    pagenumber.innerHTML=str;
    nowpage=1;
    PrevAndNext();
}


//建立對應數字列內容
function changepage(e){
    e.preventDefault();
    allitem = 0;
    var str = '',build = '';
    if(e.target.nodeName!=='A'){return;}
    nowpage = parseInt(e.target.textContent);
    for(i=0;i<data.result.records.length;i++){
        if(data.result.records[i].Zone == areaname.textContent){
            if(allitem>=(nowpage-1)*6 && allitem<nowpage*6){
                build = '<li><div class="photo" style="background-image: url('+data.result.records[i].Picture1+')"><h3>'+data.result.records[i].Name+'</h3><h4>'+data.result.records[i].Zone+'</h4></div><div class="info"><ul class="maininfo"><li><img src="images/icons_clock.png" alt="" class="clock"><h5>'+data.result.records[i].Opentime+'</h5></li><li><img src="images/icons_pin.png" alt="" class="pin"><h5>'+data.result.records[i].Add+'</h5></li><li><img src="images/icons_phone.png" alt="" class="phone"><h5>'+data.result.records[i].Tel+'</h5></li></ul><div class="freetag"><img src="images/icons_tag.png" alt="" class="tag"><h5>'+data.result.records[i].Ticketinfo+'</h5></div></div></li>';
                str = str+build;
            }
        allitem = allitem+1;
        }
    }
    list.innerHTML=str;
    PrevAndNext();
}

//數字列狀態
function PrevAndNext(){
    //數字狀態
    var el=document.querySelectorAll('.pagenumber a');
    for(i=0;i<el.length;i++){
        el[i].setAttribute('class','');
        if(i==nowpage-1){el[i].setAttribute('class','active');}
    }
    //PrevAndNext狀態
    if(nowpage==1 && allpage!==1){
        prev.setAttribute('style','color:rgba(73,73,73,0.50);cursor:context-menu;');
        next.setAttribute('style','color:#4A4A4A');
    }else if(nowpage==allpage && nowpage!==1){
        prev.setAttribute('style','color:#4A4A4A');
        next.setAttribute('style','color:rgba(73,73,73,0.50);cursor:context-menu;');
    }else if(nowpage!==allpage && nowpage!==1){
        prev.setAttribute('style','color:#4A4A4A');
        next.setAttribute('style','color:#4A4A4A');
    }else{
        prev.setAttribute('style','color:rgba(73,73,73,0.50);cursor:context-menu;');
        next.setAttribute('style','color:rgba(73,73,73,0.50);cursor:context-menu;');
    }
}

//點擊數字換頁
pagenumber.addEventListener('click',changepage,false);

//上一頁
prev.addEventListener('click',function(e){
    e.preventDefault();
    var str='',build='';
    allitem=0;
    if(nowpage==1){return;}
    else{
        nowpage=nowpage-1;
        for(i=0;i<data.result.records.length;i++){
            if(data.result.records[i].Zone == areaname.textContent){
                if(allitem>=(nowpage-1)*6 && allitem<nowpage*6){
                    build = '<li><div class="photo" style="background-image: url('+data.result.records[i].Picture1+')"><h3>'+data.result.records[i].Name+'</h3><h4>'+data.result.records[i].Zone+'</h4></div><div class="info"><ul class="maininfo"><li><img src="images/icons_clock.png" alt="" class="clock"><h5>'+data.result.records[i].Opentime+'</h5></li><li><img src="images/icons_pin.png" alt="" class="pin"><h5>'+data.result.records[i].Add+'</h5></li><li><img src="images/icons_phone.png" alt="" class="phone"><h5>'+data.result.records[i].Tel+'</h5></li></ul><div class="freetag"><img src="images/icons_tag.png" alt="" class="tag"><h5>'+data.result.records[i].Ticketinfo+'</h5></div></div></li>';
                    str = str+build;
                }
            allitem = allitem+1;
            }
        }
        list.innerHTML=str;
        PrevAndNext();
    }
},false);

//下一頁
next.addEventListener('click',function(e){
    e.preventDefault();
    var str='',build='';
    allitem=0;
    if(nowpage==allpage){return;}
    else{
        nowpage=nowpage+1;
        for(i=0;i<data.result.records.length;i++){
            if(data.result.records[i].Zone == areaname.textContent){
                if(allitem>=(nowpage-1)*6 && allitem<nowpage*6){
                    build = '<li><div class="photo" style="background-image: url('+data.result.records[i].Picture1+')"><h3>'+data.result.records[i].Name+'</h3><h4>'+data.result.records[i].Zone+'</h4></div><div class="info"><ul class="maininfo"><li><img src="images/icons_clock.png" alt="" class="clock"><h5>'+data.result.records[i].Opentime+'</h5></li><li><img src="images/icons_pin.png" alt="" class="pin"><h5>'+data.result.records[i].Add+'</h5></li><li><img src="images/icons_phone.png" alt="" class="phone"><h5>'+data.result.records[i].Tel+'</h5></li></ul><div class="freetag"><img src="images/icons_tag.png" alt="" class="tag"><h5>'+data.result.records[i].Ticketinfo+'</h5></div></div></li>';
                    str = str+build;
                }
            allitem = allitem+1;
            }
        }
        list.innerHTML=str;
        PrevAndNext();
    }
},false);

//監聽熱門行政區按鈕
ling.addEventListener('click',function(e){
    e.preventDefault();
    showarea('苓雅區');
    dropdown.value='苓雅區';
},false);
san.addEventListener('click',function(e){
    e.preventDefault();
    showarea('三民區');
    dropdown.value='三民區';
},false);
shin.addEventListener('click',function(e){
    e.preventDefault();
    showarea('新興區');
    dropdown.value='新興區';
},false);
yan.addEventListener('click',function(e){
    e.preventDefault();
    showarea('鹽埕區');
    dropdown.value='--請選擇行政區--';
},false);



//建立下拉式選單
function buildropdownlist(){
//取出所有行政區(不重複)
var allarea=[];
var a=0;
for(i=0;i<data.result.records.length;i++){
    a=0;
    for(j=0;j<allarea.length;j++){
        if(data.result.records[i].Zone==allarea[j]){break;}
        a=a+1;
    }
    if(a==allarea.length){allarea.push(data.result.records[i].Zone);}
}
var str ='<option value="--請選擇行政區--">--請選擇行政區--</option>';
for(i=0;i<allarea.length;i++){
    var build = '<option value="'+allarea[i]+'">'+allarea[i]+'</option>';
    str=str+build;
}
dropdown.innerHTML=str;
}


//監聽下拉式選單
dropdown.addEventListener('change',function(){
    if(dropdown.value=='--請選擇行政區--'){return;}
    showarea(dropdown.value);
},false)