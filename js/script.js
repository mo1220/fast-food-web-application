const API_url = 'http://floating-harbor-78336.herokuapp.com/fastfood';

// const param = window.location.search
// const decodeName = decodeURI(decodeURIComponent(param)); 
const param_keyword = getParameterByName('search');
param_keyword && search(1, 10, param_keyword);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(function(){
    $('.btn_search').click(function(){
        let search_Keyword = $('#search_txt').val(); //val()함수는 input태그, textarea 태그 등에서 현재 입력되어 있는 값을 가져올 때 사용
         search(1, 10, search_Keyword);
    });

    $('#search_txt').on('keypress', function(e){
        if(e.keyCode === 13){
            $('.btn_search').trigger('click'); //trigger() 함수는 특정 엘리먼트에 강제로 이벤트를 발생시키는 함수
        }
    });

 });

 function search(page, perPage, search_Keyword){
     console.log(search_Keyword)
         if(typeof page !== 'number' || page < 1){
             page = 1;
         }
         if(typeof perPage !== 'number ' || perPage <= 0){
             perPage = 10;
         }
         $.get(API_url, {
             page: page,
             perPage: perPage,
             searchKeyword:search_Keyword
             }, function(data){
                     let list = data.list;
                     let total = data.total;

                     $('.total').html('총' + total+ '개의 패스트푸드점을 찾았습니다.');
                     let $list = $('.list').empty();
                     for(let i=0; i<list.length; i++){
                         let item = list[i];

                         let $elem = $('#item-templete')
                         .clone()
                         .removeAttr('id');


                         $elem.find('.item-no').html(i+1);
                         $elem.find('.item-name').html(item.name);
                         $elem.find('.item-addr').html(item.addr);

                         $list.append($elem);
                     }
                     showPaging(page, perPage, total, search_Keyword);
                 });
    }
    function showPaging(page, perPage, total, search_Keyword){
        let $paging = $('.paging').empty(); //empty() 셀렉트된 엘리먼트들의 자식 엘리먼트들 모두 삭제
        let numberPages = 5;
        let pageStart = Math.floor((page - 1) / numberPages) * numberPages + 1;
        let pageEnd = pageStart + numberPages - 1;
        let totalPages = Math.floor((total - 1) / perPage) + 1;

        if(pageEnd > totalPages){
            pageEnd = totalPages;
        }

        let prevPage = pageStart - 1;

        if(prevPage < 1)
            prevPage = 1;

        let nextPage = pageEnd + 1;
        if(nextPage > totalPages)
            nextPage = totalPages;

        let $prevElem = $('<a href="javascript:search('+prevPage+','+perPage+',\''+search_Keyword+'\')">이전</a>');
        $prevElem.addClass('prev');
        $paging.append($prevElem);

        for(let i=pageStart; i<=pageEnd; i++){
            let $elem = $('<a href="javascript:search('+i+','+perPage+',\''+search_Keyword+'\')">' +i+ '</a>');
                $elem.addClass('page_link');

            if(i === page ){
                $elem.addClass('current');
            }

            $paging.append($elem);
        }

         let $nextElem = $('<a href="javascript:search('+nextPage+','+perPage+',\''+search_Keyword+'\')">다음</a>');
                $nextElem.addClass('next');
                $paging.append($nextElem);
    }