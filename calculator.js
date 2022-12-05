var input = document.getElementById('ip')
var input2 = document.getElementById('ip2');
var calculator_btn = document.getElementById('calculator_btn');
var calculator = document.getElementById('calculator');
const exam = document.getElementById('exam');

const medium_screen = window.matchMedia('(max-width:700px)');
const small_screen = window.matchMedia('(max-width:430px)');

function adjust_screen(){
 window.onresize = ()=>{
  if(small_screen.matches){
    calculator.style.margin = '0px 5px';
  }else if(medium_screen.matches){
    calculator.style.margin = '0px 100px';
  }
 }
}
calculator_btn.addEventListener('click',()=>{
  if( calculator.style.display === 'flex'){
    calculator.style.margin = '';
    exam.classList.toggle('exam');
    calculator.style.display = 'none';
    calculator_btn.textContent = 'Calculator';
  }else{
    if(small_screen.matches){
      calculator.style.margin = '0px 5px';
    }else if(medium_screen.matches){
      calculator.style.margin = '0px 100px';
    }
    adjust_screen();
    exam.classList.toggle('exam');
    calculator.style.display = 'flex';
    calculator_btn.textContent = '❌ Hide Calculator';
  }
});
function ans(){
   input2.value = input.value;
   input.value = ""
}
function clean(){
input2.value = '';
input.value = '';
}
function del(){
var a = input2.value;
b = a.toString().slice(0,-1);
input2.value = b;
// console.log(b)
}
 function maths(){
   input.value = eval(input2.value);
   //eval() is a dangerous function, don't use for a serious app/site
 }

 function CalScreen(bta){
 return input2.value += bta;}
   var btn = document.getElementsByClassName('bt')
   for(let i = 0;i<btn.length;i++){
      var btnvalue= btn[i].value;
     // function CalScreen(){
     // input2.value += btn[i].value;}
 btn[i].addEventListener('click',CalScreen.bind(this,btnvalue))
}
   
