/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from './ILogger';

/**
 * Represents a null-implementation of {ILogger}
 *
 * @export
 * @class NullLogger
 * @implements {ILogger}
 */
export class NullLogger implements ILogger {

    // tslint:disable-next-line: no-empty
    /**
     * @inheritdoc
     */
    debug(message: string) { }

    // tslint:disable-next-line: no-empty
    /**
     * @inheritdoc
     */
    warning(message: string) { }

    // tslint:disable-next-line: no-empty
    /**
     * @inheritdoc
     */
    error(message: string) { }

    // tslint:disable-next-line: no-empty
    /**
     * @inheritdoc
     */
    info(message: string) { }

}
