
const canvas = document.getElementById('myCanvas');

var gameInfo={
	money:100,
	mode:'normal',
	placing:null,
	price:0,
	convSpeed:0,
	susAmongusLevel:0,
	meterRise:2,
	meterRiseChance:10,
	currentDay:0,
	energy:0,
	energyGen:0,
	personEvent:20,
	hadEncounter:false
}


let explainDEA=false
let infoText=''
let sawOne=false//for dea encounter
let sawTwo=false//for dea encounter
let discoveryChannel=null
let yourMistake=false
let underAgent=false
let makeTheDeal=false
var day100=false
let convLevel=0






let context = canvas.getContext('2d')
var coords = [0,0];

onmousedown=function(e){
    var C = coords; // one global lookup
    C[0] = e.pageX; 
    C[1] = e.pageY; 
};
var box_area = { 
	x1: null, 
	y1: null,
	x2: null,
	y2: null,
}
function is_mouse_in_area() {
    var C = coords, B = box_area;
    if (C[0] >= B.x1 && C[0] <= B.x2) {
        if (C[1] >= B.y1 && C[1] <= B.y2) {
            return true;
        }
    }
    return false;
		
};


let placeOptions=[
	{//0
		unlocked:true,
		texture:"convUp.png",
		price:10,
		x:10,
		y:50,
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//0
	{//1
		unlocked:true,
		texture:"wire.png",
		price:10,
		x:(10+55)+55,
		y:50,
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//1
	{//2
		unlocked:true,
		texture:"router.png",
		price:101,
		x:10+55,
		y:50,
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//2
	{//3
		unlocked:true,
		texture:"generator.png",
		price:50,
		x:10,
		y:50+75,//the power of being lazy and putting stuff off for the future will ensure this is never changed
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	
	},//3
	{//4
		unlocked:true,
		texture:"seller.png",
		price:10,
		x:10+55,//mAy ThE lAzY rEjEcT yOu
		y:50+75,//the power of lazy is getting worse, and I dont care enough to fix it
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//4
	{//5
		unlocked:true,
		texture:"upgraderblue.png",
		price:1000,
		x:10,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//5
	{//6
		unlocked:true,
		texture:"upgraderred.png",
		price:2500,
		x:10+55,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//6
	{//7
		unlocked:true,
		texture:"upgraderpurple.png",
		price:6000,
		x:(10+55)+55,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},

	},//7
	{//8
		unlocked:true,
		texture:"upgraderblack.png",
		price:16000,
		x:(10+55)+(55+55),
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//8
	{//9
		unlocked:true,
		texture:"sellTower.png",
		price:0,
		x:10,
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:((50+75)+(75+75))*1.95,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("Seller", this.x,this.y);
		},
	},//9
	{//10
		unlocked:true,
		texture:"convUpgradeDown.png",
		price:10000,
		x:10,
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:(50+75)+(75+75),//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//10
	{//11
		unlocked:true,
		texture:"elecGen.png",
		price:500,
		x:(10+55)+55,//mAy ThE lAzY rEjEcT yOu
		y:50+75,//the power of lazy is getting worse, and I dont care enough to fix it
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//11
	{//12
		unlocked:true,
		texture:"elecAutoGen.png",
		price:500,
		x:10,//mAy ThE lAzY rEjEcT yOu
		y:(50+75)+(75+75)+75,//the power of lazy is getting worse, and I dont care enough to fix it
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//12
	{//13
		unlocked:true,
		texture:"wireTurnDown.png",
		price:10,
		x:(10+55)+(55+55),//mAy ThE lAzY rEjEcT yOu
		y:50,
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//13
];









var coords = [0,0];
onmousedown=function(e){
    var C = coords; // one global lookup
    C[0] = e.pageX; 
    C[1] = e.pageY; 
};
var box_area = { 
	x1: null, 
	y1: null,
	x2: null,
	y2: null,
}
function is_mouse_in_area() {
    var C = coords, B = box_area;
    if (C[0] >= B.x1 && C[0] <= B.x2) {
        if (C[1] >= B.y1 && C[1] <= B.y2) {
            return true;
        }
    }
    return false;
		
};



var btnWidth=null
function drawFieldSlotFAKE(x,y,id){
	 btnWidth=50
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var image = new Image();
    image.src = id;
    ctx.drawImage(image,x,y);
	 box_area.x1=x
	 box_area.y1=y
	 box_area.x2=x+btnWidth
	 box_area.y2=y+btnWidth

}


let x=0
let y=0
onmousemove = function(e){
    x=e.clientX;
    y=e.clientY;
};

let btnId=0
let floor=[
]
function addFloor(xx,yy,io,tex,overleay){
	floor.push(
		{
			x:xx,
			y:yy,
			id:io,
			texture:tex,
			cooldown:0,
			overlay:overleay,
			overlayUpgrade:null,//FOR CONVEYOR UPGRADS
			energyStored:null,//FOR WIRE STUFF
			routDirection:'1',//FOR ROUTERS DIRECTION
		}
	);	
}


document.addEventListener('keyup',function(evt){
	if(evt.keyCode==27){
		gameInfo.placing=null
	}
   if(evt.keyCode==39){//left
		let sel=gameInfo.placing
		if(sel){
			if(sel=='convUp.png'){
				gameInfo.placing='convRight.png'	
			}
			else if(sel=='convRight.png'){
				gameInfo.placing='movything.png'	
			}
			else if(sel=='movything.png'){
				gameInfo.placing='convLeft.png'	
			}
			else if(sel=='convLeft.png'){
				gameInfo.placing='convUp.png'	
			}
			
			
			
			
			
			else if(sel=='wire.png'){//1
				gameInfo.placing='wireAlt.png'	
			}
			else if(sel=='wireAlt.png'){//2
				gameInfo.placing='wire.png'	
			}			
			
			
			else if(sel=='wireTurnDown.png'){//1
				gameInfo.placing='wireTurnUp.png'	
			}
			else if(sel=='wireTurnUp.png'){//2
				gameInfo.placing='wireTurnUp1.png'	
			}			
			else if(sel=='wireTurnUp1.png'){//1
				gameInfo.placing='wireTurnDown1.png'	
			}
			else if(sel=='wireTurnDown1.png'){//1
				gameInfo.placing='wireTurnDown.png'	
			}
			
			
			
			
			else if(sel=='router.png'){//2
				gameInfo.placing='routerLeft.png'	
			}
			else if(sel=='routerLeft.png'){//2
				gameInfo.placing='routerUp.png'	
			}
			else if(sel=='routerUp.png'){//2
				gameInfo.placing='routerRight.png'	
			}
			else if(sel=='routerRight.png'){//2
				gameInfo.placing='router.png'	
			}
			
			
			
			
			
			
			
			
			
		}
	}
})


let firstRun=true


var convs = new Array()
convs = [
	"movything.png",
	"convUp.png",
	"convRight.png",
	"convLeft.png",
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
	
	
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
	
	
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
	
	
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]


var convsHold = new Array()
convsHold = [
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
	
	
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
	
	
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
	
	
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]





var convsRight = new Array()
convsRight = [
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
]
var convsLeft = new Array()
convsLeft = [
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]
var convsUp = new Array()
convsUp = [
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
]
var convsDown = new Array()
convsDown = [
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
]










function conveyorMovement(i){
	if(floor[i].texture=='movything.png' && floor[i+20] != null){
		let conv=floor[i]
		let nextCon=floor[i+20]
		if(nextCon.texture != null &&conv.cooldown>=40-gameInfo.convSpeed){
			conv.cooldown=0
			if(nextCon.texture=='movything.png' && nextCon.overlayTexture==null){
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
				
			}
			if(nextCon.texture=='convRight.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='convLeft.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
		}
		else{
			conv.cooldown++
		}
	}
	
	
	
	
	if(floor[i-20] != null &&floor[i].texture=='convUp.png'){
		let conv=floor[i]
		let nextCon=floor[i-20]
		if(nextCon.texture != null &&conv.cooldown>=40-gameInfo.convSpeed){
			conv.cooldown=0
			if(nextCon.texture=='convUp.png' && nextCon.overlayTexture==null){
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='convRight.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='convLeft.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}

				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
		}
		else{
			conv.cooldown++
		}
	}
	
	
	
	
	
	
	if(floor[i].texture=='convRight.png' && floor[i+1] != null){
		let conv=floor[i]
		let nextCon=floor[i+1]
		if(nextCon.texture != null &&conv.cooldown>=40-gameInfo.convSpeed){
			conv.cooldown=0
			if(nextCon.texture=='convRight.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='convUp.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='movything.png' && nextCon.overlayTexture==null){
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
		}
		else{
			conv.cooldown++
		}
	}
	
	
	
	if(floor[i].texture=='convLeft.png' && floor[i-1] != null){
		let conv=floor[i]
		let nextCon=floor[i-1]
		if(nextCon.texture != null &&conv.cooldown>=40-gameInfo.convSpeed){
			conv.cooldown=0
			if(nextCon.texture=='convLeft.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='convUp.png' && nextCon.overlayTexture==null){//---->
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
			if(nextCon.texture=='movything.png' && nextCon.overlayTexture==null){
				if(conv.overlayTexture=='item1.png'){
					nextCon.overlayTexture='item1.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='blue.png'){
					nextCon.overlayTexture='blue.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='red.png'){
					nextCon.overlayTexture='red.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='purple.png'){
					nextCon.overlayTexture='purple.png'	
					conv.overlayTexture=null
				}
				
				
				
				if(conv.overlayTexture=='black.png'){
					nextCon.overlayTexture='black.png'	
					conv.overlayTexture=null
				}
				
				
				
				
				if(conv.overlayTexture=='item1Big.png'){
					nextCon.overlayTexture='item1Big.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blueBig.png'){
					nextCon.overlayTexture='blueBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='redBig.png'){
					nextCon.overlayTexture='redBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='purpleBig.png'){
					nextCon.overlayTexture='purpleBig.png'	
					conv.overlayTexture=null
				}
				if(conv.overlayTexture=='blackBig.png'){
					nextCon.overlayTexture='blackBig.png'	
					conv.overlayTexture=null
				}
			}
		}
		else{
			conv.cooldown++
		}
	}
	
}




function checkGen(i){
	if(floor[i+20] !=null && floor[i+20].texture=='convRight.png'){
		return "convRight"
	}
	if(floor[i+20] !=null && floor[i+20].texture=='convUp.png'){
		return "convUp"
	}
	if(floor[i+20] !=null && floor[i+20].texture=='movything.png'){
		return "movything"
	}
	if(floor[i+20] !=null && floor[i+20].texture=='convLeft.png'){
		return "convLeft"
	}
}



var upgraderList = new Array()
upgraderList = [
	"upgraderblue.png",
	"upgraderred.png",
	"upgraderpurple.png",
	"upgraderblack.png",
]
function commitUpgrade(i,genType){
	if(floor[i].cooldown>=20){
		floor[i].cooldown=0
		if(genType=='upgraderblue.png'){
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='item1.png'){
				/*
				"if(floor[i-1] !=null && floor[i-1].texure=='moveitem1RIGHT.png'){"
				-Dylan A
				Dec, 1, 2022
				*/
				floor[i+1].overlayTexture='blue.png'	
				floor[i-1].overlayTexture=null
			}
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='item1Big.png'){
				floor[i+1].overlayTexture='blueBig.png'	
				floor[i-1].overlayTexture=null
			}
		}
		if(genType=='upgraderred.png'){
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='blue.png'){
				floor[i+1].overlayTexture='red.png'	
				floor[i-1].overlayTexture=null
			}
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='blueBig.png'){
				floor[i+1].overlayTexture='redBig.png'	
				floor[i-1].overlayTexture=null
			}
		}

		if(genType=='upgraderpurple.png'){
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='red.png'){
				floor[i+1].overlayTexture='purple.png'	
				floor[i-1].overlayTexture=null
			}
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='redBig.png'){
				floor[i+1].overlayTexture='purpleBig.png'	
				floor[i-1].overlayTexture=null
			}
		}
		if(genType=='upgraderblack.png'){
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='purple.png'){
				floor[i+1].overlayTexture='black.png'	
				floor[i-1].overlayTexture=null
			}
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='purpleBig.png'){
				floor[i+1].overlayTexture='blackBig.png'	
				floor[i-1].overlayTexture=null
			}
		}
	}
	else{
		floor[i].cooldown++
	}
}









gameInfo.money=100000



var dayTicks=0
window.requestAnimationFrame(gameLoop);
function gameLoop(timeStamp) {	
	gameInfo.energy+=gameInfo.energyGen
   context.fillStyle = '#36393f';
   context.clearRect(0, 0, canvas.width, canvas.height);//clearing for next frame
   context.fillRect(0, 0, canvas.width, canvas.height);//background color, put here so stuff after is over it
   context.fillStyle = '#494d55';
   context.fillRect(0, 25, 250, 700);
   context.fillStyle = '#FF0000';
   context.fillRect(0, 595, gameInfo.susAmongusLevel, 50);
   var c=document.getElementById("myCanvas");
   var ctx=c.getContext("2d");
   var imagee = new Image();
	imagee.src='susmeter.png'
   ctx.drawImage(imagee,0,595)
	

	
	box_area.x1=0
	box_area.y1=595
	box_area.x2=200
	box_area.y2=595+200
	if(is_mouse_in_area()){
		if(gameInfo.money>=100 && gameInfo.susAmongusLevel>=100){
			gameInfo.susAmongusLevel-=100	
			gameInfo.money-=100
		}
		else{
			if((100-gameInfo.money)>=1){
				alert("You Need $" + (100-gameInfo.money)+ " More To Do This")	
			}
			else{
				alert("You Need More Sus")	
			}
		}
   	var C = coords;
   	C[0] = 0; 
   	C[1] = 0; 
	}
	
	
	for(let e=100;e<700;e+=50){//field
		for(let i=300;i<1300;i+=50){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = 'floor.png'
   		ctx.drawImage(imagee,i,e);
			if(firstRun){
				addFloor(i,e,btnId,"floor.png",null)
				btnId++
				if(btnId>240){
					firstRun=false
				}
			}
		}
	}
	
	
	
	
	
	for (let i = 0, len = placeOptions.length; i < len; i++) {
		let targ=placeOptions[i]
		if(targ.unlocked){
			targ.draw()
			box_area.x1=targ.x
	 		box_area.y1=targ.y
	 		box_area.x2=targ.x+50
	 		box_area.y2=targ.y+50
			if(is_mouse_in_area()){
				if(targ.texture !='convUpgradeDown.png'){
					gameInfo.placing=targ.texture
					gameInfo.price=1
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
				}
				else{
					gameInfo.convSpeed+=10
					convLevel++
					gameInfo.money-=1000
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
				}
			}
		}
	}	
	for (let i = 0, len = floor.length; i < len; i++) {
		if(convLevel==1){
			if(floor[i].texture=='convUp.png'){
				floor[i].overlayUpgrade='convUpgradeUp.png'	
			}
			if(floor[i].texture=='convLeft.png'){
				floor[i].overlayUpgrade='convUpgradeLeft.png'	
			}
			if(floor[i].texture=='convRight.png'){
				floor[i].overlayUpgrade='convUpgradeRight.png'	
			}
			if(floor[i].texture=='movything.png'){
				floor[i].overlayUpgrade='convUpgradeDown.png'	
			}
		}
		if(convLevel==2){
			if(floor[i].texture=='convUp.png'){
				floor[i].overlayUpgrade='convUpgrade2Up.png'	
			}
			if(floor[i].texture=='convLeft.png'){
				floor[i].overlayUpgrade='convUpgrade2Left.png'	
			}
			if(floor[i].texture=='convRight.png'){
				floor[i].overlayUpgrade='convUpgrade2Right.png'	
			}
			if(floor[i].texture=='movything.png'){
				floor[i].overlayUpgrade='convUpgrade2Down.png'	
			}
		}
		
		
		let targ=floor[i]
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      var imagee = new Image();
		imagee.src=targ.texture
     	ctx.drawImage(imagee,targ.x,targ.y)
		
		
		if(targ.overlayUpgrade !=null){
      	var c=document.getElementById("myCanvas");
      	var ctx=c.getContext("2d");
      	var imagee = new Image();
			imagee.src=targ.overlayUpgrade
     		ctx.drawImage(imagee,targ.x,targ.y)
		}
		if(targ.overlayTexture !=null){
      	var c=document.getElementById("myCanvas");
      	var ctx=c.getContext("2d");
      	var imagee = new Image();
			imagee.src=targ.overlayTexture
     		ctx.drawImage(imagee,targ.x,targ.y)
		}
		if(gameInfo.placing==null){
			box_area.x1=targ.x
	 		box_area.y1=targ.y
	 		box_area.x2=targ.x+50
	 		box_area.y2=targ.y+50
			if(is_mouse_in_area() && !explainDEA){
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
				if(targ.texture=='generator.png'){
				//if(targ.cooldown>3){
					if(checkGen(i)=='convRight'){
						floor[i+20].overlayTexture='item1.png'	
					}
					if(checkGen(i)=='convLeft'){
						floor[i+20].overlayTexture='item1.png'	
					}
					if(checkGen(i)=='movything'){
						floor[i+20].overlayTexture='item1.png'	
					}	
				//}
				//else{
				//	targ.cooldown++
				//}
				}	
			}
		}
		
		

		if(gameInfo.placing && !explainDEA){
			box_area.x1=targ.x
	 		box_area.y1=targ.y
	 		box_area.x2=targ.x+50
	 		box_area.y2=targ.y+50
			if(is_mouse_in_area()){
				
				if(gameInfo.placing != 'sellTower.png' && gameInfo.money>gameInfo.price){
					
					
										
					if(targ.texture=='elecGen.png' || targ.texture=='wire.png' || targ.texture=='wireAlt.png' || targ.texture=='wireTurnDown.png' || targ.texture=='wireTurnDown1.png' || targ.texture=='wireTurnUp.png' || targ.texture=='wireTurnUp1.png'){
						for (let i = 0, len = floor.length; i < len; i++) {
							if(floor[i].overlayTexture=='electric.png' || floor[i].overlayTexture=='electricAlt.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBend.png' || floor[i].overlayTexture=='electricBend1.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBendDown.png' || floor[i].overlayTexture=='electricBendDown1.png'){
								floor[i].overlayTexture=null
							}
						}
					}
					if(targ.texture=='elecGen.png' || targ.texture=='wireBack.png' || targ.texture=='wireBackAlt.png' || targ.texture=='wireTurnDown.png' || targ.texture=='wireTurnDown1.png' || targ.texture=='wireTurnUp.png' || targ.texture=='wireTurnUp1.png'){
						for (let i = 0, len = floor.length; i < len; i++) {
							if(floor[i].overlayTexture=='electric.png' || floor[i].overlayTexture=='electricAlt.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBend.png' || floor[i].overlayTexture=='electricBend1.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBendDown.png' || floor[i].overlayTexture=='electricBendDown1.png'){
								floor[i].overlayTexture=null
							}
						}
					}
					if(targ.texture=='wireTurnDown.png' || targ.texture=='wireTurnDown1.png' || targ.texture=='wireTurnUp.png' || targ.texture=='wireTurnUp1.png'){
						for (let i = 0, len = floor.length; i < len; i++) {
							if(floor[i].overlayTexture=='electric.png' || floor[i].overlayTexture=='electricAlt.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBend.png' || floor[i].overlayTexture=='electricBend1.png'){
								floor[i].overlayTexture=null
							}
							if(floor[i].overlayTexture=='electricBendDown.png' || floor[i].overlayTexture=='electricBendDown1.png'){
								floor[i].overlayTexture=null
							}
						}
					}
					
					
					if(targ.texture != gameInfo.placing){
						targ.texture='floor.png'
						targ.texture=gameInfo.placing	
						targ.overlayTexture=null
						targ.overlayUpgrade=null
					}
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
					for (let i = 0, len = placeOptions.length; i < len; i++) {
						if(placeOptions[i].texture==gameInfo.placing){
							if(targ.texture != gameInfo.placing){
								gameInfo.money-=placeOptions[i].price	
							}
						}
					}
				}
				
				else{
					let tex=targ.texture//80% decrease, maybe 10%-30% instead
					if(tex=='elecGen.png' || tex=='electric.png' || tex=='electricAlt.png' || tex=='wireTurnDown.png' || tex=='wireTurnDown1.png' || tex=='wireTurnUp.png' || tex=='wireTurnUp1.png'){
						for (let i = 0, len = floor.length; i < len; i++) {
							if(floor[i].overlayTexture=='electric.png' || floor[i].overlayTexture=='electricAlt.png'){
								floor[i].overlayTexture=null
							}
						}
					}
					for (let i = 0, len = placeOptions.length; i < len; i++) {
						if(placeOptions[i].texture==targ.texture){
							let discount = placeOptions[i].price*0.8
							let final=placeOptions[i].price-discount
							gameInfo.money+=final
						}
					}
					targ.texture='floor.png'
					targ.overlayTexture=null
					targ.overlayUpgrade=null
				}
			}
		}

		
		/*if(targ.texture=='generator.png'){
			if(targ.cooldown>80){
				if(checkGen(i)=='convRight'){
					floor[i+1].overlayTexture='item1.png'	
				}
				if(checkGen(i)=='convUp'){
					floor[i+1].overlayTexture='item1.png'	
				}
				if(checkGen(i)=='movything'){
					floor[i+1].overlayTexture='item1.png'	
				}	
			}
			else{
				targ.cooldown++
			}
		}*/
		
		
		if(upgraderList.includes(targ.texture)){
			commitUpgrade(i,targ.texture)
		}
				
		if(targ.texture=='seller.png'){
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='item1.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=2
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='item1.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=2
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='item1.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=2
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='item1.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=2
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='item1Big.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=20
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='item1Big.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=20
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='item1Big.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=20
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='item1Big.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=20
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='blue.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=5
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='blue.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=5
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='blue.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=5
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='blue.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=5
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='blueBig.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=27
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='blueBig.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=27
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='blueBig.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=27
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='blueBig.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=27
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='red.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=10
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='red.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=10
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='red.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=10
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='red.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=10
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='redBig.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=35
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='redBig.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=35
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='redBig.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=35
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='redBig.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=35
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='purple.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=15
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='purple.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=15
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='purple.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=15
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='purple.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=15
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='purpleBig.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=40
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='purpleBig.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=40
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='purpleBig.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=40
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='purpleBig.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=40
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='black.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=20
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='black.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=20
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='black.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=20
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='black.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=20
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(2>=susUp && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			if(floor[i-1] !=null && floor[i-1].overlayTexture=='blackBig.png' && floor[i-1].texture=='convRight.png'){
				gameInfo.money+=50
				floor[i-1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			/*if(floor[i+1] !=null && floor[i+1].overlayTexture=='blackBig.png' && floor[i+1].texture=='convLeft.png'){
				gameInfo.money+=50
				floor[i+1].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i+20] !=null && floor[i+20].overlayTexture=='blackBig.png' && floor[i+20].texture=='convUp.png'){
				gameInfo.money+=50
				floor[i+20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			/*if(floor[i-20] !=null && floor[i-20].overlayTexture=='blackBig.png' && floor[i-20].texture=='movything.png'){
				gameInfo.money+=50
				floor[i-20].overlayTexture=null
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}*/
			
			
			
			
			
			
			
			
			
		}
		if(convs.includes(targ.texture)){
			conveyorMovement(i)

		}		
		
		
		
		
		
		
		
		if(targ.texture=='wire.png'){
			if(floor[i+1] !=null && floor[i+1].texture=='wire.png' && targ.overlayTexture=='electric.png'){
				floor[i+1].overlayTexture='electric.png'
			}//-------------->
			if(floor[i-1] !=null && floor[i-1].texture=='wire.png' && targ.overlayTexture=='electric.png'){
				floor[i-1].overlayTexture='electric.png'
			}//-------------->
			
			
			
			if(floor[i+1] !=null && floor[i+1].texture=='wireTurnUp.png' && floor[(i+1)-20] != null&& floor[(i+1)-20].texture=='wireAlt.png'){
				if(targ.overlayTexture=='electric.png'){
					floor[(i+1)-20].overlayTexture='electricAlt.png'
					floor[i+1].overlayTexture='electricBend.png'
				}
			}
			if(floor[i+1] !=null && floor[i+1].texture=='wireTurnDown.png' && floor[(i+1)+20] != null&& floor[(i+1)+20].texture=='wireAlt.png'){
				if(targ.overlayTexture=='electric.png'){
					floor[(i+1)+20].overlayTexture='electricAlt.png'
					floor[i+1].overlayTexture='electricBendDown.png'
				}
			}
			
			
			
			if(floor[i-1] !=null && floor[i-1].texture=='wireTurnUp1.png' && floor[(i-1)-20] != null&& floor[(i-1)-20].texture=='wireAlt.png'){
				if(targ.overlayTexture=='electric.png'){
					floor[(i-1)-20].overlayTexture='electricAlt.png'
					floor[i-1].overlayTexture='electricBend1.png'
				}
			}
			if(floor[i-1] !=null && floor[i-1].texture=='wireTurnDown1.png' && floor[(i-1)+20] != null&& floor[(i-1)+20].texture=='wireAlt.png'){
				if(targ.overlayTexture=='electric.png'){
					floor[(i-1)+20].overlayTexture='electricAlt.png'
					floor[i-1].overlayTexture='electricBendDown1.png'
				}
			}
			
			
			
			
			
			
			
			
			
		
		}		
		if(targ.texture=='wireAlt.png'){// \/
			if(floor[i+20] !=null && floor[i+20].texture=='wireAlt.png' && targ.overlayTexture=='electricAlt.png'){
				floor[i+20].overlayTexture='electricAlt.png'
			}
			if(floor[i-20] !=null && floor[i-20].texture=='wireAlt.png' && targ.overlayTexture=='electricAlt.png'){
				floor[i-20].overlayTexture='electricAlt.png'
			}
			
			
			
			
			
			
			if(floor[i-20] !=null && floor[i-20].texture=='wireTurnDown1.png' && floor[(i-20)+1].texture=='wire.png'){
				if(targ.overlayTexture=='electricAlt.png'){
					floor[(i-20)+1].overlayTexture='electric.png'
					floor[i-20].overlayTexture='electricBendDown1.png'
				}
			}
			if(floor[i-20] !=null && floor[i-20].texture=='wireTurnDown.png' && floor[(i-20)-1].texture=='wire.png'){
				if(targ.overlayTexture=='electricAlt.png'){
					floor[(i-20)-1].overlayTexture='electric.png'
					floor[i-20].overlayTexture='electricBendDown.png'
				}
			}
			
			
			
			
			
			
			
			if(floor[i+20] !=null && floor[i+20].texture=='wireTurnUp1.png' && floor[(i+20)+1].texture=='wire.png'){
				if(targ.overlayTexture=='electricAlt.png'){
					floor[(i+20)+1].overlayTexture='electric.png'
					floor[i+20].overlayTexture='electricBend1.png'
				}
			}
			
			
			
			
			if(floor[i+20] !=null && floor[i+20].texture=='wireTurnUp.png' && floor[(i+20)-1].texture=='wire.png'){
				if(targ.overlayTexture=='electricAlt.png'){
					floor[(i+20)-1].overlayTexture='electric.png'
					floor[i+20].overlayTexture='electricBend.png'
				}
			}
			

			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		if(targ.texture=='elecGen.png'){
			if(floor[i+1] !=null && floor[i+1].texture=='wire.png'){
				floor[i+1].overlayTexture='electric.png'
			}
			if(floor[i-1] !=null && floor[i-1].texture=='wire.png'){
				floor[i-1].overlayTexture='electric.png'
			}
			if(floor[i+20] !=null && floor[i+20].texture=='wireAlt.png'){
				floor[i+20].overlayTexture='electricAlt.png'
			}
			if(floor[i-20] !=null && floor[i-20].texture=='wireAlt.png'){
				floor[i-20].overlayTexture='electricAlt.png'
			}
		}
		
		if(targ.texture=='elecAutoGen.png'){
			if(targ.cooldown>=90){
				targ.cooldown=0
				if(floor[i+1] !=null && floor[i+1].overlayTexture=='electric.png' || floor[i-1].overlayTexture=='electric.png' || floor[i-20].overlayTexture=='electricAlt.png'){
					if(floor[i+20] !=null && floor[i+20].texture=='movything.png'){
						floor[i+20].overlayTexture='item1Big.png'
					}
					if(floor[i+20] !=null && floor[i+20].texture=='convLeft.png'){
						floor[i+20].overlayTexture='item1Big.png'
					}
					if(floor[i+20] !=null && floor[i+20].texture=='convRight.png'){
						floor[i+20].overlayTexture='item1Big.png'
					}
				}
			}
			else{
				targ.cooldown++
			}
		}
		
		
		
		if(targ.texture=='router.png'){
			if(targ.cooldown>=20){
				if(targ.routDirection=='1'){
					if(floor[i+20] !=null && floor[i+20].texture=='convUp.png' && floor[i+20].overlayTexture !=null){
						if(floor[i-1] !=null && floor[i-1].overlayTexture==null){
							floor[i-1].overlayTexture=floor[i+20].overlayTexture
							floor[i+20].overlayTexture=null
							targ.routDirection='2'
						}
					}
				}
				if(targ.routDirection=='2'){
					if(floor[i+20] !=null && floor[i+20].texture=='convUp.png' && floor[i+20].overlayTexture !=null){
						if(floor[i+1] !=null && floor[i+1].overlayTexture==null){
							floor[i+1].overlayTexture=floor[i+20].overlayTexture
							floor[i+20].overlayTexture=null
							targ.routDirection='1'
						}
					}
				}
			}
			else{
				targ.cooldown++	
			}
			
		}		
		
		
		if(targ.texture=='routerLeft.png'){//---->
			if(targ.cooldown>=20){
				if(targ.routDirection=='1'){
					if(floor[i-1] !=null && floor[i-1].texture=='convRight.png' && floor[i-1].overlayTexture !=null){
						if(floor[i+20] !=null && floor[i+20].overlayTexture==null){
							floor[i+20].overlayTexture=floor[i-1].overlayTexture
							floor[i-1].overlayTexture=null
							targ.routDirection='2'
						}
					}
				}
				if(targ.routDirection=='2'){
					if(floor[i-1] !=null && floor[i-1].texture=='convRight.png' && floor[i-1].overlayTexture !=null){
						if(floor[i-20] !=null && floor[i-20].overlayTexture==null){
							floor[i-20].overlayTexture=floor[i-1].overlayTexture
							floor[i-1].overlayTexture=null
							targ.routDirection='1'
						}
					}
				}
			}
			else{
				targ.cooldown++	
			}
			
		}			
		
		
		if(targ.texture=='routerRight.png'){//---->
			if(targ.cooldown>=20){
				if(targ.routDirection=='1'){
					if(floor[i+1] !=null && floor[i+1].texture=='convLeft.png' && floor[i+1].overlayTexture !=null){
						if(floor[i+20] !=null && floor[i+20].overlayTexture==null){
							floor[i+20].overlayTexture=floor[i+1].overlayTexture
							floor[i+1].overlayTexture=null
							targ.routDirection='2'
						}
					}
				}
				if(targ.routDirection=='2'){
					if(floor[i+1] !=null && floor[i+1].texture=='convLeft.png' && floor[i+1].overlayTexture !=null){
						if(floor[i-20] !=null && floor[i-20].overlayTexture==null){
							floor[i-20].overlayTexture=floor[i+1].overlayTexture
							floor[i+1].overlayTexture=null
							targ.routDirection='1'
						}
					}
				}
			}
			else{
				targ.cooldown++	
			}
			
		}		
		
		
		
		if(targ.texture=='routerUp.png'){//---->
			if(targ.cooldown>=20){
				if(targ.routDirection=='1'){
					if(floor[i-20] !=null && floor[i-20].texture=='movything.png' && floor[i-20].overlayTexture !=null){
						if(floor[i+1] !=null && floor[i+1].overlayTexture==null){
							floor[i+1].overlayTexture=floor[i-20].overlayTexture
							floor[i-20].overlayTexture=null
							targ.routDirection='2'
						}
					}
				}
				if(targ.routDirection=='2'){
					if(floor[i-20] !=null && floor[i-20].texture=='movything.png' && floor[i-20].overlayTexture !=null){
						if(floor[i-1] !=null && floor[i-1].overlayTexture==null){
							floor[i-1].overlayTexture=floor[i-20].overlayTexture
							floor[i-20].overlayTexture=null
							targ.routDirection='1'
						}
					}
				}
			}
			else{
				targ.cooldown++	
			}
			
		}
		
		
	}
	
   var imageee = new Image();
   imageee.src = floor[0].texture
   ctx.drawImage(imageee,floor[0].x,floor[0].y);
	
	if(gameInfo.placing){
   	var c=document.getElementById("myCanvas");
   	var ctx=c.getContext("2d");
   	var imagee = new Image();
   	imagee.src = gameInfo.placing
   	ctx.drawImage(imagee,x-35,y-35);
		if(gameInfo.placing=='wire.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowRight.png'
   		ctx.drawImage(imagee,(x-35)+50,y-35);
		}
		if(gameInfo.placing=='wire.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowLeft.png'
   		ctx.drawImage(imagee,(x-35)-50,y-35);
		}
		if(gameInfo.placing=='wireAlt.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowDown.png'
   		ctx.drawImage(imagee,x-35,(y-35)+50);
		}
		if(gameInfo.placing=='wireAlt.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowUp.png'
   		ctx.drawImage(imagee,x-35,(y-35)-50);
		}
		
		if(gameInfo.placing=='convUp.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowUp.png'
   		ctx.drawImage(imagee,x-35,(y-35)-50);
		}
		if(gameInfo.placing=='convRight.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowRight.png'
   		ctx.drawImage(imagee,(x-35)+50,y-35);
		}
		if(gameInfo.placing=='convLeft.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowLeft.png'
   		ctx.drawImage(imagee,(x-35)-50,y-35);
		}
		if(gameInfo.placing=='movything.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowDown.png'
   		ctx.drawImage(imagee,x-35,(y-35)+50);
		}
		
		
		
		if(gameInfo.placing=='router.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowUp.png'
   		ctx.drawImage(imagee,x-35,(y-35)+50);
   		var imagee = new Image();
   		imagee.src = 'arrowLeft.png'
   		ctx.drawImage(imagee,(x-35)-50,y-35);
   		var imagee = new Image();
   		imagee.src = 'arrowRight.png'
   		ctx.drawImage(imagee,(x-35)+50,y-35);
		}		
		if(gameInfo.placing=='routerUp.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowDown.png'
   		ctx.drawImage(imagee,x-35,(y-35)-50);
   		var imagee = new Image();
   		imagee.src = 'arrowLeft.png'
   		ctx.drawImage(imagee,(x-35)-50,y-35);
   		var imagee = new Image();
   		imagee.src = 'arrowRight.png'
   		ctx.drawImage(imagee,(x-35)+50,y-35);
		}
		if(gameInfo.placing=='routerLeft.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowDown.png'
   		ctx.drawImage(imagee,x-35,(y-35)+50);
   		var imagee = new Image();
   		imagee.src = 'arrowUp.png'
   		ctx.drawImage(imagee,x-35,(y-35)-50);
   		var imagee = new Image();
   		imagee.src = 'arrowRight.png'
   		ctx.drawImage(imagee,(x-35)-50,y-35);
		}
		if(gameInfo.placing=='routerRight.png'){	
   		var c=document.getElementById("myCanvas");
   		var ctx=c.getContext("2d");
   		var imagee = new Image();
   		imagee.src = 'arrowDown.png'
   		ctx.drawImage(imagee,x-35,(y-35)+50);
   		var imagee = new Image();
   		imagee.src = 'arrowUp.png'
   		ctx.drawImage(imagee,x-35,(y-35)-50);
   		var imagee = new Image();
   		imagee.src = 'arrowLeft.png'
   		ctx.drawImage(imagee,(x-35)+50,y-35);
		}
	}
	if(!explainDEA){
		dayTicks++
	}
	if(dayTicks>1000){
		gameInfo.currentDay++
		dayTicks=0
		gameInfo.hadEncounter=false
	}
	if(gameInfo.currentDay==100){
		day100=true
		gameInfo.currentDay++
		gameInfo.money-=1000000000	
		
	}
	if(dayTicks<1000){
		if(gameInfo.personEvent>0 && !gameInfo.hadEncounter){
			
			var deaComin = Math.floor(Math.random() * gameInfo.personEvent);
			if(2>=deaComin){
				//explainDEA=true
				gameInfo.personEvent=0
			}
		}	
		
	}
	if(day100){
			let startX=canvas.width/2	
			let startY=canvas.height
			var c=document.getElementById("myCanvas");
			var ctx=c.getContext("2d");
			var imagee = new Image();
			imagee.src = 'textbox.png'
			ctx.drawImage(imagee,startX-400,startY-200);
			var c=document.getElementById("myCanvas");
			var ctx=c.getContext("2d");
			var imagee = new Image();
			imagee.src = 'strangeman.png'
			ctx.drawImage(imagee,(canvas.width)-300,canvas.height-300);
			if(!sawOne){
				infoText='It is time for that $1000000000 you owe me.'
				let startX=canvas.width/2
				let startY=canvas.height-100
				var imageee = new Image();
				imageee.src = 'yesButton.png'
				ctx.drawImage(imageee,startX,startY);
				let setX=startX
				let setY=startY+20
				let setX1=setX+110
				let setY1=setY+70

				box_area.x1=setX
				box_area.y1=setY
				box_area.x2=setX1
				box_area.y2=setY1
				if(is_mouse_in_area()){
					var C = coords;
					C[0] = 0; 
					C[1] = 0; 
					day100=false
					infoText=""
				}

			}
		}
	
	
	
	
	
	
	
	
	
	
	
	
	if(explainDEA){	
		/*if(!makeTheDeal || !underAgent || !sawTwo || !yourMistake){
				sawOne=true
		}*/
		gameInfo.hadEncounter=true
		let startX=canvas.width/2	
		let startY=canvas.height
   	var c=document.getElementById("myCanvas");
   	var ctx=c.getContext("2d");
   	var imagee = new Image();
   	imagee.src = 'textbox.png'
   	ctx.drawImage(imagee,startX-400,startY-200);
   	var c=document.getElementById("myCanvas");
   	var ctx=c.getContext("2d");
   	var imagee = new Image();
   	imagee.src = 'strangeman.png'
   	ctx.drawImage(imagee,(canvas.width)-300,canvas.height-300);
		if(!sawOne){
			infoText='You are visted by a strange figure, you are unable to see who they are.'
			let startX=canvas.width/2
			let startY=canvas.height-100
   		var imageee = new Image();
   		imageee.src = 'whatButton.png'
   		ctx.drawImage(imageee,startX,startY);
			let setX=startX
			let setY=startY+20
			let setX1=setX+110
			let setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				infoText='I want to make a deal with you, will you accept?'
				sawOne=true
				sawTwo=true
			}
			
		}
		if(sawTwo){
			let startX=(canvas.width/2)-300
			let startY=canvas.height-100
   		var imageee = new Image();
   		imageee.src = 'yesButton.png'
   		ctx.drawImage(imageee,startX,startY);
			let setX=startX
			let setY=startY+20
			let setX1=setX+110
			let setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				var caughtRed = Math.floor(Math.random() * 10);
				if(2>=caughtRed){//add something with sus meter
					infoText='It Was A Agent In Disguise.'
					underAgent=true
				}
				else{
					infoText='"You made the correct desicion, lets get on with it."'	
					makeTheDeal=true
				}
				sawTwo=false
			}
			
			
			
			
			startX=(canvas.width/2)+100
			startY=canvas.height-100
   		var imageeee = new Image();
   		imageeee.src = 'noButton.png'
   		ctx.drawImage(imageeee,startX,startY);
			setX=startX
			setY=startY+20
			setX1=setX+110
			setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				infoText='"Your Mistake"'
				sawTwo=false
				yourMistake=true
			}
			
		}
		if(yourMistake){
			let startX=canvas.width/2
			let startY=canvas.height-100
   		var imageee = new Image();
   		imageee.src = 'whatButton.png'
   		ctx.drawImage(imageee,startX,startY);
			let setX=startX
			let setY=startY+20
			let setX1=setX+110
			let setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				infoText=''
				yourMistake=false
				explainDEA=false
				yourMistake=false
				sawOne=false
			}	
		}
		if(underAgent){
			let startX=canvas.width/2
			let startY=canvas.height-100
   		var imageee = new Image();
   		imageee.src = 'whatButton.png'
   		ctx.drawImage(imageee,startX,startY);
			let setX=startX
			let setY=startY+20
			let setX1=setX+110
			let setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				infoText=''
				yourMistake=false
				explainDEA=false
				underAgent=false
				sawOne=false
				gameInfo.currentDay+=5
			}	
		}
		if(makeTheDeal){
			let startX=canvas.width/2
			let startY=canvas.height-100
   		var imageee = new Image();
   		imageee.src = 'whatButton.png'
   		ctx.drawImage(imageee,startX,startY);
			let setX=startX
			let setY=startY+20
			let setX1=setX+110
			let setY1=setY+70
			
			box_area.x1=setX
	 		box_area.y1=setY
	 		box_area.x2=setX1
	 		box_area.y2=setY1
			if(is_mouse_in_area()){
   			var C = coords;
   			C[0] = 0; 
   			C[1] = 0; 
				infoText=''
				yourMistake=false
				explainDEA=false
				makeTheDeal=false
				sawOne=false
				let val1=10/100
				let val2=val1+1
				let val3=gameInfo.money=gameInfo.money*val2
				gameInfo.money=Math.trunc(gameInfo.money);
			}	
		}
		
	}
		
	
	
   context.fillStyle = "white";
   context.font = "bold 18px serif";
	
   context.fillText(infoText, (canvas.width / 2) -350, canvas.height-100);
	
   context.fillText("Money: "+gameInfo.money, (canvas.width / 2) - 650, (canvas.height / 2+300));
   context.fillText("Selected: "+gameInfo.placing, (canvas.width / 2) - 650, (canvas.height / 2+330));
   context.fillText("Day "+gameInfo.currentDay+"   (" +(1000-dayTicks)+" Until Next Day)", (canvas.width / 2) - 650, (canvas.height / 2+349));


    window.requestAnimationFrame(gameLoop);
}
