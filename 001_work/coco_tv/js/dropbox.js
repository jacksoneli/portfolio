$(document).ready(function(){

    $( ".btn_drop" ).click(function() {
         $(this).next().toggleClass("on");
         return false;
    });
    $( ".btn_save,.btn_close,.btn_close_check" ).click(function() {
         $(this).parent().removeClass("on");
         return false;
    });
    $( ".dropBox ul li a" ).click(function() {
         $(this).parent().parent().parent().removeClass("on").prev(".btn_drop").text($(this).text());
         return false;
    });
    $(".dropBox ul li label").click(function() {
        if($(this).children("input").is(':checked')) {
            $(this).parent().addClass("on");
        } else {
            $(this).parent().removeClass("on");
        }
        if(!$(this).children("input").is(":checked")) {
            $(this).parent().siblings("li.check_all").removeClass("on").find("input").prop("checked", false);
        }
        else {
            var li_nav = $(this).parent().parent().children("li");
            if(li_nav.not(".check_all").find("input:checked").size() == li_nav.size()-1) {
                $(this).parent().siblings("li.check_all").addClass("on").find("input").prop("checked", true);
            }
        }
    });
    $(".dropBox ul li.check_all label").click(function() {
        if($(this).children("input").is(":checked")) {
            $(this).parent().siblings("li").addClass("on").find("input").prop("checked", true);
        }
        else {
            $(this).parent().siblings("li").removeClass("on").find("input[type=checkbox]").prop("checked", false);
        }
    });
    $( ".btn_save,.btn_close_check" ).click(function() {
        if($(this).siblings("ul").find("li.check_all").children().children("input").is(":checked")) {
            $(this).parent().prev(".btn_drop").text("All");
        }
        else {
            var input_checked = $(this).siblings("ul").find("input:checked");
            if((input_checked.size()) > 1){
                $(this).parent().prev(".btn_drop").text(input_checked.first().parent().text()+" 외"+(input_checked.size()-1));
            }
            else if(($(this).siblings("ul").find("input:checked").size()) == 1){
                $(this).parent().prev(".btn_drop").text(input_checked.first().parent().text());
            }
            else {
                $(this).parent().prev(".btn_drop").text("Select(Checkbox)");
             }
        }
        return false;
    });
});
