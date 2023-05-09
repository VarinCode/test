const API_KEY = '4f8a8a2bb4f9451ba40111651230705';
let CITY = document.querySelector('.box #input');
const validate = Boolean(CITY) && (CITY !== undefined);
// www.weatherapi.com
const createURL = () => {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY.value}&aqi=yes`;
    return URL;
}

/*
const Axios = async () => {
    return await new Promise(async (res , rej) => {
        try {
            res(await axios.request(createURL()));
        } catch (err){
            rej(err);
        }
    }).then(result => result)
    .catch(reason => reason);
}
*/

async function Axios() {
    if (validate) return await axios.request(createURL());
    else throw new Error('error!');
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await Axios()
        .then(res => {
            if (res.status === 200 || CITY.value === event.target[0].value) {
                const data = res.data;
                // console.log(data);
                document.querySelector('#content').innerHTML = `
                <h1 class="title">Weather App</h1>
                <div class="flex-box1">
                    <div class="layout">
                        <h2><i class="bi bi-geo-alt-fill"></i> &nbsp;${data.location.country} , ${data.location.name}</h2>     
                        <h2><i class="bi bi-calendar-fill"></i> &nbsp;${new Date().toDateString()}</h2> 
                        <h2><i class="bi bi-clock-fill"></i> &nbsp;${data.location.localtime}</h2>                       
                    </div>
                    <img src=${'https:' + data.current.condition.icon}>         
                </div>
                <div class="flex-box2">
                    <div class="layout">
                        <h1>${data.current.condition.text}</h1>  
                        <span>
                            <h2><i class="bi bi-thermometer-half"></i> ${data.current.temp_c}<sup>°</sup>C&nbsp;</h2>                     
                            <h2>, ${data.current.temp_f}<sup>°</sup>F</h2>                        
                        </span>   
                        <span>
                            <h2><i class="bi bi-clouds-fill"></i> CO:&nbsp;${data.current.air_quality.co.toFixed(2)} , O<sub>3</sub>:&nbsp;${data.current.air_quality.o3.toFixed(2)} , PM2.5:&nbsp;${data.current.air_quality.pm2_5.toFixed(2)}</h2>                     
                        </span> 
                    </div>
                </div>
            `
            }
        })
        .catch(rej => {
            console.error(rej);
            if (rej.status !== 200 || res.status === 400) {
                // document.querySelector('.start').style.visibility = "hidden";
                document.querySelector('#content').innerHTML = `
                <h1 class="error-msg">Can't find city name ${CITY.value}. please try again</h1>
                <h1 class="error-msg">${rej.code}</h1>
                <h1 class="error-msg">${rej.message}</h1>
            `
            } else {
                console.error(rej.response.status);
            }
        })
});