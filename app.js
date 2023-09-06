/* Global Variables */

// Create a new date instance dynamically with JS

const apiKey = "&appid=035f72ecbae5b6ecf582585b73fed8b4&units=imperial";
const apiUrl = "http://localhost:4800/";

const zipCodeElement = document.getElementById('zip');
const feelingsCodeElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

const catchError = (error) => console.error('some ErrorHas Been =>' , error);

document.getElementById('generate').addEventListener('click', onGenerate);

function onGenerate() {
    debugger
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        date: new Date(),
        temp:''
    };
 
    getZipCodeInformation(data.zipCode).then(async response => {
console.log(response);
if (response.status != 200)  return alert(response.message)
let responseJson =await response.json()
console.log(responseJson);
data.temp = responseJson.main.temp;
postDateToServer(data);
    }).catch(catchError);
};

async function getZipCodeInformation(zipCode) {
   let  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)

return response
}
async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
     method: 'post',
     headers: { 'content-Type': 'application/json'},
     body: JSON.stringify(data),   
    });
    try {
        if (!response.ok) {
            alert('process Not Successfuly');
            return;
        }
        response.json().then(data => {
            if (response.ok)
            updateUI();
            else
            alert('process not successfuly');
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}
    // getWeatherData return promise 

const retriveData = async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        console.log(allData)
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML = allData.data;
    }
    catch(error) {
        console.log("error", error);
    }
}