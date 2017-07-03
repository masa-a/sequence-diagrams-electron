/**
 * 指定した要素の幅をリサイズする関数
 * リサイズした幅はクッキーに保存する
 */
function initTableResizer(targetId){
    var target = null;
    var width;

    //指定した要素外にマウスをドラッグした場合の処理
    $(window).mousemove(function(e){
        if (target != null) {
            width = e.clientX - parseInt ($('#' + targetId).offset().left);
            $('#' + targetId).css ({ width: width + 'px' });
            return false;
        }
        return true;
    });

    //指定した要素内にマウスをドラッグした場合の処理
    $('#' + targetId).mousemove (function (e) {
        var right = parseInt ($(this).offset().left) + parseInt($(this).css("width"));
        if ((right - 10) < e.clientX) {
            if (e.clientX < (right + 10)) {
                $(this).css ({ cursor: 'col-resize' });
                return false;
            }
        }
        $(this).css ({ cursor: 'default' });
        return true;
    });

    //マウスを押した時cusorがcol-resizeになっていた場合bodyの何処にマウスを動かしてもcol-resizeになる処理
    $('#' + targetId).mousedown (function (e) {
        if ($(this).css('cursor') == 'col-resize') {
            target = $(this);
            $(document.body).css ({ cursor: 'col-resize' });
            return false;
        }
        return true;
    });

    //マウスを放したときクッキーに放したときのサイズを保存しcursorを元に戻す処理
    $(window).mouseup (function (e) {
        target = null;
        $(document.body).css ({ cursor: '' });
    });
}