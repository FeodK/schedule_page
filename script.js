const scheduleData = [
    {
      "id": 1,
      "title": "Продвинутый JavaScript",
      "time": "08:00 - 09:00",
      "maxParticipants": 10,
      "currentParticipants": 5
    },
    {
      "id": 2,
      "title": "JavaScript про API браузеров",
      "time": "09:30 - 10:30",
      "maxParticipants": 15,
      "currentParticipants": 10
    },
    {
      "id": 3,
      "title": "Фреймворк React JS",
      "time": "11:00 - 12:00",
      "maxParticipants": 20,
      "currentParticipants": 18
    }
  ];
  
  function renderSchedule() {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';
    
    scheduleData.forEach(session => {
      const sessionElement = document.createElement('div');
      sessionElement.classList.add('card', 'mb-3');
      
      sessionElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${session.title}</h5>
          <p class="card-text"><strong>Время:</strong> ${session.time}</p>
          <p class="card-text"><strong>Мест:</strong> ${session.currentParticipants} / ${session.maxParticipants}</p>
          
          <!-- Кнопки записи/отмены записи -->
          <button id="joinBtn-${session.id}" class="btn btn-primary" ${session.currentParticipants >= session.maxParticipants ? 'disabled' : ''}>
            Записаться
          </button>
          <button id="leaveBtn-${session.id}" class="btn btn-danger" ${session.currentParticipants === 0 ? 'disabled' : ''}>
            Отменить запись
          </button>
        </div>
      `;
      
      const joinBtn = sessionElement.querySelector(`#joinBtn-${session.id}`);
      const leaveBtn = sessionElement.querySelector(`#leaveBtn-${session.id}`);
      
      joinBtn.addEventListener('click', () => joinSession(session.id));
      leaveBtn.addEventListener('click', () => leaveSession(session.id));
      
      scheduleContainer.appendChild(sessionElement);
    });
  }
  
  function joinSession(sessionId) {
    const session = scheduleData.find(s => s.id === sessionId);
    if (session && session.currentParticipants < session.maxParticipants) {
      session.currentParticipants += 1;
      renderSchedule();
    }
  }

  function leaveSession(sessionId) {
    const session = scheduleData.find(s => s.id === sessionId);
    if (session && session.currentParticipants > 0) {
      session.currentParticipants -= 1;
      renderSchedule();
    }
  }
  
  $(document).ready(function() {
    renderSchedule();
  });
  