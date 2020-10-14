"use strict";
jQuery(document).ready(function () {
    var wlwl_hide_popup=_wlwl_get_email_params.hide_popup;
    var color = _wlwl_get_email_params.bg_color;
    var label = _wlwl_get_email_params.label;
    var piece_coupons = _wlwl_get_email_params.coupon_type;
    var wlwl_auto_close = parseInt(_wlwl_get_email_params.auto_close);
    var wlwl_notify_position = _wlwl_get_email_params.position;
    var wlwl_show_again = _wlwl_get_email_params.show_again;
    var wlwl_show_again_unit = _wlwl_get_email_params.show_again_unit;
    var time_if_close=_wlwl_get_email_params.time_if_close;
    switch (wlwl_show_again_unit) {
        case 'm':
            wlwl_show_again *= 60;
            break;
        case 'h':
            wlwl_show_again *= 60 * 60;
            break;
        case 'd':
            wlwl_show_again *= 60 * 60 * 24;
            break;
        default:
    }
    var intent_type = _wlwl_get_email_params.intent;
    var initial_time = _wlwl_get_email_params.show_wheel;
    var wlwl_center_color = _wlwl_get_email_params.wheel_center_color;
    var wlwl_border_color = '#ffffff';
    var wlwl_dot_color = '#000000';
    var gdpr_checkbox = _wlwl_get_email_params.gdpr;
    var slice_text_color = _wlwl_get_email_params.slice_text_color;
    var wlwl_spinning_time = _wlwl_get_email_params.spinning_time;
    var slices = piece_coupons.length;
    var sliceDeg = 360 / slices;
    var deg = -(sliceDeg / 2);
    var cv = document.getElementById('wlwl_canvas');
    var ctx = cv.getContext('2d');
    var canvas_width;
    var wd_width, wd_height;
    wd_width = window.innerWidth;
    wd_height = window.innerHeight;
    if (wd_width > wd_height) {
        canvas_width = wd_height;
    } else {
        canvas_width = wd_width;
    }
    cv.width = canvas_width * 0.75 + 16;
    cv.height = cv.width;
    var width = cv.width;// size
    var center = (width) / 2; // center
    jQuery('.wheel_spin').css({'width': canvas_width * 0.75 + 16 + 'px', 'height': canvas_width * 0.75 + 16 + 'px'});
    if (_wlwl_get_email_params.pointer_position == 'center') {
        jQuery('<style type="text/css">.wlwl_pointer:before{font-size:' + parseInt(width / 4) + 'px; }</style>').appendTo('head');
    }else{
        jQuery('<style type="text/css">.wlwl_pointer:before{font-size:' + parseInt(width / 10) + 'px; }</style>').appendTo('head');
        jQuery('<style type="text/css">.wlwl_margin_position .wheel_spin_container .wlwl_pointer_content .wlwl_pointer:after{width:' + parseInt(width / 25) + 'px;height:' + parseInt(width / 25) + 'px;bottom:' + parseInt(width / 30) + 'px; }</style>').appendTo('head');
    }
    var wheel_text_size;
    wheel_text_size = parseInt(width / 28);
    if (wd_height >= 4 * wd_width / 3) {
        jQuery('.wheel_content_right').css({'width': '100%', 'max-width': '100%'});
        jQuery('.wheel-content-wrapper .wheel_content_left').css({'width': '100%','margin':0});
        jQuery('.wheel-content-wrapper .wheel_content_left .wheel_spin').css({'margin': '0 auto'});

    } else {
        var content_right_w = jQuery('.lucky_wheel_content').width();
        if (wd_width > 1.8 * wd_height) {
            jQuery('.lucky_wheel_content').css({'width': '60%'});
            content_right_w = content_right_w * 0.6;
        } else if (wd_width > 1.2 * wd_height) {
            content_right_w = content_right_w * 0.7;
            jQuery('.lucky_wheel_content').css({'width': '70%'});
        }
        jQuery('.wheel-content-wrapper .wheel_content_right').css({
            'width': content_right_w - width * 0.55 - 65 + 'px',
            'max-width': content_right_w - width * 0.55 - 65 + 'px',
            'margin-left': parseInt(width / 25)+'px'
        });
        jQuery('.wheel-content-wrapper .wheel_content_left').css({'margin-left': -canvas_width * 0.75 * 0.45 + 'px'});
    }

    function deg2rad(deg) {
        return deg * Math.PI / 180;
    }

    function drawSlice(deg, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(center, center);
        var r;
        if (width <= 480) {
            r = width / 2 - 10;
        } else {
            r = width / 2 - 14;
        }
        ctx.arc(center, center, r, deg2rad(deg), deg2rad(deg + sliceDeg));
        ctx.lineTo(center, center);
        ctx.fill();
    }

    function drawPoint(deg, color) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.arc(center, center, width / 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.clip();
        ctx.restore();
    }

    function drawBorder(borderC, dotC, lineW, dotR, des, shadColor) {
        ctx.beginPath();
        ctx.strokeStyle = borderC;
        ctx.lineWidth = lineW;
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
        ctx.shadowColor = shadColor;
        ctx.arc(center, center, center, 0, 2 * Math.PI);
        ctx.stroke();
        var x_val, y_val, deg;
        deg = sliceDeg / 2;
        var center1 = center - des;
        for (var i = 0; i < slices; i++) {
            ctx.beginPath();
            ctx.fillStyle = dotC;
            x_val = center + center1 * Math.cos(deg * Math.PI / 180);
            y_val = center - center1 * Math.sin(deg * Math.PI / 180);
            ctx.arc(x_val, y_val, dotR, 0, 2 * Math.PI);
            ctx.fill();
            deg += sliceDeg;
        }
    }

    function drawText(deg, text,color) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(deg));
        ctx.textAlign = "right";
        ctx.fillStyle = color;
        ctx.font = '300 ' + wheel_text_size + 'px Helvetica';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        text = text.replace(/&#(\d{1,4});/g, function (fullStr, code) {
            return String.fromCharCode(code);
        });
        ctx.fillText(text, 7 * center / 8, wheel_text_size / 2 - 2);
        ctx.restore();
    }

    function wlwl_trim(x) {
        return x.replace(/^\s+|\s+$/gm, '');
    }

