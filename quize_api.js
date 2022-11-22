const question = document.getElementById("question");
const container = document.getElementById('container');
const checkbox_container = document.getElementById('checkbox_container');
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const e = document.getElementById("e");
const submitter = document.getElementById("submitter");
const next = document.getElementById('next');
const back = document.getElementById('back');
const number = document.getElementById('number');
const input_a = document.getElementById('input_a');
const input_b = document.getElementById('input_b');
const input_c = document.getElementById('input_c');
const input_d = document.getElementById('input_d');
const input_e = document.getElementById('input_e');
const main = document.getElementById('main');
const nav = document.getElementById('nav');
const starter = document.getElementById('start');
const counter = document.getElementById('counter');
const section = document.getElementById('section');
const other_subjects_btn = document.getElementById('other_subjects_btn');
const other_subjects = document.getElementById('other_subjects');

other_subjects_btn.addEventListener('click',()=>{
    other_subjects.classList.toggle('flex');
});
starter.style.display = 'none';
let count = 0;

let current_subject = '';

const subjects = nav.querySelectorAll('button');
subjects.forEach(subject=>{
   subject.addEventListener('click',()=>{
    current_subject = subject.value;
    starter.style.display = 'inline';
    subject.style.background = 'blue';
    subject.style.color = 'white';
    nav.innerHTML = `${subject.value.toUpperCase()}`
   });
});

//adjust screen size
function reduce_screensize(){
    container.classList.toggle('reduce_gap');
}

let questions = [];

async function fetcher(){
    container.style.display = 'none';
    loading.textContent = 'Loading...';
    fetch(`https://questions.aloc.com.ng/api/v2/q/40?subject=${current_subject}`, { 
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json', 
         'AccessToken': 'ALOC-6c87ee0af59ce539e6df' 
        }, 
        method: "GET", 
      }).then((res)=>{return res.json() }).then(resp=>{
        if(resp){
            container.style.display = '';
            loading.textContent = '';
        }
        questions = resp.data;
        
        questions.forEach(question=>{
            question.choosen = '';
            question.result = '';
        });
         loadquestion();
         select_any();
         const checkboxes = checkbox_container.querySelectorAll('input');
         checkboxes[currentquestion].checked = true;
        //  setTimeout(submit,2400000);
        //  setInterval(()=>{
        //     count++;
        //     counter.innerHTML = count + ' minutes spent';
        //  }, 60000)
         checkboxes.forEach(checkbox=>{
            checkbox.addEventListener('click',()=>{
                  uncheck_radio();
                  currentquestion = Number(checkbox.value);
                  loadquestion();
                  tester();  
            })
          });
        }).catch((err)=>{ console.log(err) })
}

let correct = 0;
let currentquestion = 0;
let answered_questions = 0;
function select_any(){
    questions.forEach((question,i)=>{
        const span = document.createElement('span');
        span.innerHTML = `${i+1}<input type="radio" name="q" value=${i}>`
        checkbox_container.appendChild(span);
    })
}


function loadquestion(){
section.innerHTML = questions[currentquestion].section;
question.innerHTML  = questions[currentquestion].question;
number.innerHTML = `Question ${currentquestion+1} of ${questions.length}`;
a.innerHTML = 'A. ' + questions[currentquestion].option.a;
input_a.value = 'A. ' + questions[currentquestion].option.a;
b.innerHTML = 'B. ' + questions[currentquestion].option.b;
input_b.value = 'B. ' + questions[currentquestion].option.b;
c.innerHTML = 'C. ' + questions[currentquestion].option.c;
input_c.value = 'C. ' + questions[currentquestion].option.c;
d.innerHTML = 'D. ' + questions[currentquestion].option.d;
input_d.value = 'D. ' + questions[currentquestion].option.d;
//this api repeats option d in option e
// e.innerHTML = questions[currentquestion].option.e;
// input_e.value = questions[currentquestion].option.e;
};



let inputs = container.querySelectorAll('input');
inputs.forEach(input=>{
    input.addEventListener('click',()=>{
        console.log(input.value[0])
        questions[currentquestion].choosen = input.value[0].toLowerCase() ;
    })
})
function tester(){
    //CHECK ANSWER THE CHOOSEN QUESTION IF IT HAS BEEN ANSWERED
    inputs.forEach(input=>{
        if(input.value === questions[currentquestion].choosen){
            input.checked = true;
        }
    });

    //THIS WORKS TOO

    //     if(inputs[0].value === questions[currentquestion].choosen){
    //         console.log(0)
    //       return  inputs[0].checked = true;
    //      }else if(inputs[1].value === questions[currentquestion].choosen){
    //         console.log(1)
    //       return  inputs[1].checked = true;
    //      }else if(inputs[2].value === questions[currentquestion].choosen){
    //         console.log(2)
    //       return  inputs[2].checked = true;
    //      }else if(inputs[3].value === questions[currentquestion].choosen){
    //         console.log(3)
    //       return  inputs[3].checked = true;
    //      }
    
    
    // return
    
  }
 function uncheck_radio(){
    inputs.forEach(input=>{
        input.checked = false;
    });
 }
  
next.addEventListener('click',()=>{
    uncheck_radio();
    if(currentquestion < questions.length-1){
        currentquestion++;
        loadquestion()
    }else{
        currentquestion = 0;
        loadquestion();
     }
    tester();
    const checkboxes = checkbox_container.querySelectorAll('input')
    checkboxes[currentquestion].checked = true
});


back.addEventListener('click',()=>{
   uncheck_radio();
    if(currentquestion === 0){
        currentquestion = questions.length;
    }
    currentquestion--;
    loadquestion();
    tester();
    const checkboxes = checkbox_container.querySelectorAll('input')
    checkboxes[currentquestion].checked = true
});

const submit = ()=>{
    checkbox_container.remove();
    questions.forEach(question=>{
        
        if(question.choosen === question.answer ){
            correct++;
            question.result = 'correct';
        }else{question.result ='wrong'}
        
    });
document.getElementById('reducer').remove()
container.innerHTML = 
`<div class='result' >
       <span class='score'>You got ${correct} questions out of ${questions.length} correct!</span>
    <p>
       <button class='result_btns' onclick='restart()'>start another quiz</button>
       <button class='result_btns' id='corrections' onclick='corrections()'>view corrections</button>
    </p>
 </div>
 `;
}

submitter.addEventListener("click",submit);

//restart
function restart(){
    location.reload();
    start();
}
//start quiz
function start(){
    main.style.display = 'flex';//displays the questions
    fetcher();//fetches the questions
    document.getElementById('start').style.display = 'none'
}
//show corrections
function corrections(){
    document.getElementById('corrections').remove();
    questions.forEach((question,i)=>{
       let p = document.createElement('p');
        p.innerHTML =
    `<article>
        <div>Question ${i+1} of ${questions.length}</div>
      <hr>  <div>${question.question}</div><hr class="hr1" >
        <div>A. ${question.option.a}</div>
        <div>B. ${question.option.b}</div>
        <div>C. ${question.option.c}</div>
        <div>D. ${question.option.d}</div><hr>
        <div>You answered <span class='choosen'> ${question.choosen.toUpperCase()}</span></div>
        <div>You are ${question.result} </div>
        <div>Correct answer is <span class='correct_answer'> ${question.answer.toUpperCase()}</span></div>
    </article>
    `
        main.appendChild(p);//append the questions to the dom now with corrctions
    });
};