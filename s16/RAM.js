/**********************************************************
 * s16/source/js/s16/RAM.js
 * 
 * This module initialises the system RAM.
 * 
 * In reality, RAM in this case is just an array of
 * buffers (ArrayBuffer) storing raw data which can
 * be executable.
 * 
 * Here, we can allocate up to 65,536 buffers, each of
 * which can be up to 65,536 bytes in length.
 * 
 * With this system we have a bit of flexibility, we
 * can have a single process running in each segment,
 * or we can use segments as storage areas.
 * 
 * By default, the RAM module allocates 8 segments of
 * 65,536 bytes each.
 *  
 */

    const   RAM_MAX_SEGS        = 8;
    const   RAM_SEG_SIZE        = 65536;


/**********************************************************
 * Each segment is made up of a buffer of bytes that can
 * be individually referenced/addressed - for convenience
 * these values specify the maximum (65,535) and minumum
 * (0) possible address values.
 * 
 * Since s16 is a 16-bit system we are limited to a 16-bit
 * address system so our inclusive range is 0-65535.
 * 
 */
    const   RAM_SEG_MAXADDR     = (RAM_SEG_SIZE - 1);
    const   RAM_SEG_MINADDR     = 0;


/**********************************************************
 * Default number of segments and segment size if none
 * are specified when RAM is initialised.
 * 
 * The same rule applies to the number of segments we can
 * allocate - the max is 65,536, but your browser might
 * not like that!
 * 
 * By default we will have 8 segments each with 64k,
 * that is like having 8 Commodore 64's! Can you imagine
 * that? Plenty!
 * 
 */
    const   RAM_SEGMENTS_DEFAULT    = 8;
    const   RAM_SEGSIZE_DEFAULT     = RAM_SEG_SIZE;


/**********************************************************
 * RAM()
 * 
 * This module expects a reference to the Err module
 * (see s16/source/js/s16/Err.js).
 * 
 * We can also over-ride the segs and segsize parameters
 * if we want more/less and/or bigger/smaller segments.
 * 
 */
    const   RAM = (

        err,
        segs = RAM_SEGMENTS_DEFAULT,
        segsize = RAM_SEGSIZE_DEFAULT

    ) =>
    {

        const   _segments = Array(segs);


/**********************************************************
 * __init()
 * 
 * Constructor - initialises the memory _segments[].
 * 
 */
        let     __init = () =>
        {
            // Simple enough, we allocate segsize bytes
            // to each element of _segments.
            //
            err.verbose(`Allocating ${segs} RAM segments, ${segsize} bytes per segment\n`);
            for (let index = 0; index < segs; index++) {
                _segments[index] = new ArrayBuffer(segsize);
                err.verbose(`> Allocated RAM segment ${index}`);
            }
            err.verbose(`RAM READY!`);
        };


/**********************************************************
 * __getSegments()
 * 
 * Very simple - __getSegments() will return _segments
 * if the segs parameter is false.
 * 
 * Otherwise, the segs parameter is expected to be a
 * valid _segments[] address/index - if segs is not
 * false and is not a valid address/index, an error
 * message will be recorded via the Err module.
 * 
 */
        let     _getSegments = (

            segs = false

        ) =>
        {
            if (! segs)
                return _segments;

            if (isNaN(segs))
                return err.setErr(`Error in RAM.__getSegments(): Paramater '${segs}' is not a valid segment address`);

            return _segments[parseInt(segs)];
        };


        __init();


        return {
            getSegments:            _getSegments
        };


    };


    export default RAM;