//cookie
    function setCookie(cname, cvalue, expire) {
        var d = new Date();
        d.setTime(d.getTime() + (expire * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function overlay_function() {
        jQuery('.wlwl-overlay').on('click', function () {
            jQuery('html').removeClass('wlwl-html');
            jQuery(this).hide();
            jQuery('.wheel_icon').addClass('wlwl_show');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            var wlwl_delay = setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 1000);
            clearTimeout(wlwl_delay);
            setCookie('wlwl_cookie','closed',time_if_close);
            if (wlwl_hide_popup != 'on') {
                switch (wlwl_notify_position) {
                    case 'top-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'top-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                    case 'bottom-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'bottom-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;

                    case 'middle-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'middle-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                }
            }
        });
    }

    function spins_wheel(stop_position, result) {
        var angle = 0;
        var wheel_stop = (360 - (sliceDeg * stop_position)) + 720 * wlwl_spinning_time;
        var my_spin = setInterval(function () {
            jQuery('#wlwl_canvas').css({
                "-moz-transform": "rotate(" + angle + "deg)",
                "-webkit-transform": "rotate(" + angle + "deg)",
                "-o-transform": "rotate(" + angle + "deg)",
                "-ms-transform": "rotate(" + angle + "deg)"
            });
            jQuery('#wlwl_canvas2').css({
                "-moz-transform": "rotate(" + angle + "deg)",
                "-webkit-transform": "rotate(" + angle + "deg)",
                "-o-transform": "rotate(" + angle + "deg)",
                "-ms-transform": "rotate(" + angle + "deg)"
            });
            if (angle < 360 * 2 || angle > (wheel_stop - (360 * 3))) {
                if (angle < 360 || angle > (wheel_stop - (360 * 2))) {
                    if (angle < 360 / 2 || angle > (wheel_stop - (360))) {
                        if (angle < 360 / 4 || angle > wheel_stop - (360 / 2)) {
                            if (angle > wheel_stop - (360 / 4)) {
                                if (angle > wheel_stop - (360 / 6)) {
                                    if (angle > wheel_stop - (360 / 8)) {
                                        angle += 0.5;
                                    } else {
                                        angle += 1;
                                    }
                                } else {
                                    angle += 1.5;
                                }
                            } else {
                                angle += 2;
                            }
                        } else {
                            angle += 2.5;
                        }
                    } else {
                        angle += 3;
                    }
                } else {
                    angle += 3.5;
                }
            } else {
                angle += 4;
            }
            if (angle >= wheel_stop) {
                jQuery('#wlwl_canvas').css({
                    "-moz-transform": "rotate(" + wheel_stop + "deg)",
                    "-webkit-transform": "rotate(" + wheel_stop + "deg)",
                    "-o-transform": "rotate(" + wheel_stop + "deg)",
                    "-ms-transform": "rotate(" + wheel_stop + "deg)"
                });
                jQuery('#wlwl_canvas2').css({
                    "-moz-transform": "rotate(" + wheel_stop + "deg)",
                    "-webkit-transform": "rotate(" + wheel_stop + "deg)",
                    "-o-transform": "rotate(" + wheel_stop + "deg)",
                    "-ms-transform": "rotate(" + wheel_stop + "deg)"
                });
                jQuery('.wlwl-overlay').unbind();
                jQuery('.wlwl-overlay').on('click', function () {
                    jQuery('html').removeClass('wlwl-html');
                    jQuery(this).hide();
                    jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
                    jQuery('.wheel_spin').css({'margin-left': '0', 'transition': '2s'});
                    setTimeout(function () {
                        jQuery('.lucky_wheel_content').hide();
                    }, 2000);
                });

                jQuery('.wlwl_user_lucky').html('<div class="wlwl-frontend-result">' + result + '</div>');
                jQuery('.wlwl_user_lucky').fadeIn(300);
                if (wlwl_auto_close >0) {
                    setTimeout(function () {
                        jQuery('.wlwl-overlay').hide();
                        jQuery('html').removeClass('wlwl-html');
                        jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
                        jQuery('.wheel_spin').css({'margin-left': '0', 'transition': '2s'});
                        setTimeout(function () {
                            jQuery('.lucky_wheel_content').hide();
                        }, 2000);
                    }, wlwl_auto_close*1000);
                }
                clearInterval(my_spin);
            }
        }, 0.01);
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return pattern.test(emailAddress);
    }

    function check_email() {
        jQuery('.wlwl_field_input ').on('keypress', function (e) {
            if (jQuery(this).focus() && e.keyCode === 13) {
                jQuery('#wlwl_chek_mail').click();
            }
        });
        jQuery('#wlwl_chek_mail').on('click', function () {
            if('on'===gdpr_checkbox && !jQuery('.wlwl-gdpr-checkbox-wrap input[type="checkbox"]').prop('checked')){
                alert(_wlwl_get_email_params.gdpr_warning);
                return false;
            }
            jQuery(this).unbind();
            jQuery('.wlwl-overlay').unbind();
            var check_mail_text = jQuery(this).html();
            jQuery('#wlwl_player_mail').prop('disabled', true);
            if (getCookie('wlwl_cookie') === "") {
                if (jQuery('#wlwl_player_mail').val() != '') {
                    if (isValidEmailAddress(jQuery('#wlwl_player_mail').val())) {
                        jQuery('#error_mail').html('');
                        jQuery('#wlwl_chek_mail').addClass('wlwl-adding');
                        var wlwl_email = jQuery('#wlwl_player_mail').val();
                        var wlwl_name = jQuery('#wlwl_player_name').val();
                        jQuery.ajax({
                            type: 'post',
                            dataType: 'json',
                            url: _wlwl_get_email_params.ajaxurl,
                            data: {
                                action: 'wlwl_get_email',
                                user_email: wlwl_email,
                                user_name: wlwl_name
                            },
                            success: function (response) {
                                if (response.allow_spin === 'yes') {
                                    jQuery('.wlwl-show-again-option').hide();
                                    jQuery('.wlwl-close-wheel').hide();
                                    jQuery('.hide-after-spin').show();
                                    spins_wheel(response.stop_position, response.result_notification);

                                    setCookie('wlwl_cookie', wlwl_email, wlwl_show_again);
                                } else {
                                    alert(response.allow_spin);
                                    jQuery('#wlwl_chek_mail').removeClass('wlwl-adding');
                                    jQuery('#wlwl_player_mail').prop('disabled', false);
                                    check_email();
                                    overlay_function();
                                }
                            }
                        });

                    } else {
                        jQuery('#wlwl_player_mail').prop('disabled', false);
                        check_email();
                        overlay_function();
                        jQuery('#error_mail').html(_wlwl_get_email_params.invalid_email_warning);
                        jQuery('#wlwl_player_mail').focus();
                    }
                } else {
                    jQuery('#wlwl_player_mail').prop('disabled', false);
                    check_email();
                    overlay_function();
                    jQuery('#error_mail').html(_wlwl_get_email_params.emty_email_warning);
                    jQuery('#wlwl_player_mail').focus();
                }
            } else {
                alert(_wlwl_get_email_params.limit_time_warning);
                jQuery('#wlwl_player_mail').prop('disabled', false);
                check_email();
                overlay_function();
            }
        });
    }

    function wlwl_rand(min, max) {
        if (max > min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * (min - max + 1)) + max;
        }
    }

    overlay_function();
    check_email();
    var center1 = 32;

    if (!getCookie('wlwl_cookie') || getCookie('wlwl_cookie') == "") {
        jQuery('.hide-after-spin').bind('click', function () {
            jQuery('.wlwl-overlay').hide();
            jQuery('html').removeClass('wlwl-html');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            jQuery('.wheel_spin').css({'margin-left': '0', 'transition': '2s'});
            setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 2000);
        });

        jQuery('.wlwl-reminder-later-a').unbind();
        jQuery('.wlwl-reminder-later-a').bind('click', function () {
            setCookie('wlwl_cookie', 'reminder_later', 24 * 60 * 60);

            jQuery('.wheel_icon').addClass('wlwl_show');

            jQuery('.wlwl-overlay').hide();
            jQuery('html').removeClass('wlwl-html');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            var wlwl_delay = setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 1000);
            clearTimeout(wlwl_delay);
        });
        jQuery('.wlwl-never-again a').unbind();
        jQuery('.wlwl-never-again a').bind('click', function () {
            setCookie('wlwl_cookie', 'never_show_again', 30 * 24 * 60 * 60);

            jQuery('.wheel_icon').addClass('wlwl_show');

            jQuery('.wlwl-overlay').hide();
            jQuery('html').removeClass('wlwl-html');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            var wlwl_delay = setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 1000);
            clearTimeout(wlwl_delay);
        });
        jQuery('.wlwl-close a').on('click', function () {
            jQuery('.wlwl-overlay').hide();
            jQuery('html').removeClass('wlwl-html');
            jQuery('.wheel_icon').addClass('wlwl_show');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            var wlwl_delay = setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 1000);
            clearTimeout(wlwl_delay);
            if (wlwl_hide_popup != 'on') {
                switch (wlwl_notify_position) {
                    case 'top-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'top-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                    case 'bottom-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'bottom-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;

                    case 'middle-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'middle-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                }
            }
        });
        jQuery('.wlwl-close-wheel span').on('click', function () {
            jQuery('.wlwl-overlay').hide();
            jQuery('html').removeClass('wlwl-html');
            jQuery('.lucky_wheel_content').css({'margin-left': '-110%', 'opacity': '0'});
            var wlwl_delay = setTimeout(function () {
                jQuery('.lucky_wheel_content').hide();
            }, 1000);
            clearTimeout(wlwl_delay);
            setCookie('wlwl_cookie','closed',time_if_close);
            if (wlwl_hide_popup != 'on') {
                switch (wlwl_notify_position) {
                    case 'top-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'top-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                    case 'bottom-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'bottom-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;

                    case 'middle-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'middle-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                }
            }
        });


        jQuery('.woo-lucky-wheel-popup-icon').on('click', function () {
            jQuery('.wheel_icon').removeClass('wlwl_show');
            jQuery('.wlwl-overlay').show();
            jQuery('html').addClass('wlwl-html');
            jQuery('.lucky_wheel_content').css({'margin-left': '0', 'opacity': '1'});
            switch (wlwl_notify_position) {
                case 'top-left':
                    jQuery('.wheel_icon').css({
                        'margin-left': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(-360deg)'
                    });
                    break;
                case 'top-right':
                    jQuery('.wheel_icon').css({
                        'margin-right': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(360deg)'
                    });
                    break;
                case 'bottom-left':
                    jQuery('.wheel_icon').css({
                        'margin-left': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(-360deg)'
                    });
                    break;
                case 'bottom-right':
                    jQuery('.wheel_icon').css({
                        'margin-right': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(360deg)'
                    });
                    break;

                case 'middle-left':
                    jQuery('.wheel_icon').css({
                        'margin-left': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(-360deg)'
                    });
                    break;
                case 'middle-right':
                    jQuery('.wheel_icon').css({
                        'margin-right': '-400px',
                        'transition': '2s',
                        'transform': 'rotate(360deg)'
                    });
                    break;
            }
        });

        for (var i = 0; i < slices; i++) {
            drawSlice(deg, color[i]);
            drawText(deg + sliceDeg / 2, label[i],slice_text_color);
            deg += sliceDeg;

        }
        cv = document.getElementById('wlwl_canvas1');
        ctx = cv.getContext('2d');
        cv.width = canvas_width * 0.75 + 16;
        cv.height = cv.width;
        drawPoint(deg, wlwl_center_color);

        if (width <= 480) {
            drawBorder(wlwl_border_color, 'rgba(0,0,0,0)', 20, 4, 5, 'rgba(0,0,0,0.2)');

        } else {
            drawBorder(wlwl_border_color, 'rgba(0,0,0,0)', 30, 6, 7, 'rgba(0,0,0,0.2)');
        }

        cv = document.getElementById('wlwl_canvas2');
        ctx = cv.getContext('2d');

        cv.width = canvas_width * 0.75 + 16;
        cv.height = cv.width;
        if (width <= 480) {
            drawBorder('rgba(0,0,0,0)', wlwl_dot_color, 20, 4, 5, 'rgba(0,0,0,0)');

        } else {
            drawBorder('rgba(0,0,0,0)', wlwl_dot_color, 30, 6, 7, 'rgba(0,0,0,0)');
        }

        if (intent_type === 'popup_icon') {
            var notify_time_out = setTimeout(function () {
                jQuery('.wheel_icon').addClass('wlwl_show');
                switch (wlwl_notify_position) {
                    case 'top-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'top-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                    case 'bottom-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'bottom-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;

                    case 'middle-left':
                        jQuery('.wheel_icon').css({
                            'margin-left': '0',
                            'transition': '2s',
                            'transform': 'rotate(720deg)'
                        });
                        break;
                    case 'middle-right':
                        jQuery('.wheel_icon').css({
                            'margin-right': '0',
                            'transition': '2s',
                            'transform': 'rotate(-720deg)'
                        });
                        break;
                }

            }, initial_time * 1000);
        } else if (intent_type === 'show_wheel') {
            setTimeout(function () {
                jQuery('.wlwl-overlay').show();
                jQuery('html').addClass('wlwl-html');
                jQuery('.lucky_wheel_content').css({'margin-left': '0', 'opacity': '1'});
            }, initial_time * 1000);
        }

    }

    function drawPopupIcon() {
        cv = document.getElementById('wlwl_popup_canvas');
        ctx = cv.getContext('2d');

        for (var k = 0; k < slices; k++) {
            drawSlice1(deg, color[k]);
            deg += sliceDeg;
        }
        drawPoint1(wlwl_center_color);
        drawBorder1(wlwl_border_color, wlwl_dot_color, 4, 1, 0);

    }

    drawPopupIcon();

    function drawSlice1(deg, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(center1, center1);
        ctx.arc(center1, center1, 32, deg2rad(deg), deg2rad(deg + sliceDeg));
        ctx.lineTo(center1, center1);
        ctx.fill();
    }

    function drawPoint1(color) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(center1, center1, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    function drawBorder1(borderC, dotC, lineW, dotR, des) {
        ctx.beginPath();
        ctx.strokeStyle = borderC;
        ctx.lineWidth = lineW;
        ctx.arc(center1, center1, center1, 0, 2 * Math.PI);
        ctx.stroke();
        var x_val, y_val, deg;
        deg = sliceDeg / 2;
        var center2 = center1 - des;
        for (var i = 0; i < slices; i++) {
            ctx.beginPath();
            ctx.fillStyle = dotC;
            x_val = center1 + center2 * Math.cos(deg * Math.PI / 180);
            y_val = center1 - center2 * Math.sin(deg * Math.PI / 180);
            ctx.arc(x_val, y_val, dotR, 0, 2 * Math.PI);
            ctx.fill();
            deg += sliceDeg;
        }
    }

});
