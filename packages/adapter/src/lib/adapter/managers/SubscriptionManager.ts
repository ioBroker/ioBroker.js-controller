import type { Pattern } from '../../_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';

/** Prefixes an id or pattern with this adapter's namespace unless already namespaced. Bound to the adapter's Validator. */
export type FixId = (id: string, isPattern?: boolean) => string;

type SubOptions = { user?: ioBroker.ObjectIDs.User } | null | undefined;

/** Owns object- and file-change subscriptions, delegating to the objects DB client. */
export class SubscriptionManager extends AdapterContextBase {
    readonly #fixId: FixId;

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param fixId Namespace-prefixer bound to the adapter's Validator
     */
    constructor(ctx: AdapterContext, fixId: FixId) {
        super(ctx);
        this.#fixId = fixId;
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
}
