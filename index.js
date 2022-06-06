const title = document.querySelector("#title")
const random_article_div = document.querySelector("#random_article")
fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
.then(response => response.json())
.then(data => {{
    console.log(data)
    title.innerHTML = data.title
    random_article_div.innerHTML = data.extract
}})
  var synth = window.speechSynthesis;

  var inputForm = document.querySelector('form');
  var voiceSelect = document.querySelector('select');
  
  var pitch = document.querySelector('#pitch');
  var pitchValue = document.querySelector('.pitch-value');
  var rate = document.querySelector('#rate');
  var rateValue = document.querySelector('.rate-value');
  var stop = document.querySelector('#stop');
  var reload = document.querySelector('#reload');
  
  var voices = [];
  
  function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if ( aname < bname ) return -1;
        else if ( aname == bname ) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }
  
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  function speak(){
      if (synth.speaking) {
          console.error('speechSynthesis.speaking');
          return;
      }
      var utterThis = new SpeechSynthesisUtterance(random_article_div.innerHTML);
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
}
  
  inputForm.onsubmit = function(event) {
    event.preventDefault();
  
    speak();
  }
  
  pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
  }
  
  rate.onchange = function() {
    rateValue.textContent = rate.value;
  }
  
  voiceSelect.onchange = function(){
    speak();
  }
  
stop.addEventListener("click", e => {
   synth.cancel()
})

reload.addEventListener("click", e => {
    synth.cancel()
    get_random_article()
 })


function get_random_article() {
    
    fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
    .then(response => response.json())
    .then(data => {{
        console.log(data)
        title.innerHTML = data.title
        random_article_div.innerHTML = data.extract
    }})
    .then( () => speak());

}



document.addEventListener('keypress', e =>{
    if (e.code == "Space") {
        synth.cancel()
    get_random_article()
    }
});
