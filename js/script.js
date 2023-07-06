const nextButtons = document.querySelectorAll('.next');
const backButtons = document.querySelectorAll('.back');
const firstbtn = document.querySelectorAll('.firstForm__btn');

let wrapper = document.querySelector('.wrapper');
let notEmptyArea = document.querySelector('.notEmptyArea');
let placeForCanva = document.querySelector('.placeForCanva');
let gridChecks = document.querySelectorAll('.buttonsZone__btn')
const canvaWidth = placeForCanva.getBoundingClientRect().width;
const canvaHeight = placeForCanva.getBoundingClientRect().height;

let emptyCheck = document.getElementById('emptyCheck');
let woodCheck = document.getElementById('woodCheck');
let buildingCheck = document.getElementById('buildingCheck');

const landWidth = document.querySelector('#landWidth');
const landLength = document.querySelector('#landLength');

let activeSlideIndex = 0;
let oneMeter;


function createGrids(h, width, height){
    let stepsByWidth = Math.round(width/h);
    let stepsByHeight = Math.round(height/h);
    //console.log(width, height)
    //console.log(stepsByWidth, stepsByHeight)
    //console.log(oneMeter)
    let resultString = '';
    for(let i=1; i<stepsByWidth; i++){
       // console.log(i)
        step = i*oneMeter;
        resultString += `<line x1="${step}" y1="0" x2="${step}" y2="${height*oneMeter}" style="stroke:rgb(255,0,0);stroke-width:2"/>`
    }
    for(let i=1; i<stepsByHeight; i++){
        step = i*oneMeter;
        resultString += `<line x1="0" y1="${step}" x2="${width*oneMeter}" y2="${step}" style="stroke:rgb(255,0,0);stroke-width:2"/>`
    }
    //console.log(resultString)
    return resultString;
}


function sidesCompare(width, height){
    if(canvaHeight <= canvaWidth && height <= width){
        return [width,height]; //без изменений
    }
    else if(canvaHeight >= canvaWidth && height >= width){
        return [width,height]; //без изменений
    }
    else if(canvaHeight<canvaWidth && height>width){
        return [height,width]; //длина будет откладываться по ширине
    }
    else if(canvaHeight > canvaWidth && height < width){
        return [height,width]; //ширина будет откладываться по длине
    }
}


function whichButton(slideNum){
    if(slideNum==0){
        areaWidth = landWidth.value; //это то шо в метрах
        areaLength = landLength.value;
        if(areaWidth==0 || areaLength==0|| areaWidth==''|| areaLength==''||(!emptyCheck.checked && !woodCheck.checked && !buildingCheck.checked )){
            alert('Введите корректные значения');
            return false;
        }
        else{
            console.log('before',areaWidth, areaLength);
            [areaWidth, areaLength]= sidesCompare(Number(areaWidth), Number(areaLength));
            aL = areaLength;
            aW = areaWidth;
            console.log('after', areaWidth, areaLength);    
            dif = canvaWidth/areaWidth;
            areaWidth *= dif; //это получается уже в пикселях
            areaLength *= dif;
            console.log('dif', areaWidth, areaLength);
            if(areaLength > canvaHeight){ //выравниваем по длине
                dif2 = canvaHeight/areaLength; 
                console.log(dif2);
                areaWidth *= dif2;
                areaLength = canvaHeight;
                console.log('dif2', areaWidth, areaLength);
            }
            oneMeter = areaWidth / aW;
            oneMeter2 = areaLength / aL;
            console.log(oneMeter, oneMeter2)
            h=1;
            gridLines = createGrids(h, aW, aL)
            placeForCanva.insertAdjacentHTML('afterbegin', `<svg width='${areaWidth}px' height='${areaLength}px'> <rect width='${areaWidth}px' height='${areaLength}px' style="fill:#71f37194; stroke-width:2; stroke:black"/>${gridLines}</svg>`)
            return true;
        }
    }
    else if(slideNum==1){
        console.log(placeForCanva.getBoundingClientRect());
    }
    return true;
}


emptyCheck.addEventListener('change', (e)=>{
    if(e.target.checked){
        woodCheck.setAttribute('disabled','');
        buildingCheck.setAttribute('disabled','');
        notEmptyArea.setAttribute('style','display: none');

    }
    else{
        woodCheck.removeAttribute('disabled','');
        buildingCheck.removeAttribute('disabled','');
        notEmptyArea.removeAttribute('style','display: none');
    }
})

woodCheck.addEventListener('change', (e)=>{
    if(e.target.checked){
        emptyCheck.setAttribute('disabled','')
    }
    else{
        emptyCheck.removeAttribute('disabled','')
    }
})

buildingCheck.addEventListener('change', (e)=>{
    if(e.target.checked){
        emptyCheck.setAttribute('disabled','')
    }
    else{
        emptyCheck.removeAttribute('disabled','')
    }
})


for(button of nextButtons){
    button.addEventListener('click', ()=>{ 
        height = button.parentNode.parentNode.offsetHeight;
        if(whichButton(activeSlideIndex)){
        activeSlideIndex++;    
        wrapper.style.top = `${-height*activeSlideIndex}px`;             
        }        
 })
}

for(button of backButtons){
    button.addEventListener('click', ()=>{
        height = button.parentNode.parentNode.offsetHeight;
        activeSlideIndex--;
        wrapper.style.top = `${-height*activeSlideIndex}px`;
    });
}