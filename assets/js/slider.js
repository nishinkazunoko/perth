document.addEventListener('DOMContentLoaded', function () {
  const jsonFile = './assets/js/slider.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      $(document).ready(function () {
        let slider = $('.slider__list');
        const slickImgs = $('.slick__slide img.slide-img');

        // スライダー初期化関数
        function initSlider() {
          if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
          }

          slider.slick({
            autoplay: true,
            autoplaySpeed: 6000,
            arrows: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            pauseOnDotsHover: false,
            dots: true,
            initialSlide: 0,
            draggable: false,
            accessibility: false,
            swipe: false,
          });
        }

        // スライダーをすぐに初期化
        initSlider();

        // 再生停止ボタンを生成
        const wrp = $('<div>').addClass('slick__pagination-wrp');
        const slickDots = document.querySelector(".slick-dots");

        const playButton = $('<button>')
          .addClass('playButton')
          .html('<img src="https://nishinkazunoko.github.io/perth/assets/images/icon_play.png" width="30" height="30" alt="スライドを再生する">')
          .hide();

        const pauseButton = $('<button>')
          .addClass('pauseButton')
          .html('<img src="https://nishinkazunoko.github.io/perth/assets/images/icon_pause.png" width="30" height="30" alt="スライドを止める">');

        wrp.append(playButton, pauseButton, slickDots);
        $('.slider').append(wrp);

        slider.on('init', function () {
          let pagination = $('.slick-dots');

          if (pagination.length && !pagination.parent().hasClass('slick__pagination-wrp')) {
            wrp.append(pagination);
          }
        });

        // 再生・停止ボタンの処理
        $(document).on('click', '.pauseButton', function () {
          slider.slick('slickPause');
          $('.playButton').show();
          $('.pauseButton').hide();

          slickImgs.addClass('paused-animation');
          slickImgs.removeClass('zoom');
        });

        $(document).on('click', '.playButton', function () {
          slider.slick('slickPlay');
          $('.playButton').hide();
          $('.pauseButton').show();

          slickImgs.removeClass('paused-animation');
          slickImgs.addClass('zoom');
          slickImgs.addClass('zoom');
        });
      });

      // ここからメイン
      const imageList = document.getElementById('slider__list');
      const thumb = document.getElementById("thumb");

      const displayMainSlide = (slide) => {
        // メインスライドの要素を作成
        const linkItem = document.createElement('a');
        const listItem = document.createElement('div');
        listItem.classList.add('slick__slide');

        const imgElement = document.createElement('img');
        imgElement.classList.add("slide-img");

        const h2Elem = document.createElement('h2');
        h2Elem.classList.add("shi");

        const pElem = document.createElement('p');

        listItem.ariaHidden = "false";

        linkItem.href = slide.linkToColumn;

        imgElement.src = slide.src;
        imgElement.alt = `${slide.name} ${slide.place}`;

        h2Elem.textContent = slide.name;

        pElem.innerHTML = `<img src="https://nishinkazunoko.github.io/perth/assets/images/pin.png" width="16" height="22" alt="" class="pin">${slide.place}`;

        linkItem.appendChild(imgElement);
        linkItem.appendChild(h2Elem);
        linkItem.appendChild(pElem);

        listItem.appendChild(linkItem);
        imageList.appendChild(listItem);
      };

      // ここまでメイン

      // ここからサムネ
      function displayThumbs() {
        const thumbWrp = document.querySelector('.thumb');
        const moreButton = document.querySelector('.btn_thumb .js-more_button');

        let visible = 5;
        let allThumbs = [];

        data.slides.forEach((slide, index) => {
          if (slide.id === 2 || slide.id === 3) {
            const thumbListItem = document.createElement('li');

            thumbListItem.style.display = index < visible ? 'block' : 'none';

            const thumbLinkItem = document.createElement('a');
            const linkToTour = document.createElement('a');

            linkToTour.classList.add('linkToTour', 'notoSan');

            const thumbImgElement = document.createElement('img');
            thumbImgElement.classList.add('thumb-img');

            const thumbH2Elem = document.createElement('h2');
            thumbH2Elem.classList.add('shi');

            const thumbPElem = document.createElement('p');

            thumbLinkItem.href = slide.linkToColumn;
            thumbImgElement.src = slide.src;

            linkToTour.textContent = slide.linkToTourHeading;
            linkToTour.href = slide.linkToTour;
            linkToTour.setAttribute('target', '_blank');

            thumbImgElement.alt = `${slide.name} ${slide.place}`;
            thumbH2Elem.textContent = slide.name;

            thumbPElem.innerHTML = `<img src="https://nishinkazunoko.github.io/perth/assets/images/pin.png" width="16" height="22" alt="" class="pin">${slide.place}`;

            if (slide.linkToTour.trim() !== "" && slide.linkToTour.length > 0) {
              linkToTour.innerHTML = `ツアーのお申込みは<br class="for_sp">こちら<img src="https://nishinkazunoko.github.io/perth/assets/images/icon_tour.png" width="14" height="14" alt="" class="icon_tour">`;
            } else {
              linkToTour.style.display = 'none';
            }

            thumbListItem.appendChild(thumbLinkItem);
            thumbLinkItem.appendChild(thumbImgElement);

            thumbListItem.appendChild(thumbH2Elem);
            thumbListItem.appendChild(thumbPElem);
            thumbListItem.appendChild(linkToTour);

            thumbWrp.appendChild(thumbListItem);

            allThumbs.push(thumbListItem);

            // もっと見るボタンを押したら全件表示＆ボタン削除
            moreButton.addEventListener('click', () => {
              allThumbs.forEach((item) => {
                item.style.display = 'block';
              });

              moreButton.style.display = 'none';
            });

            // サムネの数が4件以下の時は「もっと見る」ボタンを非表示にする
            if (allThumbs.length <= 4) {
              allThumbs.forEach((item) => {
                item.style.display = 'block';
              });

              moreButton.style.display = 'none';
            } else {
              moreButton.style.display = 'block';
            }
          }
        });
      }

      // ここまでサムネ

      const id2 = data.slides.some(slide => slide.id === 2);
      const id3 = data.slides.some(slide => slide.id === 3);

      // id1と2の時はスライダー表示の関数実行
      data.slides.forEach(slide => {
        if (slide.id === 1 || slide.id === 2) {
          displayMainSlide(slide);
        }
      });

      // id2かid3が存在する場合に1回だけ実行
      if (id2 || id3) {
        displayThumbs();
      }
    })
    .catch(error => console.error('画像の読み込みに失敗しました:', error));
});