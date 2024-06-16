/**********************************************************
 * s16/source/js/s16/EXE.js
 * 
 * The purpose of this module is to take the executable
 * file data and load it into segment 0 of RAM for
 * execution.
 * 
 * Since s16 is for demonstration purposes, the s16
 * system code is assembled automatically each time the
 * site loads.
 * 
 * The s16 assembly source files can be found in the
 * s16/source/js/s16/asm directory.
 * 
 * These source files will be loaded, parsed and
 * assembled into bytecode, the bytecode is then loaded
 * into segment 0 of RAM and executed.
 * 
 */
    const   EXE = (

        err,
        ram

    ) =>
    {

        let     __exe = new Uint8Array(ram[0].byteLength);

        err.verbose(`Building executable...`);

    }


    export default EXE;
