$(document).ready(() => {
    initTableResizer("resizer");
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().on('change', function() {
        try {
            const d = Diagram.parse(editor.getSession().getValue());
            const options = { theme: 'simple' };
            $("#diagram").html("");
            d.drawSVG('diagram', options);
        } catch (e){
        }
    });
});