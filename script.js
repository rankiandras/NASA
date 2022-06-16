const loadEvent = async () => {
    
    const actualDate = new Date()
    const yy = actualDate.getFullYear()
    const mm = actualDate.getMonth()+1
    const dd = actualDate.getDate()-1
    
    const apiKey = `JNA9cwnzXFKCjF5EGmALeP3hXV11JbxLz3Yngt3l`;
    const dateOfThisDate = `${yy}-${mm}-${dd}`;

    
    
    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateOfThisDate}`)
    const apodJson = await apod.json();
    const apodJsonUrl = apodJson.url;
    
    const htmlStructure = `
    <div id='today'>
        <h1 id='postOfThisDay'>Today's post</h1>
        <p id='title'>${apodJson.title}</p>
        <p id='explanationOfTdsPost'>${apodJson.explanation}</p>
        <img src="${apodJsonUrl}" alt="astronomycalPicture">
    </div>
    <div id='everyday'>
        <h4 id='postOfEveryDay'>To watch an earlier post,<br>choose a date an send it</h4>
        <input type='date' id='inputDate'>
        <button id='sendInputDate'>Send</button>
    </div>
    <div id='everydaysPost'>
        <h1>Everydays Post</h1>
        <p id="everydaysPostTitle">Title</p>
        <p id='everydaysPostExplanation'>Explanation</p>
        <img id='everydaysPostImg'src='' alt=''>
        <iframe id='everydaysPostIframe' src='' alt=''></iframe>
    </div>
    `;
    
        
    const rootElement = document.getElementById('root')
    rootElement.insertAdjacentHTML('beforeend', htmlStructure)
    
    
    const sendBtn = document.getElementById('sendInputDate')
    sendBtn.addEventListener('click', async () => {
        const newFetch = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${document.getElementById('inputDate').value}`)
        const newFetchJson = await newFetch.json();
        const newFetchJsonUrl = newFetchJson.url;


        const everydaysPostDiv = document.getElementById('everydaysPost');
        console.log(everydaysPostDiv);
        
        const everydaysPostTitle = document.getElementById('everydaysPostTitle');
        console.log(everydaysPostTitle);
        
        const everydaysPostExplanation = document.getElementById('everydaysPostExplanation');
        console.log(everydaysPostExplanation);

        const everydaysPostImg = document.getElementById('everydaysPostImg');
        console.log(everydaysPostImg);

        const everydaysPostIframe = document.getElementById('everydaysPostIframe');
        console.log(everydaysPostIframe);

        const iframeElementExists = document.contains(everydaysPostIframe)
        const imgElementExists = document.contains(everydaysPostImg)
        
        if (newFetchJson.media_type === 'image') {
            console.log(iframeElementExists);
            if (iframeElementExists) {
                everydaysPostIframe.remove(); 
                if (imgElementExists) {
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    everydaysPostImg.src = newFetchJsonUrl;
                    everydaysPostImg.alt = newFetchJson.title;
                } else {
                    const newImgElement = document.createElement('img');
                    everydaysPostDiv.appendChild(newImgElement)
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    newImgElement.src = newFetchJsonUrl;
                    newImgElement.alt = newFetchJson.title;
                    newImgElement.id = 'everydaysPostImg';                  
                }               
            } else {
                if (imgElementExists) {
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    everydaysPostImg.src = newFetchJsonUrl;
                    everydaysPostImg.alt = newFetchJson.title;
                } 
            }
        } else {
            if (imgElementExists) {
                everydaysPostImg.remove();
                if (iframeElementExists) {
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    everydaysPostIframe.src = newFetchJsonUrl;
                    everydaysPostIframe.alt = newFetchJson.title;
                } else {
                    const newIframeElement = document.createElement('iframe');
                    everydaysPostDiv.appendChild(newIframeElement)
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    newIframeElement.src = newFetchJsonUrl;
                    newIframeElement.alt = newFetchJson.title;
                    newIframeElement.id = 'everydaysPostIframe'                  
                }
            } else {
                if (iframeElementExists) {
                    everydaysPostTitle.innerHTML = newFetchJson.title
                    everydaysPostExplanation.innerHTML = newFetchJson.explanation
                    everydaysPostIframe.src = newFetchJsonUrl;
                    everydaysPostIframe.alt = newFetchJson.title;
                } 
            }
        }    
        if (!everydaysPostDiv.classList.contains('visible')) {
            everydaysPostDiv.classList.add('visible')
        }
    })
}

window.addEventListener('load', loadEvent)