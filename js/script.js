const nextButtons = document.querySelectorAll('.next');
const backButtons = document.querySelectorAll('.back');
const firstbtn = document.querySelectorAll('.firstForm__btn');
let wrapper = document.querySelector('.wrapper');
let notEmptyArea = document.querySelector('.notEmptyArea');
let placeForCanva = document.querySelector('.placeForCanva');
const canvaWidth = placeForCanva.getBoundingClientRect().width;
const canvaHeight = placeForCanva.getBoundingClientRect().height;

let emptyCheck = document.getElementById('emptyCheck');
let woodCheck = document.getElementById('woodCheck');
let buildingCheck = document.getElementById('buildingCheck');

const landWidth = document.querySelector('#landWidth');
const landLength = document.querySelector('#landLength');

let activeSlideIndex = 0;

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
            [areaWidth, areaLength]= sidesCompare(Number(areaWidth), Number(areaLength));    
            dif = canvaWidth/areaWidth;
            areaWidth *= dif; //это получается уже в пикселях
            areaLength *= dif;
            console.log(areaWidth, areaLength)
            if(areaLength > canvaHeight){ //выравниваем по длине
                dif2 = canvaHeight/areaLength; 
                console.log(dif2);
                areaWidth *= dif2;
                areaLength = canvaHeight;
            }
            console.log(areaWidth, areaLength)
            placeForCanva.insertAdjacentHTML('afterbegin', `<svg width='${areaWidth}px' height='${areaLength}px'> <rect width='${areaWidth}px' height='${areaLength}px' fill='#71f37194' stroke-width='1' stroke-color='black'/></svg>`)
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