import { tools } from '@iobroker/js-controller-common';
import type { Pattern } from '../../_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import type { AliasManager } from '@/lib/adapter/managers/AliasManager.js';
import { ALIAS_STARTS_WITH } from '@/lib/adapter/constants.js';

/** Prefixes an id or pattern with this adapter's namespace unless already namespaced. Bound to the adapter's Validator. */
export type FixId = (id: string, isPattern?: boolean) => string;

type SubOptions = { user?: ioBroker.ObjectIDs.User } | null | undefined;

/** Reads the objects matching a pattern, used to discover alias objects during state subscription. */
export interface ObjectAccess {
    /**
     * Objects matching `pattern`, keyed by id. Bound to the legacy `getForeignObjects(pattern, null, null, options)`
     * call, whose `null` type/enums args clobber `options` — so no type filter and no user-ACL are applied;
     * only `alias.*` ids in the result are consumed. Kept as-is for behavior parity.
     */
    getForeignStateObjects(
        pattern: string,
        options?: { user?: ioBroker.ObjectIDs.User } | null,
    ): Promise<Record<string, ioBroker.AnyObject>>;
}

/** Owns object-, file- and state-change subscriptions plus the auto-subscribe bookkeeping. */
export class SubscriptionManager extends AdapterContextBase {
    readonly #fixId: FixId;
    readonly #alias: AliasManager;
    readonly #objectAccess: ObjectAccess;
    #autoSubscribe: string[] = [];

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param fixId Namespace-prefixer bound to the adapter's Validator
     * @param aliasManager Alias subscription cache and bookkeeping
     * @param objectAccess Reader for state-typed objects matching a pattern
     */
    constructor(ctx: AdapterContext, fixId: FixId, aliasManager: AliasManager, objectAccess: ObjectAccess) {
        super(ctx);
        this.#fixId = fixId;
        this.#alias = aliasManager;
        this.#objectAccess = objectAccess;
    }

    /**
     * Subscribe to object changes within this instance's namespace.
     *
     * @param pattern pattern without namespace, `*` for all own objects, or an array of patterns
     *        passed through as-is (not namespaced)
     * @param options optional user context
     */
    async subscribeObjects(pattern: Pattern, options?: SubOptions): Promise<void> {
        const fixed =
            pattern === '*' ? `${this.namespace}.*` : Array.isArray(pattern) ? pattern : this.#fixId(pattern, true);
        return this.objects.subscribeUserAsync(fixed, options ?? null);
    }

    /**
     * Unsubscribe from object changes within this instance's namespace.
     *
     * @param pattern pattern without namespace, `*` for all own objects, or an array of patterns
     *        passed through as-is (not namespaced)
     * @param options optional user context
     */
    async unsubscribeObjects(pattern: Pattern, options?: SubOptions): Promise<void> {
        const fixed =
            pattern === '*' ? `${this.namespace}.*` : Array.isArray(pattern) ? pattern : this.#fixId(pattern, true);
        return this.objects.unsubscribeUserAsync(fixed, options ?? null);
    }

    /**
     * Subscribe to object changes in any instance.
     *
     * @param pattern pattern or array of patterns
     * @param options optional user context
     */
    async subscribeForeignObjects(pattern: Pattern, options?: SubOptions): Promise<void> {
        return this.objects.subscribeUserAsync(pattern, options ?? null);
    }

    /**
     * Unsubscribe from object changes in any instance.
     *
     * @param pattern pattern or array of patterns (defaults to `*`)
     * @param options optional user context
     */
    async unsubscribeForeignObjects(pattern: Pattern, options?: SubOptions): Promise<void> {
        return this.objects.unsubscribeUserAsync(pattern || '*', options ?? null);
    }

    /**
     * Subscribe to file changes in a specific instance.
     *
     * @param id adapter id, e.g. `vis-2.0`
     * @param pattern pattern or array of patterns
     * @param options optional user context
     */
    async subscribeForeignFiles(id: string, pattern: Pattern, options?: SubOptions): Promise<void> {
        return this.objects.subscribeUserFile(id, pattern, options ?? undefined);
    }

    /**
     * Unsubscribe from file changes in a specific instance.
     *
     * @param id adapter id, e.g. `vis-2.0`
     * @param pattern pattern or array of patterns (defaults to `*`)
     * @param options optional user context
     */
    async unsubscribeForeignFiles(id: string, pattern: Pattern, options?: SubOptions): Promise<void> {
        return this.objects.unsubscribeUserFile(id, pattern || '*', options ?? undefined);
    }

    /**
     * Register an instance as auto-subscribable (its `subscribes` counter is maintained on subscribe/unsubscribe).
     *
     * @param id instance id, e.g. `pushover.0`
     */
    addSubscribableInstance(id: string): void {
        if (!this.#autoSubscribe.includes(id)) {
            this.#autoSubscribe.push(id);
        }
    }

