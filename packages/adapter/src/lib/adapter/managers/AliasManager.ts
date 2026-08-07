import { tools } from '@iobroker/js-controller-common';
import deepClone from 'deep-clone';
import type { AliasDetails, AliasTargetEntry } from '../../_Types.js';
import type { ValidateIdOptions } from '@/lib/adapter/validator.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import { ALIAS_STARTS_WITH, SYSTEM_ADMIN_USER } from '@/lib/adapter/constants.js';

/** Validates a (possibly foreign) id; throws on invalid. Bound to the adapter's Validator. */
export type ValidateId = (id: string, isForeignId: boolean, options?: ValidateIdOptions | null) => void;

/**
 * Owns the alias subscription cache and its bookkeeping: which real (source) states feed which
 * `alias.*` targets, the alias subscription patterns, and the single `alias.*` object subscription.
 * The source-state change fan-out ({@link resolveSourceChange}) is synchronous by contract so the
 * state-change handler cannot interleave a cache mutation mid-fan-out.
 */
export class AliasManager extends AdapterContextBase {
    readonly #aliases = new Map<string, AliasDetails>();
    readonly #aliasPatterns = new Set<string>();
    #aliasObjectsSubscribed = false;
    readonly #validateId: ValidateId;

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param validateId Bound id validator from the adapter's Validator instance
     */
    constructor(ctx: AdapterContext, validateId: ValidateId) {
        super(ctx);
        this.#validateId = validateId;
    }

    /**
     * Whether the given source (real) state id currently feeds any alias.
     *
     * @param id the real source state id
     */
    hasSource(id: string): boolean {
        return this.#aliases.has(id);
    }

    /** Number of tracked source states. */
    get size(): number {
        return this.#aliases.size;
    }

    /**
     * Whether the given subscription pattern is tracked.
     *
     * @param pattern the subscription pattern
     */
    hasPattern(pattern: string): boolean {
        return this.#aliasPatterns.has(pattern);
    }

    /**
     * Track a subscription pattern.
     *
     * @param pattern the subscription pattern
     */
    addPattern(pattern: string): void {
        this.#aliasPatterns.add(pattern);
    }

    /**
     * Stop tracking a subscription pattern.
     *
     * @param pattern the subscription pattern
     */
    deletePattern(pattern: string): void {
        this.#aliasPatterns.delete(pattern);
    }

