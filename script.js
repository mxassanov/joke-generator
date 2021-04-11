const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Обёртка для передачи шутки в функцию озвучки
function tellMe(joke) {
  VoiceRSS.speech({
    key: '662f9de8cc084bba9b1a61a1559fb522',
    src: joke,
    hl: 'ru-ru',
    v: 'Peter',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

function toggleButton() {
  button.disabled = !button.disabled
}

// Получаем шутки с помощью API
function getJokes() {
  // Используем прокси для обхода CORS
  const proxy = 'https://cors.bridged.cc/'
  const apiUrl = 'http://rzhunemogu.ru/RandJSON.aspx?CType=14'

  let xhr = new XMLHttpRequest()
  let url = new URL(proxy + apiUrl)
  xhr.open('GET', url, true)
  xhr.send()

  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log(`Whoops ${xhr.status} : ${xhr.statusText}`)
    } else {
      let response = xhr.response
      const data = JSON.parse(response)
      const joke = data.content
      // Вызываем обертку
      tellMe(joke)
      
      toggleButton()
    }
  }
}

button.addEventListener('click', getJokes)

// Включаем кнопку, когла воспроизведение закончится
audioElement.addEventListener('ended', toggleButton)