    /**
     * Stop treating an instance as auto-subscribable.
     *
     * @param id instance id, e.g. `pushover.0`
     */
    removeSubscribableInstance(id: string): void {
        const pos = this.#autoSubscribe.indexOf(id);
        if (pos !== -1) {
            this.#autoSubscribe.splice(pos, 1);
        }
    }

    /** Populate the auto-subscribe instance list from the objects DB. */
    async autoSubscribeOn(): Promise<void> {
        // Known-dead guard: #autoSubscribe is always truthy so the body never runs; the live fix is tracked separately — do not "repair" it here.
        if (!this.#autoSubscribe && this.objects) {
            try {
                // collect all
                const res = await this.objects.getObjectViewAsync('system', 'instance', {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999',
                });

                this.#autoSubscribe = [];
                for (const row of res.rows) {
                    if (row.value?.common.subscribable) {
                        const _id = row.id.substring(15); // cut system.adapter.
                        if (!this.#autoSubscribe.includes(_id)) {
                            this.#autoSubscribe.push(_id);
                        }
                    }
                }

                // because of autoSubscribe
                await this.objects.subscribeAsync('system.adapter.*');
            } catch {
                // ignore
            }
        }
    }

    /**
     * Subscribe to state changes in any instance, resolving aliases and maintaining auto-subscribe counters.
     *
     * @param pattern pattern, `*`, an `alias.*` id, or an array of ids/patterns
     * @param options optional user context
     */
    async subscribeForeignStates(pattern: Pattern, options?: SubOptions): Promise<void> {
        // Todo check rights for options
        await this.autoSubscribeOn();

        // Force the up-front connection check: a disconnected DB must reject (ERROR_DB_CLOSED) before any branch runs.
        void this.states;
        void this.objects;

        // compare if this pattern for one of auto-subscribe adapters
        for (const autoSubEntry of this.#autoSubscribe) {
            if (typeof pattern === 'string' && (pattern === '*' || pattern.startsWith(`${autoSubEntry}.`))) {
                // put this pattern into adapter list
                let state;
                try {
                    state = await this.states.getState(`system.adapter.${autoSubEntry}.subscribes`);
                } catch {
                    // ignore
                }
                state = state || { val: '{}' };
                state.val = state.val || '{}';
                let subs;
                try {
                    subs = JSON.parse(state.val as any);
                } catch {
                    this.logger.error(`${this.namespaceLog} Cannot parse subscribes for "${autoSubEntry}.subscribes"`);
                }

                // validate that correct structure read from state.val
                if (!tools.isObject(subs)) {
                    subs = {};
                }

                if (!tools.isObject(subs[pattern])) {
                    subs[pattern] = {};
                }

                if (typeof subs[pattern][this.namespace] !== 'number') {
                    subs[pattern][this.namespace] = 0;
                }

                subs[pattern][this.namespace]++;
                this.countOutput();
                await this.states.setState(`system.adapter.${autoSubEntry}.subscribes`, JSON.stringify(subs));
            }
        }

        if (Array.isArray(pattern)) {
            // get all aliases
            const aliasesIds = pattern
                .map(id => (id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id) as string[];

            // get all non aliases
            const nonAliasesIds = pattern
                .map(id => (!id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id) as string[];

            for (const aliasPattern of pattern) {
                if (
                    (aliasPattern.startsWith(ALIAS_STARTS_WITH) || aliasPattern.includes('*')) &&
                    !this.#alias.hasPattern(aliasPattern)
                ) {
                    // it's a new alias conform pattern to store
                    this.#alias.addPattern(aliasPattern);
                }
            }

            const promises = new Array<Promise<void>>();

            if (aliasesIds.length) {
                this.#alias.ensureAliasObjectSubscription();

                let aliasObjs: ioBroker.AnyObject[];
                try {
                    aliasObjs = await this.objects.getObjects(aliasesIds, options);
                } catch (e: any) {
                    this.logger.error(`Could not get objects by array: ${e.message}`);
                    aliasObjs = [];
                }

                for (const aliasObj of aliasObjs) {
                    if (aliasObj) {
                        promises.push(this.#alias.addAliasSubscribe(aliasObj, aliasObj._id));
                    }
                }
            }

            if (nonAliasesIds.length) {
                for (const id of nonAliasesIds) {
                    promises.push(new Promise<void>(resolve => this.states.subscribeUser(id, () => resolve())));
                }
            }

            try {
                await Promise.all(promises);
            } catch (e: any) {
                this.logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
            }
            return;
        } else if (pattern.includes('*')) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                this.#alias.ensureAliasObjectSubscription();

                // read all aliases
                try {
                    const objs = await this.#objectAccess.getForeignStateObjects(pattern, options);
                    const promises = new Array<Promise<void>>();
                    if (!this.#alias.hasPattern(pattern)) {
                        // it's a new pattern to store
                        this.#alias.addPattern(pattern);
                    }

                    for (const id of Object.keys(objs)) {
                        // If alias
                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            const aliasObj = objs[id];
                            promises.push(this.#alias.addAliasSubscribe(aliasObj, pattern));
                        }
                    }

                    try {
                        await Promise.all(promises);
                    } catch (e: any) {
                        this.logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
                    }

                    // re-check: states may have disconnected during the awaits above
                    const states = this.states;

                    if (promises.length && pattern !== '*') {
                        return;
                    }
                    // no alias objects found or pattern *
                    return states.subscribeUser(pattern);
                } catch (e: any) {
                    this.logger.warn(`${this.namespaceLog} Cannot subscribe to ${pattern}: ${e.message}`);
                    throw e;
                }
            } else {
                return this.states.subscribeUser(pattern);
            }
        } else if (pattern.startsWith(ALIAS_STARTS_WITH)) {
            this.#alias.ensureAliasObjectSubscription();

            // just read one alias Object
            try {
                const aliasObj = await this.objects.getObject(pattern, options);
                if (aliasObj) {
                    await this.#alias.addAliasSubscribe(aliasObj, pattern);
                    return;
                }
                return;
            } catch (e: any) {
                this.logger.warn(`${this.namespaceLog} cannot subscribe on alias "${pattern}": ${e.message}`);
            }
        } else {
            return this.states.subscribeUser(pattern);
        }
    }

    /**
     * Unsubscribe from state changes in any instance, mirroring {@link subscribeForeignStates}.
     *
     * @param pattern pattern, `*`, an `alias.*` id, or an array of ids/patterns
     * @param options optional user context
     */
    async unsubscribeForeignStates(pattern: Pattern, options?: SubOptions): Promise<void> {
        // An empty pattern means "all" — matches the legacy public method, and applies per element
        // on the array-recursion path below.
        pattern = pattern || '*';

        // Force the up-front connection check (states getter throws ERROR_DB_CLOSED).
        void this.states;

        if (this.#autoSubscribe && typeof pattern === 'string') {
            for (const autoSub of this.#autoSubscribe) {
                if (pattern === '*' || pattern.substring(0, autoSub.length + 1) === `${autoSub}.`) {
                    // remove this pattern from adapter list
                    let state;
                    try {
                        state = await this.states.getState(`system.adapter.${autoSub}.subscribes`);
                    } catch {
                        // ignore
                    }
                    if (!state || !state.val) {
                        continue;
                    }
                    let subs;
                    try {
                        subs = JSON.parse(state.val as any);
                    } catch {
                        this.logger.error(`${this.namespaceLog} Cannot parse subscribes for "${autoSub}.subscribes"`);
                        continue;
                    }

                    if (
                        !tools.isObject(subs) ||
                        !tools.isObject(subs[pattern]) ||
                        subs[pattern][this.namespace] === undefined
                    ) {
                        // check subs is a valid object, because it comes from state.val
                        continue;
                    }

                    if (typeof subs[pattern][this.namespace] === 'number') {
                        subs[pattern][this.namespace]--;
                        if (subs[pattern][this.namespace] <= 0) {
                            delete subs[pattern][this.namespace];
                        }
                    } else {
                        // corrupted info, we can only delete
                        delete subs[pattern][this.namespace];
                    }

                    // if no other subs are there
                    if (!Object.keys(subs[pattern]).length) {
                        delete subs[pattern];
                    }
                    this.countOutput();
                    await this.states.setState(`system.adapter.${autoSub}.subscribes`, JSON.stringify(subs));
                }
            }
        }

        let aliasPattern;
        const promises = new Array<Promise<void>>();

        if (Array.isArray(pattern)) {
            // process every entry as single unsubscribe
            for (const _pattern of pattern) {
                promises.push(this.unsubscribeForeignStates(_pattern, options));
            }
        } else if (pattern.includes('*') || pattern.startsWith(ALIAS_STARTS_WITH)) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                aliasPattern = pattern; // check all aliases
                if (pattern === '*') {
                    promises.push(this.states.unsubscribeUser(pattern));
                }
            } else {
                promises.push(this.states.unsubscribeUser(pattern));
            }
        } else {
            promises.push(this.states.unsubscribeUser(pattern));
        }

        if (aliasPattern) {
            this.#alias.deletePattern(aliasPattern);
            promises.push(this.#alias.removeTargetsForPattern(aliasPattern));
        }

        await Promise.all(promises);
        this.#alias.maybeDropAliasObjectSubscription();
        return;
    }
}
