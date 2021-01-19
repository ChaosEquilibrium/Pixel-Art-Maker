function handlerClickCanvas(e) {
    //drawing pixels
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    x1 = Math.floor(x / sizePixel) * sizePixel;
    y1 = Math.floor(y / sizePixel) * sizePixel;
    canv.fillRect(x1, y1, sizePixel, sizePixel);
}

function netDrawing() {
    for (i = 0; i < sizePixel * amount; i += sizePixel)
        for (let j = 0; j < sizePixel * amount; j += sizePixel) canv.strokeRect(i, j, sizePixel, sizePixel)
}
const sizePixel = 10; //size of square
const amount = 50; //amount of squares in canvas
canvas = document.getElementById('canvas');
canvas.setAttribute('width', sizePixel * amount);
canvas.setAttribute('height', sizePixel * amount);
const rect = canvas.getBoundingClientRect();
canv = canvas.getContext("2d");
canv.fillStyle = "#EE8434";
canv.strokeStyle = "#0E0004"; //for drawing a net
netDrawing();
canv.lineWidth = 1;
aDnld = document.getElementsByTagName("a")[0];
var img = new Image();


// Making a click on input after click on span
span_overs = document.getElementsByClassName("colour");
[...span_overs].forEach(function (span_over) {
    span_over.addEventListener('click', e => e.target.parentNode.parentNode.getElementsByTagName("input")[0].click());
});
// Set the same colour for span and for pen after choosing a colour
input_overs = document.getElementsByClassName("inpColor");
[...input_overs].forEach(function (input_over) {
    input_over.addEventListener('change', e => {
        e.target.parentNode.getElementsByTagName("span")[0].style.backgroundColor = e.target.value;
        if (e.target.classList.contains("backColor")) {
            canvas.style.backgroundColor = e.target.value;
            btns[0].click();
        }
        else {
            canv.fillStyle = e.target.value
        }
    })
});
//clear canvas
btns = document.getElementsByTagName("button");
btns[0].addEventListener('click', e => {
    canv.clearRect(0, 0, sizePixel * amount, sizePixel * amount);
    netDrawing();
});
//save canvas
btns[1].addEventListener('click', e => {
    var string = canvas.toDataURL(); //get url
    aDnld.href=string;
    aDnld.click();
});

//download image on canvas
//save canvas
img.addEventListener('load', function() {
    // Вывод картинки
    btns[0].click();
    canv.drawImage(img, 0,0,sizePixel * amount, sizePixel * amount);
});

btns[2].addEventListener('click', e => {//click hidded input
    inp.value=null;//clean in case user wants to choose the same file
    inp.click(); 
});

inp.addEventListener('change', e => {
    img.src = URL.createObjectURL(e.target.files[0]);
});

//drawing
canvas.addEventListener('mousedown', handlerClickCanvas);