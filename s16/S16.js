/**********************************************************
 * s16/source/js/s16/S16.js
 * 
 */


    import './includes/REG';
    import './includes/OPS';


    import  EXE from './EXE';


    const   S16 = (

        err,

        ram,

    ) =>
    {

        const   _ram = ram.getSegments();

/**********************************************************
 * The EXE module will load the main executable code and
 * data into segment 0 of _ram for execution.
 * 
 */
        let     _exe = EXE(err, _ram);

    };


    export default S16;
