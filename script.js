let currentCorrect = undefined;
let colorsPerQ = 6;
let correctAmount = 0;
let done;
function generateQuestion() {
    currentCorrect = undefined;
    let rgbValues = [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
    <div class="bigt" id="value-rgb">RGB: ${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}</div>
    <div id="options"></div>
    `;
    document.body.appendChild(questionDiv);
    let options = document.getElementById('options');
    let randomNum = Math.round(Math.random()*(colorsPerQ-1))

    for(var i = 0;i<colorsPerQ;i++) {
        if(i==randomNum) {
            let newOption = document.createElement('div');
            newOption.classList.add('option');
            newOption.style.backgroundColor = `rgb(${rgbValues[0]},${rgbValues[1]},${rgbValues[2]})`;
            newOption.clicked=='false';
            options.appendChild(newOption);

            newOption.addEventListener('mouseover',() => {
                newOption.style.border = '0.2vw solid red';
            });
            newOption.addEventListener('click',() => {
                newOption.clicked = 'true';
                var options = document.getElementsByClassName('option');
                for(var j = 0;j<options.length;j++) {
                    if(options[j]!=newOption) {
                        options[j].style.border = '0.2vw solid black';
                        options[j].clicked='false';
                    }
                }
                currentCorrect = true;
            })
            newOption.addEventListener('mouseout',() => {
                if(newOption.clicked!='true') {newOption.style.border = '0.2vw solid black';}
            });
            continue;
        }
        let newOption = document.createElement('div');
        newOption.clicked='false';
        newOption.classList.add('option');
        newOption.style.backgroundColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
        options.appendChild(newOption);

        newOption.addEventListener('mouseover',() => {
            newOption.style.border = '0.2vw solid red';
        });
        newOption.addEventListener('click',() => {
            newOption.clicked = 'true';
            var options = document.getElementsByClassName('option');
            for(var j = 0;j<options.length;j++) {
                if(options[j]!=newOption) {
                    options[j].style.border = '0.2vw solid black';
                    options[j].clicked='false';
                }
            }
            currentCorrect = false;
        })
        newOption.addEventListener('mouseout',() => {
            if(newOption.clicked=='false') {newOption.style.border = '0.2vw solid black';}
        });
    }
}

let settings = document.getElementById('settings');
done = document.getElementById('done');

let qCount = 10;
let qSlider = document.getElementById('q-slider');
let cSlider = document.getElementById('c-slider');
cSlider.addEventListener('mousemove',() => {
    colorsPerQ = cSlider.value;
    document.getElementById("cnum").innerText = colorsPerQ;
})
qSlider.addEventListener('mousemove',() => {
    qCount = qSlider.value;
    document.getElementById("qnum").innerText = qCount;
})

function startGame() {
    correctAmount = 0;
    document.body.innerHTML = '';
    let i = 1;
    let newDone = document.createElement('button');
    newDone.id = 'done-q';
    newDone.innerText = 'Done';
    newDone.classList.add('bigt');
    generateQuestion();
    document.body.appendChild(newDone);
    newDone.addEventListener('click',() => {
        if(currentCorrect!=undefined) {
            if(currentCorrect) {
                correctAmount++;
            }
            if(i==qCount) {
                document.body.innerHTML = ''; 
                showResults();
                return;
            }
            document.body.innerHTML = '';
            generateQuestion();
            document.body.appendChild(newDone);
            i++
        }
    })
}
function showResults() {
    let resultsDiv = document.createElement('div');
    resultsDiv.innerHTML = `
    <div class="bigt">Results</div>
    <br><br>
    <div class="t">Colors per Question: ${colorsPerQ}</div>
    <br>
    <div class="t">Questions: ${qCount}</div>
    <br>
    <div class="t">Questions correct: ${correctAmount}</div>
    <br>
    <div class="t">Final Score: ${Math.round(correctAmount/qCount*100)}%</div>
    <br><br><br><br>
    <button class="t" onclick="regenSettings();">Back to Menu</div>
    <button class="t" onclick="startGame();">Try Again</div>
    `;
    document.body.appendChild(resultsDiv);
}
function regenSettings() {
    document.body.innerHTML='';
    document.body.appendChild(settings);
    document.body.appendChild(done);
}