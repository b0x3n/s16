/**********************************************************
 * s16/source/js/www/Nav.js
 * 
 */

    const   NAV_STATE_HIDDEN        = -1;
    const   NAV_STATE_LOCKED        = 0;
    const   NAV_STATE_VISIBLE       = 1;


    const   Nav = (
    ) =>
    {

        let     _links = [
            "Home",
            "Terminal",
            "Documentation"
        ];


        let     _currentLink = _links[0];
        let     _currentState = NAV_STATE_HIDDEN;


        let     _nav_height;


        let     __init = () =>
        {
            if (typeof localStorage !== 'undefined')
                __setCurrentLink();
            else
                _currentLink = _links[0].toLowerCase();

            $('#nav_header').css({
                'display': 'none',
                'opacity': '0.01'
            });

            __initDefaultNav();
            __initMouseEvents();
            __loadPages();

            $(`#page_${_currentLink}`).css({
                'display': 'block',
                'opacity': '0.99'
            });

            console.log('Nav module initialised');
            console.log(`Showing page ${_currentLink}`);
        };


        let     __setCurrentLink = () =>
        {
            if (typeof localStorage !== 'undefined') {
                if (typeof localStorage.getItem('s16_current_page') !== null)
                    _currentLink = localStorage.getItem('s16_current_page');
                else
                    _currentLink = _links[0].toLowerCase();
            }
            else
                _currentLink = _links[0].toLowerCase();

            let _buildLink = _currentLink;
            let _linkInitial = _buildLink.substr(0, 1).toUpperCase();

            _currentLink = _linkInitial + _buildLink.substr(1);

            if (_links.indexOf(_currentLink) < 0) {
                _currentLink = _links[0].toLowerCase();
                return;
            }

            _currentLink = _currentLink.toLowerCase();
            
            if (typeof localStorage !== 'undefined') 
                    localStorage.setItem('s16_current_page', _currentLink);
        };


        let     __setCurrentPage = pageName =>
        {
            _currentLink = pageName;

            if (typeof localStorage !== 'undefined')
                localStorage.setItem('s16_current_page', pageName);
        };


        let     __initDefaultNav = () =>
        {
            let     __html = '';

            _links.forEach(link => {
                __html += `<div id="nav_link_${link.toLowerCase()}" class="link" style="margin: 0;">${link}</div>`;
            });

            $('#nav_links').css({
                'display': 'none',
                'opacity': '0.01'
            });

            $('#nav_links').html(__html);

            _nav_height = parseInt($('#nav_links').css('height').replace('px', ''));
        };


        let     __initMouseEvents = () =>
        {
            $('#nav').on('mouseenter', () => {
                if (_currentState !== NAV_STATE_HIDDEN)
                    return;

                _currentState = NAV_STATE_LOCKED;

                $('#nav_expand').stop().animate({
                    'opacity': '0.01'
                }, 100, "linear");
                
                $('#nav').stop().animate({
                    'width': '200px'
                }, 100, "linear", function() {
                    $('#nav_header').css({
                        'display': 'block',
                        'opacity': '0.01'
                    });

                    $('#nav_header').stop().animate({
                        'opacity': '0.99'
                    }, 100, "linear", function() {
                        __showNavLinks();
                    });
                });
            });
            
            $('#nav').on('mouseleave', () => {
                if (_currentState !== NAV_STATE_VISIBLE)
                    return;

                _currentState = NAV_STATE_LOCKED;

                __hideNavLinks((_links.length - 1));
            });

            $('.link').on('click', function() {
                let     _page = $(this).attr('id').substr(9);

                if (_page === _currentLink)
                    return;

                $(`#page_${_currentLink}`).css({
                    'opacity': '0.01',
                    'display': 'none'
                });
                
                __setCurrentPage(_page);

                $(`#page_${_currentLink}`).css({
                    'opacity': '0.99',
                    'display': 'block'
                });

                $('#nav').trigger('mouseout');
            });
        };


        let     __loadPages = () =>
        {
            _links.forEach(link => {
                $(`#page_${link.toLowerCase()}`).load(`https://github.com/b0x3n/s16/public/pages/${link}.html`);
            });
        };


        let     __showNavLinks = () =>
        {
            $('#nav_links').css({
                'top': `calc((90vh - ${_nav_height}px) / 2)`
            });

            $('#nav_links div').css({
                'opacity': '0.01'
            });

            $('#nav_links').css({
                'display': 'block',
                'opacity': '0.99'
            });

            __showNavLink();

            _currentState = NAV_STATE_VISIBLE;
        };


        let     __showNavLink = (
            index = 0,
            duration = 100
        ) =>
        {
            if (index >= _links.length) {
                _currentState = NAV_STATE_VISIBLE;
                return;
            }

            if (_links[index].toLowerCase() === _currentLink)
            {
                $(`#nav_link_${_links[index].toLowerCase()}`).css({
                    'background-color': '#FFF',
                    'color': '#000',
                    'cursor': 'default'
                });
            } else {
                $(`#nav_link_${_links[index].toLowerCase()}`).css({
                    'background-color': '#000',
                    'color': 'rgba(24, 220, 120, 1)',
                    'cursor': 'pointer'
                });
            }

            $(`#nav_link_${_links[index].toLowerCase()}`).css({
                'display': 'block',
                'opacity': '0.01'
            });

            $(`#nav_link_${_links[index].toLowerCase()}`).stop().animate({
                'opacity': '0.90'
            }, duration, "linear", function() {
                __showNavLink((index + 1), duration);
            });
        };


        let     __hideNavLinks = (
            index = 0,
            duration = 100
        ) =>
        {
            $(`#nav_link_${_links[index].toLowerCase()}`).stop().animate({
                'opacity': '0.01'
            }, duration, "linear", function() {
                $(`#nav_link_${_links[index].toLowerCase()}`).css({
                    'display': 'none'
                });

                if (index === 0)
                    return __hideNav();

                __hideNavLinks((index - 1));
            });
        };


        let     __hideNav = () =>
        {
            $('#nav_links').css({
                'display': 'none',
                'opacity': '0.01'
            });

            $('#nav_expand').stop().animate({
                'opacity': '0.99'
            }, 100, "linear");

            $('#nav_header').stop().animate({
                'opacity': '0.01'
            }, 100, "linear", function() {
                $('#nav_header').css({
                    'display': 'none'
                });
                
                $('#nav').stop().animate({
                    'width': '1.5vw'
                }, 100, "linear", function() {

                    _currentState = NAV_STATE_HIDDEN;
                });

                return;
            });
        };


        __init();


        return {
            //
        };

    };


    export default Nav;
