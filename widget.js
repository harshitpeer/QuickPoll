(function() {

    // Localize jQuery variable
    var jQuery;
    
    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        if (script_tag.readyState) {
          script_tag.onreadystatechange = function () { // For old versions of IE
              if (this.readyState == 'complete' || this.readyState == 'loaded') {
                  scriptLoadHandler();
              }
          };
        } else { // Other browsers
          script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }
    
    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main(); 
    }
    
    /******** Our main function ********/
    function main() { 
        jQuery(document).ready(function($) { 
            var script_tag = document.getElementById('quickpoll-js')
            var url = script_tag.getAttribute("data-url");
            var autoopen = Boolean(script_tag.getAttribute("data-autoopen"));
            var color = script_tag.getAttribute("data-color");
            var css_link = $("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: url+"/assets/widget.css" ,
                id: "quickpoll-css"
            });
            css_link.appendTo('head'); 
            $( "#quickpoll-css" ).load(function() {
                jQuery.get(url+'/get.php', function(data) {
                   var quickpoll = JSON.parse(data);
                   var widgetHTML = '<div class="qp-widget"><div id="qp-box"><div class="header"><a href="https://github.com/harshitpeer/QuickPoll" target="_blank"><span class="logo"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.875,21.5c-8.86035,0 -16.125,7.26465 -16.125,16.125v86c0,8.86035 7.26465,16.125 16.125,16.125h16.125v26.16114l39.2627,-26.16114h52.1123c8.86035,0 16.125,-7.26465 16.125,-16.125v-86c0,-8.86035 -7.26465,-16.125 -16.125,-16.125zM26.875,32.25h107.5c3.02344,0 5.375,2.35156 5.375,5.375v86c0,3.02344 -2.35156,5.375 -5.375,5.375h-55.3877l-25.2373,16.83886v-16.83886h-26.875c-3.02344,0 -5.375,-2.35156 -5.375,-5.375v-86c0,-3.02344 2.35156,-5.375 5.375,-5.375zM75.25,53.75v53.75h10.75v-53.75zM96.75,75.25v32.25h10.75v-32.25zM53.75,86v21.5h10.75v-21.5z"></path></g></g></svg></span></a><span id="question"></span></div><div class="body"><div class="options" id="options"></div><div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div><div class="results" id="results"></div></div><div class="footer"></div></div><div id="qp-button"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M28.66667,21.5c-7.88333,0 -14.26335,6.45 -14.26335,14.33333l-0.05599,85.986c0,7.91917 6.41417,14.34733 14.33333,14.34733h14.31934v28.66667l28.66667,-28.66667h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-86c0,-7.88333 -6.45,-14.33333 -14.33333,-14.33333zM78.83333,50.16667h14.33333v57.33333h-14.33333zM107.5,64.5h14.33333v43h-14.33333zM50.16667,78.83333h14.33333v28.66667h-14.33333z"></path></g></g></svg><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"> </path></g></g></svg></div></div>';
                    $(document.body).append(widgetHTML);
                    
                    $("#question").html(quickpoll.question);
                    
                    $.each(quickpoll.answers, function( key, value ) {
                        $("#options").append('<div class="option" data='+key+'>'+value+'</div>');
                        $("#results").append('<div class="option" id="option_'+key+'"><div class="option-text">'+value+'</div><div class="option-result"><div class="option-bar"></div><div class="option-percent_count">0%</div></div></div>')
                    });
                    
                    $(".body").css('height', ($(".options").outerHeight() + 20) + 'px');
                    $(".loader").css('height', ($(".options").outerHeight() + 20) + 'px');
                
                    if(autoopen) {
                        $("#qp-button").toggleClass("open");
                        $("#qp-box").toggleClass("show");
                    }

                    if(color) {
                        $(".qp-widget #qp-button").css('background', color);
                        $(".qp-widget #qp-box .header").css('background', color);
                        $(".qp-widget #qp-box .body .results .option .option-result .option-bar").css('background', color);
                    }

                    $("#qp-button").click(function() {
                        $("#qp-button").toggleClass("open");
                        $("#qp-box").toggleClass("show");
                    });
                    
                
                    $(".options .option").click(function() {
                        $(".options").css('opacity' , '0');
                        $(".loader").addClass('show');
                        jQuery.get(url+'/put.php?res='+$(this).attr('data'), function(results) {
                            results = JSON.parse(results);
                            $(".body").css('height', $(".results").outerHeight() + 'px');
                            $(".loader").removeClass('show');
                            $(".results").addClass('show');
                            var i = 0;
                            $(".results").children(".option").each(function() {
                                $(this).css('opacity', 1);
                                $(this).find(".option-percent_count").html(results[i]+'%');
                                if(results[i] == 0) {
                                    $(this).find(".option-bar").css("width", '1%');
                                } else {
                                    $(this).find(".option-bar").css("width", results[i]+'%');
                                }
                                i++;
                            });
                            $(".options").hide();
                        });
                    });
                });
                
                
            });
        });
    }
    
    })(); // We call our anonymous function immediately