    /**
     * Whether `id` falls into any tracked alias pattern (wildcards via pattern2RegEx).
     *
     * @param id the id to test against the tracked patterns
     */
    matchesAnyPattern(id: string): boolean {
        for (const aliasPattern of this.#aliasPatterns) {
            const testPattern =
                aliasPattern.slice(-1) === '*' ? new RegExp(tools.pattern2RegEx(aliasPattern)) : aliasPattern;
            if (
                (typeof testPattern === 'string' && aliasPattern === id) ||
                (testPattern instanceof RegExp && testPattern.test(id))
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Reacts to a change of an `alias.*` object: re-points, updates, or removes the target across the
     * tracked sources, and picks up a newly-appeared alias that falls into a tracked pattern.
     * Live-iterates the cache while awaiting add/remove — the loop lives here, with the map, to
     * preserve the original mutation-during-iteration semantics exactly.
     *
     * @param id the changed alias object id
     * @param obj the new object (null/undefined if deleted)
     */
    async handleAliasObjectChange(id: string, obj: ioBroker.Object | null | undefined): Promise<void> {
        let isNewAlias = true;
        for (const [sourceId, alias] of this.#aliases) {
            const targetAlias = alias.targets.find(entry => entry.id === id);
            if (targetAlias) {
                isNewAlias = false;
                if (obj?.common?.alias?.id) {
                    const newSourceId =
                        typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;
                    if (newSourceId !== sourceId) {
                        await this.removeAliasSubscribe(sourceId, targetAlias);
                        try {
                            await this.addAliasSubscribe(obj, targetAlias.pattern);
                        } catch (e: any) {
                            this.logger.error(`${this.namespaceLog} Could not add alias subscription: ${e.message}`);
                        }
                    } else {
                        targetAlias.min = obj.common.min;
                        targetAlias.max = obj.common.max;
                        targetAlias.type = obj.common.type;
                        targetAlias.alias = deepClone(obj.common.alias);
                    }
                } else {
                    await this.removeAliasSubscribe(sourceId, targetAlias);
                }
            }
        }
        if (isNewAlias && obj && this.matchesAnyPattern(id)) {
            try {
                await this.addAliasSubscribe(obj, id);
            } catch (e: any) {
                this.logger.warn(`${this.namespaceLog} Could not add alias subscription: ${e.message}`);
            }
        }
    }

    /**
     * Removes every target subscribed under the given pattern, live-iterating the cache so a removal
     * mutating the map mid-loop keeps the original semantics. Awaits each removal.
     *
     * @param pattern the subscription pattern being unsubscribed
     */
    async removeTargetsForPattern(pattern: string): Promise<void> {
        const promises = new Array<Promise<void>>();
        for (const [sourceId, alias] of this.#aliases) {
            for (let i = alias.targets.length - 1; i >= 0; i--) {
                if (alias.targets[i].pattern === pattern) {
                    promises.push(this.removeAliasSubscribe(sourceId, i));
                }
            }
        }
        await Promise.all(promises);
    }

    /**
     * Synchronously computes the fan-out of a source (real) state change to its alias targets.
     * Returns one `{ targetId, state }` per unique target. MUST NOT await — the caller relies on the
     * cache not mutating between read and emit.
     *
     * @param sourceId the changed real state id
     * @param state the new state value (or null on deletion)
     */
    resolveSourceChange(
        sourceId: string,
        state: ioBroker.State | null | undefined,
    ): Array<{ targetId: string; state: ioBroker.State | null }> {
        const out = new Array<{ targetId: string; state: ioBroker.State | null }>();
        const alias = this.#aliases.get(sourceId);
        if (!alias) {
            return out;
        }
        const uniqueTargets = new Set<string>();
        for (const target of alias.targets) {
            const targetId = target.id;
            if (uniqueTargets.has(targetId)) {
                continue;
            }
            uniqueTargets.add(targetId);
            const aState = state
                ? tools.formatAliasValue({
                      sourceCommon: alias.source,
                      targetCommon: target,
                      state: deepClone(state),
                      logger: this.logger,
                      logNamespace: this.namespaceLog,
                      sourceId,
                      targetId,
                  })
                : null;
            if (aState || !state) {
                out.push({ targetId, state: aState });
            }
        }
        return out;
    }

    /** Subscribe the `alias.*` object range once (idempotent). */
    ensureAliasObjectSubscription(): Promise<void> {
        if (!this.#aliasObjectsSubscribed) {
            this.#aliasObjectsSubscribed = true;
            this.objects.subscribe(`${ALIAS_STARTS_WITH}*`);
        }
        return Promise.resolve();
    }

    /** Drop the `alias.*` object subscription when no aliases remain. */
    maybeDropAliasObjectSubscription(): Promise<void> {
        if (!this.#aliases.size && this.#aliasObjectsSubscribed) {
            this.#aliasObjectsSubscribed = false;
            this.objects.unsubscribe(`${ALIAS_STARTS_WITH}*`);
        }
        return Promise.resolve();
    }

    /**
     * Register an alias target for its source state, subscribing the source state (and reading its
     * metadata once). Preserves the create-before-await ordering and the post-await existence
     * re-check that guard a concurrent removal.
     *
     * @param aliasObj the `alias.*` object being subscribed
     * @param pattern the subscription pattern that pulled it in
     */
    async addAliasSubscribe(aliasObj: ioBroker.AnyObject, pattern: string): Promise<void> {
        if (aliasObj.type !== 'state') {
            return;
        }
        if (!aliasObj.common?.alias?.id) {
            this.logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 5`);
            throw new Error(`Alias ${aliasObj._id} has no target`);
        }
        const sourceId = tools.isObject(aliasObj.common.alias.id)
            ? aliasObj.common.alias.id.read
            : aliasObj.common.alias.id;
        try {
            this.#validateId(sourceId, true, null);
        } catch (e: any) {
            throw new Error(`Error validating alias id of ${aliasObj._id}: ${e.message}`);
        }
        const targetEntry: AliasTargetEntry = {
            alias: deepClone(aliasObj.common.alias),
            id: aliasObj._id,
            pattern,
            type: aliasObj.common.type,
            max: aliasObj.common.max,
            min: aliasObj.common.min,
            unit: aliasObj.common.unit,
        };
        let aliasDetails: AliasDetails;
        if (!this.#aliases.has(sourceId)) {
            aliasDetails = { targets: [] };
            this.#aliases.set(sourceId, aliasDetails);
        } else {
            aliasDetails = this.#aliases.get(sourceId)!;
        }
        if (!aliasDetails.source) {
            await this.states.subscribe(sourceId);
            const sourceObj = await this.objects.getObject(sourceId, { user: SYSTEM_ADMIN_USER });
            if (sourceObj?.common && this.#aliases.has(sourceObj._id)) {
                aliasDetails.source = {
                    min: sourceObj.common.min,
                    max: sourceObj.common.max,
                    type: sourceObj.common.type,
                    unit: sourceObj.common.unit,
                };
            }
        }
        aliasDetails.targets.push(targetEntry);
    }

    /**
     * Remove one alias target from its source; when the source has no targets left, delete the entry
     * and unsubscribe the source state.
     *
     * @param sourceId the real source state id
     * @param aliasObjOrIdx the target entry or its index in the targets array
     */
    async removeAliasSubscribe(sourceId: string, aliasObjOrIdx: number | AliasTargetEntry): Promise<void> {
        if (!this.#aliases.has(sourceId)) {
            return;
        }
        const alias = this.#aliases.get(sourceId)!;
        const pos = typeof aliasObjOrIdx === 'number' ? aliasObjOrIdx : alias.targets.indexOf(aliasObjOrIdx);
        if (pos !== -1) {
            alias.targets.splice(pos, 1);
            if (!alias.targets.length) {
                this.#aliases.delete(sourceId);
                await this.states.unsubscribe(sourceId);
            }
        }
    }
}
