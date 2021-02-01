/*
  COMENTÁRIOS
  - O tamanho dos cards é formada pela diferença entre o final do evento
  e o começo do evento
  - A distância do card e o alinhamento é dado pela soma da base (topo do calendário)
  com o começo do evento
*/

function layoutDaily(events) {
  const cardArea = document.getElementById('cardArea')

  if (events) {
    // todos os eventos são tratados e recebem campos extras de checagem de 
    // margem e de largura
    for(let i = 0; i < events.length; i++) {
      events[i].splitWidth = false
      events[i].extraMargin = false
    }

    // os eventos que tiverem o final maior do que o começo do evento anterior
    // devem ter a metade da largura. Os eventos intermediários deverão ser
    // colocados na lateral para que não ocupem o mesmo espaço
    for(let i = 0; i < events.length; i++) {
      if(events[i + 1] && events[i].end > events[i + 1].start) {
        events[i].splitWidth = true
        events[i + 1].splitWidth = true


        if(!events[i].extraMargin) {
          events[i + 1].extraMargin = true
        }
      }
    }

    const getEvents = events.map((event, index) => {
      // tamanho dos cards
      const getMarginTop = event.start === 30 ? 47 : 30 + (30 * (event.start / 30 - 1))

      // distância com relação ao topo do calendário
      const getHeight = (event.end - event.start) / 30 * 25

      // largura do card
      const getWidth = event.splitWidth ? 200 : 400

      return `
        <div
          class="card"
          style="
            ${event.extraMargin ? 'margin-left: 235px;' : ''}
            width: ${getWidth}px;
            margin-top: ${getMarginTop}px;
            height: ${getHeight}px;
          "
        >
          <p>
            <span class="title">Veículo #${index + 1}</span><br/>
            Gerando texto aleatório...
          </p>
        </div>
      `
    }).join('')
  
    cardArea.innerHTML = getEvents
  }
}

const firstEvents = [
  {start: 60,  end: 120},
  {start: 270, end: 430},
  {start: 480, end: 540},
  {start: 500, end: 570},
  {start: 560, end: 610}
]


layoutDaily(firstEvents)