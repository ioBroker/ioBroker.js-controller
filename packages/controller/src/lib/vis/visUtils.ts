type StateID = string;
type SingleWidgetId = `w${string}`;
type GroupWidgetId = `g${string}`;
type AnyWidgetId = SingleWidgetId | GroupWidgetId;
interface WidgetData {
    /** Only exists if given by user in a tab general */
    name?: string;
    filterkey?: string;
    members?: AnyWidgetId[];
    bindings?: string[];
    [other: string]: any;
}

type VisBindingOperationType =
    | 'eval'
    | '*'
    | '+'
    | '-'
    | '/'
    | '%'
    | 'min'
    | 'max'
    | 'date'
    | 'momentDate'
    | 'value'
    | 'array'
    | 'pow'
    | 'round'
    | 'random'
    | 'json'
    | 'sqrt'
    | 'hex'
    | 'HEX'
    | 'HEX2'
    | 'hex2'
    | 'floor'
    | 'ceil'
    | '';

interface VisBindingOperationArgument {
    name: string;
    /** ioBroker state ID plus '.val', '.ts', '.ack' or '.lc' */
    visOid: StateID;
    /** ioBroker state ID */
    systemOid: StateID;
}

interface VisBindingOperation {
    op: VisBindingOperationType;
    arg?: VisBindingOperationArgument[] | string | number | string[];
    formula?: string;
}

interface VisBinding {
    /** ioBroker state ID plus '.val', '.ts', '.ack' or '.lc' */
    visOid: StateID;
    /** ioBroker state ID */
    systemOid: StateID;
    /** Part of the string, like {id.ack} */
    token: string;
    operations?: VisBindingOperation[];
    format: string;
    isSeconds: boolean;
}

interface VisLinkContextBinding extends VisBinding {
    type: 'style' | 'data';
    attr: string;
    view: string;
    widget: AnyWidgetId;
}

interface VisLinkContextItem {
    view: string;
    widget: AnyWidgetId;
}

interface VisLinkContextSignalItem extends VisLinkContextItem {
    index: number;
}

interface VisStateUsage {
    /** list of widgets, that depends on this state */
    visibility: Record<string, VisLinkContextItem[]>;
    signals: Record<string, VisLinkContextSignalItem[]>;
    lastChanges: Record<string, VisLinkContextItem[]>;
    /** list of widgets, that depends on this state */
    bindings: Record<StateID, VisLinkContextBinding[]>;
    IDs: StateID[];
    byViews?: Record<string, string[]>;
    widgetAttrInfo?: Record<string, any>;
}

interface Permissions {
    /** Accessible in Runtime */
    read: boolean;
    /** Accessible in Editor */
    write: boolean;
}

interface UserPermissions {
    /** Which user has read or write access for the project */
    [user: string]: Permissions;
}

interface WidgetStyle {
    bindings?: string[];
    position?: '' | 'absolute' | 'relative' | 'sticky' | 'static' | null;
    display?: '' | 'inline-block' | null;
    top?: string | number | null;
    left?: string | number | null;
    width?: string | number | null;
    right?: string | number | null;
    bottom?: string | number | null;
    /** if widget become relative, here is stored the original width, so when we toggle it to the absolute width again, it has some width  */
    absoluteWidth?: string | number | null;
    height?: string | number | null;
    'z-index'?: number | null;
    'overflow-x'?: '' | 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit' | null;
    'overflow-y'?: '' | 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit' | null;
    opacity?: number | null;
    cursor?:
        | 'alias'
        | 'all-scroll'
        | 'auto'
        | 'cell'
        | 'col-resize'
        | 'context-menu'
        | 'copy'
        | 'crosshair'
        | 'default'
        | 'e-resize'
        | 'ew-resize'
        | 'grab'
        | 'grabbing'
        | 'help'
        | 'move'
        | 'n-resize'
        | 'ne-resize'
        | 'nesw-resize'
        | 'ns-resize'
        | 'nw-resize'
        | 'nwse-resize'
        | 'no-drop'
        | 'none'
        | 'not-allowed'
        | 'pointer'
        | 'progress'
        | 'row-resize'
        | 's-resize'
        | 'se-resize'
        | 'sw-resize'
        | 'text'
        | 'vertical-text'
        | 'w-resize'
        | 'wait'
        | 'zoom-in'
        | 'zoom-out'
        | 'initial'
        | 'inherit'
        | null;
    transform?: string;

