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


    import Err from         '../js/s16/Err';


    const   App = () =>
    {

        let     __nav;

        let     __err;


        let     __init = () =>
        {
            hljs.highlightAll();
              
            __nav = Nav();

            __err = Err();

        };


        __init();


        return {
            isErr:          __err.getErr
        };

    };


    export default App;
