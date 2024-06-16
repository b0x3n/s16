/**********************************************************
 * s16/source/js/App.js
 * 
 */

    import Nav from         './www/Nav';


    import hljs from        'highlight.js/lib/core';

    //import              'highlight.js/styles/github-dark.min.css';

    import javascript from  'highlight.js/lib/languages/javascript';
    import css from         'highlight.js/lib/languages/css';

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);


    import Err from         '../../s16/Err';;

    import RAM from         '../../s16/RAM';

    import S16 from         '../../s16/S16';

    const   App = () =>
    {

        let     __nav;

        let     __err;

        let     __ram;

        let     __s16;


        let     __init = () =>
        {
            hljs.highlightAll();

            __err = Err();

            __nav = Nav(__err);
            __ram = RAM(__err);

            __s16 = S16(
                __err,
                __ram
            );
        };


        __init();


        return {
            isErr:          __err.getErr
        };

    };


    export default App;