    color?: string;
    'text-align'?: '' | 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit' | null;
    'text-shadow'?: string | null;
    'font-family'?: string | null;
    'font-style'?: '' | 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit' | null;
    'font-variant'?: '' | 'normal' | 'small-caps' | 'initial' | 'inherit' | null;
    'font-weight'?: string;
    'font-size'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    'word-spacing'?: string;

    background?: string;
    'background-color'?: string;
    'background-image'?: string;
    'background-repeat'?: '' | 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'initial' | 'inherit' | null;
    'background-position'?: string | null;
    'background-size'?: string | null;
    'background-clip'?: '' | 'border-box' | 'padding-box' | 'content-box' | 'initial' | 'inherit' | null;
    'background-origin'?: '' | 'padding-box' | 'border-box' | 'content-box' | 'initial' | 'inherit' | null;

    'border-width'?: string | null;
    'border-style'?:
        | ''
        | 'dotted'
        | 'dashed'
        | 'solid'
        | 'double'
        | 'groove'
        | 'ridge'
        | 'inset'
        | 'outset'
        | 'hidden'
        | null;
    'border-color'?: string | null;
    'border-radius'?: string | null;

    padding?: string | null;
    'padding-left'?: string | null;
    'padding-top'?: string | null;
    'padding-right'?: string | null;
    'padding-bottom'?: string | null;
    'box-shadow'?: string | null;
    'margin-left'?: string | null;
    'margin-top'?: string | null;
    'margin-right'?: string | null;
    'margin-bottom'?: string | null;

    /** relative property, if the widget must be shown on the new line */
    newLine?: boolean;
    'box-sizing'?: 'content-box' | 'border-box' | 'initial' | 'inherit' | null;
    noPxToPercent?: boolean;
}

interface SingleWidget {
    /** Internal wid */
    _id?: string;
    /** Widget type */
    tpl: string;
    data: WidgetData;
    style: WidgetStyle;
    /** @deprecated The widget set Use widgetSet */
    set?: string;
    /** @deprecated The widget set. Use widgetSet */
    wSet?: string;
    /** The widget set name. Groups have widget set null */
    widgetSet: string | null;
    /** The id of the group, if the widget is grouped */
    groupid?: GroupWidgetId;
    /** If the widget is grouped */
    grouped?: boolean;
    /** @deprecated it was typo */
    groupped?: boolean;
    /** Permissions for each user for the widget */
    permissions?: UserPermissions;
    /** This widget was taken from a marketplace */
    marketplace?: any;
    /** Indicator that this widget is used in another widget (e.g., in panel) */
    usedInWidget?: boolean;
    /** CSS for this widget */
    css?: string;
    /** JavaScript for this widget */
    js?: string;
    /** internal cached value */
    usedInView?: string;
    name?: string;
    isRoot?: boolean;
}

interface GroupWidget extends SingleWidget {
    tpl: '_tplGroup';
    data: GroupData;
}

interface GroupData extends WidgetData {
    /** Widget IDs of the members */
    members: AnyWidgetId[];
}

interface MarketplaceWidgetRevision {
    id: string;
    widget: (GroupWidget | SingleWidget)[];
    date: string;
    widget_id: string;
    description: string;
    whatsnew: string;
    widgetsets: string[];
    version: number;
    rating: any;
    install_count: number;
    name: string;
    is_last: 0 | 1;
    widgets: string[];
    image_id: string;
    delete_status: 0 | 1;
    verified: null;
    revision_id: string;
    categories: string[];
}

interface ProjectSettings {
    darkReloadScreen: boolean;
    destroyViewsAfter: number;
    folders: { id: string; name: string; parentId: string }[];
    openedViews: string[];
    reconnectInterval: number;
    reloadOnEdit: boolean;
    reloadOnSleep: number;
    statesDebounceTime: number;
    scripts: unknown;
    /** Which user has read or write access for the project */
    permissions?: UserPermissions;
    marketplace?: MarketplaceWidgetRevision[];
    ts?: string;
    bodyOverflow?: string;
}

interface ViewSettings {
    /** Permissions for each user for the view */
    permissions?: UserPermissions;
    comment?: string;
    class?: string;
    filterkey?: string;
    group?: string[];
    theme?: string;
    group_action?: 'disabled' | 'hide' | null | '';

