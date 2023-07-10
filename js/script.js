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
const addTree = document.querySelector('.addTree');
const addMark = document.querySelector('.addMark');
const deleteItem = document.querySelector('.delete');

let emptyCheck = document.getElementById('emptyCheck');
let woodCheck = document.getElementById('woodCheck');
let buildingCheck = document.getElementById('buildingCheck');

const landWidth = document.querySelector('#landWidth');
const landLength = document.querySelector('#landLength');

let activeSlideIndex = 0;
let oneMeter;
let aW;
let aL;


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
            gridLines = createGrids(h, aW, aL);
            placeForCanva.insertAdjacentHTML('afterbegin', `<svg width='${areaWidth}px' height='${areaLength}px' class='svgArea'> <rect width='${areaWidth}px' height='${areaLength}px' style="fill:#71f37194; stroke-width:2; stroke:black"/>${gridLines} <circle r="5" stroke="black" stroke-width="3" fill="red" class='nullPoint'/></svg>`);
            svgProcesing();
            return true;
        }
    }
    else if(slideNum==1){
    }
    return true;
};


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
};


function createGrids(h, width, height){
    let stepsByWidth = Math.round(width/h);
    let stepsByHeight = Math.round(height/h);
    let resultString = '';
    for(let i=1; i<stepsByWidth; i++){
        step = i*oneMeter*h;
        resultString += `<line x1="${step}" y1="0" x2="${step}" y2="${height*oneMeter}" style="stroke:rgb(255,0,0);stroke-width:2"/>`;
    }
    for(let i=1; i<stepsByHeight; i++){
        step = i*oneMeter*h;
        resultString += `<line x1="0" y1="${step}" x2="${width*oneMeter}" y2="${step}" style="stroke:rgb(255,0,0);stroke-width:2;"/>`;
    }
    return resultString;
};


function svgProcesing(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('click', (e)=>{
        nullPoint = document.querySelector('.nullPoint');
        nullPoint.remove();
        svgArea.insertAdjacentHTML('beforeend', `<circle cx='${e.clientX-svgArea.getBoundingClientRect().x}' cy='${e.clientY-svgArea.getBoundingClientRect().y}' r="5" stroke="black" stroke-width="3" fill="red" class='nullPoint'/>`);     
    })
};


function removeGrids(){
    let lines = placeForCanva.querySelectorAll('line');
    lines.forEach((elem)=>elem.remove())
};

//!!! доделать чтоб было красиво
function createBuilding(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('pointerdown', (e)=>{
        startX = e.clientX-svgArea.getBoundingClientRect().x;
        resX = startX;
        startY =e.clientY-svgArea.getBoundingClientRect().y;
        resY = startY;   
    }, {once: true});


    svgArea.addEventListener('pointerup', (e)=>{
        endX = e.clientX-svgArea.getBoundingClientRect().x; 
        endY =e.clientY-svgArea.getBoundingClientRect().y;
        width = endX-startX;
        height = endY-startY;
        if(startX>endX){
            resX=endX;
            width = startX-endX;
        }
        
        if(startY>endY){
            resY=endY;
            height = startY-endY;
        }
    svgArea.insertAdjacentHTML('beforeend',`<g><rect class='building landItem' x="${resX}" y="${resY}" width="${width}" height="${height}" style="fill:rgb(216, 196, 82); stroke-width:2; stroke:black"/></g>`);   
}, {once: true})
};

function createTree(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('click', (e)=>{
        x = e.clientX-svgArea.getBoundingClientRect().x;
        y = e.clientY-svgArea.getBoundingClientRect().y;
        r = 1.5 * oneMeter;
        svgArea.insertAdjacentHTML('beforeend', `<circle class='tree landItem' cx='${x}' cy='${y}' r="${r}" stroke="rgb(57, 158, 57)" stroke-width="1" fill="rgba(58, 209, 58, 0.582)"/>`);
    }, {once: true})
}

function createMark(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('click', (e)=>{
        x = e.clientX-svgArea.getBoundingClientRect().x;
        y = e.clientY-svgArea.getBoundingClientRect().y;
        d = 5;
        svgArea.insertAdjacentHTML('beforeend', `<g class='enter landItem'><line x1="${x-d}" y1="${y-d}" x2="${x+d}" y2="${y+d}" stroke-width="3" stroke="rgb(0,0,0)"/><line x1="${x-d}" y1="${y+d}" x2="${x+d}" y2="${y-d}" stroke-width="3" stroke="rgb(0,0,0)"/></g>`);
    }, {once: true})
}

function deleteLandItems(){
    svgArea = document.querySelector('.svgArea');
    svgArea.addEventListener('click', (e)=>{
    console.log(e.target)
    console.log(e.target.className.baseVal)
    if (!e.target.className.baseVal.includes('landItem')) return;
    e.target.remove();            

    }, {once: true})
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
});


woodCheck.addEventListener('change', (e)=>{
    if(e.target.checked){
        emptyCheck.setAttribute('disabled','');
    }
    else{
        emptyCheck.removeAttribute('disabled','');
    }
});


buildingCheck.addEventListener('change', (e)=>{
    if(e.target.checked){
        emptyCheck.setAttribute('disabled','');
    }
    else{
        emptyCheck.removeAttribute('disabled','');
    }
});

addBuilding.addEventListener('click', createBuilding);
addTree.addEventListener('click', createTree);
addMark.addEventListener('click', createMark);
deleteItem.addEventListener('click', deleteLandItems);


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
        removeGrids();
    }
});


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
        removeGrids();
    }
});


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
        removeGrids();
    }
});

for(button of nextButtons){
    button.addEventListener('click', ()=>{ 
        height = button.parentNode.parentNode.offsetHeight;
        if(whichButton(activeSlideIndex)){
        activeSlideIndex++;    
        wrapper.style.transform = `translateY(-${height*activeSlideIndex}px)`;             
        }        
 })
};


for(button of backButtons){
    button.addEventListener('click', ()=>{
        height = button.parentNode.parentNode.offsetHeight;
        activeSlideIndex--;
        wrapper.style.transform = `translateY(-${height*activeSlideIndex}px)`;
    });
};