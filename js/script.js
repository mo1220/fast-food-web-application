var API_url = 'http://floating-harbor-78336.herokuapp.com/fastfood';

$(function(){
    $('.btn_search').click(function(){
        var search_Keyword = $('#search_txt').val(); //val()함수는 input태그, textarea 태그 등에서 현재 입력되어 있는 값을 가져올 때 사용
         search(1, 10, search_Keyword);
    });

    $('#search_txt').on('keypress', function(e){
        if(e.keyCode === 13){
            $('.btn_search').trigger('click'); //trigger() 함수는 특정 엘리먼트에 강제로 이벤트를 발생시키는 함수
        }
    });

 });

 function search(page, perPage, search_Keyword){
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
                     var list = data.list;
                     var total = data.total;

                     $('.total').html('총' + total+ '개의 패스트푸드점을 찾았습니다.');
                     var $list = $('.list').empty();
                     for(var i=0; i<list.length; i++){
                         var item = list[i];

                         var $elem = $('#item-templete')
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
        var $paging = $('.paging').empty(); //empty() 셀렉트된 엘리먼트들의 자식 엘리먼트들 모두 삭제
        var numberPages = 5;
        var pageStart = Math.floor((page - 1) / numberPages) * numberPages + 1;
        var pageEnd = pageStart + numberPages - 1;
        var totalPages = Math.floor((total - 1) / perPage) + 1;

        if(pageEnd > totalPages){
            pageEnd = totalPages;
        }

        var prevPage = pageStart - 1;

        if(prevPage < 1)
            prevPage = 1;

        var nextPage = pageEnd + 1;
        if(nextPage > totalPages)
            nextPage = totalPages;

        var $prevElem = $('<a href="javascript:search('+prevPage+','+perPage+',\''+search_Keyword+'\')">이전</a>');
        $prevElem.addClass('prev');
        $paging.append($prevElem);

        for(var i=pageStart; i<=pageEnd; i++){
            var $elem = $('<a href="javascript:search('+i+','+perPage+',\''+search_Keyword+'\')">' +i+ '</a>');
                $elem.addClass('page_link');

            if(i === page ){
                $elem.addClass('current');
            }

            $paging.append($elem);
        }

         var $nextElem = $('<a href="javascript:search('+nextPage+','+perPage+',\''+search_Keyword+'\')">다음</a>');
                $nextElem.addClass('next');
                $paging.append($nextElem);
    }