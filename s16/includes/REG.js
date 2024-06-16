/**********************************************************
 * s16/source/js/s16/includes/REG.js
 * 
 * The CPU registers are actually just buffers, we use
 * the register address to offset individual registers
 * within that buffer.
 * 
 * This makes it easy to copy and store the entire state
 * of the CPU memory.
 * 
 * This file defines the offsets of the registers within
 * the register buffer.
 * 
 */


/**********************************************************
 * 16-bit I/O registers.
 * 
 */
    const       S16_REG_ID      = 0x00;     // Input device ID
    const       S16_REG_OD      = 0x02;     // Output device ID
    const       S16_REG_SA      = 0x04;     // Segment address


/**********************************************************
 * 16-bit pointer registers.
 * 
 */ 
    const       S16_REG_BP      = 0x06;     // Base pointer
    const       S16_REG_IP      = 0x08;     // Instruction pointer
    const       S16_REG_SP      = 0x0A;     // Stack pointer


/**********************************************************
 * 16-bit current instruction address pointer.
 * 
 */

    const       S16_REG_CI      = 0x0C;


/**********************************************************
 * 16-bit segment pointers.
 * 
 */

    const       S16_REG_CS      = 0x0E;     // Code segment/section
    const       S16_REG_DS      = 0x10;     // Data segment/section
    const       S16_REG_HS      = 0x12;     // Heap segment/section
    const       S16_REG_SS      = 0x14;     // Stack segment/section 


/**********************************************************
 * 8-bit flags and return registers.
 * 
 */
    const       S16_REG_FL      = 0x16;
    const       S16_REG_RT      = 0x17;


/**********************************************************
 * 6 x 16-bit general purpose registers.
 * 
 */
    const       S16_REG_AX      = 0x18;
    const       S16_REG_BX      = 0x1A;
    const       S16_REG_CX      = 0x1C;
    const       S16_REG_DX      = 0x2E;
    const       S16_REG_EX      = 0x20;
    const       S16_REG_FX      = 0x22;


/**********************************************************
 * Total size of the register buffer.
 * 
 */
    const       S16_REG_BUFLEN  = 36;
