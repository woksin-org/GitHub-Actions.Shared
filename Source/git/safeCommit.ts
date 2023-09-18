import { exec } from '@actions/exec';
import { ILogger } from '@woksin/github-actions.shared.logging';
import { setTimeout } from 'timers';
/**
 * Represents the options for safeCommitAndPush.
 */
export interface SafeCommitOptions {
    /**
     * The username.
     */
    userName: string;

    /**
     * The email.
     */
    userEmail: string;

    /**
     * The branch push to.
     */
    branch: string;

    /**
     * The commit message.
     */
    commitMessage: string;

    /**
     * The files to commit.
     */
    files: string[];

    /**
     * The optional remote to push to. Defaults to 'origin'.
     */
    remote?: string;

    /**
     * The optional number of push retries. Defaults to 3.
     */
    pushRetries?: number;
}

export async function safeCommitAndPush(
    logger: ILogger,
    {userName, userEmail, branch, commitMessage, files, remote = 'origin', pushRetries = 3}: SafeCommitOptions) {
    await configure(userEmail, userName);
    await commit(commitMessage, files);
    await safePush(remote, branch,  pushRetries, logger);
}

async function configure(userEmail: string, userName: string) {
    await gitConfig('user.email', `"${userEmail}"`);
    await gitConfig('user.name', `"${userName}"`);
    await gitConfig('pull.rebase', 'false');
}

function runGitCommand(command: string, args: string[] | undefined, ignoreReturnCode = true) {
    return exec(`git ${command}`, args, {ignoreReturnCode});
}

function gitConfig(key: string, value: string) {
    return runGitCommand('config', [key,value]);
}

async function commit(message: string, files: string[]) {
    await runGitCommand('add', files);
    await runGitCommand('commit', [`-m "${message}"`]);
}


async function safePush(remote: string, branch: string, pushRetries: number, logger: ILogger) {
    do {
        try {
            await runGitCommand(`pull ${remote} ${branch}`, undefined, false);
            await runGitCommand(`push ${remote} ${branch}`, undefined, false);
            return;
        } catch (err) {
            pushRetries -= 1;
            if (pushRetries <= 0) {
                logger.error(`Failed to push commit. error: ${err}`);
                throw err;
            } else {
                let timeToWaitMs = Math.random() * 10_000 | 0;
                while (timeToWaitMs < 1000) {
                    timeToWaitMs *= 10;
                }
                logger.warning(`Pushing commit failed. ${pushRetries} attempts remaining. error: ${err}`);
                logger.info(`Trying too push again after ${timeToWaitMs} milliseconds`);
                await new Promise(resolve => setTimeout(resolve, timeToWaitMs));
            }
        }
    } while (pushRetries > 0);
}
