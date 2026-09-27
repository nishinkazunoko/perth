

// ハンバーガー
$(function () {
	$('.ham').click(function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.globalMenu').addClass('active');
			$('body').addClass('menu-open');
			$('.globalMenu').removeClass('out');
		} else {
			$('.globalMenu').removeClass('active');
			$('.globalMenu').addClass('out');
			$('body').removeClass('menu-open');
		}
	});
});

//メニュー内を閉じておく
$(function () {
	$('.globalMenu a[href]').click(function () {
		$('.globalMenu').removeClass('active');
		$('.ham').removeClass('active');
		$('body').removeClass('menu-open');
	});
});

const menu = document.querySelector('.ham');
const gnav = document.querySelector('.globalMenu');
menu.addEventListener("click", (e) => { //ハンバーガーボタンが選択された
	if ('true' !== menu.getAttribute('aria-expanded')) {
		menu.setAttribute('aria-expanded', 'true');
	} else {
		menu.setAttribute('aria-expanded', 'false');
	}
});


//escキー押下でメニューを閉じられるように
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		menu.classList.remove("active");
		gnav.classList.remove("active");
	}
});

// もっと見るボタン
const accordion = document.querySelector('.btn_more a');
const btn = document.querySelector('.btn_more') 
let bgL = document.querySelector('.interview .deco'); 
bgL.style.display ="none";
accordion.addEventListener('click', function() {
    this.classList.toggle('active');
    let accorTar = btn.nextElementSibling;
    // accordion.textContent = this.classList.contains('active') ? '閉じる' : 'インタビューを読む';
    if (accorTar.style.maxHeight) {
        accorTar.style.maxHeight = null;
    } else {
        accorTar.style.maxHeight = accorTar.scrollHeight + "px";
				bgL.style.display ="block";
			}
});

