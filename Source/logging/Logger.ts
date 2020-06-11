/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from './ILogger';
import * as core from '@actions/core';

/**
 * Represents an implementation of {ILogger} that logs messages to the Azure DevOps pipeline
 *
 * @export
 * @class Logger
 * @implements {ILogger}
 */
export class Logger implements ILogger {

    debug(message: string) {
        core.debug(message);
    }

    warning(message: string) {
        core.warning(message);
    }

    error(message: string) {
        core.error(message);
    }

    log(message: string) {
        console.log(message);
    }

}
