document.addEventListener('DOMContentLoaded', function () {
  const jsonFile = './assets/js/tourList.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const tourList = document.getElementById('tourList'); 
      data.tours.forEach(tour => {
        const tourListItem = document.createElement('li');
        const tourListHref = document.createElement('a');
        tourListHref.setAttribute('target', '_blank');
        // tourListTxt.textContent = tour.name;
        tourListHref.href = tour.href;
        tourListHref.innerHTML = `<p>${tour.name}</p><img src="https://nishinkazunoko.github.io/perth/assets/images/icon_tour.png" width="20" height="20" alt="" class="icon_tour">`;
      
        // tourListItem.appendChild(tourListTxt);
        tourListItem.appendChild(tourListHref);
        tourList.appendChild(tourListItem);
      });

      // ０件の場合、文言を表示
      // console.log(data.tours);
      const isEmpty = Object.keys(data.tours).length === 0 ;
      // console.log(isEmpty);
      const tourListItemEmp = document.createElement('li');
      tourListItemEmp.style.display = isEmpty > 0 ? 'block' : 'none';
      tourListItemEmp.classList.add("emp")
      tourListItemEmp.innerHTML = `<p class="notoSan">現在、参加募集中のツアーはございません。</p>`
      tourList.appendChild(tourListItemEmp);
    })
    .catch(error => console.error('読み込みに失敗しました:', error));
});

