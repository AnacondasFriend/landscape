const nextButtons = document.querySelectorAll('.next');
const backButtons = document.querySelectorAll('.back');
const firstbtn = document.querySelectorAll('.firstForm__btn');

let wrapper = document.querySelector('.wrapper');
let notEmptyArea = document.querySelector('.notEmptyArea');
let placeForCanva = document.querySelector('.placeForCanva');
const canvaWidth = placeForCanva.getBoundingClientRect().width;
const canvaHeight = placeForCanva.getBoundingClientRect().height;
let grid1 = document.getElementById('grid1');
let grid10 = document.getElementById('grid10');
let grid100 = document.getElementById('grid100');
const addBuilding = document.querySelector('.addBuilding');
const deleteBuilding = document.querySelector('.deleteBuilding');
const addTree = document.querySelector('.addTree');
const deleteTree = document.querySelector('.deleteTree');
const addMark = document.querySelector('.addMark');
const deleteMark = document.querySelector('.deleteMark');

let emptyCheck = document.getElementById('emptyCheck');
let woodCheck = document.getElementById('woodCheck');
let buildingCheck = document.getElementById('buildingCheck');

const landWidth = document.querySelector('#landWidth');
const landLength = document.querySelector('#landLength');

let activeSlideIndex = 0;
let oneMeter;
let aW;
let aL;


function createGrids(h, width, height){
    let stepsByWidth = Math.round(width/h);
    console.log(stepsByWidth)
    let stepsByHeight = Math.round(height/h);
    let resultString = '';
    for(let i=1; i<stepsByWidth; i++){
        step = i*oneMeter*h;
        resultString += `<line x1="${step}" y1="0" x2="${step}" y2="${height*oneMeter}" style="stroke:rgb(255,0,0);stroke-width:2"/>`
    }
    for(let i=1; i<stepsByHeight; i++){
        step = i*oneMeter*h;
        resultString += `<line x1="0" y1="${step}" x2="${width*oneMeter}" y2="${step}" style="stroke:rgb(255,0,0);stroke-width:2"/>`
    }
    return resultString;
}

function removeGrids(){
    let lines = placeForCanva.querySelectorAll('line');
    lines.forEach((elem)=>elem.remove())
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
function createBuilding(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('mousedown', (e)=>{
        startX = e.clientX-svgArea.getBoundingClientRect().x;
        resX = startX;
        startY =e.clientY-svgArea.getBoundingClientRect().y;
        resY = startY;
        console.log(e.clientX-svgArea.getBoundingClientRect().x, e.clientY-svgArea.getBoundingClientRect().y);   
    })
    svgArea.addEventListener('mouseup', (e)=>{
        endX = e.clientX-svgArea.getBoundingClientRect().x; 
        endY =e.clientY-svgArea.getBoundingClientRect().y
        console.log(e.clientX-svgArea.getBoundingClientRect().x, e.clientY-svgArea.getBoundingClientRect().y);
        width = endX-startX;
        height = endY-startY;
        console.log(startY)
        if(startX>endX){
            resX=endX;
            width = startX-endX;
        }
        
        if(startY>endY){
            resY=endY;
            height = startY-endY;
        }

        console.log(`<rect x="${resX}" y="${resY}" width="${width}" height="${height}"`)
    svgArea.insertAdjacentHTML('beforeend',`<rect x="${resX}" y="${resY}" width="${width}" height="${height}" style="fill:rgb(216, 196, 82); stroke-width:2; stroke:black" />`);   
    })
    
}
function svgProcesing(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('click', (e)=>{
        nullPoint = document.querySelector('.nullPoint');
        nullPoint.remove();
        //console.log(e.clientX-svgArea.getBoundingClientRect().x, e.clientY-svgArea.getBoundingClientRect().y);
        //console.log(svgArea.getBoundingClientRect().x,svgArea.getBoundingClientRect().y)
        svgArea.insertAdjacentHTML('beforeend', `<circle cx='${e.clientX-svgArea.getBoundingClientRect().x}' cy='${e.clientY-svgArea.getBoundingClientRect().y}' r="5" stroke="black" stroke-width="3" fill="red" class='nullPoint'/>`);     
    })
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
            [areaWidth, areaLength]= sidesCompare(Number(areaWidth), Number(areaLength));
            aL = areaLength;
            aW = areaWidth;  
            dif = canvaWidth/areaWidth;
            areaWidth *= dif; //это получается уже в пикселях
            areaLength *= dif;
            if(areaLength > canvaHeight){ //выравниваем по длине
                dif2 = canvaHeight/areaLength; 
                areaWidth *= dif2;
                areaLength = canvaHeight;
            }
            oneMeter = areaWidth / aW;
            h=1;
            gridLines = createGrids(h, aW, aL)
            placeForCanva.insertAdjacentHTML('afterbegin', `<svg width='${areaWidth}px' height='${areaLength}px' class='svgArea'> <rect width='${areaWidth}px' height='${areaLength}px' style="fill:#71f37194; stroke-width:2; stroke:black"/>${gridLines} <circle r="5" stroke="black" stroke-width="3" fill="red" class='nullPoint'/></svg>`);
            svgProcesing();
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

addBuilding.addEventListener('click', createBuilding)
grid1.addEventListener('change', (e)=>{
    if(e.target.checked){
        removeGrids();
        grid10.checked = false;
        grid100.checked = false;
        res = createGrids(1, aW, aL);
        svgArea = document.querySelector('.svgArea');
        svgArea.insertAdjacentHTML('beforeend', res);
    }
    else{
        removeGrids()
    }
})
grid10.addEventListener('change', (e)=>{
    if(e.target.checked){
        removeGrids();
        grid1.checked = false;
        grid100.checked = false;
        res = createGrids(10, aW, aL);
        svgArea = document.querySelector('.svgArea');
        svgArea.insertAdjacentHTML('beforeend', res);
    }
    else{
        removeGrids()
    }
})
grid100.addEventListener('change', (e)=>{
    if(e.target.checked){
        removeGrids();
        grid1.checked = false;
        grid10.checked = false;
        res = createGrids(100, aW, aL);
        svgArea = document.querySelector('.svgArea');
        svgArea.insertAdjacentHTML('beforeend', res);
    }
    else{
        removeGrids()
    }
})

for(button of nextButtons){
    button.addEventListener('click', ()=>{ 
        height = button.parentNode.parentNode.offsetHeight;
        if(whichButton(activeSlideIndex)){
        activeSlideIndex++;    
        wrapper.style.transform = `translateY(-${height*activeSlideIndex}px)`;             
        }        
 })
}

for(button of backButtons){
    button.addEventListener('click', ()=>{
        height = button.parentNode.parentNode.offsetHeight;
        activeSlideIndex--;
        wrapper.style.transform = `translateY(-${height*activeSlideIndex}px)`;
    });
}