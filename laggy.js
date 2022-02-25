

const laggy = document.querySelector('.laggy')
const start = document.querySelector('.start')
const difficulty = document.getElementById('difficulty');
const maxWidth = document.body.clientWidth;
const maxHeight = document.body.clientHeight;


// diffculties
let diffculties = {
    easy : 100,
    normal:500,
    impossiable:250
}


//game settings and start button

start.addEventListener('click', () => {
     


    start.style.display = 'none'
    laggy.style.display = 'block'
});


//game functionality

function changePlace (diffcultySpeed) {
    setInterval(() => {

      //get parent element width and height

      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
    
      //get a random value between min&max => width and hight

      const randomWidth = Math.random() * (width - 200 - 100 + 1) + 100;
      const randomHeight = Math.random() * (height - 200 - 100 + 1) + 100;

      //Convert random values in percentage without float

      const percentageWidth = Math.floor((randomWidth / maxWidth) * 100);
      const percentageHeight = Math.floor((randomHeight / maxHeight) * 100);

      //change button place

      laggy.style.left = `${percentageWidth}%`;
      laggy.style.top = `${percentageHeight}%`;
      
    }, diffcultySpeed);
}

laggy.addEventListener('click' , ())