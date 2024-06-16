/**********************************************************
 * s16/source/js/s16/Err.js
 * 
 * Very basic error handling module.
 * 
 * The verbose paramter can be set to true, this will
 * allow the _verbose() method to output messages
 * either to the console or via a custom function.
 * 
 * See the _verbose() method for more info.
 * 
 */

    const   Err = (

        verbose = true

    ) =>
    {

        let     _error_msg;


/**********************************************************
 * __init()
 * 
 * Constructor - initialises _error_msg.
 * 
 */
        let     __init = (
            error_msg = false
        ) =>
        {
            _error_msg = error_msg;
        };


/**********************************************************
 * _setErr()
 * 
 * If error_msg is false then _setErr() will reset the
 * _error_msg to false (no errors).
 * 
 * Otherwise, error_msg will be copied to _error_msg.
 * 
 * We can record multiple error messages in the _error_msg
 * buffer - error messages in _error_msg will be separated
 * by \n characers.
 *
 * _setErr() always returns _error_msg.
 *  
 */
        let     _setErr = (
            error_msg = false
        ) =>
        {
            if (error_msg === false)
                // Reset.
                _error_msg = false;
            else
                // Add/append error_msg to _error_msg.
                _error_msg ? _error_msg += `\n${error_msg}` : _error_msg = error_msg;

            return _error_msg;
        };


/**********************************************************
 * _getErr()
 * 
 * Returns the _error_msg buffer which will be false if
 * there are no errors to report - we can do something
 * like:
 * 
 *      let err_module = Err();
 * 
 *      // Do stuff...
 *      ...
 * 
 *      // Check for errors...
 *      let err_messages = err_module.getErr())
 * 
 *      if (err_messages)
 *          // The _error_msg is not false, there is/are
 *          // error(s).
 *          ...
 *      else
 *          // The _error_msg is false - no errors.
 *          ...
 * 
 * The report_errors parameter can be set to true, in
 * which case if there are any errors in the _error_msg
 * buffer they will be output via console.error():
 * 
 *      if (err_module.getErr(true))
 *          // Error messages were dumped to console.
 *          return;
 * 
 * Alternatively, we can use report_errors as a callback
 * and have _getErr() call our function and pass the
 * _error_msg buffer as a parameter:
 * 
 *      function err_alert(error_msg) {
 *          alert(error_msg);
 *      }
 * 
 *      if (err_module.getErr(error_alert))
 *          // Error messages were handled by err_alert().
 *          return;
 * 
 * Leaving report_errors as false means _getErr() will
 * not output anything, even if the _error_msg buffer
 * is not false - it will simply return the _error_msg
 * buffer to the calling process.
 * 
 */
        let     _getErr = (
            report_errors = false
        ) =>
        {
            if (report_errors !== false && _error_msg !== false) {
                // Report any errors...
                if (report_errors === true)
                    // ...via console.
                    console.error(_error_msg);
                else
                    // ...via a custom callback function.
                    report_errors(_error_msg);
            }

            return _error_msg;
        };


/**********************************************************
 * _verbose()
 * 
 * Not strictly an error reporting method, this is used
 * to output verbose information about the application
 * while it runs.
 * 
 * This method will only output if the verbose parameter
 * passed to Err is non-false.
 * 
 * If callback is left at false then the output_string
 * will be output via console.log, otherwise it's assumed
 * to be a callback function that will be called and
 * output_string will be passed to.
 * 
 */
        let     _verbose = (
            output_string,
            callback = false
        ) =>
        {
            if (! verbose)
                return;

            if (! callback)
                console.log(output_string);
            else
                callback(output_string);
        };


        __init();


        return {
            setErr:             _setErr,
            getErr:             _getErr,
            verbose:            _verbose
        };

    };


    export default Err;