    useBackground?: boolean;
    'bg-image'?: string;
    'bg-position-x'?: string;
    'bg-position-y'?: string;
    'bg-width'?: string;
    'bg-height'?: string;
    'bg-color'?: string;
    style?: {
        display?: 'flex' | 'grid' | 'none' | null | '';
        background_class?: string;
        background?: string;
        'background-color'?: string;
        'background-image'?: string;
        'background-repeat'?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'initial' | 'inherit' | null | '';
        'background-attachment'?: 'scroll' | 'fixed' | 'local' | 'initial' | 'inherit' | null | '';
        'background-position'?:
            | 'left top'
            | 'left center'
            | 'left bottom'
            | 'right top'
            | 'right center'
            | 'right bottom'
            | 'center top'
            | 'center center'
            | 'center bottom'
            | 'initial'
            | 'inherit'
            | null
            | '';
        'background-size'?: 'auto' | 'cover' | 'contain' | 'initial' | 'inherit' | null | '';
        'background-clip'?: 'border-box' | 'padding-box' | 'content-box' | 'initial' | 'inherit' | null | '';
        'background-origin'?: 'padding-box' | 'border-box' | 'content-box' | 'initial' | 'inherit' | null | '';

        color?: string;
        'text-shadow'?: string;
        'font-family'?: string;
        'font-style'?: string;
        'font-variant'?: string;
        'font-weight'?: string;
        'font-size'?: string;
        'line-height'?: string;
        'letter-spacing'?: string;
        'word-spacing'?: string;
    };

    useAsDefault?: boolean;
    alwaysRender?: boolean;
    snapType?: 0 | 1 | 2 | null;
    snapColor?: string;
    gridSize?: number;
    sizex?: number;
    sizey?: number;
    limitScreen?: boolean;
    limitForInstances?: string;
    limitScreenDesktop?: boolean;
    limitScreenBorderWidth?: number;
    limitScreenBorderColor?: string;
    limitScreenBorderStyle?: string;
    limitScreenBackgroundColor?: string;

    navigation?: boolean;
    navigationTitle?: string;
    navigationOrder?: number;
    navigationIcon?: string;
    navigationImage?: string;
    navigationOrientation?: 'horizontal' | 'vertical';
    navigationOnlyIcon?: boolean;
    navigationBackground?: string;
    navigationSelectedBackground?: string;
    navigationSelectedColor?: string;
    navigationHeaderTextColor?: string;
    navigationColor?: string;
    navigationWidth?: number;

    navigationChevronColor?: string;
    navigationHideMenu?: boolean;
    navigationHideOnSelection?: boolean;
    navigationHeaderText?: string;
    navigationNoHide?: boolean;
    navigationButtonBackground?: string;

    navigationBar?: boolean;
    navigationBarColor?: string;
    navigationBarText?: string;
    navigationBarIcon?: string;
    navigationBarImage?: string;

    columnWidth?: number;
    columnGap?: number;
    rowGap?: number | string;
    /** relative widget order */
    order?: AnyWidgetId[];
}

interface View {
    activeWidgets: string[];
    filterList: string[];
    rerender: boolean;
    name?: string;
    /** parent folder */
    parentId?: string;
    settings?: ViewSettings;
    /** Widgets on this view */
    widgets: {
        [groupId: GroupWidgetId]: GroupWidget;
        [widgetId: SingleWidgetId]: SingleWidget;
    };
    filterWidgets?: AnyWidgetId[];
    filterInvert?: boolean;
}

interface Project {
    // @ts-expect-error this type has bad code-style, we should refactor the views in a views: Record<string, View> attribute
    ___settings: ProjectSettings;
    [view: string]: View;
}
/**
 * These functions are copied from https://github.com/ioBroker/ioBroker.vis-2/blob/master/src/src/Vis/visUtils.jsx
 */

/**
 * Stringify-parse copy with type inference
 *
 * @param obj The object which should be cloned
 */
function deepClone<T extends Record<string, any>>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Determine if the string is of form identifier:ioBrokerId, like, val:hm-rpc.0.device.channel.state
 *
 * @param assignment the possible assignment to check
 */
