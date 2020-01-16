import JSBI from 'jsbi';

/**
 * The logical total supply of TXL as an unsigned integer.
 */
export const TOTAL_TIXL_SUPPLY = JSBI.BigInt(900_000_000_000);

/**
 * 1 TXL can have up to 7 decimal fractions.
 *
 * This defines how to show the fraction for a TXL value.
 * Note that for large numbers the result will probably be incorrect, when
 * using JavaScripts Number implementation.
 *
 * For example:
 * If a wallet implementation sees `1234567` as a block balance. They can calculate the actual
 * TXL value to be `0.1234567`. As this will be the result of `1234567 / 10000000`.
 */
export const TIXL_DIVISOR = JSBI.BigInt(10_000_000);

/**
 * The maximum value of block fields for TXL amounts or balances.
 * Beware that this number is above the Number.MAX_SAFE_INTEGER!
 */
export const MAX_TIXL_VALUE = JSBI.multiply(JSBI.BigInt(900_000_000_000), TIXL_DIVISOR);
