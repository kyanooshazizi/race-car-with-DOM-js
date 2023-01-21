// JavaScript Document
//متغیر ها
const contain1=document.querySelector('.container');
const Road=document.querySelector('.Road');
const topRoad=document.querySelector('.topRoad');
const speed1=document.querySelector('.speed');
const life1=document.querySelector('.life');
const score1=document.querySelector('.score');
const start=document.querySelector('.start');
const btn1=document.querySelector('.btn');
var play=requestAnimationFrame(play1);
let gameplay=false;
let keys={
	ArrowUp:false,
	ArrowDown:false,
	ArrowRight:false,
	ArrowLeft:false,
}
let player; 
let flag1=0;
var flag2=0;
var scorebrande=50;
//رویدادها
btn1.addEventListener("click",gamestart);
document.addEventListener("keydown",presskeyon);
document.addEventListener("keyup",presskeyoff);



//توابع
//فشردن کلیدها
function presskeyon(event){
	event.preventDefault();
	keys[event.key]=true;
	}

function presskeyoff(event){
	event.preventDefault();
	keys[event.key]=false;
	}



//شروع بازی
function gamestart(){
	if( flag2==1){
    document.querySelector(".playcar").remove();
	m=document.querySelectorAll(".carR");
	for(i=0;i<m.length;i++){
		m[i].remove();
	}
	flag2=0;
}
	btn1.style.display="none";
	div1=document.createElement("div");
	div1.setAttribute("class","playcar");
	div1.x=350;
	div1.y=550;
	player={
	e:div1,
	speed:1,
	life:3,
	score:0,
	gamescore:0,
 }
	contain1.appendChild(div1);
	gameplay=true;
	carr(10);
	
	froad();
	requestAnimationFrame(play1);
	
}

//ساخت جاده
function froad(){
	for(i=0;i<15;i++){
	divr=document.createElement("div");
	divr.setAttribute("class","road");
    contain1.appendChild(divr);
	divr.style.top=i*50+"px";
	}
}
//آبدیت امتیاز 
function update(){
	speed1.innerHTML=Math.round(player.speed)*10;
	life1.innerHTML=player.life;
	score1.innerHTML=player.score;
	
}
//سرعت جاده
function speedroad(){
var temproad=document.querySelectorAll(".road");
for(i=0;i<temproad.length;i++){
	num=temproad[i].offsetTop+player.speed;
	if(num>680){
		num=num-680;
	}
	temproad[i].style.top=num+"px";
	
}

}
//ساخت ماشین های رقیب
function carr(num){
	     for(i=0;i<num;i++){
		 divc=document.createElement("div");
		 divc.setAttribute("class","carR");
	    divc.style.backgroundColor=color();
		divc.innerHTML=i+1;
		 contain1.appendChild(divc);
		 make(divc);
		 divx=document.querySelectorAll(".carR");
		 }
	}
//
function make(e){
	let jade=document.querySelector(".road");
	e.style.top=Math.round(Math.random()*20)+"px";
	e.style.left=e.offsetLeft+Math.round(Math.random()*110)-20+"px";
	e.speed=Math.round(Math.random()*16);
}

//تولید رنگ تصادفی
function color(){
	function c(){
		var x=Math.round(Math.random()*200).toString(16);
		return ("0"+x).substr(-2);
	}
	return "#"+c()+c()+c();
}
//حرکت ماشین های رقیب  
function speeedcarr(){
	var speedcar=document.querySelectorAll(".carR");
	for(i=0;i<speedcar.length;i++){
		for(j=0;j<speedcar.length;j++){
			var mo=delta(speedcar[i],speedcar[j]);
			if(mo && i!=j){
				speedcar[i].style.left =speedcar[i].offsetLeft-30+"px";
				speedcar[j].style.left =speedcar[j].offsetLeft+30+"px";
				speedcar[i].style.top =speedcar[i].offsetTop-30+"px";
				speedcar[j].style.top =speedcar[j].offsetTop+30+"px";
			}
		}
		y=speedcar[i].offsetTop+player.speed-speedcar[i].speed;
       if(y>3000||y<-3000){
               make(speedcar[i]);
	   }
	   //امتیاز دهی
	   if(y>3000){
		   player.score++;
		   if(player.score>scorebrande){
                  var mss=document.createElement("div");
				  contain1.appendChild(mss);
				  mss.setAttribute("class","road");
				  mss.style.top=250+"px";
				  mss.style.fontSize=25+"px";
				  mss.style.color="white";
				  mss.style.backgroundColor="green";
				  mss.innerHTML="شما برنده شده اید";
				  flag1=1;
		   }
	   }
      else{speedcar[i].style.top=y+"px";}
	  //برخورد ماشین ها
	  speeddelta=delta(speedcar[i],player.e);
	  if(speeddelta){
		  player.speed=0;
		  player.life--;
		  if(player.life==0){
			  flag1=1;
		  }
		  make(speedcar[i]);
		}
	
	}
}
//برخورد ماشین های رقیب با هم

//برخورد ماشین من با ماشین های رقیب
function delta(a,b){
      adelta=a.getBoundingClientRect();
	  bdelta=b.getBoundingClientRect();
	 return !((bdelta.top>adelta.bottom) || (bdelta.left>adelta.right) || (adelta.top>bdelta.bottom) || (bdelta.right<adelta.left));
}


function play1(){
	if(flag1==0){

	if(gameplay){
		speedroad();	
	    update();
		
		speeedcarr();
		
		//طراحی بازی
		if(keys.ArrowUp){
			player.speed=player.speed<16 ? player.speed+0.05:16;
			if(player.e.y>400){player.e.y-=player.speed;}
			
		}
		if(keys.ArrowDown){
			if(player.e.y<500){
				player.e.y+=1;
			}
			player.speed=player.speed>0 ? player.speed-0.05:0;
		}
		if(keys.ArrowLeft){
			if(player.e.x>170){player.e.x-=player.speed/4
				;}
			                                                                        
		}
		if(keys.ArrowRight){
			if(player.e.x<560){player.e.x+=player.speed/4;}
			
		}
		
		//حرکت ماشین 
		player.e.style.top=player.e.y+"px";
		player.e.style.left=player.e.x+"px";
		
		
	}
	requestAnimationFrame(play1);
}
else{
	if(player.score<=scorebrande){
	var ms=document.createElement("div");
	contain1.appendChild(ms);
	ms.setAttribute("class","road");
	ms.style.top=250+"px";
	ms.style.backgroundColor="red";
	ms.style.fontSize=25+"px";
	ms.innerHTML="شما باختید";}
	flag1=0;
	btn1.style.display="block";
	gameplay=false;
	flag2=1;


}
}