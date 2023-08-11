/*---------------------------------------------------------------------------------------------
 *  Copyright (c) woksin-org. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILogger } from './ILogger';
import * as core from '@actions/core';
import { NullLogger } from './NullLogger';

/**
 * Represents an implementation of {ILogger} that logs messages to the Azure DevOps pipeline
 *
 * @export
 * @class Logger
 * @implements {ILogger}
 */
export class Logger implements ILogger {

    static readonly nullLogger: NullLogger = new NullLogger();

    /**
     * @inheritdoc
     */
    debug(message: string) {
        core.debug(message);
    }

    /**
     * @inheritdoc
     */
    warning(message: string) {
        core.warning(message);
    }

    /**
     * @inheritdoc
     */
    error(message: string) {
        core.error(message);
    }

    /**
     * @inheritdoc
     */
    info(message: string) {
        core.info(message);
    }
}
