$(function () {
    const $toggles = document.querySelectorAll('.navigation');
    const $toggleBtn = document.querySelector('.menu_icon');
    const width = window.innerWidth;
    const searchBtn = document.querySelector('.search_icon');
    const modal = document.querySelector('.modal_wrap');
    const closeBtn = document.querySelector('.btn_close');
    const search = document.querySelector('.btn_search_main');

    $toggleBtn.addEventListener('click', () => {
        onToggleElement();
    });

    window.addEventListener('resize', () => {
        location.reload(true);
        if (width > 768) {
            //off toggle element
            offToggleElement();
        }
    })

    const onToggleElement = () => {
        [].forEach.call($toggles, function (toggle) {
            toggle.classList.toggle('menuBar_on');
        })
    }

    const offToggleElement = () => {
        [].forEach.call($toggles, function (toggle) {
            toggle.classList.remove('menuBar_on');
        })
    }

    // header event control
    if (width > 768) {
        console.log('768px보다 커요')
        //off toggle element
        offToggleElement();

        $('.main_menu').hover(function () {
            console.log('hover');

            $('.sub_list').css('display', 'block');
            $('.sub_menu_wrap').addClass('on');
            $('.sub_menu_wrap').hover(function () {

            }, function () {
                $('.sub_list').css('display', 'none');
                $('.sub_menu_wrap').removeClass('on');

            });
        });
    }
    else if (width >= 320 && width <= 768) {
        console.log('768px보다 작아요.')

        const subMenu = $('.sub_list');
        let setClick = false;

        $('.main_menu').each(function (i) {
            $(this).click(function (e) {
                console.log(setClick);
                if (!setClick) {
                    e.preventDefault();
                    console.log(i);
                    $(subMenu[i]).addClass('submenu_active');

                    return setClick = true;

                }
                else {
                    $(subMenu[i]).removeClass('submenu_active');

                    return setClick = false;
                }
            });
        });
    }

    // 검색
    searchBtn.addEventListener('click', () => {
        modal.style.display = "block";
        document.body.classList.add("stop-scrolling");//스크롤 막기
    })

    search.addEventListener('click', () => {
        let search_keyword = $('#search_txt').val();
        // let encode_keyword = encodeURI(encodeURIComponent(search_keyword));
        window.location = `searchFastFood.html?search=${search_keyword}`;
    })

    $('#search_txt').on('keypress', function(e){
        if(e.keyCode === 13){
            $('.btn_search').trigger('click'); //trigger() 함수는 특정 엘리먼트에 강제로 이벤트를 발생시키는 함수
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.classList.remove("stop-scrolling");
    })
});

// main baner - slide
let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlides(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('slides');
    const dots = document.getElementsByClassName('dot');

    $('.next').css('display', 'block');
    $('.prev').css('display', 'block');

    if (n === slides.length) {
        $('.next').css('display', 'none');
    }
    if (n === 1) {
        $('.prev').css('display', 'none');
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < slides.length; i++) {
        dots[i].className = dots[i].className.replace('active', '');
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}