function isIdBinding(assignment: string): boolean {
    return !!assignment.match(/^[\w_]+:\s?[-.\w_#]+$/);
}

function replaceGroupAttr(inputStr: string, groupAttrList: WidgetData): { doesMatch: boolean; newString: string } {
    let newString = inputStr;
    let match = false;
    // old style: groupAttr0, groupAttr1, groupAttr2, ...
    let ms = inputStr.match(/(groupAttr\d+)+?/g);
    if (ms) {
        match = true;
        ms.forEach(m => {
            const val = groupAttrList[m];
            if (val === null || val === undefined) {
                newString = newString.replace(/groupAttr(\d+)/, '');
            } else {
                newString = newString.replace(/groupAttr(\d+)/, groupAttrList[m]);
            }
        });
    }

    // new style: %html%, %myAttr%, ...
    ms = inputStr.match(/%([-_a-zA-Z0-9]+)+?%/g);
    if (ms) {
        match = true;
        ms.forEach((m: string) => {
            const attr = m.substring(1, m.length - 1);
            const val = groupAttrList[attr];
            if (val === null || val === undefined) {
                newString = newString.replace(m, '');
            } else {
                newString = newString.replace(m, val);
            }
        });
    }

    return { doesMatch: match, newString };
}

function extractBinding(format: string): VisBinding[] | null {
    const oid = format.match(/{(.+?)}/g);
    let result: VisBinding[] | null = null;

    if (oid) {
        if (oid.length > 50) {
            console.warn(`Too many bindings in one widget: ${oid.length}[max = 50]`);
        }

        for (let p = 0; p < oid.length && p < 50; p++) {
            const _oid = oid[p].substring(1, oid[p].length - 1);
            if (_oid[0] === '{') {
                continue;
            }
            // If the first symbol is '"' => it is JSON
            if (_oid && _oid[0] === '"') {
                continue;
            }
            const parts = _oid.split(';');
            result = result || [];
            let systemOid = parts[0].trim();
            let visOid = systemOid;

            let test1 = visOid.substring(visOid.length - 4).trim();
            let test2 = visOid.substring(visOid.length - 3).trim();

            if (visOid && test1 !== '.val' && test2 !== '.ts' && test2 !== '.lc' && test1 !== '.ack') {
                visOid += '.val';
            }

            const isSeconds = test2 === '.ts' || test2 === '.lc';

            test1 = systemOid.substring(systemOid.length - 4);
            test2 = systemOid.substring(systemOid.length - 3);

            if (test1 === '.val' || test1 === '.ack') {
                systemOid = systemOid.substring(0, systemOid.length - 4);
            } else if (test2 === '.lc' || test2 === '.ts') {
                systemOid = systemOid.substring(0, systemOid.length - 3);
            }
            let operations: VisBindingOperation[] | null = null;
            const isEval =
                visOid.match(/^[\w_]+:\s?[-._/ :!#$%&()+=@^{}|~\p{Ll}\p{Lu}\p{Nd}]+$/u) ||
                (!visOid.length && parts.length > 0); // (visOid.indexOf(':') !== -1) && (visOid.indexOf('::') === -1);

            if (isEval) {
                const xx = visOid.split(':', 2);
                const yy = systemOid.split(':', 2);
                visOid = xx[1].trim();
                systemOid = yy[1].trim();
                operations = [];
                operations.push({
                    op: 'eval',
                    arg: [
                        {
                            name: xx[0],
                            visOid,
                            systemOid,
                        },
                    ],
                });

                for (let u = 1; u < parts.length; u++) {
                    // eval construction
                    const trimmed = parts[u].trim();
                    if (isIdBinding(trimmed)) {
                        // parts[u].indexOf(':') !== -1 && parts[u].indexOf('::') === -1) {
                        const argParts = trimmed.split(':', 2);
                        let _visOid = argParts[1].trim();
                        let _systemOid = _visOid;

                        test1 = _visOid.substring(_visOid.length - 4);
                        test2 = _visOid.substring(_visOid.length - 3);

                        if (test1 !== '.val' && test2 !== '.ts' && test2 !== '.lc' && test1 !== '.ack') {
                            _visOid += '.val';
                        }

                        test1 = _systemOid.substring(_systemOid.length - 4);

                        if (test1 === '.val' || test1 === '.ack') {
                            _systemOid = _systemOid.substring(0, _systemOid.length - 4);
                        } else {
                            test2 = _systemOid.substring(_systemOid.length - 3);
                            if (test2 === '.lc' || test2 === '.ts') {
                                _systemOid = _systemOid.substring(0, _systemOid.length - 3);
                            }
                        }

                        (operations[0].arg as VisBindingOperationArgument[])?.push({
                            name: argParts[0].trim(),
                            visOid: _visOid,
                            systemOid: _systemOid,
                        });
                    } else {
                        parts[u] = parts[u].replace(/::/g, ':');
                        if (operations[0].formula) {
                            const n = deepClone(operations[0]);
                            n.formula = parts[u];
                            operations.push(n);
                        } else {
                            operations[0].formula = parts[u];
                        }
                    }
                }
            } else {
                for (let u = 1; u < parts.length; u++) {
                    const parse = parts[u].match(/([\w\s/+*-]+)(\(.+\))?/);
                    if (parse && parse[1]) {
                        const op = parse[1].trim();
                        // operators requires parameter
                        if (
                            op === '*' ||
                            op === '+' ||
                            op === '-' ||
                            op === '/' ||
                            op === '%' ||
                            op === 'min' ||
                            op === 'max'
                        ) {
                            if (parse[2] === undefined) {
                                console.log(`Invalid format of format string: ${format}`);
                            } else {
                                // try to extract number
                                let argStr: string = (parse[2] || '').trim().replace(',', '.');
                                argStr = argStr.substring(1, argStr.length - 1).trim();
                                const arg: number = parseFloat(argStr);

                                if (arg.toString() === 'NaN') {
                                    console.log(`Invalid format of format string: ${format}`);
                                } else {
                                    operations = operations || [];
                                    operations.push({ op, arg });
                                }
                            }
                        } else if (op === 'date' || op === 'momentDate') {
                            // date formatting
                            operations = operations || [];
                            let arg: string = (parse[2] || '').trim();
                            // Remove braces from {momentDate(format)}
                            arg = arg.substring(1, arg.length - 1);
                            operations.push({ op, arg });
                        } else if (op === 'array') {
                            // returns array[value]. e.g.: {id.ack;array(ack is false,ack is true)}
                            operations = operations || [];
                            let param: string = (parse[2] || '').trim();
                            param = param.substring(1, param.length - 1);
                            operations.push({ op, arg: param.split(',') }); // xxx
                        } else if (op === 'value') {
                            // value formatting
                            operations = operations || [];
                            let arg: string = parse[2] === undefined ? '(2)' : parse[2] || '';
                            arg = arg.trim();
                            arg = arg.substring(1, arg.length - 1);
                            operations.push({ op, arg });
                        } else if (op === 'pow' || op === 'round' || op === 'random') {
                            // operators have optional parameter
                            if (parse[2] === undefined) {
                                operations = operations || [];
                                operations.push({ op });
                            } else {
                                let argStr: string = (parse[2] || '').trim().replace(',', '.');
                                argStr = argStr.substring(1, argStr.length - 1);
                                const arg = parseFloat(argStr.trim());

                                if (arg.toString() === 'NaN') {
                                    console.log(`Invalid format of format string: ${format}`);
                                } else {
                                    operations = operations || [];
                                    operations.push({ op, arg });
                                }
                            }
                        } else if (op === 'json') {
                            // json(objPropPath)  ex: json(prop1);  json(prop1.propA)
                            operations = operations || [];
                            let arg = (parse[2] || '').trim();
                            arg = arg.substring(1, arg.length - 1);
                            operations.push({ op, arg });
                        } else {
                            // operators without parameter
                            operations = operations || [];
                            operations.push({ op: op as VisBindingOperationType });
                        }
                    } else {
                        console.log(`Invalid format ${format}`);
                    }
                }
            }

            result.push({
                visOid,
                systemOid,
                token: oid[p],
                operations: operations || undefined,
                format,
                isSeconds,
            });
        }
    }

    return result;
}

function getWidgetGroup(views: Project, view: string, widget: AnyWidgetId): GroupWidgetId | undefined {
    const widgets = views[view].widgets;
    const groupId: GroupWidgetId | undefined = widgets[widget]?.groupid;
    if (groupId && widgets[groupId]) {
        return views[view].widgets[widget].groupid;
    }
    const widgetKeys: AnyWidgetId[] = Object.keys(widgets) as AnyWidgetId[];
    return widgetKeys.find(w => widgets[w].data?.members?.includes(widget)) as GroupWidgetId;
}

function getUsedObjectIDsInWidget(views: Project, view: string, wid: AnyWidgetId, linkContext: VisStateUsage): void {
    // Check all attributes
    const widget = deepClone(views[view].widgets[wid]);

    // fix error in naming
    if (widget.groupped) {
        widget.grouped = true;
        delete widget.groupped;
    }

    // rename hqWidgets => hqwidgets
    if (widget.widgetSet === 'hqWidgets') {
        widget.widgetSet = 'hqwidgets';
    }

    // rename RGraph => rgraph
    if (widget.widgetSet === 'RGraph') {
        widget.widgetSet = 'rgraph';
    }

    // rename timeAndWeather => timeandweather
    if (widget.widgetSet === 'timeAndWeather') {
        widget.widgetSet = 'timeandweather';
    }

    // convert "Show on Value" to HTML
    if (widget.tpl === 'tplShowValue') {
        widget.tpl = 'tplHtml';
        widget.data['visibility-oid'] = widget.data.oid;
        widget.data['visibility-val'] = widget.data.value;
        delete widget.data.oid;
        delete widget.data.value;
    }

    // convert "Hide on >0/True" to HTML
    if (widget.tpl === 'tplHideTrue') {
        widget.tpl = 'tplHtml';
        widget.data['visibility-cond'] = '!=';
        widget.data['visibility-oid'] = widget.data.oid;
        widget.data['visibility-val'] = true;
        delete widget.data.oid;
    }

    // convert "Hide on 0/False" to HTML
    if (widget.tpl === 'tplHide') {
        widget.tpl = 'tplHtml';
        widget.data['visibility-cond'] = '!=';
        widget.data['visibility-oid'] = widget.data.oid;
        widget.data['visibility-val'] = false;
        delete widget.data.oid;
    }

    // convert "Door/Window sensor" to HTML
    if (widget.tpl === 'tplHmWindow') {
        widget.tpl = 'tplValueBool';
        widget.data.html_false = widget.data.html_closed;
        widget.data.html_true = widget.data.html_open;
        delete widget.data.html_closed;
        delete widget.data.html_open;
    }

    // convert "Door/Window sensor" to HTML
    if (widget.tpl === 'tplHmWindowRotary') {
        widget.tpl = 'tplValueListHtml8';
        widget.data.count = 2;
        widget.data.value0 = widget.data.html_closed;
        widget.data.value1 = widget.data.html_open;
        widget.data.value2 = widget.data.html_tilt;
        delete widget.data.html_closed;
        delete widget.data.html_open;
        delete widget.data.html_tilt;
    }

    // convert "tplBulbOnOff" to tplBulbOnOffCtrl
    if (widget.tpl === 'tplBulbOnOff') {
        widget.tpl = 'tplBulbOnOffCtrl';
        widget.data.readOnly = true;
    }

    // convert "tplValueFloatBarVertical" to tplValueFloatBar
    if (widget.tpl === 'tplValueFloatBarVertical') {
        widget.tpl = 'tplValueFloatBar';
        widget.data.orientation = 'vertical';
    }

    let { data } = widget;
    const { style } = widget;

    // if widget is in the group => replace groupAttrX values
    if (widget.grouped && widget.groupid) {
        const parentWidgetData = views[view].widgets[widget.groupid]?.data;
        if (parentWidgetData) {
            let newGroupData: GroupData | undefined;

            Object.keys(data).forEach(attr => {
                if (typeof data[attr] === 'string') {
                    const result = replaceGroupAttr(data[attr], parentWidgetData);
                    if (result.doesMatch) {
                        newGroupData = newGroupData || (deepClone(data) as GroupData);
                        newGroupData[attr] = result.newString || '';
                    }
                }
            });
            if (newGroupData) {
                data = newGroupData;
            }
        } else {
            console.error(`Invalid group id "${widget.groupid}" in widget "${wid}"`);
        }
    }

    Object.keys(data || {}).forEach(attr => {
        if (!attr) {
            return;
        }

        if (typeof data[attr] === 'string') {
            let m;
            // Process bindings in data attributes
            const OIDs: VisLinkContextBinding[] = extractBinding(data[attr]) as VisLinkContextBinding[];

            if (OIDs) {
                OIDs.forEach(item => {
                    const systemOid: StateID = item.systemOid;
                    if (systemOid) {
                        // Save id for subscribing
                        !linkContext.IDs.includes(systemOid) && linkContext.IDs.push(systemOid);

                        if (linkContext.byViews && !linkContext.byViews[view].includes(systemOid)) {
                            linkContext.byViews[view].push(systemOid);
                        }

                        linkContext.bindings[systemOid] = linkContext.bindings[systemOid] || [];
                        item.type = 'data';
                        item.attr = attr;
                        item.view = view;
                        item.widget = wid;

                        linkContext.bindings[systemOid].push(item);
                    }
                    const operation0: VisBindingOperation | undefined = item.operations && item.operations[0];

                    // If we have more than one argument
                    if (operation0 && Array.isArray(operation0.arg)) {
                        for (let ww = 0; ww < operation0.arg.length; ww++) {
                            const arg: VisBindingOperationArgument = operation0.arg[ww] as VisBindingOperationArgument;
                            const _systemOid = arg.systemOid;
                            if (!_systemOid) {
                                continue;
                            }

                            !linkContext.IDs.includes(_systemOid) && linkContext.IDs.push(_systemOid);

                            if (linkContext.byViews && !linkContext.byViews[view].includes(_systemOid)) {
                                linkContext.byViews[view].push(_systemOid);
                            }

                            linkContext.bindings[_systemOid] = linkContext.bindings[_systemOid] || [];
                            if (!linkContext.bindings[_systemOid].includes(item)) {
                                linkContext.bindings[_systemOid].push(item);
                            }
                        }
                    }
                });
            } else if (
                attr !== 'oidTrueValue' &&
                attr !== 'oidFalseValue' &&
                data[attr] &&
                data[attr] !== 'nothing_selected'
            ) {
                let isID = !!attr.match(/oid\d{0,2}$/);
                if (attr.startsWith('oid')) {
                    isID = true;
                } else if (attr.startsWith('signals-oid-')) {
                    isID = true;
                } else if (linkContext.widgetAttrInfo) {
                    const _attr = attr.replace(/\d{0,2}$/, '');
                    if (
                        linkContext.widgetAttrInfo[_attr]?.type === 'id' &&
                        linkContext.widgetAttrInfo[_attr].noSubscribe !== true
                    ) {
                        isID = true;
                    }
                }

                if (isID) {
                    if (!data[attr].startsWith('"')) {
                        if (!linkContext.IDs.includes(data[attr])) {
                            linkContext.IDs.push(data[attr]);
                        }
                        if (linkContext.byViews && !linkContext.byViews[view].includes(data[attr])) {
                            linkContext.byViews[view].push(data[attr]);
                        }
                    }

                    // Visibility binding
                    if (attr === 'visibility-oid') {
                        let vid = data['visibility-oid'];

                        if (widget.grouped) {
                            const vGroup = getWidgetGroup(views, view, wid);
                            if (vGroup) {
                                if (views[view].widgets[vGroup]) {
                                    const result1 = replaceGroupAttr(vid, views[view].widgets[vGroup].data);
                                    if (result1.doesMatch) {
                                        vid = result1.newString;
                                    }
                                } else {
                                    console.warn(`Invalid group: ${vGroup} in ${view} / ${wid}`);
                                }
                            }
                        }

                        linkContext.visibility[vid] = linkContext.visibility[vid] || [];
                        linkContext.visibility[vid].push({ view, widget: wid });
                    } else if (attr.startsWith('signals-oid-')) {
                        // Signal binding
                        let sid = data[attr];
                        if (widget.grouped) {
                            const group = getWidgetGroup(views, view, wid);
                            if (group) {
                                const result2 = replaceGroupAttr(sid, views[view].widgets[group].data);
                                if (result2.doesMatch) {
                                    sid = result2.newString;
                                }
                            }
                        }

                        linkContext.signals[sid] = linkContext.signals[sid] || [];

                        linkContext.signals[sid].push({
                            view,
                            widget: wid,
                            index: parseInt(attr.substring(12), 10), // 'signals-oid-'.length = 12
                        });
                    } else if (attr === 'lc-oid') {
                        let lcSid = data[attr];

                        if (widget.grouped) {
                            const gGroup = getWidgetGroup(views, view, wid);
                            if (gGroup) {
                                const result3 = replaceGroupAttr(lcSid, views[view].widgets[gGroup].data);
                                if (result3.doesMatch) {
                                    lcSid = result3.newString;
                                }
                            }
                        }

                        linkContext.lastChanges[lcSid] = linkContext.lastChanges[lcSid] || [];
                        linkContext.lastChanges[lcSid].push({ view, widget: wid });
                    }
                } else if (data[attr] === 'id') {
                    m = attr.match(/^attrType(\d+)$/);
                    if (m) {
                        const _id = `groupAttr${m[1]}`;
                        if (data[_id]) {
                            if (!linkContext.IDs.includes(data[_id])) {
                                linkContext.IDs.push(data[_id]);
                            }
                            if (linkContext.byViews && !linkContext.byViews[view].includes(data[_id])) {
                                linkContext.byViews[view].push(data[_id]);
                            }
                        }
                    }
                }
            }
        }
    });

    // build bindings for styles
    if (style) {
        Object.keys(style).forEach(cssAttr => {
            const styleValue = (style as Record<string, any>)[cssAttr];
            if (cssAttr && styleValue && typeof styleValue === 'string') {
                const OIDs: VisLinkContextBinding[] = extractBinding(styleValue) as VisLinkContextBinding[];
                if (OIDs) {
                    OIDs.forEach(item => {
                        const systemOid = item.systemOid;
                        if (systemOid) {
                            !linkContext.IDs.includes(systemOid) && linkContext.IDs.push(systemOid);
                            if (linkContext.byViews && linkContext.byViews[view].includes(systemOid)) {
                                linkContext.byViews[view].push(systemOid);
                            }

                            linkContext.bindings[systemOid] = linkContext.bindings[systemOid] || [];

                            item.type = 'style';
                            item.attr = cssAttr;
                            item.view = view;
                            item.widget = wid;

                            linkContext.bindings[systemOid].push(item);
                        }

                        const operation0: VisBindingOperation | undefined = item.operations && item.operations[0];

                        if (operation0 && Array.isArray(operation0.arg)) {
                            for (let w = 0; w < operation0.arg.length; w++) {
                                const arg: VisBindingOperationArgument = operation0.arg[
                                    w
                                ] as VisBindingOperationArgument;
                                const _systemOid = arg.systemOid;
                                if (!_systemOid) {
                                    continue;
                                }

                                !linkContext.IDs.includes(_systemOid) && linkContext.IDs.push(_systemOid);

                                if (linkContext.byViews && !linkContext.byViews[view].includes(_systemOid)) {
                                    linkContext.byViews[view].push(_systemOid);
                                }
                                linkContext.bindings[_systemOid] = linkContext.bindings[_systemOid] || [];
                                if (!linkContext.bindings[_systemOid].includes) {
                                    linkContext.bindings[_systemOid].push(item);
                                }
                            }
                        }
                    });
                }
            }
        });
    }
}

/**
 * Get all used object IDs in the views
 *
 * @param views project
 * @param isByViews is combine IDs for every view
 */
export function getUsedObjectIDs(views: Project, isByViews?: boolean): VisStateUsage | null {
    if (!views) {
        console.log('Check why views are not yet loaded!');
        return null;
    }

    const linkContext: VisStateUsage = {
        IDs: [],
        visibility: {},
        bindings: {},
        lastChanges: {},
        signals: {},
    };

    if (isByViews) {
        linkContext.byViews = {};
    }

    Object.keys(views).forEach(view => {
        if (view === '___settings') {
            return;
        }

        if (linkContext.byViews) {
            linkContext.byViews[view] = [];
        }

        Object.keys(views[view].widgets).forEach(wid =>
            getUsedObjectIDsInWidget(views, view, wid as AnyWidgetId, linkContext),
        );
    });

    if (isByViews) {
        let changed;
        do {
            changed = false;
            // Check containers
            Object.keys(views).forEach(view => {
                if (view === '___settings') {
                    return;
                }

                Object.values(views[view].widgets).forEach(widget => {
                    // Add all OIDs from this view to parent
                    if (widget.tpl === 'tplContainerView' && widget.data.contains_view && linkContext.byViews) {
                        const ids = linkContext.byViews[widget.data.contains_view];
                        if (ids) {
                            for (const id of ids) {
                                if (id && !linkContext.byViews[view].includes(id)) {
                                    linkContext.byViews[view].push(id);
                                    changed = true;
                                }
                            }
                        } else {
                            console.warn(`View does not exist: "${widget.data.contains_view}"`);
                        }
                    }
                });
            });
        } while (changed);
    }

    return linkContext;
}
