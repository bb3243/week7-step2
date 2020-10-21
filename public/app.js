let trumpData;
let sizeTrumpData;
let trumpData2;
let sizeTrumpData2;


// random button
window.addEventListener('load', function () {
    console.log('page is loaded');
    fetch("Trump2.json")
    .then(response => response.json())
    .then(data => {
        console.log("number of tweets available:" + data.length);
        let nameElement = document.getElementById('Trump-tweet');
        nameElement.innerHTML = data.length;
    })

    let button = document.getElementById('trump-random-button');
    button.addEventListener('click', function() {
        fetch("Trump2.json")
        .then(response => response.json())
        .then(data => {
            console.log("Random button was clicked");
            //pick a random tweet
            let randomNumber = Math.floor(Math.random()*data.length);

            //populating the info

            let searchElement = document.getElementById('t-search');
            searchElement.innerHTML = "<h3>Search:</h3>";

            let nbrElement = document.getElementById('t-nbr');
            nbrElement.innerHTML = "<strong>#:</strong>" + randomNumber;

            let txtElement = document.getElementById('t-txt');
            txtElement.innerHTML = "<strong>Tweet:</strong>" + data[randomNumber].text;

            let favoriteElement = document.getElementById('t-favorite');
            favoriteElement.innerHTML = "<strong>Favorite:</strong> " + data[randomNumber].favorite_count;

            let retweetElement = document.getElementById('t-retweet');
            retweetElement.innerHTML = "<strong>Retweet:</strong>" + data[randomNumber].retweet_count;

            let isRetweetElement = document.getElementById('t-isRetweet');
            let conversion = data[randomNumber].is_retweet;
            if (conversion == true){
                isRetweetElement.innerHTML = "<strong>is_retweet_count:</strong> " + "Yes";             
            }else{
                isRetweetElement.innerHTML = "<strong>Is retweet:</strong> " + "No"
            }
        })

        .catch(err => {
             console.log("error!!" + error);

            let nbrElement = document.getElementById('t-txt');
            nbrElement.innerHTML = "";

            let txtElement = document.getElementById('t-txt');
            txtElement.innerHTML = "Could not find a tweet! It's a fake news!";

            let favoriteElement = document.getElementById('t-favorite');
            favoriteElement.innerHTML = "";

            let retweetElement = document.getElementById('t-retweet');
            retweetElement.innerHTML = "";

            let isRetweetElement = document.getElementById('t-isRetweet');
            isRetweetElement.src = "";
        })
    })

    
})


// search button
let button = document.getElementById('trump-button');
button.addEventListener('click', function() {
    
    fetch("Trump2.json")
    .then(response => response.json())
    .then(data => {
        console.log("Find button was clicked");
        let inputText = document.getElementById("trump-input").value;
        let inputText2 = document.getElementById("trump-input2").value;
        console.log(inputText);
        console.log(inputText2);
        let results = [];
        let results2 = [];
        if (inputText)
        {
            for (var i=0 ; i < data.length ; i++){
                if (data[i].text.includes(inputText)){
                    results.push(data[i]);
                    console.log(results);                   
                }  
            }
        }
          
        if (inputText2)
        {
            for (var j=0 ; j < data.length ; j++)
                    {
                    if (data[j].text.includes(inputText2)) {
                        results2.push(data[j]);
                        console.log(results2);                   
                    }                 
            }
        }
        console.log(results.length);
        console.log(results2.length);
        trumpData = results.length;
        trumpData2 = results2.length;
    })
})



// p5.js code 
function setup(){
    console.log("Setup!");
    const myCanvas = createCanvas(600,400);
    myCanvas.parent("canvas-container");
    

}
function draw(){
    background(250,250,250);

    // graph
    stroke(0);
    strokeWeight(1);
    line(50, 350, 550, 350);

    let sentenceNumber = 0 ;
    let sentence = ["0%", "25%", "50%", "75%","100%"];

    for (let j=0; j < 550; j+= 125){
        stroke(0);
        strokeWeight(1);
        line( j + 50, 0, j + 50 , 350);
        noStroke();
        fill(0);
        textSize(15);
        textFont('Arial');
        textStyle(NORMAL);
        text(sentence[sentenceNumber], j + 50 , 375);
        sentenceNumber +=1;
    }

    // bars
    //red
    sizeTrumpData = (trumpData*500) / 8274
    if (sizeTrumpData){
        console.log(sizeTrumpData);
        noStroke();
        fill(255,0,0);
        rect(50,50,sizeTrumpData,50)
        fill(255,0,0);
        textSize(12);
        textFont('Arial');
        text(trumpData, sizeTrumpData + 60, 80);
    }
    //blue
    sizeTrumpData2 = (trumpData2*500) / 8274
    if (sizeTrumpData2){
        console.log(sizeTrumpData2);
        noStroke();
        fill(0,0,255);
        rect(50,200,sizeTrumpData2,50)
        fill(0,0,255);
        textSize(12);
        textFont('Arial');
        text(trumpData2, sizeTrumpData2 + 60, 230);
    }

}

//server

window.addEventListener('load',()=> {
    document.getElementById('trump-button').addEventListener('click', ()=> {
        let wordSearch = document.getElementById('trump-input').value + " + " + document.getElementById('trump-input2').value ;
        console.log(wordSearch);

        //creating the object 
        let obj = {"search" : wordSearch};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noCups
        fetch('/wordSearch', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
    })

    document.getElementById('words-tracker').addEventListener('click', ()=> {
        fetch('/words')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('words-info').innerHTML = '';
            console.log(data.data);
            for(let i=0;i<data.data.length;i++) {
                let string = data.data[i].date + " : " + data.data[i].coffee;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('words-info').appendChild(elt);
            }
        })
    })
})